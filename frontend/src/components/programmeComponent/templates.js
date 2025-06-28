import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { createSignal } from "solid-js";
import { For } from "solid-js";
import { Show } from "solid-js";
import Button from "../ui/button";
const [templateName, setTemplateName] = createSignal('');
import { TextField, TextFieldRoot, TextFieldLabel } from "../ui/textfield";
import { AlertDialog, AlertDialogAction, AlertDialogClose, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useAuth } from "clerk-solidjs";
function Templates(props) {
    const { getToken } = useAuth();
    const submitTemplate = async () => {
        const auth = getToken();
    };
    return (_jsxs("div", { class: "bg-white shoadow-md", children: [_jsx("h1", { class: "font-bold", children: "Templates" }), _jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { children: _jsx(Button, { variant: "default", children: "Add Template" }) }), _jsxs(AlertDialogContent, { class: "bg-white", children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Are You sure You want to add a new template?" }), _jsx(AlertDialogDescription, { children: "This will add a new template. Once it is done you can add exercises in this template" })] }), _jsxs(TextFieldRoot, { children: [_jsx(TextFieldLabel, { children: "Name" }), _jsx(TextField, { value: props.templateName, onChange: (e) => props.setTemplateName(e.currentTarget.value) })] }), _jsx(AlertDialogClose, { children: "Cancel" }), _jsx(AlertDialogAction, { onClick: () => props.addNewTemplate(), children: "Continue" })] })] }), _jsx("ul", { children: _jsx(Show, { when: props.template.length > 0, children: _jsx(For, { each: props.template, children: (item) => _jsxs("div", { class: "flex flex-row justify-between", children: [_jsx("li", { onClick: () => props.onClick(item.id), class: "px-4 py-2 mr-1 cursor-pointer mb-5", children: item.name }), _jsx("span", { children: _jsx(AlertDialog, { children: _jsxs(AlertDialogTrigger, { children: [_jsx(Button, { children: "Delete" }), _jsxs(AlertDialogContent, { class: "bg-white", children: [_jsx(AlertDialogHeader, { children: "Are you sure you want to delete this?" }), _jsx(AlertDialogDescription, { children: "This will delete the given template. All data will be lost" }), _jsx(AlertDialogClose, { children: "Cancel" }), _jsx(AlertDialogAction, { onclick: () => props.deleteTemplate(item.id), children: "Continue" })] })] }) }) })] }) }) }) })] }));
}
export default Templates;
