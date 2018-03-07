import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Pagination } from 'antd';

const CTable = ({
  total, current, pageSize, loading, dataSource,
  onPageChange,
  onShowSizeChange,
  onEdit,
  onDelete,
  onSelect,
})=>{
  const columns = [{
    title: '默认地址',
    dataIndex: 'default_flag',
    key: 'default_flag',
    width: '10%',
    render: (text, record) => (
      <span>
        <label>{record.default_flag === null || record.default_flag === undefined || record.default_flag !== 'true' ? '' : '√'}</label>
      </span>
    ),
  },{
    title: '收件人',
    dataIndex: 'recipient',
    key: 'recipient',
    width: '10%',
  },{
    title: '手机号码',
    dataIndex: 'mobile',
    key: 'mobile',
    width: '10%',
  },{
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    width: '40%',
    render: (text, record) => (
      <span>
        <label>{record.area_names + ', ' + record.address}</label>
      </span>
    ),
  },{
    title: '最后更新时间',
    dataIndex: 'last_update_date_time',
    key: 'last_update_date_time',
    width: '20%',
  },{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '10%',
    render: (text, record) => (
      <span>
        <a onClick={() => onEdit(record)}>编辑</a>
        <span className="ant-divider" />
        <Popconfirm title="确定要删除这条记录吗？" onConfirm={() => onDelete(record.id)}>
          <a href="#">删除</a>
        </Popconfirm>
      </span>
    ),
  }];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      let selectedKeys = [];
      for(let key in selectedRows) {
        selectedKeys.push(selectedRows[key].id);
      }
      console.log(`selectedKeys:  ${selectedKeys}`);
      onSelect(selectedKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        showSizeChanger
        total={total}
        pageSize = {pageSize}
        current={current}
        onChange={onPageChange}
        showTotal={total => `共 ${total} 条`}
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  );
};

CTable.prototype = {
  onPageChange: PropTypes.func,
  onShowSizeChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  pageSize: PropTypes.any,
  current: PropTypes.any,
};

export default CTable;
