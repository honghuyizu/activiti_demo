import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { message } from 'antd';
import CAction from '../../../../components/index/system_config/mobile_app_manage/mobile_app/CAction';
import CSearch from '../../../../components/index/system_config/mobile_app_manage/mobile_app/CSearch';
import styles from '../../../../styles/util/ListLayout.less';
import * as projectUtil from '../../../../utils/rbacProjectUtil';

function MobileApps({ children, dispatch, mobileApps }) {
  const { curActionName, actionBarVisible, conditionName, conditionCode, current, pageSize, selectedRowKeys } = mobileApps;
  const actionProps = {
    gotoAdd() {
      dispatch({
        type: 'mobileApps/gotoAdd',
      });
    },
    gotoDeleteBatch() {
      if (selectedRowKeys === undefined || selectedRowKeys === null || selectedRowKeys.length === 0) {
        message.info('请至少选中一条您想删除的记录');
      } else {
        dispatch({
          type: 'mobileApps/deleteBatch',
          payload: selectedRowKeys,
        });
      }
    },
  };
  const searchProps = {
    name: conditionName,
    onSearch(fieldsValue) {
      dispatch({
        type: 'mobileApps/initList',
        payload: { ...fieldsValue, page_number:current, page_size:pageSize },
      });
    },
  };
  return (
    <div className={styles.listLayout}>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.titleBar}>
            <h3>
              <Link to={ projectUtil.getCurMenuLink() }>{ projectUtil.getCurMenuName() }</Link>
              <label>{curActionName === '' ? '' : ' -- ' + curActionName}</label>
            </h3>
          </div>
          <div className={styles.actionBar} style={{ 'display': (actionBarVisible === true  ?  'inline' : 'none') }}>
            <CAction {...actionProps}/>
          </div>
        </div>
      </div>
      <div style={{ 'display': (actionBarVisible === true  ?  'inline' : 'none') }}>
        <CSearch {...searchProps}/>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {children}
        </div>
      </div>
    </div>
  );
}

MobileApps.propTypes = {
  mobileApps: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ mobileApps }) {
  return { mobileApps };
}

// 建立数据关联关系
export default connect(mapStateToProps)(MobileApps);