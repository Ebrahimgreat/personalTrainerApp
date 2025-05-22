import { useEffect, useState } from "react";
import { View,Text, TextInput,StyleSheet } from "react-native"
function Library()
{

    const[exercises,setExercises]=useState<string[]>([])
    const[exerciseName,setExerciseName]=useState('');
    const[exerciseType,setExerciseType]=useState('')

const fetchData=async()=>{
    try{
        const res=await fetch(`http://localhost:3001/api/exercise/all?exerciseName=${exerciseName}&type=${exerciseType}&equipment=`,{
            method:'GET',
            
        })
        const data=await res.json();
        setExercises(data)
 
    }
    catch(error)
    {
        console.log(error)
    }
}

useEffect(()=>{
   fetchData()
},[exerciseName])
    return(

        <View style={styles.container}>
            <Text>
                Exercise Library
            </Text>
           Name {exerciseName}
            <TextInput onChange={(e)=>setExerciseName(e.currentTarget.value)} value={exerciseName} style={styles.input}>

            </TextInput>
            {exercises.map((item,index)=>(
                <Text>
                    {item.name}
                    </Text>

            ))}
          
         
            
               
          
            

        </View>

    )

}
export default Library;
const styles=StyleSheet.create({
   

    container:{
        backgroundColor:'#fff'

    },
    input:{
        height:30,
        margin:12,
        borderWidth:1,
        padding:10,
    }

})