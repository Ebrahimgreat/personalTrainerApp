import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { TextFieldRoot, TextField } from "../ui/textfield";
import Button from "../ui/button";
function AddClient(props) {
    const handleFormSubmit = (event) => {
        console.log("YES");
        event.preventDefault();
        props.addNewClient();
        props.setDialogOpen(false);
    };
    return (_jsxs("div", { children: [_jsx("span", { class: "text-gray-600", children: "Add a client. Fill in their details below to add them directly. They'll be added to your client's list instantly and treated as if they've joined" }), _jsxs("form", { autocomplete: "off", onsubmit: handleFormSubmit, children: [_jsxs(TextFieldRoot, { children: [_jsx(TextField, { required: true, onchange: (e) => props.setClientName(e.currentTarget.value), value: props.client.name, id: "name", type: "text", placeholder: "name" }), _jsx(TextField, { required: true, onchange: (e) => props.setClientAge(Number(e.currentTarget.value)), value: props.client.name, id: "age", type: "number", placeholder: "age" })] }), _jsx(Button, { type: "submit", variant: "outline", children: "Submit" })] }), _jsxs("p", { children: ["  ", props.emailMessage] })] }));
}
export default AddClient;
