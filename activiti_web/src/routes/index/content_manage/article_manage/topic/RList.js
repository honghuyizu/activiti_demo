import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/content_manage/article_manage/topic/CTable';

function RList({ dispatch, topics }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = topics;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/article_manage/topics',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/article_manage/topics',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/article_manage/topics/topic/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'topics/delete',
        payload: id,
      });
    },
    gotoChildList(id) {
      dispatch(routerRedux.push({
        pathname: 'index/content_manage/article_manage/articles?topic_id=' + id,
      }));
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'topics/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'topics/select',
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
function mapStateToProps({ topics }) {
  return { topics };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
