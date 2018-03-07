import * as projectAuth from '../../../utils/rbacProjectAuth';
import * as projectApi from '../../../utils/rbacProjectApi';

/**
 * 得到当前用户基础信息
 * @param params
 * @returns {Object}
 */
export async function getCurUser(params) {
  return projectAuth.doPost(projectApi.URL_USER_GET_CUR_USER, params);
}

/**
 * 编辑当前用户基础信息
 * @param params
 * @returns {Object}
 */
export async function editCurUser(params) {
  return projectAuth.doPost(projectApi.URL_USER_EDIT_CUR_USER, params);
}

/**
 * 修改密码
 * @param params
 * @returns {Object}
 */
export async function changePassword(params) {
  return projectAuth.doPost(projectApi.URL_USER_CHANGE_PASSWORD, params);
}

/**
 * 更新头像
 * @param params
 * @returns {Object}
 */
export async function updateAvatar(params) {
  return projectAuth.doPost(projectApi.URL_USER_UPDATE_AVATAR, params);
}
