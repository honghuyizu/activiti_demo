import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../utils/rbacProjectConstant';
import { getPageList, getBean, add, edit, remove, removeBatch } from '../../../services/index/system_config/users';
import { getList } from '../../../services/index/system_config/roles';

export default {
  namespace: 'users',

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
    /* 列表查询条件：姓名*/
    conditionName: '',
    /* 列表查询条件：帐号*/
    conditionAccount: '',
    /* 列表查询条件：手机号码*/
    conditionMobile: '',
    /* 列表查询条件：工号*/
    conditionCode: '',
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
    /* 角色树：数据源 */
    roleTreeDataSource:[],
    /* 角色授权时，选中的角色Ids */
    selectedRoleIds: [],
    /* 角色授权时，展开的角色Ids */
    expandedRoleIds: ['0'],
    /* 角色授权时，是否自动展开父节点 */
    autoExpandParent: true,
    /* 角色授权时，搜索框的值 */
    searchValue:"",
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/system_config/users') {
          dispatch({
            type: 'initList',
            payload: location.query,
          });
        } else if (location.pathname === '/index/system_config/users/add') {
          dispatch({
            type: 'initAdd'
          });
        } else if (location.pathname === '/index/system_config/users/auth') {
          dispatch({
            type: 'initAuth',
            payload: location.query,
          });
        } else if (pathToRegexp('/index/system_config/users/user/:id').test(location.pathname)) {
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
      const { data } = yield call(getPageList, parse(payload));
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
              conditionAccount: payload.account,
              conditionMobile: payload.mobile,
              conditionCode: payload.code,
            },
          });
        }
      }
    },
    *initAdd({ payload }, { call, put }) {
      yield put({ type: 'setValue', payload: { curAction: 'add', curActionName: '新增用户', curRecord: {}, actionBarVisible: false } });
    },
    *initEdit({ payload }, { call, put }) {
      const { data } = yield call(getBean, { id:payload });
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put({ type: 'setValue', payload: { curAction: 'edit', curActionName: '编辑用户', curRecord: data.data, actionBarVisible: false } });
        }
      }
    },
    *initAuth({ payload }, { call, put }) {
      const { data } = yield call(getList);
      if (data) {
        //console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          let roleList = data.data;
          roleList = roleList.map((item)=>{
            item.key = item.id;
            return item;
          });
          let roleTreeDataSource = [{children: roleList, key: '0', value: '0', name: '系统角色'}];
          //console.log('roleTreeDataSource:', JSON.stringify(roleTreeDataSource));
          yield put({
            type: 'setValue',
            payload: {
              curAction: 'auth',
              curActionName: "角色授权",
              actionBarVisible: false,
              curRecord: payload,
              selectedRoleIds: (payload.role_ids === null || payload.role_ids === undefined) ? [] : payload.role_ids.split(','),
              roleTreeDataSource: roleTreeDataSource,
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
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + '/auth??id=' + payload.id + '&name=' + payload.name + '&role_ids=' + payload.role_ids));
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
      const newList = state.dataSource.filter(user => user.id !== id);
      return { ...state, dataSource: newList, total: state.total - 1, loading: false };
    },
    select(state, action) {
      return { ...state, selectedRowKeys: action.payload };
    },
    selectRoles(state, action) {
      return { ...state, selectedRoleIds: action.payload };
    },
  },
}
