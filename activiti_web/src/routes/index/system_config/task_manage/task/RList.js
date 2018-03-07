import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/system_config/task_manage/task/CTable';

function RList({ dispatch, tasks }) {
  const { loading, dataSource, total, pageSize, current, conditionName, beginDT, endDT, } = tasks;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/system_config/task_manage/tasks',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName, begin_dt:beginDT, end_dt:endDT },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/system_config/task_manage/tasks',
        query: { page_number:current, page_size:pageSize, name:conditionName, begin_dt:beginDT, end_dt:endDT},
      }));
    },
    onEnabled(item) {
      dispatch({
        type: 'tasks/edit',
        payload: {id: item.id, status:'enabled'},
      });
    },
    onDisabled(item) {
      dispatch({
        type: 'tasks/edit',
        payload: {id: item.id, status:'disabled'},
      });
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/system_config/task_manage/tasks/task/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'tasks/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'tasks/gotoAuth',
        payload: {id: item.id, name: item.name, role_ids: item.role_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'tasks/select',
        payload: selectedRowKeys,
      });
    },
    gotoChildList(id) {
      dispatch(routerRedux.push({
        pathname: 'index/system_config/task_manage/task_logs?task_id=' + id,
      }));
    },
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
function mapStateToProps({ tasks }) {
  return { tasks };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
