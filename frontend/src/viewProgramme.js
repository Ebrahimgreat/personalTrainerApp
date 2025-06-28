import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { useLocation, useNavigate, useSearchParams } from "@solidjs/router";
import { createResource, Show, createEffect } from "solid-js";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import CreateNewProgramme from "./components/programmeComponent/programmeDescription";
import Templates from "./components/programmeComponent/templates";
import { useAuth } from "clerk-solidjs";
import { Badge } from "./components/ui/ui/badge";
function ViewProgramme() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [addedTemplate, setAddedTemplate] = createSignal(false);
    const navigate = useNavigate();
    const [saving, setIsSaving] = createSignal(false);
    const location = useLocation();
    const [id, setId] = createSignal(location.search.slice(4));
    const getProgramme = async () => {
        const data = await fetch(`http://localhost:3001/api/programme/details?id=${id()}`, {
            method: 'GET'
        });
        return data.json();
    };
    const navigateToTemplate = (item) => {
        setSearchParams({ id: item });
        navigate(`/viewTemplate?id=${item}`);
    };
    const { getToken } = useAuth();
    const deleteTemplate = async (item) => {
        try {
            const token = await getToken();
            const data = await fetch('http://localhost:3001/api/template/delete', {
                method: "POST",
                body: JSON.stringify({
                    id: item
                })
            });
            refetch();
        }
        catch (error) {
            console.log(error);
        }
    };
    const addNewTemplate = async () => {
        try {
            console.log("HI");
            const token = await getToken();
            const data = await fetch('http://localhost:3001/api/template/store', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    programme_id: Number(id()),
                    name: templateName()
                })
            });
            setAddedTemplate(true);
            const timeout = setTimeout(() => {
                setAddedTemplate(false);
            }, 2000);
            refetch();
        }
        catch (error) {
            console.log(error);
        }
    };
    const [templateName, setTemplateName] = createSignal('');
    const [programmeDetails, { refetch }] = createResource(getProgramme);
    const [edit, setEdit] = createSignal(false);
    const [workoutSelected, setWorkoutSelected] = createSignal('');
    const [programme, setProgramme] = createStore({
        name: '',
        description: ''
    });
    const [myDetails, setMyDetails] = createStore({
        name: '',
        workout: []
    });
    const addExercise = async (text) => {
        console.log(myDetails.name);
        if (myDetails.name === text) {
            return;
        }
        setMyDetails('name', text);
        setMyDetails('workout', []);
        const filteredArray = programmeDetails().flatMap((item) => item.programmeWorkout.filter((value) => value.name === text).flatMap((value1) => value1.programmeDetails));
        for (let i = 0; i < filteredArray.length; i++) {
            console.log(filteredArray[i]);
            setMyDetails('workout', (current) => [
                ...current, {
                    repRange: filteredArray[i].repRange,
                    exercise: filteredArray[i].exercise.name,
                    sets: filteredArray[i].sets
                }
            ]);
        }
    };
    const updatingProgramme = async () => {
        const data = await fetch('http://localhost:3001/api/programme/update', {
            method: 'POST',
            body: JSON.stringify({
                id: id(),
                name: programme.name,
                description: programme.description
            })
        });
    };
    createEffect(() => {
        if (programmeDetails()) {
            console.log("Setting");
            setProgramme('name', programmeDetails().name);
            setProgramme('description', programmeDetails().description);
        }
    });
    createEffect(() => {
        if (programmeDetails()) {
            if (programme.name == programmeDetails().name && programme.description == programmeDetails().description) {
                return;
            }
            console.log(programme.name, "Name");
            setIsSaving(true);
            updatingProgramme();
            const timeout = setTimeout(() => {
                setIsSaving(false);
            }, 2000);
        }
    });
    const updateProgramme = (fieldName, key) => (event) => {
        const inputElement = event.currentTarget;
        console.log(inputElement.value);
        setMyDetails('workout', key, (current) => ({
            ...current,
            [fieldName]: inputElement.value
        }));
        console.log(myDetails.workout);
    };
    return (_jsxs("div", { class: "flex flex-col w-full", children: [_jsx(Show, { when: programmeDetails.loading, children: _jsxs("div", { class: "flex justify-center items-center p-4", children: [_jsxs("svg", { class: "size-6 text-gray-500 animate-spin", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [_jsx("circle", { class: "opacity-25", cx: "12", cy: "12", r: "10", "stroke-width": "4" }), _jsx("path", { class: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" })] }), _jsx("span", { children: "Loading" })] }) }), _jsx("h1", { class: "text-3xl font-semi-bold text-gray-900", children: "Edit Programme" }), _jsxs("div", { class: "flex flex-row justify-between", children: [_jsx("p", { class: "text-gray-900 text-sm", children: "Make Changes to Your Programme" }), _jsx(Show, { when: saving(), children: _jsx(Badge, { class: "bg-blue-50 text-blue-600 border border-blue-100 animate-pulse", children: "Auto Saving..." }) }), _jsx(Show, { when: addedTemplate(), children: _jsx(Badge, { class: "bg-blue-50 text-blue-600 border border-blue-100 animate-pulse", children: "Adding new Template" }) })] }), _jsxs(Show, { when: programmeDetails(), children: [_jsx(CreateNewProgramme, { setProgrammeName: (item) => setProgramme('name', item), setProgrammeDescription: (item) => setProgramme('description', item), programme: programme }), _jsx(Templates, { deleteTemplate: (item) => deleteTemplate(item), setTemplateName: (item) => setTemplateName(item), templateName: templateName(), addNewTemplate: () => addNewTemplate(), onClick: (item) => navigateToTemplate(item), template: programmeDetails().programmeWorkout })] })] }));
}
export default ViewProgramme;
