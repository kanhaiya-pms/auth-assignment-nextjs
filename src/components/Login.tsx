"use client";
import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Api } from "@/utils/Api";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const api = new Api();
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");

  function generateCaptcha() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const length = 6; 
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  const onFinish = async (values: any) => {
    if (captcha !== values.captcha) {
      message.error("Incorrect captcha!")
      setCaptcha(generateCaptcha())
      return 
    }
    setLoading(true);

    try {
      const payload = {
        userName: values.username,
        password: values.password,
      };
      const response = await api.users.login(payload);

      if (!response) {
        throw new Error(response.message || "Something went wrong");
      }

      const userId = response._id;
      localStorage.setItem("userId", userId);

      message.success("Login successfully");
      router.push("/dashboard");
    } catch (error: any) {
      const errorMessage = error.message || "Something went wrong";
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

          <Form.Item
            label={`Please enter the following text: ${captcha}`}
            name="captcha"
            rules={[{ required: true, message: "Please enter the captcha" }]}
          >
            <Input
              placeholder="Enter the captcha"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
            />
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
