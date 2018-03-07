import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from '../../../../../components/index/system_config/dict_manage/dict_type/CTable';

function RList({ location, dispatch, dictTypes }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = dictTypes;

  const tableProps = {
    dataSource: dataSource,
    loading,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch(routerRedux.push({
        pathname: 'index/system_config/dict_manage/dict_types',
        query: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      }));
    },
    onShowSizeChange(current, pageSize) {
      dispatch(routerRedux.push({
        pathname: 'index/system_config/dict_manage/dict_types',
        query: { page_number:current, page_size:pageSize, name:conditionName},
      }));
    },
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: 'index/system_config/dict_manage/dict_types/dict_type/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'dictTypes/delete',
        payload: id,
      });
    },
    gotoChildList(id) {
      dispatch(routerRedux.push({
        pathname: 'index/system_config/dict_manage/dicts?type_id=' + id,
      }));
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'dictTypes/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'dictTypes/select',
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
function mapStateToProps({ dictTypes }) {
  return { dictTypes };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
