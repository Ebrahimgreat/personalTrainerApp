import { createStore } from "solid-js/store";
const [exercise, setExercise] = createStore({
    name: '',
    type: ''
});
async function submitForm() {
    try {
        const data = await fetch('http://localhost:3001/api/exercise/store', {
            method: 'POST',
            body: JSON.stringify({
                name: exercise.name,
                description: exercise.type
            })
        });
    }
    catch (error) {
        console.log(error);
    }
}
export { exercise, setExercise, submitForm };
