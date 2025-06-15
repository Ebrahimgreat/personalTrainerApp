import Library from "@/components/exercise/library";
import { useEffect, useState } from "react";
import { View,Text } from "react-native";


function Exercises()
{
    const[exercises,setExercises]=useState([]);
    useEffect(()=>{
        const fetchExercises=async()=>{
            try{
                const response=await fetch('http://localhost:3001/api/exercises/all');
                const json=await response.json();
                setExercises(json);
            }
            catch(error){
                console.log(error)
            }
        }
    })
    return(<View>
<Library>
    
</Library>

    </View>)

}
export default Exercises;