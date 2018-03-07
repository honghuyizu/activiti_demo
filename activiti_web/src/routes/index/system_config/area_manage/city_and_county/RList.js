import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTree from '../../../../../components/index/system_config/area_manage/city_and_county/CTree';

function RList({ location, dispatch, citiesAndCounties }) {
  const { loading, dataSource } = citiesAndCounties;

  const treeProps = {
    loading,
    dataSource,
    onEdit(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: 'index/system_config/area_manage/cities_and_counties/city_and_county/' + id,
      }));
    },
    onAddChild(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: 'index/system_config/area_manage/cities_and_counties/add?parent_id=' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'citiesAndCounties/delete',
        payload: id,
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'citiesAndCounties/changeOrderBy',
        payload: {
          id: record.key,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'citiesAndCounties/select',
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
function mapStateToProps({ citiesAndCounties }) {
  return { citiesAndCounties };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
