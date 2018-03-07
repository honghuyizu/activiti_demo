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
  onChangeOrderBy,
  onSelect,
})=>{
  function imageHandler(record) {
    if (record && record.image_url !== null && record.image_url !== undefined) {
      return <img style={{height: 50, width: 50}} src={record.image_url}/>;
    } else {
      return "";
    }
  }

  const columns = [{
    title: '广告图',
    dataIndex: 'image_path_name',
    key: 'image_path_name',
    width: '5%',
    render: (text, record) => (
      <div>
        {imageHandler(record)}
      </div>
    ),
  },{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: '10%',
  },{
    title: '目标链接',
    dataIndex: 'target_url',
    key: 'target_url',
    width: '20%',
  },{
    title: '适用终端',
    dataIndex: 'client_types',
    key: 'client_types',
    width: '10%',
  },{
    title: '开始日期时间',
    dataIndex: 'begin_date_time',
    key: 'begin_date_time',
    width: '15%',
  },{
    title: '截止日期时间',
    dataIndex: 'end_date_time',
    key: 'end_date_time',
    width: '15%',
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
        <a onClick={()=>onChangeOrderBy(record, 'up')}>上移</a>
        <span className="ant-divider" />
        <a onClick={()=>onChangeOrderBy(record, 'down')}>下移</a>
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
