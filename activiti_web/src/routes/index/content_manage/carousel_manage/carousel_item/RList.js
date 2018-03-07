import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/content_manage/carousel_manage/carousel_item/CTable';

function RList({ dispatch, carouselItems }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = carouselItems;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/carousel_manage/carousel_items',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/carousel_manage/carousel_items',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEnabled(item) {
      dispatch({
        type: 'carouselItems/edit',
        payload: {id: item.id, status:'enabled'},
      });
    },
    onDisabled(item) {
      dispatch({
        type: 'carouselItems/edit',
        payload: {id: item.id, status:'disabled'},
      });
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/carousel_manage/carousel_items/carousel_item/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'carouselItems/delete',
        payload: id,
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'carouselItems/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'carouselItems/select',
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
function mapStateToProps({ carouselItems }) {
  return { carouselItems };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
