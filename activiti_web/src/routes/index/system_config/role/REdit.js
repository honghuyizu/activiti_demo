import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../components/index/system_config/role/CForm';

function REdit({ dispatch, roles }) {
  const { curRecord, curAction } = roles;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `roles/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'roles/gotoList',
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
function mapStateToProps({ roles }) {
  return { roles };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
