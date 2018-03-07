import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import * as util from '../../../../../utils/tool/util';
import * as rbacProjectAuth from '../../../../../utils/rbacProjectAuth';
import CForm from '../../../../../components/index/content_manage/article_manage/article/CForm';

function REdit({ dispatch, articles }) {
  const { curRecord, curAction } = articles;

  const formProps = {
    item: curRecord,
    apiUrlUploadByByte: rbacProjectAuth.getResourceUrl_uploadByByte(),
    updateImagePathName(imagePathName) {
      curRecord.image_path_name = imagePathName;
      dispatch({
        type: 'articles/updateCurRecord',
        payload: {curRecord:curRecord},
      });
    },
    addTag(tag) {
      let tags = curRecord.tags;
      tags = tags === null || tags === undefined ? tag : tags + ',' + tag;
      curRecord.tags = tags;
      dispatch({
        type: 'articles/updateCurRecord',
        payload: {curRecord:curRecord},
      });
    },
    removeTag(tag) {
      let tags = curRecord.tags;
      tags = tags === null || tags === undefined ? '': util.trim(tags);
      if (tags === tag) {
        tags = '';
      } else {
        let tagArray = tags.split(',');
        tags = '';
        let iLength = tagArray.length;
        for (let i = 0; i < iLength; i ++) {
          if (tagArray[i] !== '' && tagArray[i] !== tag) {
            tags += tags === '' ? tagArray[i] : ',' + tagArray[i];
          }
        }
        curRecord.tags = tags;
        dispatch({
          type: 'articles/updateCurRecord',
          payload: {curRecord:curRecord},
        });
      }
    },
    onSubmit(data) {
      dispatch({
        type: `articles/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'articles/gotoList',
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
function mapStateToProps({ articles }) {
  return { articles };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
