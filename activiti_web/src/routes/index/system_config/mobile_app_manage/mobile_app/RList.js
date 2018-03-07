import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/system_config/mobile_app_manage/mobile_app/CTable';

function RList({ dispatch, mobileApps }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = mobileApps;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/system_config/mobile_app_manage/mobile_apps',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/system_config/mobile_app_manage/mobile_apps',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/system_config/mobile_app_manage/mobile_apps/mobile_app/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'mobileApps/delete',
        payload: id,
      });
    },
    gotoChildList(id) {
      dispatch(routerRedux.push({
        pathname: 'index/system_config/mobile_app_manage/mobile_app_configs?mobile_app_id=' + id,
      }));
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'mobileApps/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'mobileApps/select',
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
function mapStateToProps({ mobileApps }) {
  return { mobileApps };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
