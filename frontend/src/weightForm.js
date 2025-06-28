import { createStore } from "solid-js/store";
const [weights, setWeights] = createStore({
    created_at: '2024-03-02',
    scaleWeight: 75
});
const updateWeightField = (fieldName) => (event) => {
    const inputElement = event.currentTarget;
    if (inputElement.type === 'date') {
        setWeights(prev => ({
            ...prev, [fieldName]: String((inputElement.value))
        }));
        return;
    }
    setWeights(prev => ({
        ...prev, [fieldName]: Number((inputElement.value))
    }));
};
async function submitForm(token) {
    try {
        const data = await fetch('http://localhost:3001/api/weight/store', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                created_at: weights.created_at,
                scaleWeight: weights.scaleWeight,
            })
        });
    }
    catch (error) {
        console.log(error);
    }
}
export { submitForm, weights, setWeights, updateWeightField };
