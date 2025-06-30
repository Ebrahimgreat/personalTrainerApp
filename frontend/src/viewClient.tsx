import { useLocation } from "@solidjs/router";
import { createResource,Show ,For, createSignal, createEffect, createMemo, children} from "solid-js";
import Card from "./components/card";
import ManagerClientHeader from "./components/clientPage/Manager/managerClientHeader";
import TabBar from "./components/ui/tabBar";
import Exercise from "./Exercise";
import AboutExercise from "./components/exercise/about";
import { createStore } from "solid-js/store";
import ClientStats from "./components/clientPage/stats/clientStats";
import Settings from "./components/clientPage/Manager/settings";
import { useNavigate } from "@solidjs/router";
import BodyWeight from "./components/clientPage/bodyWeight";
import AssignedProgramme from "./components/clientPage/Manager/assignedProgramme/assignedProgramme";
import Notes from "./components/clientPage/overview/notes";
import WorkoutProgramme from "./components/clientPage/Manager/workoutProgramme";
import WorkoutProgrammeOverview from "./components/clientPage/overview/workoutProgrammeOverview";
import ClientWorkoutHistory from "./components/clientPage/stats/clientWorkoutHistory";
import WorkoutStats from "./components/clientPage/workoutStats/workoutStats";
import MeasurementLibrary from "./components/clientPage/measurements/measurementLibrary";
import MeasurementScreen from "./components/clientPage/measurements/measurementRightScreen";
import ExerciseLibrary from "./components/exercise/exerciseLibrary";
import { useAuth } from "clerk-solidjs";
import Button from './components/ui/button';
import Tabs, { TabsContent, TabsIndicator, TabsList, TabsTrigger } from "./components/ui/tabs";
const tabBarItems:string[]=['Overview','Assigned Programme','Body Measurements', 'Weekly Stats', 'Exercise Statistics','Settings']
import {MeasurementType} from "../../backend/src/routes/measurements";
import { clientWorkoutHistoryType } from "../../backend/src/routes/clients";
import { hc, InferResponseType } from "hono/client";
import { getAuth } from "@hono/clerk-auth";
import WorkoutHistory from "./components/clientPage/Manager/assignedProgramme/workoutHistory";
import type { WorkoutHistoryType } from "./types/workoutHistory";
const client=hc<MeasurementType>('${import.meta.env.VITE_API_URL}/api/measurements')
import { Suspense } from "solid-js";
import { measurementsData, programmeWorkout, workout } from "../../backend/drizzle/schema";
import { Badge } from "./components/ui/ui/badge";
import { ref } from "process";
import { createSign } from "crypto";

type clientDetails={
    name:string,
    age:number,
    notes:string
}


type measurementArray={
    id:number,
    created_at:string,
    value:number
}
type Measurement={
    name:string,
    measurement_id:number,
    measurement:measurementArray[]
    
}

type MeasurementStore={
    created_at:string,
    measurement:measurementFields[]

}
type measurementFields={

    id:number,
    name:string,
    value:number,

}

type Weight={
    created_at:string
    scaleWeight:number,

}
type WorkoutDetailed={
    id:number,
    name:string,
    equipment:string,
    instructions:string[],
    photo:string
}


type exerciseInformation={
    id:number,
    name:string,
    equipment:string,
    target:string,
}

type Exercise={
    id:number;
    name:string,
    
    exercise:{
        id:number
        set:number,
        reps:number,
        repRange:number
    }[];
}

type WorkoutExercise={
    id:number,
    name:string,
    exercise:{
        id:number,
        set:number,
        reps:number,
        weight:number
    }[];
}




type workout={
    id:number,
    name:string,
    date:string,
    workout:WorkoutExercise[];
}

const[myWorkout,setMyWorkout]=createStore<workout>({
    name:'',
    date:'',
    id:0
,
workout:[]
})



type detailedExercise={
    id:number,
    name:string,
    equipment:string,

}



const[showProgramme,setShowProgramme]=createSignal('No Programme')
const[programmeExercise,setProgrammeExercise]=createStore<detailedExercise[]>([]);

