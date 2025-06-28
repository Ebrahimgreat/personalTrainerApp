import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import Button from "../../button";
function Notes() {
    return (_jsxs("div", { class: "bg white flex flex-col shadow-md p-3 space-y-4 h-full w-full", children: [_jsx("h1", { class: "border-b border-gray-500 text-xl", children: "Notes" }), _jsx("textarea", { placeholder: "Add notes about the client", class: "shadow-appeareance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-300 " }), _jsx(Button, { children: "Save" })] }));
}
export default Notes;
