import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { Button } from "../ui/button";
import { For, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { AlertDialog, AlertDialogAction, AlertDialogClose, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
const columns = [' Action', 'Client'];
const [dialogOpen, setDialogOpen] = createSignal(false);
function ClientHome(props) {
    const navigate = useNavigate();
    return (_jsxs("div", { class: "flex  flex-col", children: [_jsx("div", { class: "flex flex-row justify-between" }), _jsx("div", { class: "bg-white w-full", children: _jsxs("table", { class: "w-full text-gray-600", children: [_jsx("thead", { class: "bg-gray-200", children: _jsx("tr", { children: _jsx(For, { each: columns, children: (item) => _jsx("th", { class: "px-4 py-2 border font-light border-gray-300", children: item }) }) }) }), _jsx("tbody", { children: _jsx(For, { each: props.myClients, children: (item) => (_jsxs("tr", { class: "hover:bg-gray-500 cursor-pointer", children: [_jsx("td", { class: "px-4 py-2 ", children: _jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { children: _jsx(Button, { children: "Delete" }) }), _jsxs(AlertDialogContent, { class: "bg-white", children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Delete Client" }), _jsx(AlertDialogDescription, { children: "This action will delete the client including all of their associated data." })] }), _jsx(AlertDialogClose, { children: "Cancel" }), _jsx(AlertDialogAction, { onclick: () => props.deleteClient(item.id), children: "Continue" })] })] }) }), _jsx("td", { class: "px-4 py-2 text-center", onClick: () => props.onClientName(item.id), children: item.name })] })) }) })] }) })] }));
}
export default ClientHome;
