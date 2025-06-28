import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For } from "solid-js";
import Button from "./button";
import { useNavigate } from "@solidjs/router";
function Table(props) {
    const navigate = useNavigate();
    return (_jsx("div", { class: "overflow-x-auto w-full", children: _jsxs("table", { class: "border-gray-300 w-full", children: [_jsx("thead", { class: "bg-pink-500 text-white", children: _jsx("tr", { children: _jsx(For, { each: props.columns, children: (item, index) => _jsx("th", { class: "border border-gray-300 px-4 py-2", children: item }) }) }) }), _jsx("tbody", { children: _jsx(For, { each: props.data, children: (item, key) => (_jsxs("tr", { children: [_jsx(For, { each: props.keys, children: (value) => (_jsx("td", { class: "border border-gray-300 px-4 py-2", children: value.format === 'date' ? new Date(item[value.name]).toLocaleDateString() : (item[value.name]) })) }), _jsx(For, { each: props.actions, children: (action) => (_jsx("td", { class: "border border-gray-300 px-4 py-2", children: _jsx(Button, { onClick: () => action.value(item), children: action.name }) })) }), _jsx(For, { each: props.view, children: (v) => (_jsx("td", { class: "px-4 border border-gray-300 py-2", children: _jsx(Button, { onClick: () => v.value(item), children: v.name }) })) })] })) }) })] }) }));
}
export default Table;
