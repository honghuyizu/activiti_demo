import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../../components/index/system_config/dict_manage/dict/CForm';

function REdit({ location, dispatch, dicts }) {
  const { curRecord, curAction, typeDataSource, curTypeId } = dicts;

  const formProps = {
    item: curRecord,
    typeDataSource: typeDataSource,
    onSubmit(data) {
      dispatch({
        type: `dicts/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'dicts/gotoList',
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
function mapStateToProps({ dicts }) {
  return { dicts };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
