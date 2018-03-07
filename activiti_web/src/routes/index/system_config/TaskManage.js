import React from 'react';
import PropTypes from 'prop-types';

function TaskManage({ children }) {
  return (
    <div>{children}</div>
  );
}

TaskManage.propTypes = {
  children: PropTypes.object,
};

// 建立数据关联关系
export default TaskManage;