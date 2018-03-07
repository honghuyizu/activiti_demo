import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox, Icon } from 'antd';
import styles from '../../styles/Login.less';

const CForm = ({
  loading,
  onLogin,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      onLogin(getFieldsValue());
    });
  }
  return (
    <Form onSubmit={handleSubmit} className={styles.loginForm}>
      <Form.Item>
        {getFieldDecorator('account', {
          rules: [{ required: true, message: '请输入帐号' }],
        })(<Input prefix={<Icon type="user" />} placeholder="请输入帐号" maxLength="50" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码' }],
        })(<Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" maxLength="50" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('rememberMe', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>记住帐号</Checkbox>)}
        <Button type="primary" htmlType="submit" className={styles.btLogin} loading={loading}>登录</Button>
      </Form.Item>
    </Form>
  );
};

CForm.propTypes = {
  form: PropTypes.object.isRequired,
  onLogin: PropTypes.func
};

export default Form.create()(CForm);
