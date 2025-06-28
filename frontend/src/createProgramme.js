import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
1;
import { createResource, For, Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import Button from "./components/button";
const equipmentArray = ['Barbell', 'Dumbell', 'KettleBells', 'Body Weight', 'Cable'];
const bodyPart = ['Chest', 'Quads', 'Hamstrings', 'Rear Delts', 'Tricpes'];
const options = ['1-3', '3-6', '6-9', '10-12', '12-15', '15+'];
const [searchString, setSearchString] = createSignal('');
const [exerciseType, setExerciseType] = createSignal('');
const [equipment, setEquipment] = createSignal('');
const [selectedIndex, setSelectedIndex] = createSignal(-1);
const [save, setSave] = createSignal(false);
const [name, setName] = createSignal('');
const [selectedExercise, setSelectedExercise] = createSignal('');
const getExercises = async () => {
    const data = await fetch(`http://localhost:3001/api/exercise/all?exerciseName=${searchString()}&type=${exerciseType()}&equipment=${equipment()}`);
    return data.json();
};
import TotalWorkouts from "./components/programmeComponent/totalWorkouts";
import CreateNewProgramme from "./components/programmeComponent/programmeDescription";
import EditExercises from "./components/programmeComponent/editExercises";
import ExerciseLibrary from "./components/exercise/exerciseLibrary";
function CreateProgramme() {
    const [totalExercises, setTotalExercises] = createSignal(0);
    const [workoutSignal, setWorkoutSignal] = createSignal(-1);
    const [newProgramme, setNewProgramme] = createStore({
        name: '',
        workout: [],
        description: '',
        totalWorkouts: 0
    });
    const addExercise = (item) => {
        console.log(item.id);
        if (selectedIndex() == -1) {
            if (newProgramme.workout[workoutSignal()].exercise.find((value) => value.id == item.id)) {
                return;
            }
            setNewProgramme('workout', workoutSignal(), 'exercise', (current) => [
                ...current, {
                    id: item.id,
                    sets: 1,
                    name: item.name,
                    repRange: '1-3',
                    weight: 0
                }
            ]);
        }
        else {
            setNewProgramme('workout', workoutSignal(), 'exercise', selectedIndex(), (current) => ({
                ...current,
                name: item.name,
            }));
        }
    };
    const updateItem = (item) => {
        console.log(item);
        setSelectedExercise(item.name);
    };
    const removeitem = (key) => {
        setNewProgramme('exercise', (current) => current.filter((item) => item.id != key));
    };
    const removeWorkout = (index) => {
        setWorkoutSignal(-1);
        setNewProgramme('workout', (current) => current.filter((item) => item.id != index));
    };
    const editFields = (key, fieldName) => (event) => {
        console.log(fieldName);
        if (fieldName === 'repRange') {
            alert("IT is REP");
            console.log(fieldName);
            const selectElement = event.currentTarget;
            console.log(selectElement.value);
            setNewProgramme('workout', workoutSignal(), 'exercise', key, ((current) => ({
                ...current,
                [fieldName]: String(selectElement.value)
            })));
        }
        else {
            const inputElement = event.currentTarget;
            console.log(inputElement.value);
            setNewProgramme('workout', workoutSignal(), 'exercise', key, ((current) => ({
                ...current,
                [fieldName]: String(inputElement.value)
            })));
        }
    };
    const submitForm = async (event) => {
        event.preventDefault();
        console.log(newProgramme);
        try {
            const data = await fetch('http://localhost:3001/api/programme/store', {
                method: 'POST',
                body: JSON.stringify({
                    name: newProgramme.name,
                    description: newProgramme.description,
                    exercises: newProgramme.exercise
                })
            });
        }
        catch (error) {
            console.log;
        }
    };
    const removeExercise = (key) => {
        console.log(key);
        setNewProgramme('workout', workoutSignal(), 'exercise', (current) => current.filter((item) => item.id != key));
    };
    const addWorkoutInProgramme = async () => {
        setNewProgramme('workout', (current) => [
            ...current, {
                name: name(),
                id: newProgramme.workout.length,
                exercise: [],
            }
        ]);
        setWorkoutSignal(newProgramme.workout.length - 1);
        setSave(false);
        console.log(newProgramme.workout);
    };
    const saveExercise = () => {
        setSave(true);
        setWorkoutSignal(-1);
        console.log(newProgramme.workout);
    };
    createEffect(() => {
        console.log(workoutSignal());
    });
    createEffect(() => {
        if (newProgramme.workout.length == 0) { }
    });
    const [myExercises, setMyExercises] = createResource(() => [searchString(), exerciseType(), equipment()], ([search, type, equipment]) => getExercises());
    return (_jsxs("div", { class: "flex flex-col", children: [_jsx(For, { each: newProgramme.workout, children: (item) => (_jsx(For, { each: item.exercise, children: (value) => _jsx("p", { children: value }) })) }), _jsxs("div", { class: "grid grid-cols-1  md:grid-cols-3 gap-x-3 mb-10 ", children: [_jsx("div", { class: "h-full  overflow-y-auto", children: _jsx(ExerciseLibrary, { showProgramme: "No Programme", updatingExercise: (item) => addExercise(item), selectAction: workoutSignal(), types: bodyPart, typeSelected: exerciseType(), setTypeSelected: (item) => setExerciseType(item), myExercises: myExercises(), equipment: equipmentArray, equipmentSelected: equipment(), setEquipment: (item) => setEquipment(item), setSearchSelected: (item) => setSearchString(item), searchExercise: searchString() }) }), _jsxs(CreateNewProgramme, { headingText: "Create Programme", onDescriptionChange: (e) => setNewProgramme('description', e), name: newProgramme.name, onNameChange: (e) => setName(e), description: newProgramme.description, onSubmit: submitForm, children: [_jsx(Show, { when: save() == true || workoutSignal() == -1, children: _jsx("div", { class: "mb-6", children: _jsx(Button, { type: 'button', onClick: () => addWorkoutInProgramme(), children: "Add Workout" }) }) }), _jsx(Show, { when: workoutSignal() != -1 && newProgramme.workout[workoutSignal()], children: _jsx("div", { class: "mb-5", children: _jsx("input", { class: ` w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none `, value: newProgramme.workout[workoutSignal()].name, onchange: (e) => setNewProgramme('workout', workoutSignal(), 'name', e.currentTarget.value), type: "text" }) }) }), _jsx(Show, { when: workoutSignal() != -1, children: _jsx("div", { class: "flex flex-row justify-between", children: _jsx(Button, { type: "button", onClick: () => saveExercise(), children: "Save" }) }) }), _jsx(For, { each: newProgramme.workout, children: (item, key) => _jsx("div", { class: "flex flex-row justify-between" }) }), _jsxs("div", { children: [_jsx(TotalWorkouts, { workoutSignal: workoutSignal(), removeItem: (index) => removeWorkout(index), setWorkoutSignal: (index) => setWorkoutSignal(index), items: newProgramme.workout, onClick: (index) => setWorkoutSignal(index) }), _jsx(Show, { when: save(), children: _jsx(Button, { type: "submit", children: "Submit" }) })] })] }), _jsx("div", { class: "shadow-lg mt-4 overflow-y-scroll px-5 py-3 bg-white min-w-[450px] max-w-[450px]", children: _jsx(Show, { when: workoutSignal() != -1 && newProgramme.workout[workoutSignal()], children: _jsx("div", { class: "", children: _jsx(EditExercises, { selectedIndex: selectedIndex(), setSelectedIndex: (item) => setSelectedIndex(item), onRemove: (index) => removeExercise(index), onNameChange: (index) => editFields(index, 'name'), onSetChange: (index) => editFields(index, 'set'), onRepRangeChange: (index) => editFields(index, 'repRange'), onWeightChange: (index) => editFields(index, 'weight'), items: newProgramme.workout[workoutSignal()].exercise, name: newProgramme.workout[workoutSignal()].name }) }) }) })] })] }));
}
export default CreateProgramme;
