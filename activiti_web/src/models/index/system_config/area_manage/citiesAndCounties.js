import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../utils/rbacProjectConstant';
import { getTree, getNodeTree, getBean, add, edit, remove, removeBatch, changeOrderBy } from '../../../../services/index/system_config/area_manage/areas';
import { getProvinceTree } from '../../../../services/index/system_config/area_manage/provinces';

export default {
  namespace: 'citiesAndCounties',

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
    /** 省份列表 */
    provinceDataSource: [],
    /** 当前省份Id */
    curProvinceId: '',
    /** 区域列表 */
    areaDataSource: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/system_config/area_manage/cities_and_counties") {
          dispatch({
            type: 'initTree',
            payload: location,
          });
        } else if (location.pathname === "/index/system_config/area_manage/cities_and_counties/add") {
          console.log("location.query.parent_id = " + location.query.parent_id);
          let parentId = location.query.parent_id === undefined ? "0" : location.query.parent_id;
          let curRecord = { parent_id: parentId };
          dispatch({
            type: 'initAdd',
            payload: curRecord,
          });
        } else if (pathToRegexp("/index/system_config/area_manage/cities_and_counties/city_and_county/:id").test(location.pathname)) {
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
      let curProvinceId = (parse(payload.query).parent_id);
      curProvinceId = curProvinceId === undefined ? "" : curProvinceId;
      const { data: provinceData } = yield call(getProvinceTree);
      if (provinceData) {
        if (provinceData.code === projectConstant.CODE_SUCCESS) {
          let provinceList = provinceData.data;
          provinceList = provinceList.map((item)=>{
            item.key = item.id;
            item.label = item.name;
            return item;
          });
          curProvinceId = curProvinceId === "" && provinceList.length > 0 ? provinceList[0].id : curProvinceId;
          yield put({
            type: 'setValue',
            payload: {
              curProvinceId: curProvinceId,
              provinceDataSource: provinceList,
            },
          });
        }
      }
      const { data } = yield call(getNodeTree, {parent_id: curProvinceId});
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          //console.log('data:', JSON.stringify(data));
          yield put({type: 'setValue', payload: {dataSource: data.data }});
        }
      }
    },
    *initAdd({ payload }, { call, put }) {
      const { data } = yield call(getTree);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          //console.log('data:', JSON.stringify(data));
          yield put({
            type: 'setValue',
            payload: {
              areaDataSource: data.data,
              curAction: 'add',
              curActionName: "新增市县",
              curRecord: payload,
              actionBarVisible: false
            }
          });
        }
      }
    },
    *initEdit({ payload }, { call, put }) {
      const { data: treeData } = yield call(getTree);
      const { data: beanData } = yield call(getBean, {id:payload});
      if (treeData && beanData) {
        //console.log('treeData:', JSON.stringify(treeData));
        //console.log('beanData:', JSON.stringify(beanData));
        if (treeData.code === projectConstant.CODE_SUCCESS && beanData.code === projectConstant.CODE_SUCCESS) {
          yield put({
            type: 'setValue',
            payload: {
              curAction: 'edit',
              curActionName: "编辑市县",
              curRecord: beanData.data,
              actionBarVisible: false,
              areaDataSource: treeData.data,
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
  },

}
