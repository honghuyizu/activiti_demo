import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../components/index/member_manage/level/CForm';

function REdit({ dispatch, levels }) {
  const { curRecord, curAction } = levels;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `levels/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'levels/gotoList',
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
function mapStateToProps({ levels }) {
  return { levels };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
