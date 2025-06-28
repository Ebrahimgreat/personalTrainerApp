import { createContext } from "solid-js";
import { createStore } from "solid-js/store";
const initalState = {
    scaleWeight: 0,
    created_at: ''
};
const weightContext = createContext();
export function WeightContext(props) {
    const [newWeight, setNewWeight] = createStore({
        scaleWeight: 0,
        created_at: ''
    });
    const weight = [
        newWeight, {}
    ];
}
