import { Button, Form, Input, message, Row, Col } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { useState } from "react";

type FieldType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const Register = () => {
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    if (values.password !== values.confirm_password) {
      setErrorPassword(true);
      messageApi.open({
        type: "warning",
        content: "Password and confirm password is not match",
      });
      return;
    }
    await axios
      .post("http://localhost:3000/api/register", values)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          messageApi.open({
            type: "success",
            content: response.data.message,
          });
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(error);
        messageApi.open({
          type: "success",
          content: error.message,
        });
      });
  };

  const onFinishFailed = (errorInfo: unknown) => {
    message.error("Please enter input field!");
    console.log("Failed:", errorInfo as string);
  };

  return (
    <>
      {contextHolder}
      <div className="container">
        <div className="register_container">
          <Form
            layout="vertical"
            className="form_card"
            style={{ maxWidth: 600 }}
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row gutter={[8, 8]}>
              <Col xs={24} xl={12}>
                <Form.Item<FieldType> label="first name" name="first_name" rules={[{ required: true, type: "string", message: "Please input your first name!" }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} xl={12}>
                <Form.Item<FieldType> label="last name" name="last_name" rules={[{ required: true, type: "string", message: "Please input your last name!" }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item<FieldType> label="email" name="email" rules={[{ required: true, type: "email", message: "Please input your email!" }]}>
              <Input />
            </Form.Item>
            <Form.Item<FieldType> label="password" name="password" rules={[{ required: true, type: "string", message: "Please input your password!" }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item<FieldType> label="confirm password" name="confirm_password" rules={[{ required: true, type: "string", message: "Please input confirm password!" }]}>
              <Input.Password status={errorPassword ? "warning" : ""} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
