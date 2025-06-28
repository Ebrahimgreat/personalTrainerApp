import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { createSignal, createEffect } from "solid-js";
import { useAuth } from "clerk-solidjs";
import { createResource } from "solid-js";
import { createStore } from "solid-js/store";
import CreaterChat from "./components/clients/chat/creater";
function Chat() {
    const { getToken } = useAuth();
    const [initialMessageFetch, setInitalMessage] = createSignal(false);
    const [lastMessage, setLastMessage] = createSignal(Date.now());
    const [newRecievedMessage, setNewRecievedMessage] = createSignal('');
    const fetchCurrentUser = async () => {
        const token = await getToken();
        const data = await fetch('http://localhost:3001/api/me', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data.json();
    };
    const [authUser] = createResource(fetchCurrentUser);
    const [user, setUser] = createStore({
        name: '',
        id: -1,
        roomNumber: -1
    });
    const [userId, setUserId] = createSignal(-1);
    const userSelected = async (item) => {
        setUserId(item.id);
        setUser('name', item.name),
            setUser('roomNumber', 1);
        console.log(user.id);
    };
    const getMessages = async () => {
        const token = await getToken();
        const data = await fetch(`http://localhost:3001/api/messages?id=${userId()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data.json();
    };
    const fetchRoomMembers = async () => {
        const token = await getToken();
        const data = await fetch('http://localhost:3001/api/roomMembers', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data.json();
    };
    const [messageStore, setMessageStore] = createStore({
        message: []
    });
    const [roomMembers] = createResource(fetchRoomMembers);
    const [messages, { refetch }] = createResource(userId, getMessages);
    const [newMessage, setNewMessage] = createSignal('');
    //Web Socket is opened up here
    const socket = new WebSocket('ws://localhost:3001/ws');
    socket.addEventListener('message', event => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (!data || !data.sender || !data.message) {
            console.log("MEssgae undefined");
            return;
        }
        setMessageStore('message', (current) => [
            ...current, {
                id: data.sender,
                message: data.message
            }
        ]);
    });
    console.log(messageStore.message);
    const [startTimer, setTimer] = createSignal(false);
    let timer = 0;
    createEffect(() => {
        console.log(lastMessage());
    });
    createEffect(() => {
        if (newMessage() != '') {
            socket.send(JSON.stringify({
                message: newMessage(),
                sender: authUser().id,
                reciever: userId(),
                type: 'message'
            }));
        }
    });
    createEffect(() => {
        if (role.role() != null) {
            socket.onopen = (event) => {
                console.log('Web Socket has been opned in the client side');
            };
            if (userId() !== -1) {
                console.log(messages().length);
                for (let i = 0; i < messages().length; i++) {
                    setMessageStore('message', (current) => [
                        ...current, {
                            id: messages()[i].id,
                            message: messages()[i].content,
                        }
                    ]);
                }
                socket.send(JSON.stringify({
                    reciever: userId(),
                    roomNumber: 1,
                    sender: authUser().id
                }));
                setInitalMessage(true);
                setTimer(true);
            }
        }
    });
    createEffect(() => {
        console.log("The value is ", startTimer());
        if (startTimer()) {
            setInterval(() => {
                const currentTime = Date.now();
                const difference = currentTime - lastMessage();
                if (difference > 60000) {
                    socket.send(JSON.stringify({
                        type: 'left',
                        sender: authUser().id
                    }));
                }
            }, 1000);
        }
    });
    const newMessageEntered = (event) => {
        console.log(authUser().id);
        event.preventDefault();
        setMessageStore('message', (current) => [
            ...current, {
                id: authUser().id,
                message: newMessage()
            }
        ]);
        setNewMessage('');
    };
    return (_jsx("div", { class: "flex flex-col", children: _jsx(CreaterChat, { setNewMessage: (item) => setNewMessage(item), setForm: (event) => newMessageEntered(event), newMessage: newMessage(), newRecievedMessage: newRecievedMessage(), messages: messageStore.message, userId: userId(), user: user, onUserClicked: (item) => userSelected(item), items: roomMembers() }) }));
}
export default Chat;
