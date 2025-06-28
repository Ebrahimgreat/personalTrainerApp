import { jsx as _jsx } from "hono/jsx/jsx-runtime";
function Card({ header }) {
    return (_jsx("div", { class: "flex flex0col justify-center p-5 rounded-[10%] text-white overflow-hidden border-[1px] border-white/75", style: { background: 'linear-gradient(to bottom, #51D1F7, #5B7FEF' }, children: _jsx("div", { class: "flex items-center justify-between z-10", children: _jsx("div", { class: "text-2xl font-bold mb-0.5", children: header }) }) }));
}
export default Card;
