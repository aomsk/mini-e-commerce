import React from "react";
import { Button, Form, Input } from "antd";
import "../styles/Login.css";
import { useAuthContext } from "../hooks/useAuthContext";

type FieldType = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { login } = useAuthContext();

  const onFinish = (values: FieldType) => {
    const { email, password } = values;
    login(email, password);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="container">
        <div className="form_ccontainer">
          <Form
            className="form_card"
            layout="vertical"
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, type: "email", message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType> label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 16, xs: 24, xl: 24 }}>
              <Button type="primary" block htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
