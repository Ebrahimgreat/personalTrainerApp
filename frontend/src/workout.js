import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { createResource, createSignal } from "solid-js";
import Button from "./components/button";
import { useNavigate } from "@solidjs/router";
import { createStore } from "solid-js/store";
import { useSearchParams } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
function Workout() {
    const { getToken } = useAuth();
    const navigateToCreateWeight = (item) => {
        setSearchParams({ name: item });
        navigate(`/createWorkout?id=${item}`);
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const [newWorkout, setNewWorkout] = createStore({
        exercise: []
    });
    const columns = ['name', 'date', 'programme', 'view'];
    const keys = [{ name: 'name' }, { name: 'created_at', format: 'date' }];
    const view = [
        { name: 'view', value: (item) => {
                setSearchParams({ date: item.created_at });
                navigate(`/workout/show?date=${item.created_at}`);
            } }
    ];
    const actions = [
        { name: 'delete', value: (item) => {
                if (item != null) {
                    console.log(item);
                    deleteItem(item);
                }
            } }
    ];
    const fetchData = async () => {
        const token = await getToken();
        console.log(token);
        const data = await fetch('http://localhost:3001/api/workout', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data.json();
    };
    const deleteItem = async (item) => {
        try {
            console.log(item);
            const message = confirm('Are You sure you want to delete this?');
            if (message === true) {
                const data = await fetch('http://localhost:3001/api/workout/remove', {
                    method: 'POST',
                    body: JSON.stringify({
                        item: item
                    })
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    const [myWorkout] = createResource(fetchData);
    const [exerciseSignal, setExerciseSignal] = createSignal('');
    const fetchExercises = async () => {
        const data = await fetch(`http://localhost:3001/api/exercise?name=${exerciseSignal()}`, {
            method: 'GET'
        });
        return data.json();
    };
    const [exercises] = createResource(exerciseSignal, fetchExercises);
    const navigate = useNavigate();
    const getStats = async () => {
        const data = await fetch(`http://localhost:3001/api/workout/stats?id=${exerciseSelected()}`, {
            method: "GET"
        });
        return data.json();
    };
    const [exerciseSelected, setExerciseSelected] = createSignal('');
    const [myStats] = createResource(exerciseSelected, getStats);
    function updateFields() {
        console.log(newWorkout.exercise);
        setNewWorkout('exercise', (current) => [
            ...current, {
                name: 'Hello',
                reps: 0,
                weight: 0
            }
        ]);
    }
    return (_jsx("div", { class: "flex flex-col", children: _jsxs("div", { class: "flex items-center flex-row  justify-between mt-5", children: [_jsx(Button, { class: "w-32", onClick: () => navigateToCreateWeight(0), children: "Add Workout" }), _jsx(Button, { class: "w-32", onClick: () => navigateToCreateWeight(1), children: "Create From Programme" })] }) }));
}
export default Workout;
