import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../components/index/member_manage/level/CTable';

function RList({ dispatch, levels }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = levels;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: 'index/member_manage/levels',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: 'index/member_manage/levels',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: 'index/member_manage/levels/level/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'levels/delete',
        payload: id,
      });
    },
    gotoChildList(id) {
      dispatch(routerRedux.push({
        pathname: 'index/member_manage/members?level_id=' + id,
      }));
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'levels/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'levels/select',
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
function mapStateToProps({ levels }) {
  return { levels };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
