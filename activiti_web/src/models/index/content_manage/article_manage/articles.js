import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../utils/rbacProjectUtil';
import * as projectConfig from '../../../../utils/projectConfig';
import * as projectConstant from '../../../../utils/rbacProjectConstant';
import { getPageList, getBean, add, edit, remove, removeBatch } from '../../../../services/index/content_manage/article_manage/articles';
import {getList as getTopicList} from '../../../../services/index/content_manage/article_manage/topics';

export default {
  namespace: 'articles',

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
    /** 栏目列表 */
    topicDataSource: [],
    /** 当前栏目ID */
    curTopicID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/content_manage/article_manage/articles') {
          dispatch({
            type: 'initList',
            payload: location,
          });
        } else if (location.pathname === '/index/content_manage/article_manage/articles/add') {
          console.log('location.query.topic_id = ' + location.query.topic_id);
          let topicId = location.query.topic_id === undefined ? '0' : location.query.topic_id;
          let curRecord = { topic_id: topicId };
          dispatch({
            type: 'initAdd',
            payload: curRecord,
          });
        } else if (pathToRegexp('/index/content_manage/article_manage/articles/article/:id').test(location.pathname)) {
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
      let curTopicID = (parse(payload.query).topic_id);
      curTopicID = curTopicID === undefined ? '' : curTopicID;
      const { data: topicData } = yield call(getTopicList);
      if (topicData) {
        if (topicData.code === projectConstant.CODE_SUCCESS) {
          let topicList = topicData.data;
          topicList = topicList.map((item)=>{
            item.key = item.id;
            item.label = item.name;
            return item;
          });
          curTopicID = curTopicID === '' && topicList.length > 0 ? topicList[0].id : curTopicID;
          yield put({
            type: 'setValue',
            payload: {
              curTopicID: curTopicID,
              topicDataSource: topicList,
            },
          });
        }
      }
      let pageListPayload = [];
      pageListPayload.topic_id = curTopicID;
      const { data } = yield call(getPageList, pageListPayload);
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
            },
          });
        }
      }
    },
    *initAdd({ payload }, { call, put }) {
      yield put({ type: 'setValue', payload: { curAction: 'add', curActionName: '新增文章', curRecord: payload, actionBarVisible: false } });
    },
    *initEdit({ payload }, { call, put }) {
      const { data } = yield call(getBean, { id:payload });
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put({ type: 'setValue', payload: { curAction: 'edit', curActionName: '编辑文章', curRecord: data.data, actionBarVisible: false } });
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
    *updateCurRecord({ payload }, { call, put }) {
      let curRecord = payload.curRecord;
      if (curRecord) {
        if(curRecord.image_path_name !== null && curRecord.image_path_name !== undefined) {
          curRecord.image_url = projectConfig.RESOURCE_API_URL_ROOT + curRecord.image_path_name;
        }
      }
      yield put({ type: 'setValue', curRecord });
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
      const newList = state.dataSource.filter(articles => articles.id !== id);
      return { ...state, dataSource: newList, total: state.total - 1, loading: false };
    },
    select(state, action) {
      return { ...state, selectedRowKeys: action.payload };
    },
  },
}
