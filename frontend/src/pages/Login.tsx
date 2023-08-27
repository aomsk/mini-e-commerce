import React from "react";
import { Button, Form, Input, message } from "antd";
import Navbar from "../components/Navbar";
import "../styles/Login.css";
import axios from "axios";

type FieldType = {
  email?: string;
  password?: string;
};

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: FieldType) => {
    await axios
      .post("http://localhost:3000/api/login", values)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          messageApi.open({
            type: "success",
            content: response.data.message,
          });
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        messageApi.open({
          type: "error",
          content: error.response.data.message,
        });
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Navbar />
      {contextHolder}
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
            autoComplete="off"
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
