import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/system_config/mobile_app_manage/mobile_app_config/CTable';

function RList({ dispatch, mobileAppConfigs }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = mobileAppConfigs;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/system_config/mobile_app_manage/mobile_app_configs',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/system_config/mobile_app_manage/mobile_app_configs',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEnabled(item) {
      dispatch({
        type: 'mobileAppConfigs/edit',
        payload: {id: item.id, status:'enabled'},
      });
    },
    onDisabled(item) {
      dispatch({
        type: 'mobileAppConfigs/edit',
        payload: {id: item.id, status:'disabled'},
      });
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/system_config/mobile_app_manage/mobile_app_configs/mobile_app_config/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'mobileAppConfigs/delete',
        payload: id,
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'mobileAppConfigs/select',
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
function mapStateToProps({ mobileAppConfigs }) {
  return { mobileAppConfigs };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
