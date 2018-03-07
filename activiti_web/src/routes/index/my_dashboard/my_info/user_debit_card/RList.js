import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/my_dashboard/my_info/user_debit_card/CTable';

function RList({ dispatch, userDebitCards }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = userDebitCards;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/my_dashboard/my_info/user_debit_cards',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/my_dashboard/my_info/user_debit_cards',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/my_dashboard/my_info/user_debit_cards/user_debit_card/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'userDebitCards/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'userDebitCards/gotoAuth',
        payload: {id: item.id, name: item.name, role_ids: item.role_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'userDebitCards/select',
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
function mapStateToProps({ userDebitCards }) {
  return { userDebitCards };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);