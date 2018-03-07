import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTree from '../../../../../components/index/system_config/area_manage/province/CTree';

function RList({ location, dispatch, provinces }) {
  const { loading, dataSource } = provinces;

  const treeProps = {
    loading,
    dataSource,
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: 'index/system_config/area_manage/provinces/province/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'provinces/delete',
        payload: id,
      });
    },
    gotoChildList(id) {
      dispatch(routerRedux.push({
        pathname: 'index/system_config/area_manage/cities_and_counties?parent_id=' + id,
      }));
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'provinces/changeOrderBy',
        payload: {
          id: record.key,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'provinces/select',
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
function mapStateToProps({ provinces }) {
  return { provinces };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
