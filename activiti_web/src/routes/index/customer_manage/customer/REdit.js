import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../components/index/customer_manage/customer/CForm';

function REdit({ dispatch, customers }) {
  const { curRecord, curAction, groupDataSource } = customers;

  const formProps = {
    item: curRecord,
    groupDataSource,
    onSubmit(data) {
      dispatch({
        type: `customers/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'customers/gotoList',
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
function mapStateToProps({ customers }) {
  return { customers };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
