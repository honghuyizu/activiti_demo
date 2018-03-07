import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/my_dashboard/my_info/user_address/CTable';

function RList({ location, dispatch, userAddresses }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = userAddresses;

  const tableProps = {
    dataSource,
    loading,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: 'index/my_dashboard/my_info/user_addresses',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: 'index/my_dashboard/my_info/user_addresses',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: 'index/my_dashboard/my_info/addresses/address/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'userAddresses/delete',
        payload: id,
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'userAddresses/select',
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
function mapStateToProps({ userAddresses }) {
  return { userAddresses };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
