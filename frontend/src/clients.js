import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { createEffect, createResource, createSignal, Show } from "solid-js";
import { useAuth, useSignUp } from "clerk-solidjs";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import { useSearchParams } from "@solidjs/router";
import ClientCreater from "./components/client/clientHome";
import Button from "./components/ui/button";
import Dialog, { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { TextField, TextFieldLabel, TextFieldRoot } from "./components/ui/textfield";
function Clients() {
    const { isSignedIn } = useAuth();
    const { getToken } = useAuth();
    const { signUp } = useSignUp();
    const [emailTaken, setEmailTaken] = createSignal('');
    const [newClient, setNewClient] = createStore({
        name: '',
        email: '',
        age: 18
    });
    const deleteClient = async (item) => {
        try {
            const token = await getToken();
            const data = await fetch('http://localhost:3001/api/clients/delete', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: Number(item)
                })
            });
            setOpen(false);
            refetch();
        }
        catch (error) {
            console.log(error);
        }
    };
    const addNewClient = async (event) => {
        event?.preventDefault();
        console.log('yes');
        try {
            const token = await getToken();
            const data = await fetch('http://localhost:3001/api/client/store', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: newClient.name,
                    age: newClient.age
                })
            });
            setOpen(false);
            refetch();
        }
        catch (error) {
            console.log(error);
        }
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = createSignal('');
    const navigate = useNavigate();
    const getClients = async () => {
        const token = await getToken();
        const response = await fetch(`http://localhost:3001/api/clients?name=${search()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    };
    const [myClients, { refetch }] = createResource(search, getClients);
    const [open, setOpen] = createSignal(false);
    const fetchProgrammes = async () => {
        const reponse = await fetch('http://localhost:3001/api/programme');
        return reponse.json();
    };
    const showClient = (id) => {
        setSearchParams({ id: id });
        navigate(`/clients/view?id=${id}`);
    };
    const [programme, setProgramme] = createResource(fetchProgrammes);
    const columns = ['Client', 'Assigned Programme'];
    createEffect(() => {
        if (!isSignedIn()) {
            navigate('/');
        }
    });
    return (_jsxs("div", { class: "flex  flex-col", children: [_jsx(Show, { when: myClients.loading, children: "Loading....." }), _jsx("h1", { class: "text-3xl font-semi-bold text-gray-900 ", children: "Clients" }), myClients.error ? "Error has occured" : "", _jsx("span", { class: "font-extralight", children: "Manage Your Clients" }), _jsxs(Dialog, { open: open(), onOpenChange: setOpen, children: [_jsx(DialogTrigger, { class: "mb-10", children: _jsx(Button, { children: "Add Client" }) }), _jsxs(DialogContent, { class: "bg-white", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "New Client" }), _jsx(DialogDescription, { children: "This action will create a new client" })] }), _jsxs("form", { onSubmit: addNewClient, children: [_jsxs(TextFieldRoot, { children: [_jsx(TextFieldLabel, { children: "Name" }), _jsx(TextField, { value: newClient.name, onChange: (e) => setNewClient('name', e.currentTarget.value), type: "text" }), _jsx(TextFieldLabel, { children: "Age" }), _jsx(TextField, { type: "number", onChange: (e) => setNewClient('age', Number(e.currentTarget.value)), value: newClient.age })] }), _jsxs(DialogFooter, { class: "mt-10", children: [_jsx(Button, { onClick: () => setOpen(false), class: "mr-10", children: "Cancel" }), _jsx(Button, { type: "submit", children: "Submit" })] })] })] })] }), _jsx(ClientCreater, { deleteClient: (item) => deleteClient(item), setClientAge: (item) => setNewClient('age', item), addNewClient: addNewClient, newClient: newClient, searchClient: search(), setSearchString: (item) => setSearch(item), onClientName: (index) => showClient(index), myClients: myClients() })] }));
}
export default Clients;
