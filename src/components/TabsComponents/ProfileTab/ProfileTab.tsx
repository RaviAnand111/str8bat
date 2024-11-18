import {
  Button,
  Col,
  Flex,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useState } from "react";
import EditIcon from "../../../assets/Icons/EditIcon";
import { getFromLocalStorage } from "../../../utils/localStorageUtils";
import { beforeUpload, FileType, getBase64 } from "../../../utils/uploadFile";
import UploadIcon from "../../../assets/Icons/UploadIcon";
import { baseUrl } from "../../../utils/baseUrl";
import { CommonResponse } from "../../../utils/types";
import { emailRules, nameRules } from "../../../utils/formRules";
import UserIcon from "../../../assets/Icons/UserIcon";
import MailIcon from "../../../assets/Icons/MailIcon";
import { errorAlert, successAlert } from "../../../utils/alerts";
import { updateUserData } from "../../../services/apis";
import { useNavigate } from "react-router-dom";

interface userDataType {
  name: string;
  profile_picture_url: string;
  gender: string;
  email: string;
  phone_number: string;
}

export default function ProfileTab({ userData }: { userData?: userDataType }) {
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
      });
    }
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const uploadButton = (
    <button
      style={{ border: 0, background: "none" }}
      type="button"
      className="flex flex-col text-center mx-auto items-center"
    >
      {loading ? <></> : <UploadIcon />}
      <div style={{ marginTop: 8 }} className="text-center">
        Upload
      </div>
    </button>
  );

  const onFinish = async (values: any) => {
    console.log("called");
    try {
      const userAccessToken = getFromLocalStorage("userAccessToken");
      const updateData = await updateUserData(
        {
          name: values?.name,
          phone_number: values?.phone_number,
          gender: values?.gender,
        },
        userAccessToken,
      );
      // if user is created ask user to verify the email from the link in mailbox
      if (updateData?.statusCode === 200) {
        successAlert(messageApi, "Profile updated");
        window.location.reload();
      } else {
        throw new Error(updateData?.error);
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
    <div className="w-full h-full flex flex-col justify-between ">
      {contextHolder}
      {editData ? (
        <Flex gap="middle" vertical>
          <Flex gap="large">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 5 && "+ Upload"}
            </Upload>
          </Flex>
          <Form
            form={form}
            name="profileForm"
            size="middle"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              name: userData?.name,
              email: userData?.email,
              phone_number: userData?.phone_number,
              gender: userData?.gender,
            }}
          >
            <Form.Item name="name" rules={nameRules}>
              <Input prefix={<UserIcon />} placeholder="Name" size="middle" />
            </Form.Item>
            <Form.Item name="email" rules={emailRules}>
              <Input
                prefix={<MailIcon />}
                readOnly
                placeholder="Email"
                size="middle"
              />
            </Form.Item>
            {/*<Form.Item name="password" rules={passwordRules}>
              <Input.Password
              prefix={<OpenLockIcon />}
              placeholder="Password"
              size="large"
              />
              </Form.Item>*/}
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select your gender" }]}
            >
              <Select placeholder="Select your gender" size="middle">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="phone_number"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number",
                },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full text-2xl font-bold mt-8 shadow-gray-300 shadow-2xl bg-green-500 hover:bg-green-500 focus:bg-green-500 active:bg-green-500"
                style={{ padding: "25px 0" }}
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      ) : (
        <div className="w-full h-full gap-8 flex flex-col ">
          <Flex gap="large" className="items-center">
            <Image
              width={100}
              src={
                userData?.profile_picture_url
                  ? userData?.profile_picture_url
                  : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              }
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
                  <p>{userData?.phone_number ?? "-"}</p>
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
                  <p>{userData?.email ?? "-"}</p>
                </Flex>
                <Flex
                  className="text-left text-gray-500 gap-1 font-semibold "
                  vertical
                  wrap
                >
                  <p className="whitespace-nowrap">Gender</p>
                  <p>{userData?.gender ?? "-"}</p>
                </Flex>
              </Col>
            </div>
          </Flex>
        </div>
      )}
      {!editData && (
        <div>
          <Button
            className="text-lg py-5 px-3 items-center mt-[30%] "
            onClick={() => setEditData(true)}
          >
            Edit Profile
          </Button>
        </div>
      )}
    </div>
  );
}
