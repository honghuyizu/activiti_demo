import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/system_config/dict_manage/dict/CTable';

function RList({ location, dispatch, dicts }) {
  const { loading, dataSource, total, pageSize, current, conditionName, curTypeId } = dicts;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: 'index/system_config/dict_manage/dicts',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: 'index/system_config/dict_manage/dicts',
        query: { page_number:current, page_size:pageSize, name:conditionName, type_id: curTypeId},
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: 'index/system_config/dict_manage/dicts/dict/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'dicts/delete',
        payload: id,
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'dicts/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'dicts/select',
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
function mapStateToProps({ dicts }) {
  return { dicts };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
