import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For, createResource, Show, createSignal } from "solid-js";
import Button from "./components/ui/button";
import { programmeDetails } from "./components/programmeDetails";
import { useNavigate } from "@solidjs/router";
import { useSearchParams } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { Badge } from "./components/ui/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogClose, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTrigger } from "./components/ui/alert-dialog";
import { createEffect } from "solid-js";
function Programme() {
    const { getToken, isSignedIn } = useAuth();
    const [addNewProgrammeIndicator, setAddingNewIndicator] = createSignal(false);
    const [deletingNewProgrammeIndicator, setDeletingNewProgrammeIndicator] = createSignal(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [exercise, setExercise] = createSignal('');
    const options = ['1-3', '3-6', '6-9', '9-12', '12-15', '15+'];
    const lists = ['name', 'Clients Enrolled', ''];
    const fetchData = async () => {
        const token = await getToken();
        const response = await fetch('http://localhost:3001/api/programme', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    };
    const storeProgramme = async () => {
        const token = await getToken();
        try {
            const response = await fetch('http://localhost:3001/api/programme/store', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            refetch();
            setAddingNewIndicator(true);
            await new Promise((resolve) => setTimeout(resolve, 800));
            setAddingNewIndicator(false);
            navigate(`/programme/view?id=${data[0].id}`);
        }
        catch (error) {
            console.log(error);
        }
    };
    const deleteProgramme = async (item) => {
        const token = await getToken();
        const data = await fetch('http://localhost:3001/api/programme/delete', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id: Number(item)
            })
        });
        setDeletingNewProgrammeIndicator(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setDeletingNewProgrammeIndicator(false);
        refetch();
    };
    const [myProgrammes, { refetch }] = createResource(fetchData);
    const viewProgramme = (id) => {
        navigate(`/programme/view?id=${id}`);
    };
    createEffect(() => {
        if (!isSignedIn()) {
            navigate('/');
        }
    });
    return (_jsxs("div", { children: [_jsx("h1", { class: "text-3xl font-semi-bold text-gray-900 ", children: "Programmes" }), _jsx(Show, { when: myProgrammes.loading, children: _jsxs("div", { class: "flex justify-center items-center p-4", children: [_jsxs("svg", { class: "size-6 text-gray-500 animate-spin", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [_jsx("circle", { class: "opacity-25", cx: "12", cy: "12", r: "10", "stroke-width": "4" }), _jsx("path", { class: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" })] }), _jsx("span", { children: "Loading" })] }) }), _jsxs("div", { class: "flex flex-row justify-between", children: [_jsx("span", { class: "font-extralight", children: "Organize Your Programmes" }), _jsx(Show, { when: addNewProgrammeIndicator() || deletingNewProgrammeIndicator(), children: _jsx(Badge, { class: "bg-blue-50 text-blue-600 border border-blue-100 animate-pulse", children: addNewProgrammeIndicator() ? "Creating New Programme" : "Deleting Programme" }) })] }), _jsx("div", { class: "flex flex-row justify-between", children: _jsx(Button, { type: "button", onclick: storeProgramme, variant: "outline", children: "New Programme" }) }), _jsx(For, { each: programmeDetails.exercise, children: (item) => _jsx("p", { children: item.name }) }), _jsx(Show, { when: myProgrammes(), children: _jsx(For, { each: myProgrammes(), children: (item) => _jsxs("div", { class: "bg-white shadow-md mb-10 rounded-xl p-4 hover:shadow-lg transition ", children: [_jsx("h1", { class: "font-bold text-2xl cursor-pointer", onClick: () => viewProgramme(item.id), children: item.name }), _jsxs("div", { class: "flex flex-row justify-between", children: [_jsx("p", { class: "text-gray-800 text-sm", children: item.description }), _jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { children: _jsx(Button, { children: "Delete" }) }), _jsxs(AlertDialogContent, { class: "bg-white", children: [_jsx(AlertDialogHeader, { children: "Delete Programme" }), _jsx(AlertDialogDescription, { children: "This will permanently delete the entire programme, including all associated templates and exercises. This action cannot be undone. Please proceed with caution.                    " }), _jsx(AlertDialogClose, { children: "Cancel" }), _jsx(AlertDialogAction, { onclick: () => deleteProgramme(item.id), children: "Continue" })] })] })] }), _jsx(For, { each: item.programmeWorkout, children: (workout) => _jsx("span", { class: "block text-sm text-center", children: workout.name }) })] }) }) })] }));
}
export default Programme;
