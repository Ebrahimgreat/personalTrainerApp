import { query, useLocation } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { createStore, Store } from "solid-js/store";
import TemplateDescription from "./components/template/templateDescription";
import { Location } from "@solidjs/router";
import ExerciseLibrary from "./components/exercise/exerciseLibrary";
import { hc } from "hono/client";
import { myExerciseType } from "../../backend/src/routes/exercise";
import { types } from "util";
import TemplateExercises from "./components/template/templateExercises";
import type { myTemplate } from "../../backend/src/routes/template";
import { exercise } from "./components/CreateExerciseForm";
import { Exercise } from "../../backend/src/db/schema";
import { createSign } from "crypto";
import { Show } from "solid-js";
import { Badge } from "./components/ui/ui/badge";
import { useAuth } from "clerk-solidjs";
import { getAuth } from "@hono/clerk-auth";
const client=hc<myExerciseType>('http://localhost:3001/api/exercise')
const templateClient=hc<myTemplate>('http://localhost:3001/api/template')
const equipment:string[]=['Barbell','Dumbell','KettleBells','Body Weight','Cable','Machine']
const bodyPart:string[]=['Chest','Quads','Hamstrings','Rear Delts','Tricpes']
const[typeSelected,setTypeSelected]=createSignal('Type')
const[searchExercise,setSearchExercise]=createSignal('')
const [equipmentSelected,setEquipment]=createSignal('Equipment')
const[mainAutoSaving,setMainAutoSaving]=createSignal(false)
const[templateExerciseSaving,setTemplateExerciseSaving]=createSignal(false)
const[mountedTemplate,setMountedTemplate]=createSignal(true)
const[templateDeletionExercise,setTemplateDeletionExercise]=createSignal(false)
const[templateAdditionExercises,setTemplateAdditionExercise]=createSignal(false)
const[templateUpdateExercisesSave,setTemplateExercises]=createSignal(false)
type Template={ 
    name:string

}
type Details={
    id:number,
    repRange:string,
    sets:string,
    exercise:Exercise

}

type TemplateDetail={
   details:Details[]
    
}


