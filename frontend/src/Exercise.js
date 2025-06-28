import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { createEffect, createResource, createSignal, For, Show } from "solid-js";
import Button from "./components/ui/button";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import AboutExercise from "./components/exercise/about";
import ExerciseInstructions from "./components/exercise/instructions";
import { hc } from "hono/client";
const client = hc('http://localhost:3001/api/exercise');
import ExerciseLibrary from "./components/exercise/exerciseLibrary";
import Dialog, { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { TextField, TextFieldLabel, TextFieldRoot } from "./components/ui/textfield";
import { TextArea } from "@kobalte/core/text-field";
import { useAuth } from "clerk-solidjs";
const equipment = ['Barbell', 'Dumbell', 'KettleBells', 'Body Weight', 'Cable', 'Machine'];
const bodyPart = ['Chest', 'Quads', 'Hamstrings', 'Rear Delts', 'Tricpes'];
const [typeSelected, setTypeSelected] = createSignal('Type');
const [searchExercise, setSearchExercise] = createSignal('');
const [equipmentSelected, setEquipment] = createSignal('Equipment');
const [newExercise, setNewExercise] = createStore({
    name: "",
    type: "Chest",
    equipment: "Barbell",
    instructions: ""
});
function Exercise() {
    const { getToken, isSignedIn } = useAuth();
    const submitExercise = async (event) => {
        event.preventDefault();
        try {
            const token = await getToken();
            const data = await fetch('http://localhost:3001/api/exercise/store', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: newExercise.name,
                    equipment: newExercise.equipment,
                    type: newExercise.type,
                    instructions: newExercise.instructions
                })
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    const navigate = useNavigate();
    const filters = ['Chest', 'Triceps', 'Bicep', 'Quads', 'Hamstrings'];
    const fetchData = async () => {
        const response = await client.all.$get({
            query: {
                searchExercise: searchExercise(),
                type: typeSelected(),
                equipment: equipmentSelected()
            }
        });
        return await response.json();
    };
    const [myExercises, setMyExercises] = createResource(() => [searchExercise(), typeSelected(), equipmentSelected()], ([search, type, equipment]) => fetchData());
    const [myExerciseSelected, setMyExerciseSelected] = createStore({
        name: '',
        type: 'Chest',
        instructions: '',
        equipment: 'Barbell',
        targetMuscleGroup: ''
    });
    const updateExercise = (item) => {
        console.log('hello');
        setMyExerciseSelected('instructions', item.instructions),
            setMyExerciseSelected('name', item.name),
            setMyExerciseSelected('type', item.type);
        setMyExerciseSelected('equipment', item.equipment);
        setMyExerciseSelected('targetMuscleGroup', item.type);
    };
    createEffect(() => {
        if (!isSignedIn()) {
            navigate('/');
        }
    });
    createEffect(() => {
        if (typeSelected() === 'No option') {
            setTypeSelected('');
        }
        if (equipmentSelected() == 'No option') {
            setEquipment('');
        }
    });
    const [exercise, setExerciseSelected] = createSignal('');
    return (_jsxs("div", { class: "flex flex-col w-full", children: [_jsx(Show, { when: myExercises.loading, children: _jsxs("div", { class: "flex justify-center items-center p-4", children: [_jsxs("svg", { class: "size-6 text-gray-500 animate-spin", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [_jsx("circle", { class: "opacity-25", cx: "12", cy: "12", r: "10", "stroke-width": "4" }), _jsx("path", { class: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" })] }), _jsx("span", { children: "Loading" })] }) }), _jsx("h1", { class: "text-3xl font-semi-bold text-gray-900 ", children: "Exercises" }), _jsxs("div", { class: "flex flex-row justify-between mb-10", children: [_jsx("p", { class: "text-gray-600 text-sm", children: "Search For existing exercises,view them and create your custom exercises" }), _jsxs(Dialog, { children: [_jsx(DialogTrigger, { children: _jsx(Button, { children: "Create Exercise" }) }), _jsx(DialogContent, { class: "bg-white flex flex-col", children: _jsxs("form", { onSubmit: submitExercise, children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Create Exercise" }), _jsx(DialogDescription, { children: "This will create a new exercise" })] }), _jsxs(TextFieldRoot, { class: "flex flex-col", children: [_jsx(TextFieldLabel, { children: "Name" }), _jsx(TextField, { required: true, value: newExercise.name, onChange: (e) => setNewExercise('name', e.currentTarget.value) }), _jsx(TextFieldLabel, { children: "Equipment" }), _jsx("select", { required: true, value: newExercise.equipment, onChange: (e) => setNewExercise('equipment', e.currentTarget.value), children: _jsx(For, { each: equipment, children: (item) => _jsx("option", { children: item }) }) }), _jsx(TextFieldLabel, { children: "Type" }), _jsx("select", { value: newExercise.type, onChange: (e) => setNewExercise('type', e.currentTarget.value), children: _jsx(For, { each: bodyPart, children: (item) => _jsx("option", { value: item, children: item }) }) }), _jsx(TextFieldLabel, { children: "Instructions" }), _jsx(TextArea, { required: true, value: newExercise.instructions, onChange: (e) => setNewExercise('instructions'), class: "border" })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", children: "Cancel" }), _jsx(Button, { type: "submit", children: "Submit" })] })] }) })] })] }), _jsx(Show, { when: myExercises(), children: _jsxs("div", { class: "grid grid-cols-1 md:grid-cols-2 w-full h-[80vh]   justify-start gap-x-3", children: [_jsx(ExerciseLibrary, { showProgramme: "No Programme", setEquipment: (item) => setEquipment(item), setTypeSelected: (item) => setTypeSelected(item), updatingExercise: (item) => updateExercise(item), myExercises: myExercises(), typeSelected: typeSelected(), types: bodyPart, setSearchSelected: (item) => setSearchExercise(item), searchExercise: searchExercise(), equipmentSelected: equipmentSelected(), equipment: equipment }), _jsxs("div", { class: "flex flex-col  gap-x-4 gap-y-5 w-full", children: [_jsx(Show, { when: myExerciseSelected.name == '', children: _jsxs("div", { class: "bg-white shadow-md  min-h-full max-h-full flex flex-col items-center justify-center  text-black", children: [_jsx("img", { class: "rounded-full border h-16 w-16  object-cover bg-black", src: '/src/assets/icons/exerciseSvg.svg' }), _jsx("label", { class: "block w-full text-center font-bold ", children: "Select  exercise" }), _jsx("span", { class: "font-extralight", children: "Start By selecting an exercise from the library." })] }) }), _jsxs(Show, { when: myExerciseSelected.name != '', children: [_jsx(AboutExercise, { targetMuscleGroup: myExerciseSelected.targetMuscleGroup, name: myExerciseSelected.name, equipment: myExerciseSelected.equipment }), _jsx("div", { class: "flex flex-col h-full", children: _jsx("div", { class: "", children: _jsx(ExerciseInstructions, { instruction: myExerciseSelected.instructions }) }) })] })] })] }) })] }));
}
export default Exercise;
