import { message, Typography, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import url from '../../config';

const { Title, Text } = Typography;
const { Dragger } = Upload;

const draggerProps = {
  name: 'userExcel',
  multiple: false,
  action: url + '/user/batchAdd',
  onChange(info) {
    console.log(info);
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      if (info.file.response.success) {
        message.success(`${info.file.name} 添加用户成功`);
      } else {
        message.error(`${info.file.name} 添加用户失败`);
      }
    } else if (status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  },
};

class AddStaff extends Component {
  state = {};
  render() {
    return (
      <div className="add-staff">
        <Typography>
          <Title level={2}>添加员工</Title>
          <Text type="secondary">通过上传excel表格批量导入员工信息</Text>
        </Typography>
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
}

export default AddStaff;
