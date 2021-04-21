// 导入 react
import React, { Component } from 'react';
// 导入 antd 组件
import { Form, Input, Button, Checkbox } from 'antd';
// 导入 redux store
import store from '../../store';
// 导入样式文件
import './style.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    // 初始化 state
    this.state = store.getState();
  }
  render() {
    return (
      <div className="login">
        {/* 登录框 */}
        <div className="box">
          {/* 登录表单 */}
          <Form>
            {/* 用户名 */}
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名！' }]}
            >
              <Input />
            </Form.Item>
            {/* 密码 */}
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入用户名！' }]}
            >
              <Input.Password />
            </Form.Item>
            {/* 保持登录状态 */}
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            {/* 登录按钮 */}
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick="handleLogin">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