const updateWorkout=(key:number,internalKey:number,value:number,field:string)=>{
   setMyWorkout('workout',key,'exercise',internalKey,field,value)
   console.log(myWorkout.workout)
  }
 
 
 



function removeItem(item:number,value:number,id:number)
{
    console.log(item)

   setMyWorkout('workout',item,'exercise',(current)=>current.filter((item)=>item.id!=value))

   if(myWorkout.workout[item].exercise.length==0)
   {
    console.log("LENGTH 0")
   setMyWorkout('workout',(current)=>current.filter((item)=>item.id!=id))

   
   }
  

}



    function addExercise(item:workout){
 
        
       
   
let index=-1;
let indexFound=false;
      if(myWorkout.workout.length>=1){
  
    for(let i=0; i<myWorkout.workout.length; i++)
    {
       

        if(myWorkout.workout[i].id===item.id)
        {
        
            index=i;
            console.log(index)
            indexFound=true;
            console.log(indexFound);


            break;

        }

    }
    if(indexFound==true)
    {

        setMyWorkout('workout',index,'exercise',(current)=>[
            ...current,{
                id:myWorkout.workout[index].exercise.length,
                set:myWorkout.workout[index].exercise.length+1,
                weight:1,
                reps:2
            }

        ])


    indexFound=false;
    index=-1;
    return;
}
      }
   
 
   

      setMyWorkout('workout',(current)=>[
        ...current,{
            id:item.id,
            name:item.name,
            exercise:[{
                id:1,
                set:1,
                reps:1,
                weight:1
            }]

        }

      ])

      
console.log("Workout",myWorkout.workout)
       
    }

   function deleteItem(itemId:number,index:number,value:number){

  

setMyWorkout('workout','exercise',index,'exercises',(current)=>current.filter((item)=>item.id!==value))
const length=myWorkout.workout.exercise[index].exercises.length;
if(length==0)
{
    setMyWorkout('workout','exercise',(current)=>current.filter((item)=>item.id!=itemId));

}
    
   }





   const updateExercise=(fieldName:string,key:number)=>(event:Event)=>{
    
    const inputElement=event.currentTarget as HTMLInputElement;
    
    setMyWorkout("workout",key,(current)=>({
        ...current,
        [fieldName]:Number(inputElement.value)

    }))
   
   


   }
   const resetStore=()=>{
  setMyWorkout('workout',[]
  )
   }









//submit Workout


const equipment:string[]=['Barbell','Dumbell','KettleBells','Body Weight','Cable']
const bodyPart:string[]=['Chest','Quads','Hamstrings','Rear Delts','Tricpes']
type ViewProps={
    name:string,

}
function ViewClient(
   
  
    

  
)



{

    


    const{getToken}=useAuth();

    const[startDate,setStartDate]=createSignal('')
    const[endDate,setEndDate]=createSignal('');

    const[exercise,setExercise]=createStore<exerciseInformation>({
        id:0,
        equipment:'',
        name:'',
        target:''

    })

    const [selectedTab,setSelectedTab]=createSignal<string>('Overview')




    const[weight,setWeight]=createStore<Weight>({
        scaleWeight:0,
        created_at: new Date().toISOString().slice(0, 10)

    })
const [measurement,setMeasurement]=createStore<Measurement>({
    measurement_id:0,
    name:'',
    measurement:[]

});

    const[selectedExercise,setSelectedExercise]=createSignal<string>('')
    const[workoutHistoryDate,setWorkoutHistoryDate]=createSignal('')

    const[searchString,setSearchString]=createSignal<string>('')
    const[equipment,setEquipment]=createSignal<string>('Equipment')
    const[type,setType]=createSignal('Type')

    const location=useLocation();
    const id=location.search.slice(4)
    

    
    const fetchAllExercises=async()=>{
        try{
            const data=await fetch(`${import.meta.env.VITE_API_URL}/api/exercise/all?exerciseName=${searchString()}&type=${type()}&equipment=${equipment()}`,{
                method:"GET",
            })
            return data.json();
        }
        catch(error){
            console.log(error)
        }


    }

    const fetchWorkoutHistory=async()=>{
        try{

           
            const data=await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}/workoutHistory`,{
                method:'GET',
                headers:{}
            })
            return data.json();
        }
        catch(error){
            console.log(error)
        }
    }

  
    const exerciseId=createMemo(()=>exercise.id)
    const measurementId=createMemo(()=>measurement.measurement_id)
    const fetchStats=async()=>{
        try{
            const data=await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}/stats?id=${exerciseId()}`,{
                method:"GET"
            })
            return data.json();
        }
        catch(error){
            console.log(error)
        }
    }

    const fetchAllProgrammes=async()=>{
        try{
            const token=await getToken();
            const data=await fetch(`${import.meta.env.VITE_API_URL}/api/programme`,{
                method:'GET',
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            return data.json();
        }
        catch(error){
            console.log(error)
        }
    }
    const fetchProgrammes=async()=>{
        try{

            const data=await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}/programmes`)
            return data.json();
        }
        catch(error){
            console.log(error)
        }
      



    }

    const fetchMeasurements=async()=>{
        try{
            const token=await getToken();
           const data=await fetch(`${import.meta.env.VITE_API_URL}/api/measurements`,{
                method:'GET',
                headers:{
                 'Authorization':`Bearer ${token}`
                }
            })
            
        return data.json();
        }
        catch(error){
            console.log(error)
        }
    }
    const fetchMeasurementsData=async()=>{
        try{
            const data=await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}/measurements?id=${measurementId()}`)
            return data.json();
        }
        catch(error)
        {
            console.log(error)
        }
    }

