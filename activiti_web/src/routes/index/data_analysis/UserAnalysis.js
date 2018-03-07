import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { message } from 'antd';
import CSearch from '../../../components/index/data_analysis/user_analysi/CSearch';
import styles from '../../../styles/util/ListLayout.less';
import * as projectUtil from '../../../utils/rbacProjectUtil';

function MemberAnalysis({ children, dispatch, userAnalysis }) {
  const { curActionName, actionBarVisible, beginDT, endDT } = userAnalysis;
  const searchProps = {
    beginDT,
    endDT,
    onSearch(fieldsValue) {
      dispatch({
        type: 'userAnalysis/initData',
        payload: { ...fieldsValue },
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

MemberAnalysis.propTypes = {
  userAnalysis: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ userAnalysis }) {
  return { userAnalysis };
}

// 建立数据关联关系
export default connect(mapStateToProps)(MemberAnalysis);
