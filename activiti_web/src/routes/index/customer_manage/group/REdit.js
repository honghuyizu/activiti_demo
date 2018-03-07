import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../components/index/customer_manage/group/CForm';

function REdit({ dispatch, groups }) {
  const { curRecord, curAction } = groups;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `groups/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'groups/gotoList',
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
function mapStateToProps({ groups }) {
  return { groups };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);