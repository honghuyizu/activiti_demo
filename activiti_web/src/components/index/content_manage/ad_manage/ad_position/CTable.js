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
  gotoChildList,
})=>{
  const columns = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: '30%',
  },{
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: '25%',
  },{
    title: '最后更新时间',
    dataIndex: 'last_update_date_time',
    key: 'last_update_date_time',
    width: '15%',
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
    width: '20%',
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
        <span className="ant-divider" />
        <a onClick={() => gotoChildList(record.id)}>广告列表</a>
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
  gotoChildList: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  pageSize: PropTypes.any,
  current: PropTypes.any,
};

export default CTable;
