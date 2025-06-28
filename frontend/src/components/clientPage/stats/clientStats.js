import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For, Show } from "solid-js";
function ClientStats(props) {
    return (_jsxs("div", { class: "bg shadow-md flex flex-col", children: [_jsx("h1", { class: "font-bold text-center", children: "Stats Overview" }), _jsx(Show, { when: props.stats.length == 0, children: _jsx("p", { class: "text-gray-600 text-center", children: "No Stats can be found" }) }), _jsx(Show, { when: props.stats, children: _jsx(For, { each: props.stats, children: (item) => _jsxs("div", { class: "flex w-full bg-white shadow-md flex-row gap-x-4", children: [_jsx("p", { class: "text-sm", children: new Date(item.created_at).toLocaleDateString() }), _jsx("p", { children: item.exercise.name }), _jsx("p", { class: "text-sm", children: "Set" }), _jsx("p", { class: "text-sm", children: item.exercise.set }), "Reps", _jsx("p", { children: item.exercise.reps }), _jsx("p", { class: "text-sm", children: "Weight" }), item.exercise.weight] }) }) })] }));
}
export default ClientStats;
