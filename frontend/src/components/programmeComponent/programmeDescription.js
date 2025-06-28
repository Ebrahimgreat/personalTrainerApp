import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
function ProgrammeDescription(props) {
    return (_jsx("div", { class: " bg-white shadow-md", children: _jsxs("form", { children: [_jsx("label", { class: "block text-sm font-medium text-gray-700 mb-1", children: "Programme Title" }), _jsx("input", { value: props.programme.name, onChange: (e) => props.setProgrammeName(e.currentTarget.value), class: "w-full px-4 py-2 mb-4  border rounded-lg focus:outline-none focus:ring-2 pink-500", placeholder: "5 Day Split" }), _jsx("label", { class: "block text-sm font-medium text-gray-700 mb-1", children: "Programme Description" }), _jsx("textarea", { value: props.programme.description, onChange: (e) => props.setProgrammeDescription(e.currentTarget.value), class: "w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 pink-500", placeholder: " Description" })] }) }));
}
export default ProgrammeDescription;
