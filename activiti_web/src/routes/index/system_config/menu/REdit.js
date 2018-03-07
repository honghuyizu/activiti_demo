import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../../components/index/system_config/menu/CForm';

function REdit({ location, dispatch, menus }) {
  const { curRecord, curAction, selectIconModalVisible, dataSource } = menus;

  const formProps = {
    item: curRecord,
    dataSource: dataSource,
    selectIconModalVisible: selectIconModalVisible,
    onSubmit(data) {
      dispatch({
        type: `menus/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'menus/gotoList',
      });
    },
    onSelectIcon() {
      dispatch({
        type: 'menus/showSelectIconModal',
      });
    },
    onOkSelectIconModal() {
      console.log("onOkSelectIconModal");
      dispatch({
        type: 'menus/hideSelectIconModal',
      });
    },
    onCancelSelectIconModal() {
      dispatch({
        type: 'menus/hideSelectIconModal',
      });
    },
    onItemClickSelectIconModal(type) {
      let item = curRecord;
      item.icon = type;
      //console.log("onItemClickSelectIconModal, item = " + item);
      dispatch({
        type: 'menus/hideSelectIconModal',
        payload: item,
      });
    }
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
function mapStateToProps({ menus }) {
  return { menus };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
