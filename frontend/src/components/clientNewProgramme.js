import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For, Show } from "solid-js";
import Button from "./button";
function ClientProgramme(props, results) {
    return (_jsxs("div", { children: [_jsx("input", { class: "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500", value: props.value, onInput: e => props.onUpdate(e.target.value) }), _jsxs("table", { class: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { class: "px-4 py-2", children: [_jsx("th", { children: "Client" }), _jsx("th", { class: "px-4 py-2", children: "Assign" })] }) }), _jsxs("tbody", { children: [_jsx(Show, { when: props.results == 0, children: "No items" }), _jsx(Show, { when: props.results != 0, children: _jsx(For, { each: props.results, children: (item) => _jsxs("tr", { children: [_jsx("td", { class: "px-4 py-2", children: item.name }), _jsx("td", { class: "px-4 py-2", children: _jsx(Button, { children: "Assign" }) })] }) }) })] })] })] }));
}
export default ClientProgramme;
