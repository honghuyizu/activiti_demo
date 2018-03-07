import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../../components/index/system_config/task_manage/task/CForm';

function REdit({ dispatch, tasks }) {
  const { curRecord, curAction } = tasks;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `tasks/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'tasks/gotoList',
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
function mapStateToProps({ tasks }) {
  return { tasks };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
