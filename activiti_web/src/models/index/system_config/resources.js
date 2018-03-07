import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as get from '../../../utils/tool/get';
import * as projectUtil from '../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../utils/rbacProjectConstant';
import { getPageList, remove, removeBatch } from '../../../services/index/system_config/resources';

export default {
  namespace: 'resources',

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
    /* 查询条件：起始日期 */
    beginDT: get.getCurrentYear() + "-" + get.getCurrentMonth() + "-01",
    /* 查询条件：截止日期 */
    endDT: get.getCurrentYYYYMMDD(),
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/system_config/resources") {
          dispatch({
            type: 'initList',
            payload: location.query,
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
              conditionCode: payload.code,
            },
          });
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
      const newList = state.dataSource.filter(resources => resources.id !== id);
      return { ...state, dataSource: newList, total: state.total - 1, loading: false };
    },
    select(state, action) {
      return { ...state, selectedRowKeys: action.payload };
    },
  },
}
