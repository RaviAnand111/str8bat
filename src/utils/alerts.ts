import { MessageInstance } from "antd/es/message/interface";

export const successAlert = (messageApi: MessageInstance, content: string) => {
  messageApi.success(content);
};

export const errorAlert = (messageApi: MessageInstance, content: string) => {
  messageApi.error(content);
};

export const warningAlert = (messageApi: MessageInstance, content: string) => {
  messageApi.warning(content);
};
