import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
const [newClient, setNewClient] = createStore({
    name: '',
    emailAddress: '',
    password: '',
    confirmPassword: ''
});
const [errorSignal, setErrorSignal] = createSignal('');
async function submitForm() {
    try {
        const data = await fetch('http://localhost:3001/api/clients/store', {
            method: 'POST',
            body: JSON.stringify({
                item: newClient
            })
        });
    }
    catch (error) {
        console.log(error);
    }
}
const updateFields = (fieldName) => (event) => {
    console.log(fieldName);
    const inputElement = event.currentTarget;
    setNewClient(current => ({
        ...current, [fieldName]: String(((inputElement.value)))
    }));
    if (newClient.password !== newClient.confirmPassword) {
        setErrorSignal('Passwords Do not match');
    }
    if (newClient.password == newClient.confirmPassword) {
        setErrorSignal('Passwords match!');
    }
};
export { newClient, setNewClient, updateFields, errorSignal, setErrorSignal, submitForm };
