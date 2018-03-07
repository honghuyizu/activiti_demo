import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/content_manage/carousel_manage/carousel/CTable';

function RList({ dispatch, carousels }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = carousels;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/carousel_manage/carousels',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/carousel_manage/carousels',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEnabled(item) {
      dispatch({
        type: 'carousels/edit',
        payload: {id: item.id, status:'enabled'},
      });
    },
    onDisabled(item) {
      dispatch({
        type: 'carousels/edit',
        payload: {id: item.id, status:'disabled'},
      });
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/carousel_manage/carousels/carousel/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'carousels/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'carousels/gotoAuth',
        payload: {id: item.id, name: item.name, role_ids: item.role_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'carousels/select',
        payload: selectedRowKeys,
      });
    },
    gotoChildList(id) {
      dispatch(routerRedux.push({
        pathname: 'index/content_manage/carousel_manage/carousel_items?carousel_id=' + id,
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
function mapStateToProps({ carousels }) {
  return { carousels };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
