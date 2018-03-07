import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../utils/rbacProjectConstant';
import { getTree, getBean, add, edit, remove, removeBatch, changeOrderBy } from '../../../services/index/system_config/menus';

export default {
  namespace: 'menus',

  state: {
    /* 当前操作：新增、编辑、删除等 */
    curAction: '',
    /* 当前操作名称：新增、编辑、删除等 */
    curActionName: '',
    /* 是否显示actionBar */
    actionBarVisible: true,
    /* 当前记录项 */
    curRecord: {},
    /* 树：数据源 */
    dataSource: [],
    /* 树：是否显示加载动画 */
    loading: false,
    /* 是否显示选择图标的Modal */
    selectIconModalVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/system_config/menus") {
          dispatch({
            type: 'initTree',
            payload: location,
          });
        } else if (location.pathname === "/index/system_config/menus/add") {
          console.log("location.query.parent_id = " + location.query.parent_id);
          let parentId = location.query.parent_id === undefined ? "0" : location.query.parent_id;
          let curRecord = { parent_id: parentId };
          dispatch({
            type: 'initAdd',
            payload: curRecord,
          });
        } else if (pathToRegexp("/index/system_config/menus/menu/:id").test(location.pathname)) {
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
    *initTree({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      yield put({ type: 'showActionBar'});
      const { data } = yield call(getTree);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          //console.log('data:', JSON.stringify(data));
          yield put({type: 'setValue', payload: { dataSource: data.data }});
        }
      }
    },
    *initAdd({ payload }, { call, put }) {
      yield put({ type: 'setValue', payload: { curAction: 'add', curActionName: "新增菜单", curRecord: payload, actionBarVisible: false } });
    },
    *initEdit({ payload }, { call, put }) {
      const { data } = yield call(getBean, {id:payload});
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put({ type: 'setValue', payload: { curAction: 'edit', curActionName: "编辑菜单", curRecord: data.data, actionBarVisible: false } });
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
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put(routerRedux.push(projectUtil.getCurMenuLink()));
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
    *changeOrderBy({ payload }, { call, put }) {
      const { data } = yield call(changeOrderBy, payload);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put(routerRedux.push(projectUtil.getCurMenuLink()));
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
    select(state, action) {
      return { ...state, selectedRowKeys: action.payload };
    },
    showSelectIconModal(state) {
      return { ...state, selectIconModalVisible: true };
    },
    hideSelectIconModal(state, action) {
      if (action.payload === null || action.payload === undefined) {
        return { ...state, selectIconModalVisible: false };
      } else {
        console.log("hideSelectIconModal, action.payload : " + JSON.stringify(action.payload));
        return { ...state, selectIconModalVisible: false, curRecord: action.payload };
      }
    },
  },

}
