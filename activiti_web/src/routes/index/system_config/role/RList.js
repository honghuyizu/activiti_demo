import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../components/index/system_config/role/CTable';

function RList({ dispatch, roles }) {
  const { loading, dataSource, total, pageSize, current, conditionName, conditionCode } = roles;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: 'index/system_config/roles',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName, code:conditionCode },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: 'index/system_config/roles',
        query: { page_number:current, page_size:pageSize, name:conditionName, code:conditionCode },
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: 'index/system_config/roles/role/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'roles/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'roles/gotoAuth',
        payload: {id: item.id, name:item.name, menu_ids: item.menu_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'roles/select',
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
function mapStateToProps({ roles }) {
  return { roles };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
