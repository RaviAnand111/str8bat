import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Input, message } from "antd";
import OpenLockIcon from "../../assets/Icons/OpenLockIcon";
import MailIcon from "../../assets/Icons/MailIcon";
import Form from "antd/es/form";
import UserIcon from "../../assets/Icons/UserIcon";
import { emailRules, nameRules, passwordRules } from "../../utils/formRules";
import { useState } from "react";
import CheckBadge from "../../assets/Icons/CheckBadge";
import { baseUrl } from "../../utils/baseUrl";
import { errorAlert, successAlert } from "../../utils/alerts";
export default function SignUp() {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [verificationSent, setVerificationSent] = useState(false);
    const onFinish = async (values) => {
        try {
            const signup = await fetch(`${baseUrl}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const signupData = await signup.json();
            // if user is created ask user to verify the email from the link in mailbox
            if (signupData?.statusCode === 200) {
                setVerificationSent(true);
                successAlert(messageApi, "Sign up successfull");
            }
            else {
                throw new Error(signupData?.error);
            }
        }
        catch (error) {
            errorAlert(messageApi, error?.message);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        // Additional error handling logic can be added here
    };
    return (_jsxs(_Fragment, { children: [contextHolder, _jsx("div", { className: "w-full h-full flex justify-center items-center", children: _jsx("div", { className: "w-[80%] md:w-fit md:min-w-[25rem] px-5 md:px-16 py-20 rounded-2xl shadow-xl flex flex-col gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ", children: verificationSent ? (_jsxs("div", { className: "text-center flex flex-col gap-2", children: [_jsx(CheckBadge, { classnames: "size-12 flex mx-auto" }), _jsx("h1", { className: "text-2xl text-black font-bold flex items-center gap-2 md:whitespace-nowrap text-center mx-auto ", children: "Verification sent on your email" }), _jsx("p", { className: "text-base text-gray-600", children: "Please verify your email by clicking on the link sent on your mail" })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex justify-center", children: _jsx("img", { src: "https://www.str8bat.com/cdn/shop/files/Logo.png?v=1677442424&width=500", alt: "str8bat logo", width: 150 }) }), _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl text-black font-bold", children: "Create your account" }), _jsx("p", { className: "text-base text-gray-600", children: "Fill details below to create a new account" })] }), _jsxs(Form, { form: form, name: "loginForm", layout: "vertical", onFinish: onFinish, onFinishFailed: onFinishFailed, initialValues: { remember: true }, children: [_jsx(Form.Item, { name: "name", rules: nameRules, children: _jsx(Input, { prefix: _jsx(UserIcon, {}), placeholder: "Name", size: "large" }) }), _jsx(Form.Item, { name: "email", rules: emailRules, children: _jsx(Input, { prefix: _jsx(MailIcon, {}), placeholder: "Email", size: "large" }) }), _jsx(Form.Item, { name: "password", rules: passwordRules, children: _jsx(Input.Password, { prefix: _jsx(OpenLockIcon, {}), placeholder: "Password", size: "large" }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", className: "w-full text-2xl font-bold mt-8 shadow-gray-300 shadow-2xl", style: { padding: "25px 0" }, children: "Sign Up" }) })] })] })) }) })] }));
}
