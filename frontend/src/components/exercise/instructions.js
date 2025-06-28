import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For } from "solid-js";
function ExerciseInstructions(props) {
    return (_jsxs("div", { class: "bg-white  h-full overflow-y-auto  shadow-xl", children: [_jsx("h1", { class: "font-bold", children: "Instructions" }), _jsx("ul", { class: " ml-5 space-y-2", children: _jsx(For, { each: props.instruction, children: (item, key) => _jsxs("li", { class: "", children: [_jsx("span", { class: "bg-gray-400 text-white  border-gray-800 rounded-full shadow flex items-center justify-center mr-5 w-8 h-h-8 font-bold", children: key() + 1 }), _jsx("span", { class: "text-gray-700 text-sm", children: item })] }) }) })] }));
}
export default ExerciseInstructions;