const updateMeasurement=async(key:number,value:number)=>{
    console.log("HELLO THREER")
  
    setMeasurementStore('measurement',key,(current)=>({
        ...current,
        value:value
    }))
  

    console.log(measurementStore.measurement)
    

}

const submitMeasurement=async()=>{
   

    try{
    
        const token=await getToken();
        const data=await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}/measurement/storeMultiple`,{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({
                measurement:measurementStore.measurement,
                created_at:measurementStore.created_at
            
            })
        })
        
    }
    catch(error){
        console.log(error)
    }
}

       

const submitWorkout=async()=>{
    console.log("HI")
   const token=await getToken();
   try{
    const data=await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}/workout/store`,{
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
          
            workout:myWorkout

        })

    })
   }
   catch(error){
    console.log(error)
   }
}


const updateSelectExercise=(item:Exercise)=>{
    console.log(item)
    setExercise('id',item.id),
    setExercise('name',item.name)

   
}

const addWeight=async()=>
{
  
    try{
        console.log('hi');

        const token=await getToken();
        const data=await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}/weights/store`,{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${token}`
            },
          body:JSON.stringify({
            scaleWeight:weight.scaleWeight,
            created_at:weight.created_at
            

          })
        })
    }
    catch(error)
    {
        console.log(error)
    }
}



const updateShowProgramme=async(item:string)=>{
    confirm("This will reset the workout")
    setShowProgramme(item)
    setMyWorkout('workout',[])

}




//Resources
   
    const[workoutHistory]=createResource<WorkoutHistoryType[]>(fetchWorkoutHistory)
    const[programmes,{refetch:refetchProgrammes}]=createResource(fetchProgrammes);
    const programmeId=createMemo(()=>programmes()?.programme_id)
    const[clientStats,setClientStats]=createResource(exerciseId,fetchStats)
    const[measurements]=createResource(fetchMeasurements)
    const[measurementData]=createResource(measurementId, fetchMeasurementsData);
    const[allProgrammes]=createResource(fetchAllProgrammes);


//MeasurementSavings


