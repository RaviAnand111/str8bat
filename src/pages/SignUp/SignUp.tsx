import { Button, Input } from "antd";
import OpenLockIcon from "../../assets/Icons/OpenLockIcon";
import MailIcon from "../../assets/Icons/MailIcon";
import Form, { Rule } from "antd/es/form";
import UserIcon from "../../assets/Icons/UserIcon";

export default function SignUp() {
  const [form] = Form.useForm();

  const emailRules: Rule[] = [
    { required: true, message: "Please enter your email" },
    { type: "email", message: "Please enter a valid email" },
  ];

  const passwordRules: Rule[] = [
    { required: true, message: "Please enter your password" },
  ];
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    // Additional error handling logic can be added here
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-fit min-w-[25rem] px-16 py-20 rounded-2xl shadow-xl flex flex-col gap-8">
        <div className="flex justify-center">
          <img
            src="https://www.str8bat.com/cdn/shop/files/Logo.png?v=1677442424&width=500"
            alt="str8bat logo"
            width={150}
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl text-black font-bold">Create your account</h1>
          <p className="text-base text-gray-600">Fill details below to create a new account</p>
        </div>
        <Form
          form={form}
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ remember: true }}
        >
          <Form.Item name="name" rules={emailRules}>
            <Input prefix={<UserIcon />} placeholder="Name" size="large" />
          </Form.Item>
          <Form.Item name="email" rules={emailRules}>
            <Input prefix={<MailIcon />} placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item name="password" rules={passwordRules}>
            <Input.Password
              prefix={<OpenLockIcon />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full text-2xl font-bold mt-8 shadow-gray-300 shadow-2xl"
              style={{ padding: "25px 0" }}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        {/*<div className="relative">
          <hr
          className="my-4"
          style={{
            border: "none",
            height: "1px",
            backgroundImage:
              "repeating-linear-gradient(to right, #e0e0e0, #e0e0e0 8px, transparent 8px, transparent 18px)",
          }}
          />
          <p className="absolute left-[35%] top-1 bg-white w-fit px-2 text-base ">or login with</p>
          </div>*/}
      </div>
    </div>
  );
}
