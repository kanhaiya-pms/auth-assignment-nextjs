"use client";
import { Card, Layout, Menu } from "antd";
import { useEffect, useLayoutEffect, useState } from "react";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import {  useRouter } from "next/navigation";

const { Header, Sider, Content, Footer } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const id = localStorage.getItem("userId")

  

  const fetchData = async () =>{
    setLoading(true)
   try {
    const api = await fetch(`https://auth-assignment-nestjs.vercel.app/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const apiRes = await api.json()
    console.log(apiRes);
    if (!api.ok) {
      throw new Error()
    }
    setData(apiRes)
   } catch (error) {
    console.log(error);
    router.push("/login");
    
   } finally {
    setLoading(false)
   }
  }


  const handelLogout = () => {
    localStorage.removeItem("userId");
    router.push("/login");
  }

  useEffect(()=>{
    if (!id) {
      router.push("/login");
    }
    fetchData();
  },[])

  

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
        <div className="h-16 bg-gray-800 flex items-center justify-center">
          <h2 className="text-white text-lg font-bold">
            {collapsed ? "DB" : "Dashboard"}
          </h2>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<LogoutOutlined />}>
            <button onClick={handelLogout}>Logout</button>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="bg-white shadow-md flex justify-between items-center px-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="text-gray-600">Welcome, User</div>
        </Header>
        <Content className="p-6 bg-green-200">
          <Card loading={loading} className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-center items-center">
            <p className="text-2xl">Name - {data?.name || ""}</p>
            <p className="text-2xl">User-name - {data?.userName || ""}</p>
            <p className="text-2xl">Email - {data?.email || ""}</p>
          </Card>
        </Content>
        <Footer className="text-center text-gray-600 bg-white">
          © 2024 Dashboard. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
