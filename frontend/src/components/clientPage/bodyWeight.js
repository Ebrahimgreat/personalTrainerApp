import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For } from "solid-js";
function BodyWeight(props) {
    return (_jsxs("div", { class: "flex flex-col", children: [_jsx("h1", { class: "font-bold text-2xl", children: "History" }), _jsx(For, { each: props.weights, children: (item) => _jsxs("div", { class: "bg-white  px-2 py-2 mb-2 rounded-lg flex flex-row justify-around", children: [_jsxs("p", { class: "text-lg font-medium text-gray-800", children: [item.scaleWeight, " KG"] }), _jsx("p", { class: "text-sm text-gray-500", children: new Date(item.created_at).toLocaleDateString() })] }) })] }));
}
export default BodyWeight;
