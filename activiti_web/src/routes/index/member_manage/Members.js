import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import CAction from '../../../components/index/member_manage/member/CAction';
import CSearch from '../../../components/index/member_manage/member/CSearch';
import styles from '../../../styles/util/ListLayout.less';
import * as projectUtil from '../../../utils/rbacProjectUtil';

function Members({ children, dispatch, members }) {
  const { curActionName, actionBarVisible, selectedRowKeys, conditionName, current, pageSize, levelDataSource, curLevelID } = members;
  const actionProps = {
    gotoAdd() {
      dispatch(routerRedux.push({
        pathname: 'index/member_manage/members/add?level_id=' + curLevelID,
      }));
    },
    gotoDeleteBatch() {
      if (selectedRowKeys === undefined || selectedRowKeys === null || selectedRowKeys.length === 0) {
        message.info('请至少选中一条您想删除的记录')
      } else {
        dispatch({
          type: 'members/deleteBatch',
          payload: selectedRowKeys,
        });
      }
    },
  };
  const searchProps = {
    itemArray: levelDataSource,
    curItemKey: curLevelID + '',
    name: conditionName,
    onTabClick(key) {
      dispatch(routerRedux.push({
        pathname: 'index/member_manage/members?level_id=' + key  + "&name=" + conditionName,
      }));
    },
    onSearch(fieldsValue) {
      dispatch({
        type: 'members/initList',
        payload: { ...fieldsValue, level_id: curLevelID, pageNumber: current, pageSize: pageSize },
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

Members.propTypes = {
  members: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ members }) {
  return { members };
}

// 建立数据关联关系
export default connect(mapStateToProps)(Members);
