import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../../components/index/content_manage/article_manage/topic/CForm';

function REdit({ dispatch, topics }) {
  const { curRecord, curAction } = topics;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `topics/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'topics/gotoList',
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
function mapStateToProps({ topics }) {
  return { topics };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);