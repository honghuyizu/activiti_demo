import * as projectAuth from '../../../../utils/rbacProjectAuth';
import * as projectApi from '../../../../utils/rbacProjectApi';

/**
 * 得到树
 * @param params
 * @returns {Object}
 */
export async function getProvinceTree(params) {
  return projectAuth.doPost(projectApi.URL_AREA_GET_PROVINCE_TREE, params);
}

/**
 * 新增
 * @param params
 * @returns {Object}
 */
export async function addProvince(params) {
  return projectAuth.doPost(projectApi.URL_AREA_ADD_PROVINCE, params);
}
