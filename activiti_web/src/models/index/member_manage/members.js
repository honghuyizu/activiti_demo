import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../utils/rbacProjectConstant';
import { getPageList, getBean, add, edit, remove, removeBatch, changeOrderBy } from '../../../services/index/member_manage/members';
import { getList as getLevelList } from '../../../services/index/member_manage/levels';

export default {
  namespace: 'members',

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
    /* 列表查询条件：名称*/
    conditionName: '',
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
    /** 级别列表 */
    levelDataSource: [],
    /** 当前级别ID */
    curLevelID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/member_manage/members') {
          dispatch({
            type: 'initList',
            payload: location,
          });
        } else if (location.pathname === '/index/member_manage/members/add') {
          console.log('location.query.level_id = ' + location.query.level_id);
          let levelId = location.query.level_id === undefined ? '0' : location.query.level_id;
          let curRecord = { level_id: levelId };
          dispatch({
            type: 'initAdd',
            payload: curRecord,
          });
        } else if (pathToRegexp('/index/member_manage/members/member/:id').test(location.pathname)) {
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
      let curLevelID = (parse(payload.query).level_id);
      curLevelID = curLevelID === undefined ? '' : curLevelID;
      const { data: levelData } = yield call(getLevelList);
      if (levelData) {
        if (levelData.code === projectConstant.CODE_SUCCESS) {
          let levelList = levelData.data;
          levelList = levelList.map((item)=>{
            item.key = item.id;
            item.label = item.name;
            return item;
          });
          curLevelID = curLevelID === '' && levelList.length > 0 ? levelList[0].id : curLevelID;
          yield put({
            type: 'setValue',
            payload: {
              curLevelID: curLevelID,
              levelDataSource: levelList,
            },
          });
        }
      }
      let pageListPayload = [];
      pageListPayload.level_id = curLevelID;
      const { data: pageData } = yield call(getPageList, pageListPayload );
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
      yield put({ type: 'setValue', payload: { curAction: 'add', curActionName: '新增会员', curRecord: payload, actionBarVisible: false } });
    },
    *initEdit({ payload }, { call, put }) {
      const { data } = yield call(getBean, {id:payload});
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put({ type: 'setValue', payload: { curAction: 'edit', curActionName: '编辑会员', curRecord: data.data, actionBarVisible: false } });
        }
      }
    },
    *gotoList({ payload }, { call, put }) {
      yield put(routerRedux.push(projectUtil.getCurMenuLink()));
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
    },
    *changeOrderBy({ payload }, { call, put }) {
      const { data } = yield call(changeOrderBy, payload);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put(routerRedux.push(projectUtil.getCurMenuLink() + '?level_id=' + payload));
        }
      }
    },
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
      const newList = state.dataSource.filter(member => member.id !== id);
      return { ...state, dataSource: newList, total: state.total - 1, loading: false };
    },
    select(state, action) {
      return { ...state, selectedRowKeys: action.payload };
    },
  },
}
