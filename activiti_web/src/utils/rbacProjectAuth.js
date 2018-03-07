import request from './request';
import * as rbacProjectUtil from './rbacProjectUtil';
import * as projectConfig from './projectConfig';
import qs from 'qs';

let cryptoJS = require('crypto-js');

/** 得到Client对象 */
function getClient(){
  return {
    type:'web',
    web:{
      version : projectConfig.API_VERSION,
      language : 'zh-CN',
      ua : ''
    }
  };
}

/**
 * 得到Auth对象
 * @param token
 * @param apiKey
 * @param secretKey
 * @returns {{token: *, apiKey, timestamp: number, signature}}
 */
function getAuth(token, apiKey, secretKey){
  let timestamp = new Date().getTime();
  return {
    token : token,
    apiKey : apiKey,
    timestamp : timestamp,
    signature : cryptoJS.HmacSHA1(apiKey + timestamp, secretKey).toString(cryptoJS.enc.Hex)
  }
}

/**
 * 得到通用参数对象
 * @param token
 * @param apiKey
 * @param secretKey
 * @returns {string}
 */
function getCommon(token, apiKey, secretKey) {
  let common = {
    client : getClient(),
    auth : getAuth(token, apiKey, secretKey)
  };
  return rbacProjectUtil.hexEncode(JSON.stringify(common));
}

/**
 * 发起Get请求
 * @param url
 * @param params
 * @returns {Object}
 */
export function doGet(url, params) {
  let paramsString = qs.stringify(params);
  console.log('params:', paramsString);
  let common = getCommon(sessionStorage.token, projectConfig.API_KEY, projectConfig.API_SECRET_KEY);
  //console.log('common:', common);
  let urlString = projectConfig.API_ROOT_URL + url + '?' + paramsString + '&common=' + common;
  console.log('url:', urlString);
  return request(urlString);
}

/**
 * 发起Get请求
 * @param url
 * @param params
 * @returns {Object}
 */
export function doGetByFullUrl(url, params) {
  let paramsString = qs.stringify(params);
  console.log('params:', paramsString);
  let common = getCommon(sessionStorage.token, projectConfig.API_KEY, projectConfig.API_SECRET_KEY);
  //console.log('common:', common);
  let urlString = url + '?' + paramsString + '&common=' + common;
  console.log('url:', urlString);
  return request(urlString);
}

/**
 * 发起Post请求
 * @param url
 * @param params
 * @returns {Object}
 */
export function doPost(url, params) {
  let urlString = projectConfig.API_ROOT_URL + url;
  console.log('url:', urlString);
  let options = {
    method: 'post',
    body: toFormData(params),
  };
  return request(urlString, options);
}

/**
 * 生成表单数据
 * @param params
 * @returns {*}
 */
function toFormData(params) {
  let resultValue = new FormData();
  resultValue.append('common', getCommon(sessionStorage.token, projectConfig.API_KEY, projectConfig.API_SECRET_KEY));
  for(let key in params) {
    resultValue.append(key, params[key]);
  }
  return resultValue
}

/** 得到资源链接：二进制上传 */
export function getResourceUrl_uploadByByte() {
  let token = sessionStorage.token;
  let common = getCommon(token, projectConfig.RESOURCE_API_KEY, projectConfig.RESOURCE_API_SECRET_KEY);
  return projectConfig.RESOURCE_API_URL_ROOT + projectConfig.RESOURCE_API_URL_UPLOAD_BY_BYTE + '?common=' + common;
}

