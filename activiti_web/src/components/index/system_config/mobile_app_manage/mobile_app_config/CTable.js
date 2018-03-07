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
    title: '应用',
    dataIndex: 'mobile_app_name',
    key: 'mobile_app_name',
    width: '10%',
  },{
    title: '版本',
    dataIndex: 'version',
    key: 'version',
    width: '10%',
  },{
    title: '强制更新',
    dataIndex: 'forced_update_flag',
    key: 'forced_update_flag',
    width: '8%',
    render: (text, record) => (
      <span>
        <span style={{ 'display': (record.forced_update_flag === 'true' ?  'inline' : 'none'), 'color': 'green', fontSize: 20 }}><Icon type="check-square-o" /></span>
        <span style={{ 'display': (record.forced_update_flag === 'true' ?  'none' : 'inline'), 'color': 'red', fontSize: 20  }}><Icon type="close-square-o" /></span>
      </span>
    ),
  },{
    title: '下载链接',
    dataIndex: 'download_url',
    key: 'download_url',
    width: '25%',
  },{
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: '8%',
  },{
    title: '文件大小',
    dataIndex: 'file_size',
    key: 'file_size',
    width: '10%',
  },{
    title: '最后更新时间',
    dataIndex: 'last_update_date_time',
    key: 'last_update_date_time',
    width: '14%',
  },{
    title: '状态',
    dataIndex: 'status_name',
    key: 'status_name',
    width: '5%',
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
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  pageSize: PropTypes.any,
  current: PropTypes.any,
};

export default CTable;
