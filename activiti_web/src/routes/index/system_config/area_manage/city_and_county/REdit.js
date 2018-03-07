import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../../components/index/system_config/area_manage/city_and_county/CForm';

function REdit({ location, dispatch, citiesAndCounties }) {
  const { curRecord, curAction, areaDataSource } = citiesAndCounties;

  const formProps = {
    item: curRecord,
    dataSource: areaDataSource,
    onSubmit(data) {
      dispatch({
        type: `citiesAndCounties/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'citiesAndCounties/gotoList',
      });
    },
  };
  return (
    <CForm {...formProps} />
  );
}

REdit.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ citiesAndCounties }) {
  return { citiesAndCounties };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
