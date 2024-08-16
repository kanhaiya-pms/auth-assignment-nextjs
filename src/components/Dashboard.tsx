"use client"
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
        <div className="h-16 bg-gray-800 flex items-center justify-center">
          <h2 className="text-white text-lg font-bold">
            {collapsed ? 'DB' : 'Dashboard'}
          </h2>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<LogoutOutlined />}>
            <a href="/login">Logout</a>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="bg-white shadow-md flex justify-between items-center px-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="text-gray-600">Welcome, User</div>
        </Header>
        <Content className="p-6 bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Dashboard Content</h3>
            <p className="mt-4 text-gray-600">This is where your main content will go.</p>
          </div>
        </Content>
        <Footer className="text-center text-gray-600 bg-white">
          © 2024 Dashboard. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
