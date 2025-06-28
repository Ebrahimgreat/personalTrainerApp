import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { createSignal, onMount } from "solid-js";
function Testing() {
    const [messages, setMessage] = createSignal([]);
    const fetchData = async () => {
        const socket = new WebSocket('ws://localhost:3001/ws');
        socket.addEventListener('open', (ws) => {
            socket.send("Fuck you");
            socket.send('Hi');
        });
        socket.onmessage = (ev) => {
            console.log(ev);
        };
        socket.CONNECTING;
        socket.onerror = (error) => {
            console.log('error', error.target);
        };
        console.log('I am running');
    };
    onMount(() => {
        fetchData();
    });
    return (_jsx("div", {}));
}
export default Testing;
