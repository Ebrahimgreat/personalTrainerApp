import { jsx as _jsx } from "hono/jsx/jsx-runtime";
function InputField(props) {
    return (_jsx("input", { value: props.value, class: "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-blue-500 " }));
}
export default InputField;
