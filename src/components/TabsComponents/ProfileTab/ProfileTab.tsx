import { Button, Col, Flex, Image, Row } from "antd";
import { useState } from "react";
import EditIcon from "../../../assets/Icons/EditIcon";

interface userDataType {
  name: string;
  profile_picture_url: string;
  gender: string;
  email: string;
  phone_number: string;
}

export default function ProfileTab({ userData }: { userData?: userDataType }) {
  const [editData, setEditData] = useState(false);
  return (
    <div className="w-full h-full flex flex-col justify-between ">
      {editData ? (
        <Flex gap="middle" vertical>
          <Flex gap="large">
            <Image
              width={100}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              className="rounded-full"
            />
            <Flex gap="middle" className="items-center">
              <Button type="primary">Edit Picture</Button>
              <Button type="primary" danger>
                Delete Picture
              </Button>
            </Flex>
          </Flex>
          <Flex gap="middle" className="items-center w-fit ">
            <h3>Name</h3>
            <p>{userData?.name}</p>
          </Flex>
        </Flex>
      ) : (
        <div className="w-full h-full gap-8 flex flex-col ">
          <Flex gap="large" className="items-center">
            <Image
              width={100}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              className="rounded-full"
              preview={false}
            />
            {/*<Flex vertical className="gap-1">
              <p className=" text-base font-bold text-left ">
              {userData?.name}
              </p>
              <p className="text-sm text-left text-gray-500 ">
              {userData?.email}
              </p>
              </Flex>*/}
          </Flex>
          <Flex vertical gap="middle" className="w-full h-full">
            <h2 className="text-lg text-gray-700 text-semibold text-left ">
              Personal Information
            </h2>
            <div className="flex flex-row gap-28 max-w-[500px]">
              <Col
                xs={2}
                sm={4}
                md={6}
                lg={8}
                xl={10}
                className="flex flex-col gap-5"
              >
                <Flex
                  className="text-left text-gray-500 gap-1 font-semibold "
                  vertical
                  wrap
                >
                  <p className="whitespace-nowrap">First Name</p>
                  <p>{userData?.name}</p>
                </Flex>
                <Flex
                  className="text-left text-gray-500 gap-1 font-semibold "
                  vertical
                  wrap
                >
                  <p className="whitespace-nowrap">Phone Number</p>
                  <p>{userData?.phone_number}</p>
                </Flex>
              </Col>
              <Col
                xs={2}
                sm={4}
                md={6}
                lg={8}
                xl={10}
                className="flex flex-col gap-5"
              >
                <Flex
                  className="text-left text-gray-500 gap-1 font-semibold "
                  vertical
                  wrap
                >
                  <p className="whitespace-nowrap">Email</p>
                  <p>{userData?.email}</p>
                </Flex>
                <Flex
                  className="text-left text-gray-500 gap-1 font-semibold "
                  vertical
                  wrap
                >
                  <p className="whitespace-nowrap">Gender</p>
                  <p>{userData?.gender}</p>
                </Flex>
              </Col>
            </div>
          </Flex>
        </div>
      )}
      <div>
        <Button
          className="text-lg py-5 px-3 items-center "
          onClick={() => setEditData(true)}
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
