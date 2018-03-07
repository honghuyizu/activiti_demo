import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../utils/rbacProjectConstant';
import { getPageList, getBean, add, edit, remove, removeBatch } from '../../../services/index/system_config/roles';
import { getTree } from '../../../services/index/system_config/menus';

export default {
  namespace: 'roles',

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
    /* 列表查询条件：代码*/
    conditionCode: '',
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
    /* 菜单树：数据源 */
    menuTreeDataSource:[],
    /* 菜单授权时，选中的菜单Ids */
    selectedMenuIds: [],
    /* 菜单授权时，展开的菜单Ids */
    expandedMenuIds: ['0'],
    /* 菜单授权时，是否自动展开父节点 */
    autoExpandParent: true,
    /* 菜单授权时，搜索框的值 */
    searchValue:"",
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/system_config/roles') {
          dispatch({
            type: 'initList',
            payload: location,
          });
        } else if (location.pathname === '/index/system_config/roles/add') {
          dispatch({
            type: 'initAdd'
          });
        } else if (location.pathname === '/index/system_config/roles/auth') {
          dispatch({
            type: 'initAuth',
            payload: location.query,
          });
        } else if (pathToRegexp('/index/system_config/roles/role/:id').test(location.pathname)) {
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
              conditionCode: payload.code,
            },
          });
        }
      }
    },
    *initAdd({ payload }, { call, put }) {
      yield put({ type: 'setValue', payload: { curAction: 'add', curActionName: "新增角色", curRecord: {}, actionBarVisible: false } });
    },
    *initEdit({ payload }, { call, put }) {
      const { data } = yield call(getBean, {id:payload});
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put({ type: 'setValue', payload: { curAction: 'edit', curActionName: "编辑角色", curRecord: data.data, actionBarVisible: false } });
        }
      }
    },
    *initAuth({ payload }, { call, put }) {
      const { data } = yield call(getTree);
      if (data) {
        //console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          let menuTreeDataSource = [{children: data.data, key: '0', value: '0', name: '系统菜单'}];
          yield put({
            type: 'setValue',
            payload: {
              curAction: 'auth',
              curActionName: "菜单授权",
              curRecord: payload,
              actionBarVisible: false,
              selectedMenuIds: (payload.menu_ids === null || payload.menu_ids === undefined) ? [] : payload.menu_ids.split(','),
              menuTreeDataSource: menuTreeDataSource,
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
    *gotoAuth({ payload }, { call, put }) {
      yield put(routerRedux.push('/index/system_config/roles/auth?id=' + payload.id + '&name=' + payload.name + '&menu_ids=' + payload.menu_ids));
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
      const newList = state.dataSource.filter(role => role.id !== id);
      return { ...state, dataSource: newList, total: state.total - 1, loading: false };
    },
    select(state, action) {
      return { ...state, selectedRowKeys: action.payload };
    },
    selectMenus(state, action) {
      return { ...state, selectedMenuIds: action.payload };
    },
  },
}