const [measurementSaving,setMeasurementSaving]=createSignal(false)
const[measurementDeletionIndicator,setMeasurementDeletionIndicator]=createSignal<boolean>(false)






    const updateProgramme=async(item:number)=>{
        try{
         const data=await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}/updateProgramme`,{
             method:'POST',
             body:JSON.stringify({
                id:item
                
             })
         })
        refetchProgrammes();
        }
        catch(error){
         console.log(error)
        }
     }
     
     
    const [allExercises] = createResource<exerciseInformation>(

        () => [searchString(), type(), equipment()],
        ([]) => fetchAllExercises()
      );
    const getClientDetails=async()=>{
        try{
           const data= await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}`,{

                method:'GET',
                
                })
                return data.json();
    
        }
        catch(error)
        {
            console.log(error)
        }
        
    }
    const [myClient,{refetch}]=createResource(getClientDetails)


  createEffect(()=>{
    console.log(exerciseId())
  })
  const[measurementStore,setMeasurementStore]=createStore<MeasurementStore>({
    created_at: new Date().toISOString().slice(0, 10),
    measurement:[]
  })


  
  createEffect(()=>{
  if(measurements()){
    
for(let i=0; i<measurements().length; i++){
    setMeasurementStore('measurement',((current)=>[
        ...current,{
            id:measurements()[i].id,
            name:measurements()[i].name,
            value:0
        }
    ]))


}
console.log(measurementStore)



  }
  })
  

  type programmeType={
    id:number,
    name:string
  }
  const [programmeTypeSelected,setProgrammeType]=createStore<programmeType>({
    id:0,
    name:''
  })
  const[programmeTypes,setProgrammTypes]=createStore<programmeType[]>([])
