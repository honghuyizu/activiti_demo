import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../components/index/member_manage/member/CTable';

function RList({ location, dispatch, members }) {
  const { loading, dataSource, total, pageSize, current, conditionName, curLevelID } = members;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: 'index/member_manage/members',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: 'index/member_manage/members',
        query: { page_number:current, page_size:pageSize, name:conditionName, level_id: curLevelID},
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: 'index/member_manage/members/member/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'members/delete',
        payload: id,
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'members/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'members/select',
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
function mapStateToProps({ members }) {
  return { members };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
