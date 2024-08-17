"use client";
import { Api } from "@/utils/Api";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const api = new Api()

  const handleEmailSubmit = async (values: { email: string }) => {
    debugger
    setLoading(true);
    setEmail(values.email);
    try {
      const payload = {
        email: values.email,
      }
      const response = await api.users.forgetEmail(payload)

      if (!response) {
        throw new Error(response.message || "Something went wrong");
      }
      setStep(2);
      message.success(response.message)
    } catch (error: any) {
        const errorMessage = error.message || "Something went wrong";
        console.log("onFinish error:", errorMessage);
        message.error(errorMessage);
    } finally{
        setLoading(false)
    }
  };

  const handleOtpSubmit = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        email: email,
        otp: values.otp,
        password: values.password,
      }
        const response = await api.users.verifyOtp(payload)
      
          if (!response) {
            throw new Error(response.message || "Something went wrong");
          }
          message.success(response.message)
          router.push("/login")
    } catch (error :any) {
        const errorMessage = error.message || "Something went wrong";
        console.log("onFinish error:", errorMessage);
        message.error(errorMessage);
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {step === 1 ? "Forgot Password" : "Verify OTP"}
        </h2>

        {step === 1 && (
          <Form name="email" onFinish={handleEmailSubmit} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Send OTP
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === 2 && (
          <Form name="otp" onFinish={handleOtpSubmit} layout="vertical">
            <Form.Item
              label="OTP"
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Please enter the OTP",
                },
                { len: 6, message: "OTP must be 6 digits long" },
              ]}
            >
              <Input placeholder="Enter OTP" />
            </Form.Item>

            <Form.Item
              label="New-Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                  message: "must be strong password! and min length 8",
                },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

              <span className="text-green-400 opacity-70">Check email : {email.slice(0,3)+"*****"+email.slice(10)}</span>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Verify OTP
              </Button>
            </Form.Item>

          </Form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
