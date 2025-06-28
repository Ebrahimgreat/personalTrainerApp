import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
const layout = (props) => {
    return (_jsxs(_Fragment, { children: [_jsx("header", { children: "Header" }), _jsx("main", { children: props.children })] }));
};
export default layout;
