import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../../components/index/system_config/mobile_app_manage/mobile_app_config/CForm';

function REdit({ dispatch, mobileAppConfigs }) {
  const { curRecord, curAction, mobileAppDataSource } = mobileAppConfigs;

  const formProps = {
    item: curRecord,
    mobileAppDataSource,
    onSubmit(data) {
      dispatch({
        type: `mobileAppConfigs/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'mobileAppConfigs/gotoList',
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
function mapStateToProps({ mobileAppConfigs }) {
  return { mobileAppConfigs };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
