import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../../components/index/my_dashboard/my_info/user_credit_card/CForm';

function REdit({ dispatch, userCreditCards }) {
  const { curRecord, curAction } = userCreditCards;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `userCreditCards/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'userCreditCards/gotoList',
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
function mapStateToProps({ userCreditCards }) {
  return { userCreditCards };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);