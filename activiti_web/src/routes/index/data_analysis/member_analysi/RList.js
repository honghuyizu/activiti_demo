import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CTable from '../../../../components/index/data_analysis/member_analysi/CTable';

function RList({ dispatch, memberAnalysis }) {
  const { sexData, ageData } = memberAnalysis;

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
function mapStateToProps({ memberAnalysis }) {
  return { memberAnalysis };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
