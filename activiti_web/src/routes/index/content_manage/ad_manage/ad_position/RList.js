import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/content_manage/ad_manage/ad_position/CTable';

function RList({ dispatch, adPositions }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = adPositions;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/ad_manage/ad_positions',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/ad_manage/ad_positions',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEnabled(item) {
      dispatch({
        type: 'adPositions/edit',
        payload: {id: item.id, status:'enabled'},
      });
    },
    onDisabled(item) {
      dispatch({
        type: 'adPositions/edit',
        payload: {id: item.id, status:'disabled'},
      });
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/ad_manage/ad_positions/ad_position/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'adPositions/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'adPositions/gotoAuth',
        payload: {id: item.id, name: item.name, role_ids: item.role_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'adPositions/select',
        payload: selectedRowKeys,
      });
    },
    gotoChildList(id) {
      dispatch(routerRedux.push({
        pathname: 'index/content_manage/ad_manage/ads?ad_position_id=' + id,
      }));
    },
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
function mapStateToProps({ adPositions }) {
  return { adPositions };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
