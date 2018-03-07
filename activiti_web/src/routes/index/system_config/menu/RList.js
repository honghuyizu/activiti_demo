import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTree from '../../../../components/index/system_config/menu/CTree';

function RList({ location, dispatch, menus }) {
  const { loading, dataSource } = menus;

  const treeProps = {
    loading,
    dataSource,
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: 'index/system_config/menus/menu/' + id,
      }));
    },
    onAddChild(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: 'index/system_config/menus/add?parent_id=' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'menus/delete',
        payload: id,
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'menus/changeOrderBy',
        payload: {
          id: record.key,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'menus/select',
        payload: selectedRowKeys,
      });
    }
  };

  return (
    <CTree {...treeProps}/>
  );
}

RList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ menus }) {
  return { menus };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
