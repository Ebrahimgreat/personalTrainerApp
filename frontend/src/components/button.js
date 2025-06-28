import { jsx as _jsx } from "hono/jsx/jsx-runtime";
function button({ children, onClick, class: className, type = "button" }) {
    return (_jsx("button", { type: type, class: `bg-blue-500 hover:bg-blue-700  text-white text-xs font-bold w-32 h-8   rounded ${className}`, onClick: onClick, children: children }));
}
export default button;
