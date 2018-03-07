import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../../components/index/content_manage/carousel_manage/carousel/CForm';

function REdit({ dispatch, carousels }) {
  const { curRecord, curAction } = carousels;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `carousels/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'carousels/gotoList',
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
function mapStateToProps({ carousels }) {
  return { carousels };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);