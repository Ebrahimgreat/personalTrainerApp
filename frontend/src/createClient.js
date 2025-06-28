import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import Button from "./components/button";
import { newClient, updateFields, errorSignal, submitForm } from "./components/createClientForm";
function CreateClient() {
    function handleSubmit(event) {
        event.preventDefault();
        submitForm();
    }
    return (_jsxs("div", { class: "flex items-center flex-col", children: [_jsx("h1", { children: "Invite new Clients" }), _jsx("span", { class: "text-gray-800", children: "Send this Code to your clients. They wil accept this to get coached by you." }), _jsx("div", { class: "bg-white shadow-md", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("label", { class: "block", children: "Name" }), _jsx("input", { type: "text", value: newClient.name, onChange: updateFields('name'), class: "border" }), _jsx("label", { class: "block", children: "email Address" }), _jsx("input", { type: "text", value: newClient.emailAddress, onChange: updateFields('emailAddress'), class: "border" }), _jsx("label", { class: "block", children: "Password" }), _jsx("input", { type: "password", value: newClient.password, onInput: updateFields('password'), class: "border" }), _jsx("label", { class: "block", children: "Confirm Password" }), _jsx("input", { type: "password", value: newClient.confirmPassword, onInput: updateFields('confirmPassword'), class: "border" }), errorSignal(), _jsx(Button, { class: "block", children: "Submit" })] }) })] }));
}
export default CreateClient;
