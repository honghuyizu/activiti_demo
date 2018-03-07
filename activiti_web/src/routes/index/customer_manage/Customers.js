import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import CAction from '../../../components/index/customer_manage/customer/CAction';
import CSearch from '../../../components/index/customer_manage/customer/CSearch';
import styles from '../../../styles/util/ListLayout.less';
import * as projectUtil from '../../../utils/rbacProjectUtil';

function Customers({ children, dispatch, customers }) {
  const { curActionName, actionBarVisible, conditionName, current, pageSize, selectedRowKeys, groupDataSource, curGroupID } = customers;
  const actionProps = {
    gotoAdd() {
      dispatch(routerRedux.push({
        pathname: 'index/customer_manage/customers/add?group_id=' + curGroupID,
      }));
    },
    gotoDeleteBatch() {
      if (selectedRowKeys === undefined || selectedRowKeys === null || selectedRowKeys.length === 0) {
        message.info('请至少选中一条您想删除的记录');
      } else {
        dispatch({
          type: 'customers/deleteBatch',
          payload: selectedRowKeys,
        });
      }
    },
  };
  const searchProps = {
    itemArray: groupDataSource,
    curItemKey: curGroupID + '',
    name: conditionName,
    onTabClick(key) {
      dispatch(routerRedux.push({
        pathname: 'index/customer_manage/customers?group_id=' + key  + "&name=" + conditionName,
      }));
    },
    onSearch(fieldsValue) {
      dispatch({
        type: 'customers/initList',
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

Customers.propTypes = {
  customers: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ customers }) {
  return { customers };
}

// 建立数据关联关系
export default connect(mapStateToProps)(Customers);
