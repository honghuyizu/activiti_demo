import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/system_config/dict_manage/dict_bank/CTable';

function RList({ dispatch, dictBanks }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = dictBanks;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/system_config/dict_manage/dict_banks',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/system_config/dict_manage/dict_banks',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEnabled(item) {
      dispatch({
        type: 'dictBanks/edit',
        payload: {id: item.id, status:'enabled'},
      });
    },
    onDisabled(item) {
      dispatch({
        type: 'dictBanks/edit',
        payload: {id: item.id, status:'disabled'},
      });
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/system_config/dict_manage/dict_banks/dict_bank/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'dictBanks/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'dictBanks/gotoAuth',
        payload: {id: item.id, name: item.name, role_ids: item.role_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'dictBanks/select',
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
function mapStateToProps({ dictBanks }) {
  return { dictBanks };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
