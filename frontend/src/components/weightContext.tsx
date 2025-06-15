import { createContext } from "solid-js";
import { createStore } from "solid-js/store";
type Weight={
    scaleWeight:number,
    created_at:string
}
const initalState:Weight={
    scaleWeight:0,
    created_at:''
}

const weightContext=createContext()

export function WeightContext(props){
    const[newWeight,setNewWeight]=createStore<Weight>({
        scaleWeight:0,
        created_at:''
    })
    const weight=[
        newWeight,{
            
        }
    ]

}