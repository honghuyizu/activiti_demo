import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/my_dashboard/my_info/user_credit_card/CTable';

function RList({ dispatch, userCreditCards }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = userCreditCards;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/my_dashboard/my_info/user_credit_cards',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/my_dashboard/my_info/user_credit_cards',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/my_dashboard/my_info/user_credit_cards/user_credit_card/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'userCreditCards/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'userCreditCards/gotoAuth',
        payload: {id: item.id, name: item.name, role_ids: item.role_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'userCreditCards/select',
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
function mapStateToProps({ userCreditCards }) {
  return { userCreditCards };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);