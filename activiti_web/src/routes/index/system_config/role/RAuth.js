import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message } from 'antd';
import CAuth from '../../../../components/index/system_config/role/CAuth';

function RAuth({ dispatch, roles }) {
  const { curRecord, menuTreeDataSource, selectedMenuIds, expandedMenuIds, autoExpandParent, searchValue, } = roles;

  const authProps = {
    item: curRecord,
    checkedKeys: selectedMenuIds,
    expandedKeys: expandedMenuIds,
    autoExpandParent,
    searchValue,
    dataSource: menuTreeDataSource,
    onSave() {
      if (selectedMenuIds === undefined || selectedMenuIds === null || selectedMenuIds.length === 0) {
        message.info('请至少选中一个菜单');
      } else {
        dispatch({
          type: 'roles/edit',
          payload: { id: curRecord.id, menu_ids: selectedMenuIds.toString() },
        });
      }
    },
    onCancel() {
      dispatch({
        type: 'roles/gotoList',
      });
    },
    onCheck(info) {
      dispatch({
        type: 'roles/selectMenus',
        payload: info,
      });
    },
    onExpand(expandedKeys) {
      dispatch({
        type: 'roles/setValue',
        payload: {expandedMenuIds: expandedKeys, autoExpandParent: false},
      });
    },
    onChange(expandedKeys, searchValue, autoExpandParent) {
      dispatch({
        type: 'roles/setValue',
        payload: {expandedMenuIds: expandedKeys, searchValue, autoExpandParent},
      });
    },
  };
  return (
    <CAuth {...authProps} />
  );
}

RAuth.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ roles }) {
  return { roles };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAuth);
