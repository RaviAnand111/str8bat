import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Input, message, Space, Switch } from "antd";
import OpenLockIcon from "../../assets/Icons/OpenLockIcon";
import MailIcon from "../../assets/Icons/MailIcon";
import Form from "antd/es/form";
import { baseUrl } from "../../utils/baseUrl";
import { errorAlert, successAlert } from "../../utils/alerts";
import { setInLocalStorage } from "../../utils/localStorageUtils";
export default function Login() {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values) => {
        try {
            const login = await fetch(`${baseUrl}/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const loginData = await login.json();
            if (loginData?.statusCode === 200) {
                successAlert(messageApi, "Login successfull");
                setInLocalStorage("userAccessToken", loginData?.token);
            }
            else {
                console.log('error', loginData?.error);
                throw new Error(loginData?.error);
            }
        }
        catch (error) {
            console.log('error', error?.error);
            errorAlert(messageApi, error?.message);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        // Additional error handling logic can be added here
    };
    return (_jsxs("div", { className: "w-full h-full flex justify-center items-center", children: [contextHolder, _jsxs("div", { className: "w-fit min-w-[25rem] px-16 py-20 rounded-2xl shadow-xl flex flex-col gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", children: [_jsx("div", { className: "flex justify-center", children: _jsx("img", { src: "https://www.str8bat.com/cdn/shop/files/Logo.png?v=1677442424&width=500", alt: "str8bat logo", width: 150 }) }), _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl text-black font-bold", children: "Welcome Back" }), _jsx("p", { className: "text-base text-gray-600", children: "Enter your details to log in" })] }), _jsxs(Form, { form: form, name: "loginForm", layout: "vertical", onFinish: onFinish, onFinishFailed: onFinishFailed, initialValues: { remember: true }, children: [_jsx(Form.Item, { name: "email", children: _jsx(Input, { prefix: _jsx(MailIcon, {}), placeholder: "Email", size: "large" }) }), _jsx(Form.Item, { name: "password", children: _jsx(Input.Password, { prefix: _jsx(OpenLockIcon, {}), placeholder: "Password", size: "large" }) }), _jsx(Form.Item, { name: "remember", valuePropName: "checked", children: _jsxs(Space, { direction: "horizontal", className: "w-full flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Switch, { defaultChecked: true }), _jsx("span", { className: "text-sm lg:text-base", children: "Remember me" })] }), _jsx("a", { href: "#", className: "text-sm lg:text-base text-red-600 font-medium", children: "Forgot Password?" })] }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", className: "w-full text-2xl font-bold mt-8 shadow-gray-300 shadow-2xl", style: { padding: "25px 0" }, children: "Login" }) })] })] })] }));
}
