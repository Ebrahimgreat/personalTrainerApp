import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For } from "solid-js";
import Button from "../../ui/button";
function AssignProgramme(props) {
    return (_jsx("div", { class: "h-full w-full overflow-y-auto", children: _jsx(For, { each: props.programme, children: (item) => _jsxs("div", { class: "px-4 py-3 space-y-6 mt-3 border", children: [_jsxs("div", { class: "flex flex-row justify-between", children: [_jsx("h1", { class: "font-bold", children: item.name }), _jsx("p", { class: "underline", children: item.id === props.programme_id ? "Already Assigned" : "" }), _jsx(Button, { onclick: () => props.updateProgramme(item.id), disabled: item.id == props.programme_id, variant: "outline", children: "Assign" })] }), _jsx("p", { class: "text-gray-600", children: item.description }), _jsx(For, { each: item.workout, children: (value) => _jsxs("div", { class: "mt-4 border p-4", children: [_jsx("p", { class: "text-center", children: value.name }), _jsx(For, { each: value.details, children: (detail) => _jsxs("div", { class: "flex flex-row gap-x-3", children: ["Rep Range", _jsxs("p", { children: [" ", detail.repRange] }), "Sets", _jsx("p", { children: detail.sets }), _jsx("p", { children: detail.exercise.name })] }) })] }) })] }) }) }));
}
export default AssignProgramme;
