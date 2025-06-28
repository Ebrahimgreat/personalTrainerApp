import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
function WorkoutProgrammeOverview(props) {
    return (_jsxs("div", { class: "bg-white flex flex-col shadow-md p-3 space y-4 h-full w-full", children: [_jsx("h1", { class: "font-semi-bold text-2xl border-b", children: "Active Programme" }), _jsx("div", { class: "bg-white", children: props.name })] }));
}
export default WorkoutProgrammeOverview;
