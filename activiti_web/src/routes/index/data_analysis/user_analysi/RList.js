import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CTable from '../../../../components/index/data_analysis/user_analysi/CTable';

function RList({ dispatch, userAnalysis }) {
  const { sexData, ageData } = userAnalysis;

  const tableProps = {
    sexData,
    ageData,
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
function mapStateToProps({ userAnalysis }) {
  return { userAnalysis };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
