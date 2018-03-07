import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../components/index/customer_manage/customer/CTable';

function RList({ dispatch, customers }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = customers;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/customer_manage/customers',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/customer_manage/customers',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/customer_manage/customers/customer/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'customers/delete',
        payload: id,
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'customers/select',
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
function mapStateToProps({ customers }) {
  return { customers };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);