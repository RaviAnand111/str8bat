import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Tabs } from "antd";
import PrivacyTab from "../../components/TabsComponents/PrivacyTab/PrivacyTab";
import ProfileTab from "../../components/TabsComponents/ProfileTab/ProfileTab";
import { baseUrl } from "../../utils/baseUrl";
export default function UserProfile() {
    const { userId } = useParams();
    const [userData, setUserData] = useState();
    const onChange = (key) => {
        console.log(key);
    };
    useEffect(() => {
        (async function () {
            const signup = await fetch(`${baseUrl}/user`, {
                method: "GET",
                //headers: { "Content-Type": "application/json" },
                //body: JSON.stringify({ name: "sahib", email: 'email@email.com', password: "password8" }),
            });
            const signupData = await signup.json();
            console.log(signupData);
        })();
    }, []);
    const items = [
        {
            key: "1",
            label: "Profile",
            children: (_jsx(ProfileTab, { userData: {
                    name: "Ravi",
                    gender: "Male",
                    profile_picture_url: "",
                    email: "email@email.com",
                    phone_number: "8367354162",
                } })),
        },
        {
            key: "2",
            label: "Privacy",
            children: _jsx(PrivacyTab, {}),
        },
    ];
    return (_jsxs("div", { className: "w-screen h-screen", children: [_jsx(Navbar, {}), _jsx("div", { className: "w-full md:w-[60%] xl:w-[80%] h-[80%] max-w-[1000px] flex mx-auto bg-white px-4 md:px-5 lg:px-8 xl:px-10 ", children: _jsx(Tabs, { defaultActiveKey: "1", items: items, onChange: onChange, className: "w-full " }) })] }));
}
