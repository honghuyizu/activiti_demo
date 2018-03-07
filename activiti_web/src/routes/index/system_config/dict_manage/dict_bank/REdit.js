import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../../components/index/system_config/dict_manage/dict_bank/CForm';

function REdit({ dispatch, dictBanks }) {
  const { curRecord, curAction } = dictBanks;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `dictBanks/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'dictBanks/gotoList',
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
function mapStateToProps({ dictBanks }) {
  return { dictBanks };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);