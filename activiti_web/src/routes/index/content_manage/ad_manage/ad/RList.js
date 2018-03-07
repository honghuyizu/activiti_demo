import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/content_manage/ad_manage/ad/CTable';

function RList({ dispatch, ads }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = ads;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/ad_manage/ads',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/ad_manage/ads',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/ad_manage/ads/ad/' + id,
      }));
    },
    onEnabled(item) {
      dispatch({
        type: 'ads/edit',
        payload: {id: item.id, status:'enabled'},
      });
    },
    onDisabled(item) {
      dispatch({
        type: 'ads/edit',
        payload: {id: item.id, status:'disabled'},
      });
    },
    onDelete(id) {
      dispatch({
        type: 'ads/delete',
        payload: id,
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'ads/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'ads/select',
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
function mapStateToProps({ ads }) {
  return { ads };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
