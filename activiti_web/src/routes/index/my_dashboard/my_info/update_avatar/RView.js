import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CView from '../../../../../components/index/my_dashboard/my_info/update_avatar/CView';

function RView({ dispatch, updateAvatar }) {
  const { curRecord } = updateAvatar;

  const viewProps = {
    item: curRecord,
    gotoEdit() {
      dispatch(routerRedux.push({
        pathname: '/index/my_dashboard/my_info/update_avatar/edit',
      }));
    },
  };
  return (
    <CView {...viewProps} />
  );
}

RView.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ updateAvatar }) {
  return { updateAvatar };
};

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
