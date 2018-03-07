import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/content_manage/article_manage/article/CTable';

function RList({ dispatch, articles }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = articles;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/article_manage/articles',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/article_manage/articles',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEnabled(item) {
      dispatch({
        type: 'articles/edit',
        payload: {id: item.id, status:'enabled'},
      });
    },
    onDisabled(item) {
      dispatch({
        type: 'articles/edit',
        payload: {id: item.id, status:'disabled'},
      });
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/article_manage/articles/article/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'articles/delete',
        payload: id,
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'articles/select',
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
function mapStateToProps({ articles }) {
  return { articles };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
