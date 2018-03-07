import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../../components/index/my_dashboard/my_info/user_address/CForm';

function REdit({ dispatch, userAddresses }) {
  const { curRecord, curAction, areaTreeDataSource } = userAddresses;

  const formProps = {
    item: curRecord,
    areaTreeDataSource: areaTreeDataSource,
    onSubmit(data) {
      dispatch({
        type: `userAddresses/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'userAddresses/gotoList',
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
function mapStateToProps({ addresses }) {
  return { addresses };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
