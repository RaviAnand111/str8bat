import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "./App.css";
import { Button, DatePicker, Space } from "antd";
function App() {
    return (_jsx(_Fragment, { children: _jsxs(Space, { children: [_jsx(DatePicker, {}), _jsx(Button, { type: "primary", children: "Primary Button" })] }) }));
}
export default App;
