import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Popconfirm } from 'antd';

const CTree = ({
  loading,
  dataSource,
  onEdit,
  onAddChild,
  onDelete,
  onChangeOrderBy,
  onSelect,
}) => {
  const columns = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: '35%',
    render: (text, record) => (
      <span><Icon type={record.icon}/><span>&nbsp;&nbsp;&nbsp;{record.name + ((record.remark === null || record.remark === undefined || record.remark === "") ? "" : "（" + record.remark + "）")}</span></span>
    ),
  }, {
    title: '链接',
    dataIndex: 'link',
    key: 'link',
    width: '45%',
  }, {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '20%',
    render: (text, record) => (
      <span>
        <a onClick={() => onEdit(record)}>编辑</a>
        <span className="ant-divider" />
        <Popconfirm title="确定要删除选中的节点及其子节点吗？" onConfirm={()=>onDelete(record.id)}>
          <a>删除</a>
        </Popconfirm>
        <span className="ant-divider" />
        <a onClick={() => onAddChild(record)}>添加子节点</a>
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
    <Table columns={columns} rowSelection={rowSelection} dataSource={dataSource} defaultExpandAllRows={true} pagination={false} loading={loading}/>
  );
};

CTree.propTypes = {
  dataSource: PropTypes.array,
};

export default CTree;
