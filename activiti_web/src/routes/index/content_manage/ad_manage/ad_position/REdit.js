import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../../components/index/content_manage/ad_manage/ad_position/CForm';

function REdit({ dispatch, adPositions }) {
  const { curRecord, curAction } = adPositions;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `adPositions/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'adPositions/gotoList',
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
function mapStateToProps({ adPositions }) {
  return { adPositions };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);