const[programmeNames,setProgrammeNames]=createSignal(false)
const[autoSavingIndicatorClient,setAutosSavingIndicatorClient]=createSignal<boolean>(false)
const[workoutFind,setWorkoutFind]=createSignal<number>(0)
const[initialExercisePut,setInitalExercisePut]=createSignal(-1)




 const[client,setMyClient]=createStore<clientDetails>({
    name:'',
    notes:"",
    age:15
 })





 const deletingMeasurement=(id:number)=>async()=>{
 setMeasurement('measurement',((current)=>current.filter((item)=>item.id!=id)))
 setMeasurementDeletionIndicator(true)

 const timeout=setTimeout(()=>{
    setMeasurementDeletionIndicator(false)
 },2000)

 try{
    const token=await getToken();
    const data=await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}/measurement/delete`,{
        method:"POST",
        headers:{
            'Authorization':`Bearer ${token}`
        },
        
        body:JSON.stringify({
            id:id
        })
    })
 }
 catch(error){
    console.log(error)
 }
 }

const updatingMeasurement=(key:number,field:string,item:string)=>async()=>{
   console.log("HI")
console.log(measurement.measurement)
    const token=await getToken();
 
    if(field=='value'){
   setMeasurement('measurement',key,(current)=>({
    ...current,
    value:Number(item),
    
   }))
}
else if(field=='created_at'){
    console.log("YES SIR")
   setMeasurement('measurement',key,(current)=>({
    ...current,
    created_at:item,

   }))
}
setMeasurementSaving(true)
const timeout=setTimeout(()=>{
    setMeasurementSaving(false)
 },2000)




try{
    const data=await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}/measurementUpdate`,{
        headers:{
            'Authorization':`Bearer ${token}`
        },
        method:"POST",
        body:JSON.stringify({
            id:measurement.measurement[key].id,
            measurement_id:measurement.measurement_id,
            value:Number(measurement.measurement[key].value),
            created_at:measurement.measurement[key].created_at
        })
    })
}
catch(error){
    console.log(error)
}

}




 const updateClient=(fieldName:string,value:string)=>async()=>{
   
    if(fieldName==='name'){
        setMyClient('name',value)
    }
    if(fieldName==='age'){
        setMyClient('age',Number(value))
    }
    if(fieldName==='notes'){
        setMyClient('notes',value)
    }
   if(client.name!=myClient().name || client.age!=myClient().age || client.notes!=myClient().notes){
    setAutosSavingIndicatorClient(true)

    const timeout=setTimeout(()=>{
        setAutosSavingIndicatorClient(false)
     },2000)

     const token=await getToken();
     try{
        const data=await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}/updateInformation`,{
            method:'POST',
            headers:{
              'Authorization':`Bearer ${token}`
              
            },
            body:JSON.stringify({
                name:client.name,
                age:client.age,
                notes:client.notes
                
            })

        })
       
     }
     catch(error){
        console.log(error)
     }


   }

 }






createEffect(()=>{
    if(myClient() ){
        setMyClient('age',myClient().age)
        setMyClient('name', myClient().name),
        setMyClient('notes',myClient().notes)

    }
    console.log("Client",client)
})



createEffect(() => {
    if (programmes() && initialExercisePut() === -1) {
      console.log("YES SIR");
  
      const workouts = programmes()?.programme?.programmeWorkout??[];
  
      // Set programme types
      for (let i = 0; i < workouts.length; i++) {
        setProgrammTypes((current) => [
          ...current,
          {
            id: workouts[i].id,
            name: workouts[i].name,
          },
        ]);
      }
  
      console.log("Programme Type Selected", programmeTypeSelected.id);
  
      const details = workouts[0]?.programmeDetails;
      if (details && details.length > 0) {
        for (let i = 0; i < details.length; i++) {
          setProgrammeExercise((current) => [
            ...current,
            {
              id: details[i].exercise.id,
              name: details[i].exercise.name,
              equipment: details[i].exercise.equipment,
            },
          ]);
        }
  
      }
      setInitalExercisePut(0)
      console.log(programmeExercise)
    }
  });


createEffect(()=>{
    console.log(programmeTypeSelected.id)
    const workouts = programmes()?.programme?.programmeWorkout?? [];
 const workoutToFind=workouts.findIndex((item)=>item.id==programmeTypeSelected.id);
if(workoutToFind!=-1){
    setProgrammeExercise([])
    const details=workouts[workoutToFind].programmeDetails;
    for(let i=0; i<details.length; i++){
        setProgrammeExercise((current)=>[
            ...current,{
                id:details[i].exercise.id,
                name:details[i].exercise.name,
                equipment:details[i].exercise.equipment
            }
        ])
        
    }
}
})


createEffect(()=>{
   if(measurementData()){
    console.log(measurementData())
    setMeasurement('measurement',[])
  for(let i=0; i<measurementData().length; i++){
  setMeasurement('measurement',(current)=>[
    ...current,{
        created_at:new Date(measurementData()[i].created_at).toISOString().slice(0,10),
        value:measurementData()[i].value,
        id:measurementData()[i].id
    }
  ])
  }


   }
})


createEffect(()=>{
    console.log(measurementStore.measurement)
})


    return(
        <div class="flex flex-col">
            
            <p class="block text-sm md:hidden text-red-500">
                    To Create Workouts and measurements, switch to a desktop
                 </p>

          <Show when={myClient.loading}>
Loading
          </Show>
          
     

            <Show when={myClient()}>



 <Show when={autoSavingIndicatorClient() || measurementSaving() || measurementDeletionIndicator()}>
  
                        <Badge class="bg-blue-50 text-blue-600 border border-blue-100 animate-pulse w-32">
             
             {autoSavingIndicatorClient()? "Updating Client": ""}
             {measurementSaving()? "Updating Meadurement": ""}
             {measurementDeletionIndicator()? "Deleting Measurement": ""}
            </Badge>
 </Show>

 

                        <div class="hidden md:block">

                 
                   <ManagerClientHeader measurementDate={measurementStore.created_at} updateMeasurementDate={(item)=>setMeasurementStore('created_at',item)} submitMeasurement={()=>submitMeasurement()}  updateProgrammeType={(item)=>setProgrammeType('id',item)}  programmeTypeSelected={programmeTypeSelected} programmeTypes={programmeTypes} showProgramme={showProgramme()} setShowProgramme={(item:string)=>updateShowProgramme(item)} programmeExercise={programmeExercise}  updateWorkout={(id,value,key,field)=>updateWorkout(id,value,key,field)}   submitWorkout={submitWorkout} updateMeasurement={(key,item)=>updateMeasurement(key,item)}
                     measurements={measurementStore.measurement}  weight={weight.scaleWeight} weightCreated={weight.created_at} updateScaleWeight={(item)=>setWeight('scaleWeight',item)} updateWeightDate={(item)=>setWeight('created_at',item)}  addWeight={addWeight}  removeItem={(number,value,key)=>removeItem(number,value,key)} setDate={(item)=>setMyWorkout('date',item)} setWorkoutName={(item)=>setMyWorkout('name',item)} myExercise={myWorkout.workout} workoutName={myWorkout.name}    searchString={searchString()} setSearchString={(item)=>setSearchString(item) } equipment={equipment()} setEquipment={(item)=>setEquipment(item)}  setType={(item)=>setType(item)}    type={type()} addExercise={(item)=>addExercise(item)} name={client.name} exercises={allExercises()}/ >
                 
                 </div>
               
                 
                 
            <Tabs   defaultValue="Overview" class="w-400px">
                        <TabsList class="flex overflow-x-auto whitespace-nowrap no scrollbar gap-2">

                            
                            
                            <TabsTrigger value="assignedProgramme">
                               Assigned Programme
                            </TabsTrigger>
                            <TabsTrigger class="" value="bodyMeasurements">
                              Body Measurements
                            </TabsTrigger>
                            


                            <TabsTrigger value="exerciseStats">
                          Exercise Statistics
                            </TabsTrigger>

                            <TabsTrigger value="settings">
                         Settings
                            </TabsTrigger>




                            <TabsIndicator class="bg-gray-300 cursor-pointer" variant="block"/>

                        </TabsList>
                        <TabsContent value="exerciseStats">

            <div class="grid grid-cols-2 gap-x-3 py-3">

        
    <div  class="min-h-screen">

    <ExerciseLibrary selectExercise={selectedExercise()} types={bodyPart} equipment={equipment}  updatingExercise={(item)=>updateSelectExercise(item)} searchExercise={searchString()} myExercises={allExercises()}>

</ExerciseLibrary>


    </div>
    <div class="flex flex-col gap-y-3">
{selectedExercise()}
    
    <AboutExercise targetMuscleGroup={exercise.target} equipment={exercise.equipment} name={exercise.name}/>
<ClientStats stats={clientStats()}/>
</div>




</div>
                        </TabsContent>
           
                 
          
          
                




            <div class="grid grid-cols-2 gap-x-3 py-3">

           
                <Show when={selectedTab()==='Exercise Statistics'}>
                    <div  class="min-h-screen">

                    <ExerciseLibrary selectExercise={selectedExercise()} types={bodyPart} equipment={equipment}  updatingExercise={(item)=>updateSelectExercise(item)} searchExercise={searchString()} myExercises={allExercises()}>

</ExerciseLibrary>

             
                    </div>
                    <div class="flex flex-col gap-y-3">
{selectedExercise()}
                    
                    <AboutExercise targetMuscleGroup={exercise.target} equipment={exercise.equipment} name={exercise.name}/>
      <ClientStats stats={clientStats()}/>
               </div>
                </Show>
      

        
            
         
</div>

<TabsContent value="settings">

              
            
              <Settings onChange={(fieldName,value)=>updateClient(fieldName,value)()}  name={client.name} notes={client.notes}    age={client.age}>
                  </Settings>
              
      </TabsContent>

              <TabsContent value="bodyMeasurements">
<div class="grid grid-cols-2 gap-3">
    <div class="min-h-screen">

  
    <MeasurementLibrary setMeasurementId={(item)=>setMeasurement('measurement_id',item)  } setMeasurementName={(item)=>setMeasurement('name',item)}  measurements={measurements()}>

    </MeasurementLibrary>
    </div>
    
    <Show when={measurementData.loading}>
        Loading
    </Show>
    <MeasurementScreen deleteMeasurement={(id:number)=>deletingMeasurement(id)()} updateMeasurement={(key,field,item,id)=>updatingMeasurement(key,field,item)()}    measurement={measurement} ></MeasurementScreen>
    </div>
</TabsContent>
       

<TabsContent value="assignedProgramme">



<Show when={programmes.loading}>
  Updating Programming...
</Show>
          
                <div class="grid grid-cols-1 md:grid-cols-2">
                    <AssignedProgramme updateProgramme={(item)=>updateProgramme(item)} programme_id={programmeId()} allProgramme={allProgrammes()} programme={programmes()}  >

                    </AssignedProgramme>
                    
     
     <Show when={workoutHistory()}>



     
          <WorkoutHistory date={workoutHistoryDate()} setDate={(item)=>setWorkoutHistoryDate(item)} workout={workoutHistory()}></WorkoutHistory>
              
              </Show>
               </div>
     
           </TabsContent>
              </Tabs>
              </Show>
              
            </div>

     
        
           

     
    )

}
export default ViewClient;