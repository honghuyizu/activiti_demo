import React from 'react';
import PropTypes from 'prop-types';

function AreaManage({ children }) {
  return (
    <div>{children}</div>
  );
}

AreaManage.propTypes = {
  children: PropTypes.object,
};

// 建立数据关联关系
export default AreaManage;
