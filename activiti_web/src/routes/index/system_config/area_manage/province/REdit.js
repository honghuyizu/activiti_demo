import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../../components/index/system_config/area_manage/province/CForm';

function REdit({ location, dispatch, provinces }) {
  const { curRecord, curAction, dataSource } = provinces;

  const formProps = {
    item: curRecord,
    dataSource: dataSource,
    onSubmit(data) {
      dispatch({
        type: `provinces/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'provinces/gotoList',
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
function mapStateToProps({ provinces }) {
  return { provinces };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
