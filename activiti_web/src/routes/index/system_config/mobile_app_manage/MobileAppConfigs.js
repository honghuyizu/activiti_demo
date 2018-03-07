import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import CAction from '../../../../components/index/system_config/mobile_app_manage/mobile_app_config/CAction';
import CSearch from '../../../../components/index/system_config/mobile_app_manage/mobile_app_config/CSearch';
import styles from '../../../../styles/util/ListLayout.less';
import * as projectUtil from '../../../../utils/rbacProjectUtil';

function MobileAppConfigs({ children, dispatch, mobileAppConfigs }) {
  const { curActionName, actionBarVisible, curMobileAppID, mobileAppDataSource, current, pageSize, selectedRowKeys } = mobileAppConfigs;
  const actionProps = {
    gotoAdd() {
      dispatch(routerRedux.push({
        pathname: 'index/system_config/mobile_app_manage/mobile_app_configs/add?mobile_app_id=' + curMobileAppID,
      }));
    },
    gotoDeleteBatch() {
      if (selectedRowKeys === undefined || selectedRowKeys === null || selectedRowKeys.length === 0) {
        message.info('请至少选中一条您想删除的记录');
      } else {
        dispatch({
          type: 'mobileAppConfigs/deleteBatch',
          payload: selectedRowKeys,
        });
      }
    },
  };
  const searchProps = {
    curMobileAppID,
    mobileAppDataSource,
    onSearch(fieldsValue) {
      dispatch({
        type: 'mobileAppConfigs/initList',
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

MobileAppConfigs.propTypes = {
  mobileAppConfigs: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ mobileAppConfigs }) {
  return { mobileAppConfigs };
}

// 建立数据关联关系
export default connect(mapStateToProps)(MobileAppConfigs);
