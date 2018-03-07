import React from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip } from 'antd';
import sexMale from '../../../../../images/sex/male.png';
import sexFemale from '../../../../../images/sex/male.png';
import styles from '../../../../../styles/index/my_dashboard/my_info/UpdateAvatar.less';

const CView = ({
  item = {},
  gotoEdit,
}) => {
  function getAvatarUrl() {
    let resultValue = sexMale;
    if (item.avatar_url === null || item.avatar_url === undefined) {
      if (item.sex === null || item.sex === undefined) {
      } else if (item.sex === 'female') {
        resultValue = sexFemale;
      }
    } else {
      resultValue = item.avatar_url;
    }
    console.log(resultValue);
    return resultValue;
  }
  let avatarUrl = getAvatarUrl();
  return (
    <div className={styles.avatarLayout}>
      <Tooltip title="点击可以上传新的头像">
        <img src={avatarUrl} className={styles.avatar} onClick={gotoEdit}/>
      </Tooltip>
    </div>
  );
};

CView.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
};

export default Form.create()(CView);
