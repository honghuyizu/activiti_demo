import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../utils/rbacProjectConstant';
import { getPageList, getBean, add, edit, remove, removeBatch } from '../../../../services/index/system_config/mobile_app_manage/mobileAppConfigs';
import {getList as getMobileAppList} from "../../../../services/index/system_config/mobile_app_manage/mobileApps";

export default {
  namespace: 'mobileAppConfigs',

  state: {
    /* 当前操作：新增、编辑、删除等 */
    curAction: '',
    /* 当前操作名称：新增、编辑、删除等 */
    curActionName: '',
    /* 是否显示actionBar */
    actionBarVisible: true,
    /* 当前记录项 */
    curRecord: {},
    /* 列表：数据源 */
    dataSource: [],
    /* 列表：是否显示加载动画 */
    loading: false,
    /* 列表：总记录数 */
    total: null,
    /* 列表：当前页码 */
    current: 1,
    /* 列表：每页显示的最大记录数 */
    pageSize:10,
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
    /** 移动应用列表 */
    mobileAppDataSource: [],
    /** 当前移动应用ID */
    curMobileAppID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/system_config/mobile_app_manage/mobile_app_configs') {
          dispatch({
            type: 'initList',
            payload: location.query,
          });
        } else if (location.pathname === '/index/system_config/mobile_app_manage/mobile_app_configs/add') {
          console.log('location.query.mobile_app_id = ' + location.query.mobile_app_id);
          let mobileAppId = location.query.mobile_app_id === undefined ? '0' : location.query.mobile_app_id;
          let curRecord = { mobile_app_id: mobileAppId };
          dispatch({
            type: 'initAdd',
            payload: curRecord,
          });
        } else if (pathToRegexp('/index/system_config/mobile_app_manage/mobile_app_configs/mobile_app_config/:id').test(location.pathname)) {
          let curId = location.pathname.substr(location.pathname.lastIndexOf('/') + 1);
          console.log('curId = ' + curId);
          dispatch({
            type: 'initEdit',
            payload: curId,
          });
        }
      });
    },
  },

  effects: {
    *initList({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      yield put({ type: 'showActionBar'});
      let curMobileAppID = (parse(payload).mobile_app_id);
      curMobileAppID = curMobileAppID === undefined ? '' : curMobileAppID;
      const { data: mobileAppData } = yield call(getMobileAppList);
      if (mobileAppData) {
        if (mobileAppData.code === projectConstant.CODE_SUCCESS) {
          let mobileAppList = mobileAppData.data;
          mobileAppList = mobileAppList.map((item)=>{
            item.key = item.id;
            item.label = item.name;
            return item;
          });
          mobileAppList.unshift({id:'0', name:'全部'});
          curMobileAppID = curMobileAppID === '' && mobileAppList.length > 0 ? mobileAppList[0].id : curMobileAppID;
          yield put({
            type: 'setValue',
            payload: {
              curMobileAppID: curMobileAppID,
              mobileAppDataSource: mobileAppList,
            },
          });
        }
      }
      const { data: pageData } = yield call(getPageList, parse(payload));
      if (pageData) {
        if (pageData.code === projectConstant.CODE_SUCCESS) {
          //console.log('data:', JSON.stringify(data));
          yield put({
            type: 'setValue',
            payload: {
              dataSource: pageData.data.dataSource,
              total: pageData.data.total,
              current: pageData.data.current,
              pageSize: pageData.data.pageSize,
            },
          });
        }
      }
    },
    *initAdd({ payload }, { call, put }) {
      yield put({ type: 'setValue', payload: { curAction: 'add', curActionName: '新增配置', curRecord: payload, actionBarVisible: false } });
    },
    *initEdit({ payload }, { call, put }) {
      const { data } = yield call(getBean, { id:payload });
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put({ type: 'setValue', payload: { curAction: 'edit', curActionName: '编辑配置', curRecord: data.data, actionBarVisible: false } });
        }
      }
    },
    *gotoList({ payload }, { call, put }) {
      yield put(routerRedux.push(projectUtil.getCurMenuLink()));
    },
    *gotoAdd({ payload }, { call, put }) {
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + '/add'));
    },
    *add({ payload }, { call, put }) {
      const { data } = yield call(add, parse(payload));
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          message.success('新增操作成功');
          yield put(routerRedux.push(projectUtil.getCurMenuLink()));
        }
      }
    },
    *edit({ payload }, { call, put }) {
      const { data } = yield call(edit, parse(payload));
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          message.success('编辑操作成功');
          yield put(routerRedux.push(projectUtil.getCurMenuLink()));
        }
      }
    },
    *'delete'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(remove, { id: payload });
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          message.success('删除操作成功');
          yield put({
            type: 'deleteSuccess',
            payload,
          });
        }
      }
    },
    *deleteBatch({ payload }, { call, put }) {
      let ids = JSON.stringify(payload);
      ids = ids.replace('[', '').replace(']', '');
      console.log('ids : ' + ids);
      yield put({ type: 'showLoading' });
      const { data } = yield call(removeBatch, { ids: ids });
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          let count = data.data.count;
          if (count !== null && count !== undefined && count > 0) {
            message.success('批量删除 ' + count + ' 条记录成功');
          } else {
            message.error(data.text);
          }
          yield put(routerRedux.push(projectUtil.getCurMenuLink()));
        }
      }
    },
  },

  reducers: {
    showActionBar(state) {
      return { ...state, actionBarVisible: true, curAction: '', curActionName: '', curRecord: {} };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    setValue(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    deleteSuccess(state, action) {
      const id = action.payload;
      const newList = state.dataSource.filter(mobileAppConfigs => mobileAppConfigs.id !== id);
      return { ...state, dataSource: newList, total: state.total - 1, loading: false };
    },
    select(state, action) {
      return { ...state, selectedRowKeys: action.payload };
    },
  },
}
