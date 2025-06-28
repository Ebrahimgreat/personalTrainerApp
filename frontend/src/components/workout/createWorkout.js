import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For, createSignal, Show, createEffect } from "solid-js";
_jsx("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=add" });
import Button from "../button";
import Modal from "../modal";
import { useAuth } from "clerk-solidjs";
import { useLocation } from "@solidjs/router";
import ExerciseLibrary from "../exercise/exerciseLibrary";
import CreateExercise from "../exercise/createExercise";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
const [submitDialog, setSubmitDialog] = createSignal(false);
const equipmentArray = ['Barbell', 'Dumbell', 'KettleBells', 'Body Weight', 'Cable'];
const bodyPart = ['Chest', 'Quads', 'Hamstrings', 'Rear Delts', 'Tricpes'];
function CreateWorkout(props) {
    const location = useLocation();
    const [id, setId] = createSignal(location.search.slice(4));
    const { getToken } = useAuth();
    const fetchData = async () => {
        const response = await fetch(`http://localhost:3001/api/exercise/all?id=${id()}&exerciseName=${searchExercise()}&type=${exerciseType()}&equipment=${exerciseEquipment()}`, {
            method: 'GET'
        });
        return response.json();
    };
    const [programme, setProgramme] = createSignal('No Programme');
    const [workoutName, setWorkoutName] = createSignal('');
    const [searchExercise, setSearchExercise] = createSignal('');
    const [exerciseType, setExerciseType] = createSignal('');
    const [exerciseEquipment, setEquipment] = createSignal('');
    const [confirmationDialog, setConfirmationDialog] = createSignal(false);
    const [dateSelected, setDateSelected] = createSignal(new Date().toDateString());
    function updateSearchString(item) {
        props.setSearchString(item);
    }
    function updateType(item) {
        props.setType(item);
    }
    function updateEquipment(item) {
        props.setEquipment(item);
    }
    function updateWorkoutName(item) {
        props.setWorkoutName(item);
    }
    function updateDate(item) {
        props.setDate(item);
    }
    function submitWorkout() {
        props.submitWorkout();
    }
    function updateWorkout(id, key, value, field) {
        props.updateWorkout(id, key, value, field);
    }
    function removeItem(id, value, key) {
        props.removeItem(id, value, key);
    }
    function addExercise(item) {
        props.addExercise(item);
    }
    function updateProgrammeType(item) {
        props.updateProgrammeType(item);
    }
    createEffect(() => {
        console.log("Confirmation", submitDialog());
    });
    return (_jsxs("div", { class: "h-full w-full", children: [_jsxs("div", { class: "flex flex-row justify-between", children: [_jsxs("div", { children: [_jsxs("h1", { class: "text-3xl font-semi-bold text-gray-900 ", children: ["Create Workout  ", props.programmeExercises.length] }), _jsx("span", { class: "text-gray-600 text-sm", children: "Search For exisitng Exercises and add them." })] }), _jsx(Modal, { title: "New Exercise", buttonText: "Create Exercise", children: _jsx(CreateExercise, {}) })] }), _jsx(Show, { when: confirmationDialog(), children: _jsx(Modal, { buttonText: "hello", children: "hi" }) }), _jsxs("div", { class: "grid grid-cols-1s md:grid-cols-2 w-full gap-x-4", children: [_jsx(ExerciseLibrary, { showProgramme: props.showProgramme, updatingExercise: (item) => addExercise(item), equipmentSelected: props.equipment, equipment: equipmentArray, types: bodyPart, typeSelected: props.type, setTypeSelected: (item) => props.setType(item), setEquipment: (item) => updateEquipment(item), myExercises: props.showProgramme === 'No Programme' ? props.exercises : props.programmeExercises, setSearchSelected: (item) => updateSearchString(item), searchExercise: props.searchString }), _jsx("div", { class: "h-[400px] overflow-y-auto", children: _jsxs("div", { class: "flex-1 overflow p-5 ", children: [_jsxs(Show, { when: programme() === 'No Programme', children: [_jsx("select", { disabled: true, value: props.clientName, class: " disabled:cursor-not-allowed w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5  ", children: _jsx("option", { children: props.clientName }) }), _jsxs("select", { onchange: (e) => props.setShowProgramme(e.currentTarget.value), value: props.showProgramme, class: "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5", children: [_jsx("option", { children: "Programme" }), _jsx("option", { children: "No Programme" })] }), props.programmeTypeSelected.id, _jsx(Show, { when: props.showProgramme === 'Programme', children: _jsx("select", { onchange: (item) => updateProgrammeType(item.currentTarget.value), value: props.programmeTypeSelected.id, children: _jsx(For, { each: props.programmeTypes, children: (item) => _jsx("option", { value: item.id, children: item.name }) }) }) }), _jsx("input", { type: "text", onchange: (e) => updateWorkoutName(e.currentTarget.value), value: props.workoutName, class: "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5", placeholder: "Enter Name of Workout.." })] }), _jsx("label", { class: "block", children: "Date" }), _jsx("input", { type: "date", onChange: (e) => updateDate(e.currentTarget.value), class: "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-10 " }), _jsxs(AlertDialog, { open: submitDialog(), children: [_jsx(AlertDialogTrigger, { onclick: () => setSubmitDialog(true), children: _jsx(Button, { children: "Submit" }) }), _jsxs(AlertDialogContent, { class: "bg-white", children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Are you sure you want to submit?" }), _jsx(AlertDialogDescription, { children: "This action will submit the workout." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(Button, { onClick: () => setSubmitDialog(false), children: "Cancel" }), _jsx(Button, { onClick: () => submitWorkout(), children: "Continue" })] })] })] }), _jsx("div", { class: " text-black shadow-lg mt-4 px-3", children: _jsx(For, { each: props.myExercise, children: (item, key) => (_jsxs("div", { class: "grid gap-4", children: [_jsxs("h2", { class: "text-lg font-bold", children: ["Name: ", item.name] }), _jsx(For, { each: (item.exercise), children: (value, internalKey) => (_jsx("div", { class: "  text-black shadow-md p-8 flex mb-10 flex-col", children: _jsxs("div", { class: "grid grid-cols-5 border-b p-2 gap-x-4", children: [_jsxs("div", { class: "flex flex-col", children: [_jsx("p", { class: "text-sm", children: "Set" }), value.set] }), _jsxs("div", { class: "flex flex-col", children: [_jsx("p", { class: "text-sm", children: "Weight" }), _jsx("input", { type: "number", value: value.weight, onchange: (e) => updateWorkout(key(), internalKey(), Number(e.currentTarget.value), 'weight'), class: "border shadow-md rounded" })] }), _jsxs("div", { class: "flex flex-col", children: [_jsx("p", { class: "text-sm ", children: "reps" }), _jsx("input", { value: value.reps, onchange: (e) => updateWorkout(key(), internalKey(), Number(e.currentTarget.value), 'reps'), type: "number", class: "border shadow-md rounded" })] }), _jsx("div", { class: "flex flex-col", children: _jsx("button", { onclick: () => removeItem(key(), value.id, item.id), type: "button", class: "w-10 h-10 text-white text-sm bg-red-500 rounded-full shadow-md", children: "X" }) }), _jsx("div", { class: "flex flex-col", children: _jsx("button", { onclick: () => addExercise(item), type: "button", class: "w-10 h-10 text-white text-sm bg-blue-500 rounded-full shadow-md", children: "+" }) })] }) })) })] })) }) })] }) })] })] }));
}
export default CreateWorkout;
