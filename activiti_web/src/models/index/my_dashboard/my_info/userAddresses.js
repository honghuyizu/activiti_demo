import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../utils/rbacProjectConstant';
import { getPageList, getBean, add, edit, remove, removeBatch } from '../../../../services/index/my_dashboard/my_info/userAddresses';
import { getNodeTree } from '../../../../services/index/system_config/area_manage/areas';

export default {
  namespace: 'userAddresses',

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
    /* 区域树：数据源 */
    areaTreeDataSource:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/my_dashboard/my_info/user_addresses") {
          dispatch({
            type: 'initList',
            payload: location,
          });
        } else if (location.pathname === "/index/my_dashboard/my_info/user_addresses/add") {
          dispatch({
            type: 'initAdd'
          });
        } else if (pathToRegexp("/index/my_dashboard/my_info/addresses/user_address/:id").test(location.pathname)) {
          let curId = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
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
      const { data } = yield call(getPageList, parse(payload.query));
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          //console.log('data:', JSON.stringify(data));
          yield put({
            type: 'setValue',
            payload: {
              dataSource: data.data.dataSource,
              total: data.data.total,
              current: data.data.current,
              pageSize: data.data.pageSize,
              //------------------------
              conditionName: payload.name,
            },
          });
        }
      }
    },
    *initAdd({ payload }, { call, put }) {
      const { data } = yield call(getNodeTree);
      if (data) {
        //console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          let areaTreeDataSource = data.data;
          yield put({
            type: 'setValue',
            payload: {
              curAction: 'add',
              curActionName: "新增地址",
              curRecord: {},
              actionBarVisible: false,
              areaTreeDataSource: areaTreeDataSource,
            }
          });
        }
      }
    },
    *initEdit({ payload }, { call, put }) {
      const { data: beanData } = yield call(getBean, {id:payload});
      const { data: treeData } = yield call(getNodeTree);
      if (beanData && treeData) {
        //console.log('beanData:', JSON.stringify(beanData));
        //console.log('treeData:', JSON.stringify(treeData));
        if (beanData.code === projectConstant.CODE_SUCCESS && treeData.code === projectConstant.CODE_SUCCESS) {
          yield put({
            type: 'setValue',
            payload: {
              curAction: 'edit',
              curActionName: "编辑地址",
              curRecord: beanData.data,
              actionBarVisible: false,
              areaTreeDataSource: treeData.data,
            }
          });
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
          yield put(routerRedux.push(projectUtil.getCurMenuLink()));
        }
      }
    },
    *edit({ payload }, { call, put }) {
      const { data } = yield call(edit, parse(payload));
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put(routerRedux.push(projectUtil.getCurMenuLink()));
        }
      }
    },
    *'delete'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(remove, { id: payload });
      if (data) {
        yield put({
          type: 'deleteSuccess',
          payload,
        });
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
    }
  },

  reducers: {
    showActionBar(state) {
      return { ...state, actionBarVisible: true, curAction: '', curActionName: "", curRecord: {} };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    setValue(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    deleteSuccess(state, action) {
      const id = action.payload;
      const newList = state.dataSource.filter(address => address.id !== id);
      return { ...state, dataSource: newList, total: state.total - 1, loading: false };
    },
    select(state, action) {
      return { ...state, selectedRowKeys: action.payload };
    },
  },
}
