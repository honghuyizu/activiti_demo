import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Pagination, Icon } from 'antd';

const CTable = ({
  loading,
  dataSource,
  total,
  current,
  pageSize,
  onPageChange,
  onShowSizeChange,
  onEnabled,
  onDisabled,
  onEdit,
  onDelete,
  onSelect,
})=>{
  const columns = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: '10%',
  },{
    title: '代码',
    dataIndex: 'code',
    key: 'code',
    width: '10%',
  },{
    title: 'PC端图标',
    dataIndex: 'logo',
    key: 'logo',
    width: '10%',
  },{
    title: '移动端图标',
    dataIndex: 'logo_mobile',
    key: 'logo_mobile',
    width: '10%',
  },{
    title: '单笔限额',
    dataIndex: 'single_limit',
    key: 'single_limit',
    width: '10%',
  },{
    title: '单日限额',
    dataIndex: 'single_day_limit',
    key: 'single_day_limit',
    width: '10%',
  },{
    title: '单月限额',
    dataIndex: 'single_month_limit',
    key: 'single_month_limit',
    width: '10%',
  },{
    title: '类型',
    dataIndex: 'flag',
    key: 'flag',
    width: '10%',
  },{
    title: '状态',
    dataIndex: 'status_name',
    key: 'status_name',
    width: '10%',
    render: (text, record) => (
      <span>
        <span style={{ 'display': (record.status === 'disabled' ?  'inline' : 'none'), 'color': 'red', fontSize: 20 }}><Icon type="close-circle" /></span>
        <span style={{ 'display': (record.status === 'disabled' ?  'none' : 'inline'), 'color': 'green', fontSize: 20 }}><Icon type="check-circle" /></span>
      </span>
    ),
  },{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '10%',
    render: (text, record) => (
      <span>
        <a onClick={() => onEnabled(record)} style={{ 'display': (record.status !== 'enabled' ?  'inline' : 'none') }}>启用</a>
        <a onClick={() => onDisabled(record)} style={{ 'display': (record.status === 'enabled' ?  'inline' : 'none') }}>禁用</a>
        <span className="ant-divider" />
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
  onEnabled: PropTypes.func,
  onDisabled: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  pageSize: PropTypes.any,
  current: PropTypes.any,
};

export default CTable;
