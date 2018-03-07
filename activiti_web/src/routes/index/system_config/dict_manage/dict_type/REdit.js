import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../../components/index/system_config/dict_manage/dict_type/CForm';

function REdit({ location, dispatch, dictTypes }) {
  const { curRecord, curAction } = dictTypes;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `dictTypes/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'dictTypes/gotoList',
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
function mapStateToProps({ dictTypes }) {
  return { dictTypes };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
