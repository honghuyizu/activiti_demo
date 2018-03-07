import { parse } from 'qs';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as projectUtil from '../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../utils/rbacProjectConstant';
import { getCurUser, updateAvatar } from '../../../../services/index/my_dashboard/myInfo';

export default {
  namespace: 'updateAvatar',

  state: {
    /* 当前操作：新增、编辑、删除等 */
    curAction: '',
    /* 当前操作名称：新增、编辑、删除等 */
    curActionName: '',
    /* 是否显示actionBar */
    actionBarVisible: true,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/my_dashboard/my_info/update_avatar") {
          dispatch({
            type: 'initView',
            payload: location,
          });
        } else if (location.pathname === "/index/my_dashboard/my_info/update_avatar/edit") {
          dispatch({
            type: 'initEdit',
            payload: location,
          });
        }
      });
    },
  },

  effects: {
    *initView({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      yield put({ type: 'showActionBar'});
      const { data } = yield call(getCurUser);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          //console.log('data:', JSON.stringify(data));
          yield put({
            type: 'setValue',
            payload: { curRecord: data.data }
          });
        }
      }
    },
    *initEdit({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      yield put({ type: 'showActionBar'});
      yield put({
        type: 'setValue',
        payload: { curAction: 'upload', curActionName: "上传头像", actionBarVisible: false }
      });
    },
    *updateAvatar({ payload }, { call, put }) {
      const { data } = yield call(updateAvatar, parse(payload));
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          message.success('保存头像成功');
          yield put(routerRedux.push(projectUtil.getCurMenuLink()));
        } else {
          message.error(data.text);
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
  },
}
