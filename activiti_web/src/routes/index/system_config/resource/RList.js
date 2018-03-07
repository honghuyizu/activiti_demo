import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../components/index/system_config/resource/CTable';

function RList({ dispatch, resources }) {
  const { loading, dataSource, total, pageSize, current, beginDT, endDT } = resources;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/system_config/resources',
        query: { page_number:pageNumber, page_size:pageSize, begin_dt:beginDT, end_dt:endDT },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/system_config/resources',
        query: { page_number:current, page_size:pageSize, begin_dt:beginDT, end_dt:endDT },
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/system_config/resources/resource/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'resources/delete',
        payload: id,
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'resources/select',
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
function mapStateToProps({ resources }) {
  return { resources };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
