import { useLayoutEffect, useState } from "react";
import "./App.css";
import { Button, DatePicker, Space } from "antd";
import { getFromLocalStorage } from "./utils/localStorageUtils";
import { baseUrl } from "./utils/baseUrl";
import { useNavigate } from "react-router-dom";
import { CommonResponse, User } from "./utils/types";

function App() {
  const navigate = useNavigate();

  const userAccessToken = getFromLocalStorage("userAccessToken");

  useLayoutEffect(() => {
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
        if (fetchedUserDataJson?.statusCode === 200)
          navigate(`/user/${fetchedUserDataJson?.data?.user_id}`);
        else navigate("/login");
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <Space></Space>
    </>
  );
}

export default App;
