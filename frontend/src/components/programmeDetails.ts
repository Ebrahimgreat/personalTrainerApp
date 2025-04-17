import { createStore } from "solid-js/store"

type Programme={

    exercise:[{
        name:string,
        repRange:String
        
    }]
}
const[programmeDetails,setProgrammeDetails]=createStore<Programme>({
   
    exercise:''

})

const updateProgrammeDetails=(item:object)=>{
    console.log

  const newExercise=item.map((value)=>({
    exercise:value.exercise.name,
    sets:value.sets,
    repRange:value.repRange


    
  }))
 setProgrammeDetails('exercise',newExercise)


}
export{programmeDetails,setProgrammeDetails,updateProgrammeDetails};


