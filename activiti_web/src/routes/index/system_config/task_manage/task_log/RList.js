import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/system_config/task_manage/task_log/CTable';

function RList({ dispatch, taskLogs }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = taskLogs;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/system_config/task_manage/task_logs',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/system_config/task_manage/task_logs',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/system_config/task_manage/task_logs/task_log/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'taskLogs/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'taskLogs/gotoAuth',
        payload: {id: item.id, name: item.name, role_ids: item.role_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'taskLogs/select',
        payload: selectedRowKeys,
      });
    }
  };
  return (
    <CTable {...tableProps}/>
  );
}

RList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ taskLogs }) {
  return { taskLogs };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
