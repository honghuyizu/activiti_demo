import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../components/index/system_config/user/CTable';

function RList({ dispatch, users }) {
  const { loading, dataSource, total, pageSize, current, conditionName, conditionAccount, conditionMobile, conditionCode } = users;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: 'index/system_config/users',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName, account:conditionAccount, mobile:conditionMobile, code:conditionCode },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: 'index/system_config/users',
        query: { page_number:current, page_size:pageSize, name:conditionName, account:conditionAccount, mobile:conditionMobile, code:conditionCode },
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: 'index/system_config/users/user/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'users/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'users/gotoAuth',
        payload: {id: item.id, name: item.name, role_ids: item.role_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'users/select',
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
function mapStateToProps({ users }) {
  return { users };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
