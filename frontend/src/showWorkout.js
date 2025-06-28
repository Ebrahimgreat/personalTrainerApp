import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { createResource, createSignal, For, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Button from "./components/button";
import { useLocation } from "@solidjs/router";
import { createStore } from "solid-js/store";
function ShowWorkout() {
    const [count, setCount] = createSignal(0);
    const location = useLocation();
    const navigate = useNavigate();
    const [workoutDate, setWorkoutDate] = createSignal(location.search.slice(6));
    let exercises = [];
    const fetchExercises = async () => {
        try {
            const data = await fetch('http://localhost:3001/api/exercise/all', {
                method: 'GET'
            });
            return data.json();
        }
        catch (error) {
            console.log(error);
        }
    };
    const [workoutEditStore, setWorkoutEditStore] = createStore({
        count: 0,
        editWorkout: []
    });
    const [myExercise] = createResource(fetchExercises);
    const fetchData = async () => {
        const data = await fetch(`http://localhost:3001/api/workout/show?date=${workoutDate()}`, {
            method: 'GET'
        });
        return data.json();
    };
    const getStats = async () => {
        const data = await fetch(`http://localhost:3001/api/workout/stats?id=${showStats()}`, {
            method: "GET"
        });
        return data.json();
    };
    const [myWorkout] = createResource(workoutDate, fetchData);
    const [showStats, setShowStats] = createSignal(0);
    const [myStats] = createResource(showStats, getStats);
    const [edit, setEdit] = createSignal(false);
    function deleteItem(id) {
        setWorkoutEditStore('editWorkout', (current) => current.filter((item) => item.tempId != id));
    }
    function addExercise() {
        console.log(workoutEditStore.editWorkout);
        setWorkoutEditStore('editWorkout', (current) => [
            ...current, {
                tempId: workoutEditStore.editWorkout.length,
                id: 0,
                name: myExercise()[0].name,
                reps: 0,
                set: 0,
                weight: 0,
                rir: 0,
                exercise_id: myExercise()[0].id,
                workout_id: myWorkout().id,
            }
        ]);
    }
    function updateFields() {
        for (let i = 0; i < myWorkout().workoutDetail.length; i++) {
            setWorkoutEditStore('editWorkout', (current) => [
                ...current,
                {
                    tempId: workoutEditStore.editWorkout.length,
                    id: myWorkout().workoutDetail[i].id,
                    name: myWorkout().workoutDetail[i].exercise.name,
                    reps: myWorkout().workoutDetail[i].reps,
                    set: myWorkout().workoutDetail[i].set,
                    weight: myWorkout().workoutDetail[i].weight,
                    rir: myWorkout().workoutDetail[i].rir,
                    workout_id: myWorkout().workoutDetail[i].workout_id,
                    exercise_id: myWorkout().workoutDetail[i].exercise_id,
                }
            ]);
        }
        console.log('function has execgtuerd');
        console.log(workoutEditStore.editWorkout);
    }
    const editFields = (fieldName, key) => (event) => {
        const inputElement = event.currentTarget;
        if (fieldName === 'name') {
            console.log(myExercise());
            const exercise_id = myExercise().find((item) => item.name == inputElement.value);
            setWorkoutEditStore('editWorkout', key, (current) => ({
                ...current,
                name: inputElement.value,
                exercise_id: exercise_id.id
            }));
            console.log(workoutEditStore);
        }
        else {
            setWorkoutEditStore('editWorkout', key, (current) => ({
                ...current,
                [fieldName]: Number(inputElement.value)
            }));
            console.log(workoutEditStore);
        }
    };
    async function updateInformation() {
        console.log(workoutEditStore.editWorkout);
        const data = await fetch(`http://localhost:3001/api/workout/update?id=${myWorkout().id}`, {
            method: "POST",
            body: JSON.stringify({
                item: workoutEditStore.editWorkout
            })
        });
    }
    createEffect(() => {
        console.log(workoutEditStore);
    });
    createEffect(() => {
        console.log(edit());
    });
    createEffect(() => {
        if (myWorkout.loading) {
            return;
        }
        if (count() == 0) {
            if (myWorkout() && myWorkout().workoutDetail.length > 0) {
                updateFields();
                fetchExercises();
                setCount(1);
            }
        }
    });
    return (_jsxs("div", { children: [edit(), _jsxs(Show, { when: myWorkout(), children: [_jsx("input", { type: "date", class: "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500", onChange: (e) => setWorkoutDate(e.currentTarget.value), value: workoutDate() }), _jsx("h1", { class: "font-bold text-4xl text-center", children: myWorkout().name }), _jsx(Button, { onClick: updateFields, children: "Modify Workout" }), _jsxs("div", { class: "bg-[#2f3134] border w-full text-white shadow-lg mt-4 max-h-[300px] min-h-[300px] overflow-y-scroll px-3 ", children: [_jsx("div", { class: "text-center" }), _jsx(For, { each: myWorkout().workoutDetail, children: (item, index) => (_jsxs("div", { class: "flex flex-row justify-evenly mt-3 shadow-md my-2", children: [_jsxs("p", { children: ["# ", index() + 1] }), _jsx("p", { class: "w-16 font-bold text-lg", children: item.exercise.name }), _jsxs("p", { class: "w-16 text-gray-300", children: ["Set: ", item.set] }), _jsxs("p", { class: "w-16 text-gray-300", children: [" Reps:   ", item.reps] }), _jsxs("p", { class: "w-16 text-gray-300", children: ["Weight: ", item.weight] }), _jsxs("p", { class: "w-16 text-gray-300", children: ["RIR: ", item.rir] }), _jsx(Button, { class: "w-24 h-8", onClick: () => setShowStats(item.exercise_id), children: "Progression" })] })) })] }), _jsx(Show, { when: myStats() != 0, children: _jsxs("div", { class: "bg-[#2f3134] border w-full text-white shadow-lg mt-4 max-h-[200px] min-h-[200px] overflow-y-scroll px-3", children: [_jsx(Button, { onClick: () => setShowStats(0), children: "Hide" }), _jsx(For, { each: myStats(), children: (item, key) => (_jsx("p", { class: "text-center font-bold", children: key() == 0 ? `Progression For ${item.exercise.name}` : '' })) }), _jsx(For, { each: myStats(), children: (item) => _jsxs("div", { class: "flex flex-row  justify-between p-3", children: ["Date : ", new Date(item.workout.created_at).toLocaleDateString(), _jsxs("p", { children: ["Set: ", item.set] }), _jsxs("p", { children: ["Reps:", item.reps] }), _jsxs("p", { children: ["weight:", item.weight] })] }) })] }) })] }), _jsx(Button, { onClick: () => setEdit(prev => !prev), children: "Edit" }), _jsxs(Show, { when: edit(), children: [_jsx("div", { class: "bg-[#2f3134] border w-full text-white shadow-lg mt-4 max-h-[200px] min-h-[200px] overflow-y-scroll px-3", children: _jsxs("table", { children: [_jsx("thead", { class: "bg-pink-500 text-white", children: _jsxs("tr", { children: [_jsx("th", { class: "px-4 py-2 border border-gray-300", children: "Name" }), _jsx("th", { class: "px-4 py-2 border border-gray-300", children: "Reps" }), _jsx("th", { class: "px-4 py-2 border border-gray-300", children: "Weight" }), _jsx("th", { class: "px-4 py-2 border border-gray-300", children: "Set" }), _jsx("th", { class: "px-4 py-2 border border-gray-300", children: "Rir" }), _jsx("th", { class: "px-4 py-2 border border-gray-300", children: "Remove" })] }) }), _jsx(For, { each: workoutEditStore.editWorkout, children: (item, key) => (_jsxs("tr", { children: [_jsx("td", { class: "px-4 py-2", children: _jsx("select", { value: item.name, onChange: editFields('name', key()), children: _jsx(For, { each: myExercise(), children: (value) => _jsx("option", { children: value.name }) }) }) }), _jsx("td", { class: "px-4 py-2", children: _jsx("input", { type: "number", class: "border border-gray-300 rounded-lg px-4 py-2 ", value: item.reps, onChange: editFields('reps', key()) }) }), _jsx("td", { class: "px-4 py-2", children: _jsx("input", { type: "number", class: "border border-gray-300 rounded-lg px-4 py-2 ", value: item.weight, onChange: editFields('weight', key()) }) }), _jsx("td", { class: "px-4 py-2", children: _jsx("input", { type: "number", class: "border border-gray-300 rounded-lg px-4 py-2 ", value: item.set, onChange: editFields('set', key()) }) }), _jsx("td", { class: "px-4 py-2 ", children: _jsx("input", { type: "number", class: "border border-gray-300 rounded-lg px-4 py-2", value: item.rir, onChange: editFields('rir', key()) }) }), _jsx("td", { class: "px-4 py-2", children: _jsx(Button, { onClick: () => deleteItem(item.tempId), children: "Remove" }) })] })) })] }) }), _jsxs("div", { class: "flex flex-row justify-around", children: [_jsx(Button, { onClick: () => addExercise(), children: "Add Exercise" }), _jsx(Button, { onClick: () => updateInformation(), children: "Update" })] })] })] }));
}
export default ShowWorkout;
