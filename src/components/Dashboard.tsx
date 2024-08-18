"use client";
import {
  Card,
  Layout,
  Menu,
  Form,
  Input,
  Button,
  Table,
  Flex,
  message,
  Modal,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  EditTwoTone,
  DeleteTwoTone,
  UsergroupAddOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Api } from "@/utils/Api";
import moment from "moment";

const { Header, Sider, Content, Footer } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [leads, setLeads] = useState<any[]>([]);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const router = useRouter();
  const api = new Api();
  const [form] = Form.useForm();
  const [editId, setEditId] = useState("");

  const fetchData = async (id: string) => {
    setLoading(true);
    try {
      const data = await api.users.getById(id);
      console.log(data);
      if (!data) {
        throw new Error();
      }
      setData(data);
    } catch (error) {
      console.log(error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/login");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) {
        router.push("/login");
      } else {
        fetchData(userId);
        setUserId(userId);
      }
    }
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e: any) => {
    setSelectedMenuItem(e.key);
  };

  const handleFormSubmit = async (values: any) => {
    setLoading(true);
    await api.leads.create(userId, values);
    setLoading(false);
    message.success("created successful");
  };

  const fetchLeads = async () => {
    console.log(userId);

    const data = await api.leads.getMy(userId);
    setLeads(data);
  };

  const handleEdit = async (values: any, leadId: string) => {
    await api.leads.update(leadId, values);
    setModal2Open(false);
    fetchLeads();
    message.success("Update succesfully");
  };

  const handleDelete = async (id: string) => {
    await api.leads.delete(id);
    message.success("Delete succesfully");
    fetchLeads();
  };

  const columns = [
    {
      title: "Sr No.",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => moment(text).format("MMM DD YYYY")
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id: any, data: any, index: number) => (
        <Flex gap={10}>
          <EditTwoTone
            style={{ fontSize: "22px" }}
            onClick={() => {
              setModal2Open(true);
              setEditId(id);
            }}
          />
          <Modal
            title="Update lead"
            centered
            open={modal2Open}
            onOk={() => form.submit()}
            onCancel={() => setModal2Open(false)}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={(item) => handleEdit(item, editId)}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Number"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="products"
                label="Products"
                rules={[{ required: true, message: "Please select a product" }]}
              >
                <Select mode="multiple" placeholder="Select product(s)">
                  <Select.Option value="product A ">Product A</Select.Option>
                  <Select.Option value="product B ">Product B</Select.Option>
                  <Select.Option value="product C ">Product C</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
          <DeleteTwoTone
            twoToneColor={"red"}
            style={{ fontSize: "22px" }}
            onClick={() => handleDelete(id)}
          />
        </Flex>
      ),
    },
  ];

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "2":
        return (
          <Card loading={loading} className="h-full">
            <Form layout="vertical" onFinish={handleFormSubmit}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Number"
                name="phone"
                rules={[{ required: true, message: "Please enter number" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email ID"
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please enter email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="products"
                label="Products"
                rules={[{ required: true, message: "Please select a product" }]}
              >
                <Select mode="multiple" placeholder="Select product(s)">
                  <Select.Option value="product A ">Product A</Select.Option>
                  <Select.Option value="product B ">Product B</Select.Option>
                  <Select.Option value="product C ">Product C</Select.Option>
                </Select>
              </Form.Item>
              <Button type="primary" block htmlType="submit">
                Create Lead
              </Button>
            </Form>
          </Card>
        );
      case "3":
        return (
          <Card loading={loading} className="h-full">
            <Table dataSource={leads} columns={columns} />
          </Card>
        );
      default:
        return (
          <Card
            loading={loading}
            className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-center items-center"
          >
            <p className="text-2xl">Name - {data?.name || ""}</p>
            <p className="text-2xl">User-name - {data?.userName || ""}</p>
            <p className="text-2xl">Email - {data?.email || ""}</p>
          </Card>
        );
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
        <div className="h-16 bg-gray-800 flex items-center justify-center">
          <h2 className="text-white text-lg font-bold">
            {collapsed ? "DB" : "Dashboard"}
          </h2>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
            Create Lead
          </Menu.Item>
          <Menu.Item
            key="3"
            onClick={fetchLeads}
            icon={<RightCircleOutlined />}
          >
            Leads
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            <button onClick={handleLogout}>Logout</button>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="bg-white shadow-md flex justify-between items-center px-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="text-gray-600">
            Welcome - {" "}
            <span className="font-bold text-lg text-pink-500">
              {data?.userName.slice(0, 1).toUpperCase() +
                data?.userName.slice(1)}
            </span>
          </div>
        </Header>
        <Content className="p-6 bg-green-200">{renderContent()}</Content>
        <Footer className="text-center text-gray-600 bg-white">
          © 2024 Dashboard. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
