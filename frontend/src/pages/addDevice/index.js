// 导入 antd 组件
import { message, Typography, Upload } from 'antd';
// 导入 antd 图标
import { InboxOutlined } from '@ant-design/icons';
// 导入 React
import React, { Component } from 'react';
// 导入请求链接地址
import url from '../../config';

const { Title, Text } = Typography;
const { Dragger } = Upload;

// 上传文件组件配置
const draggerProps = {
  name: 'deviceExcel',
  multiple: false,
  action: url + '/device/batchAdd',
  onChange(info) {
    const { status } = info.file;
    if (status === 'done') {
      console.log(info);
      if (info.file.response.success) {
        message.success(`${info.file.name} 添加设备成功！`);
      } else {
        message.error(`${info.file.name} 添加设备失败！`);
      }
    } else if (status === 'error') {
      message.error(`${info.file.name} 文件上传失败！`);
    }
  },
};

class AddDevice extends Component {
  state = {};
  render() {
    return (
      <div className="add-device">
        {/* 页面标题 */}
        <Typography>
          <Title level={2}>添加设备</Title>
          <Text type="secondary">通过上传excel表格批量导入设备</Text>
        </Typography>
        {/* 拖动上传组件 */}
        <Dragger
          {...draggerProps}
          accept=".xlsx,.xls"
          height="400px"
          maxCount={1}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到这里进行上传</p>
          <p className="ant-upload-hint">
            仅支持上传指定格式的 .xlsx 或 .xls 文件
          </p>
        </Dragger>
      </div>
    );
  }

  handleUploadFile() {}
}

export default AddDevice;
