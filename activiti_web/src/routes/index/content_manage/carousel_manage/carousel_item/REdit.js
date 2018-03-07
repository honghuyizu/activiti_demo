import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../../components/index/content_manage/carousel_manage/carousel_item/CForm';
import * as rbacProjectAuth from "../../../../../utils/rbacProjectAuth";

function REdit({ dispatch, carouselItems }) {
  const { curRecord, curAction } = carouselItems;

  const formProps = {
    item: curRecord,
    apiUrlUploadByByte: rbacProjectAuth.getResourceUrl_uploadByByte(),
    updateImagePathName(imagePathName) {
      curRecord.image_path_name = imagePathName;
      dispatch({
        type: 'carouselItems/updateCurRecord',
        payload: {curRecord:curRecord},
      });
    },
    onSubmit(data) {
      dispatch({
        type: `carouselItems/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'carouselItems/gotoList',
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
function mapStateToProps({ carouselItems }) {
  return { carouselItems };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
