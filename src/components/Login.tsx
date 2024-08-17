"use client";
import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const response = await fetch("https://auth-assignment-nestjs.vercel.app/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: values.username,
          password: values.password,
        }),
      });

      const apiRes = await response.json();

      if (!response.ok) {
        throw new Error(apiRes.message || "Something went wrong");
      }

      const userId = apiRes._id;
      localStorage.setItem("userId", userId);

      message.success("Login successfully");
      router.push("/");
    } catch (error: any) {
      const errorMessage = error.message || "Something went wrong";
      console.log("onFinish error:", errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>

          <div className="flex justify-between items-center">
            <Link href="/forgetpassword">
              <span className="text-blue-500 hover:text-blue-700">
                Forgot Password?
              </span>
            </Link>
            <Link href="/signup">
              <span className="text-blue-500 hover:text-blue-700">
                Switch to Signup
              </span>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
