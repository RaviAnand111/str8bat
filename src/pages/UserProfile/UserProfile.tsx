import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Tabs, TabsProps } from "antd";
import PrivacyTab from "../../components/TabsComponents/PrivacyTab/PrivacyTab";
import ProfileTab from "../../components/TabsComponents/ProfileTab/ProfileTab";
import { baseUrl } from "../../utils/baseUrl";
import { getFromLocalStorage } from "../../utils/localStorageUtils";

export default function UserProfile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState();

  const userAccessToken = getFromLocalStorage("userAccessToken");

  const onChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    (async function () {
      try {
        const fetchedUserData = await fetch(`${baseUrl}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userAccessToken}`,
          },
        });
        const fetchedUserDataJson = await fetchedUserData.json();
        setUserData(fetchedUserDataJson?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Profile",
      children: (
        <div className="w-full h-full ">
          <ProfileTab userData={userData} />
        </div>
      ),
    },
  ];

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="w-full md:w-[60%] xl:w-[80%] h-[80%] max-w-[1000px] flex mx-auto bg-white px-4 md:px-5 lg:px-8 xl:px-10 ">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          className="w-full "
        />
      </div>
    </div>
  );
}