function Template()
{
    const {getToken}=useAuth();
    const location=useLocation();
    const id=location.search.slice(4)


 console.log("ID",id)

const updateData=async(key:number,field:string,value:number)=>{
    console.log(value)
    if(field=="sets"){
       setMyTemplateExercises('details',key,(current)=>({
        ...current,
        sets:value
       }))
      
     

}
if(field=="reps"){
    console.log("reps")
    setMyTemplateExercises('details',key,(current)=>({
        ...current,
            repRange:value
        

    }))
}
setTemplateExerciseSaving(true);

const timeout=setTimeout(()=>{
    setTemplateExerciseSaving(false)
  },2000)
 
try{
    const token=await getToken();
    const data=await fetch('http://localhost:3001/api/template/updateRecord',{

        method:"POST",
        headers:{
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
            exercise_id:Number(myTemplateExercises.details[key].exercise.id),
            repRange:myTemplateExercises.details[key].repRange,
            sets:Number(myTemplateExercises.details[key].sets),
            template_id:Number(id)

        })
    })
}
catch(error){
    console.log(error)
}


}
const [myTemplateStore,SetmyTemplateStore]=createStore<Template>({
    name:''
})
const[myTemplateExercises,setMyTemplateExercises]=createStore<TemplateDetail>({
    details:[]
})
    const getTemplate=async()=>{
        const response=templateClient.index.$get({
            query:{
                id:id
            }
        })
        setMountedTemplate(false)
      return (await response).json();

  



        
    }

    const updateMainTemplate=async()=>{
        try{
    
            const token=await getToken();
            const data=await fetch('http://localhost:3001/api/template/updateMain',{
                method:"POST",
                headers:{
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({
                    id:Number(id),
                    name:myTemplateStore.name
                })
            })
        }
        catch(error){
            console.log(error)
        }
        

    }

    const updateTemplateExercises=async()=>{
        try{
            const data=await fetch('http://localhost:3001/api/template/updateTemplateExercises',{
                method:"POST",
                body:JSON.stringify({
                    id:id,
                    details:myTemplateExercises.details
                })
            })

        }
        catch(error){
            console.log(error)
        }
    }

    
    const addExerciseToTemplate=async(item:Exercise)=>{

        for(let i=0; i<myTemplateExercises.details.length; i++)
        {
            if(myTemplateExercises.details[i].exercise.id==item.id)
            {
            return;

            }
        }
       setMyTemplateExercises('details',(current)=>[
        ...current,{
            id:myTemplateExercises.details.length+1,
            repRange:"5",
            sets:1,
            exercise:{
                id:item.id,
                name:item.name,
                equipment:item.equipment,
                type:item.type
            }

        }
       ])

       setTemplateAdditionExercise(true);
const timeout=setTimeout(()=>{
    setTemplateAdditionExercise(false)
  },2000)
 
 

       try{
        const token=await getToken();
       const data=await fetch('http://localhost:3001/api/template/addExercise',{
        method:"POST",
        headers:{
            'Authorization':`Bearer ${token}`


        },
        body:JSON.stringify({
            template_id:Number(id),
            exercise_id:Number(item.id),
            repRange:"5",
            sets:1
       

        })
       })

    }
    catch(error){
        console.log(error)
    }
}
    const getExercises=async()=>{
        const response=await client.all.$get({
            query:{
                exerciseName:searchExercise(),
                type:typeSelected(),
                equipment:equipmentSelected()


            }
        })
        return await response.json();
    }
    

   

const deleteItem=async(item:object)=>{
    console.log(item)
setMyTemplateExercises('details',((current)=>current.filter((value)=>value.id!=item.id)))

setTemplateDeletionExercise(true);
const timeout=setTimeout(()=>{
    setTemplateDeletionExercise(false)
  },2000)
 
 
try{
    const token=await getToken();
    const data=await fetch('http://localhost:3001/api/template/deleteExercise',{
        method:"POST",
        headers:{
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
            id:Number(item.id)

        })
    })
   
}
catch(error){
    console.log(error)
}


}

   

     const [myTemplate]=createResource(getTemplate)



     createEffect(()=>{
        if(myTemplate()){
            SetmyTemplateStore('name',myTemplate()?.name?? "")
          if(myTemplate()?.programmeDetails)
          {
            for(let i=0; i<myTemplate()?.programmeDetails.length; i++ ){
                setMyTemplateExercises('details',(current)=>[
                    ...current,{
                        id:myTemplate()?.programmeDetails[i].id,
                        repRange:myTemplate()?.programmeDetails[i].repRange,
                        sets:myTemplate()?.programmeDetails[i].sets,
                        exercise:{
                            id:myTemplate()?.programmeDetails[i].exercise.id,
                            name:myTemplate()?.programmeDetails[i].exercise.name,
                            type:myTemplate()?.programmeDetails[i].exercise.equipment,
                            equipment:myTemplate()?.programmeDetails[i].exercise.equipment

                        }

                    }
                ])
            }
          }
     
        }
     })
  
   createEffect(()=>{
  if(myTemplate())
  {
    if(myTemplate()?.name==myTemplateStore.name)
    {
        return;
    }
    setMainAutoSaving(true)
    updateMainTemplate();
    const timeout=setTimeout(()=>{
        setMainAutoSaving(false)
     },2000)


  }
   })

   


     const[myExercises]=createResource(()=>[searchExercise(),typeSelected(),equipmentSelected()],
     ([search,type,equipment])=>getExercises());
    return(



       <div class="flex flex-col w-full">
        <h1 class="text-3xl font-semibold text-gray-900">
            Edit Template
        </h1>
 
       
       <div class="flex flex-row justify-between">


          <p class="text-gray-900 text-sm">
            Make Change to Your Template
          </p>
            <Show when={mainAutoSaving() ||  templateExerciseSaving() || templateDeletionExercise() ||templateAdditionExercises() || templateUpdateExercisesSave() }>
          
              
                      <Badge class="bg-blue-50 text-blue-600 border border-blue-100 animate-pulse">
            {"Auto Saving..."}
          </Badge>
          </Show>
          

</div>

        <div class="grid grid-cols-2 justify-between gap-x-3">
            <div class="flex flex-col">

            
            <TemplateDescription onChange={(item)=>SetmyTemplateStore('name',item)} templateName={myTemplateStore.name}>

            </TemplateDescription>
    

        
        <TemplateExercises onChange={(id,field,number)=>updateData(id,field,number)} onDelete={(item)=>deleteItem(item)} detail={myTemplateExercises.details}/>
            </div>

   
    <ExerciseLibrary updatingExercise={(item)=>addExerciseToTemplate(item)} searchExercise={searchExercise()} setTypeSelected={(item)=>setTypeSelected(item)} setEquipment={(item)=>setEquipment(item)} setSearchSelected={(item)=>setSearchExercise(item)} equipmentSelected={equipmentSelected()} typeSelected={typeSelected()} types={bodyPart} showProgramme="No Programme"  equipment={equipment} myExercises={myExercises()}/>
</div>
</div>

        
        
    )

}
export default Template;