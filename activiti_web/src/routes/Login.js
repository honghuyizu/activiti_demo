import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import * as rbacProjectUtil from '../utils/rbacProjectUtil';
import CForm from '../components/login/CForm';
import styles from '../styles/Login.less';

function Login({ dispatch, login }) {
  const { loading } = login;
  const formProps = {
    loading,
    onLogin(fieldsValue) {
      dispatch({
        type: 'login/login',
        payload: fieldsValue,
      });
    },
  };
  return (
    <div className={styles.normal}>
      <h1>&nbsp;欢迎使用{ rbacProjectUtil.getProjectName() }</h1>
      <CForm { ...formProps }/>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ login }) {
  return { login };
}

// 建立数据关联关系
export default connect(mapStateToProps)(Login);
