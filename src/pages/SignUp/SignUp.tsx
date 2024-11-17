import { Button, Input, message } from "antd";
import OpenLockIcon from "../../assets/Icons/OpenLockIcon";
import MailIcon from "../../assets/Icons/MailIcon";
import Form, { Rule } from "antd/es/form";
import UserIcon from "../../assets/Icons/UserIcon";
import { emailRules, nameRules, passwordRules } from "../../utils/formRules";
import { useState } from "react";
import { CommonResponse } from "../../utils/types";
import CheckBadge from "../../assets/Icons/CheckBadge";
import { baseUrl } from "../../utils/baseUrl";
import { errorAlert, successAlert } from "../../utils/alerts";

export default function SignUp() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [verificationSent, setVerificationSent] = useState(false);

  const onFinish = async (values: any) => {
    try {
      const signup = await fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const signupData: CommonResponse = await signup.json();

      // if user is created ask user to verify the email from the link in mailbox
      if (signupData?.statusCode === 200) {
        setVerificationSent(true);
        successAlert(messageApi ,"Sign up successfull")
      } else {
        throw new Error(signupData?.error);
      }
    } catch (error: Error | any) {
      errorAlert(messageApi, error?.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    // Additional error handling logic can be added here
  };
  return (
    <>
    {/* Context for message api */}
      {contextHolder}

      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[80%] md:w-fit md:min-w-[25rem] px-5 md:px-16 py-20 rounded-2xl shadow-xl flex flex-col gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          {verificationSent ? (
            <div className="text-center flex flex-col gap-2">
              <CheckBadge classnames={"size-12 flex mx-auto"} />
              <h1 className="text-2xl text-black font-bold flex items-center gap-2 md:whitespace-nowrap text-center mx-auto ">
                Verification sent on your email
              </h1>
              <p className="text-base text-gray-600">
                Please verify your email by clicking on the link sent on your
                mail
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-center">
                <img
                  src="https://www.str8bat.com/cdn/shop/files/Logo.png?v=1677442424&width=500"
                  alt="str8bat logo"
                  width={150}
                />
              </div>
              <div className="text-center">
                <h1 className="text-2xl text-black font-bold">
                  Create your account
                </h1>
                <p className="text-base text-gray-600">
                  Fill details below to create a new account
                </p>
              </div>
              <Form
                form={form}
                name="loginForm"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}
              >
                <Form.Item name="name" rules={nameRules}>
                  <Input
                    prefix={<UserIcon />}
                    placeholder="Name"
                    size="large"
                  />
                </Form.Item>
                <Form.Item name="email" rules={emailRules}>
                  <Input
                    prefix={<MailIcon />}
                    placeholder="Email"
                    size="large"
                  />
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
            </>
          )}
        </div>
      </div>
    </>
  );
}
