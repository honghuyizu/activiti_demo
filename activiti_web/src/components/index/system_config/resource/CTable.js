import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Pagination } from 'antd';

const CTable = ({
  loading,
  dataSource,
  total,
  current,
  pageSize,
  onPageChange,
  onShowSizeChange,
  onDelete,
  onSelect,
})=>{
  const columns = [{
    title: '上传日期',
    dataIndex: 'create_date',
    key: 'create_date',
    width: '10%',
  },{
    title: '文件名称',
    dataIndex: 'new_file_name',
    key: 'new_file_name',
    width: '25%',
  },{
    title: '文件链接',
    dataIndex: 'file_url',
    key: 'file_url',
    width: '55%',
    render: (text, record) => (
      <span>
          <a target="_blank" href={record.file_url}>{record.file_url}</a>
      </span>
    ),
  },{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '10%',
    render: (text, record) => (
      <span>
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
  onDelete: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  pageSize: PropTypes.any,
  current: PropTypes.any,
};

export default CTable;
