import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CheckBadge from "../../assets/Icons/CheckBadge";
import { useEffect, useLayoutEffect, useState } from "react";
import { verifyEmail } from "../../services/apis";
import { errorAlert } from "../../utils/alerts";
import { message } from "antd";
import CrossIcon from "../../assets/Icons/CrossIcon";
export default function VerifyEmail() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [counter, setCounter] = useState(8);
    const [startCounter, setStartCounter] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    useLayoutEffect(() => {
        const token = searchParams.get("token");
        (async function () {
            try {
                const verifyEmailResponse = await verifyEmail(token);
                if (verifyEmailResponse?.statusCode === 200) {
                    setStartCounter(true);
                    setEmailVerified(true);
                }
                else
                    throw new Error("Verification token invalid, try again");
            }
            catch (error) {
                errorAlert(messageApi, error?.message);
                setEmailVerified(false);
            }
        })();
    }, [searchParams]);
    useEffect(() => {
        let counterInterval;
        if (startCounter) {
            counterInterval = setInterval(() => {
                setCounter((prev) => --prev);
            }, 1000);
        }
        return () => clearInterval(counterInterval);
    }, [startCounter]);
    useEffect(() => {
        if (counter === 1) {
            navigate("/login");
        }
    }, [counter]);
    return (_jsxs("div", { className: "w-full h-full flex justify-center items-center", children: [contextHolder, emailVerified ? (_jsx("div", { className: "w-[80%] md:w-fit md:min-w-[25rem] px-5 md:px-16 py-20 rounded-2xl shadow-xl flex flex-col gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ", children: _jsxs("div", { className: "text-center flex flex-col gap-2", children: [_jsx(CheckBadge, { classnames: "size-12 flex mx-auto" }), _jsx("h1", { className: "text-2xl text-black font-bold flex items-center gap-2 md:whitespace-nowrap text-center mx-auto ", children: "Email Verified" }), _jsxs("p", { className: "text-base text-gray-600", children: ["Redirecting you to login page in ", counter] })] }) })) : (_jsx("div", { className: "w-[80%] md:w-fit md:min-w-[25rem] px-5 md:px-16 py-20 rounded-2xl shadow-xl flex flex-col gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ", children: _jsxs("div", { className: "text-center flex flex-col gap-2", children: [_jsx(CrossIcon, { classnames: "size-12 flex mx-auto" }), _jsx("h1", { className: "text-2xl text-black font-bold flex items-center gap-2 md:whitespace-nowrap text-center mx-auto ", children: "Token Invalid" }), _jsx(Link, { to: "/signup", className: "text-base text-gray-600 underline", children: "signup again" })] }) }))] }));
}
