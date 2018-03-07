import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../components/index/system_config/user/CForm';

function REdit({ dispatch, users }) {
  const { curRecord, curAction } = users;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `users/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'users/gotoList',
      });
    },
  };
  return (
    <CForm {...formProps} />
  );
}

REdit.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ users }) {
  return { users };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
