import "./App.css";
import { Button, DatePicker, Space } from "antd";

function App() {
  return (
    <>
      <Space>
        <DatePicker />
        <Button type="primary">Primary Button</Button>
      </Space>
    </>
  );
}

export default App;
