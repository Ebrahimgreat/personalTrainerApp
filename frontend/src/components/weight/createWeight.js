import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import Button from "../button";
import { useAuth } from "clerk-solidjs";
function CreateWeight(props) {
    const { getToken } = useAuth();
    async function handleSubmit(event) {
        event.preventDefault();
        props.addWeight();
        const token = await getToken();
    }
    return (_jsx("div", { class: "h-full w-full", children: _jsx("div", { class: "", children: _jsxs("form", { class: " rounded px-8 pt-6 pb-8 mb-4", onSubmit: handleSubmit, children: [_jsxs("div", { class: "mb-4", children: [_jsx("select", { value: props.clientName, children: _jsx("option", { value: props.clientName, children: props.clientName }) }), _jsx("label", { class: "block text-sm font-bold mb-2", children: "Scale Weight" }), _jsx("input", { value: props.scaleWeight, type: "number", onChange: (e) => props.updateScaleWeight(Number(e.currentTarget.value)), class: "shadow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-black" })] }), _jsxs("div", { class: "mb-4", children: [_jsx("label", { class: "block  text-sm font-bold mb-2", children: "Date" }), _jsx("input", { type: "date", value: props.weightCreated, onChange: (e) => props.updateDate(e.currentTarget.value), class: "shadow appearance-none border border-gray-300 rounded-lg   w-full py-2 px-3 text-black" })] }), _jsx("div", { class: "flex items-center justify-center", children: _jsx(Button, { type: "submit", children: "Create Weight" }) })] }) }) }));
}
export default CreateWeight;
