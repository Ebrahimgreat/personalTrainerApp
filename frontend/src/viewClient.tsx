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
import WorkoutHistory from "./components/clientPage/Manager/assignedProgramme/workoutHistory";
import AssignedProgramme from "./components/clientPage/Manager/assignedProgramme/assignedProgramme";
import Notes from "./components/clientPage/overview/notes";
import WorkoutProgramme from "./components/clientPage/Manager/workoutProgramme";
import WorkoutProgrammeOverview from "./components/clientPage/overview/workoutProgrammeOverview";
import ClientWorkoutHistory from "./components/clientPage/stats/clientWorkoutHistory";
import WorkoutStats from "./components/clientPage/workoutStats/workoutStats";
import MeasurementLibrary from "./components/clientPage/measurements/measurementLibrary";
import MeasurementScreen from "./components/clientPage/measurements/measurementRightScreen";

const tabBarItems:string[]=['Overview','Assigned Programme','Body Measurements', 'Weekly Stats', 'Exercise Statistics','Settings']


type Measurement={
    id:number,
    name:string
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




type workout={
    id:number,
    name:string,
    date:string,
    workout:Exercise[];
}

const[myWorkout,setMyWorkout]=createStore<workout>({
    name:'',
    date:'',
    id:0
,
workout:[]
})


function removeItem(item:number,value:number,id:number)
{
    console.log(id)

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
                id:2,
                set:2,
                reps:2
            }

        ])


    indexFound=false;
    index=-1;
    return;
}
      }
      console.log("index is false");
 
   

      setMyWorkout('workout',(current)=>[
        ...current,{
            id:item.id,
            name:item.name,
            exercise:[{
                id:1,
                set:1,
                reps:1,
                repRange:1
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













const equipment:string[]=['Barbell','Dumbell','KettleBells','Body Weight','Cable']
const bodyPart:string[]=['Chest','Quads','Hamstrings','Rear Delts','Tricpes']
type ViewProps={
    name:string,

}
function ViewClient(
   
  
    

  
)



{

    const[startDate,setStartDate]=createSignal('')
    const[endDate,setEndDate]=createSignal('');

    const[exercise,setExercise]=createStore<exerciseInformation>({
        id:0,
        equipment:'',
        name:'',
        target:''

    })

    const [selectedTab,setSelectedTab]=createSignal<string>('Overview')


const [measurement,setMeasurement]=createStore<Measurement>({
    id:0,
    name:''

});

    const[selectedExercise,setSelectedExercise]=createSignal<string>('')
    const[workoutHistoryDate,setWorkoutHistoryDate]=createSignal('')

    const[searchString,setSearchString]=createSignal<string>('')
    const[equipment,setEquipment]=createSignal<string>('Barbell')
    const[type,setType]=createSignal('Chest')

    const location=useLocation();
    const id=location.search.slice(4)
    

    const fetchWorkoutStats=async()=>{
        try{
            const data=await fetch(`http://localhost:3001/api/clients/${id}/workoutStats?date=${startDate()}`,{
                method:"GET"
            })
            return data.json();

        }
        catch(error){
            console.log(error)
        }

    }

    const fetchAllExercises=async()=>{
        try{
            const data=await fetch(`http://localhost:3001/api/exercise/all?exerciseName=${searchString()}&type=${type()}&equipment=${equipment()}`,{
                method:"GET",
            })
            return data.json();
        }
        catch(error){
            console.log(error)
        }


    }

    const fetchExercises=async()=>{
        try{
            const data=await fetch(`http://localhost:3001/api/clients/${id}/workoutHistory?date=${workoutHistoryDate()}`,{
                method:'GET'
            })
            return data.json();
        }
        catch(error){
            console.log(error)
        }
    }

    const exerciseId=createMemo(()=>exercise.id)
    const measurementId=createMemo(()=>measurement.id)
    const fetchStats=async()=>{
        try{
            const data=await fetch(`http://localhost:3001/api/clients/${id}/stats?id=${exerciseId()}`,{
                method:"GET"
            })
            return data.json();
        }
        catch(error){
            console.log(error)
        }
    }
    const fetchProgrammes=async()=>{
        try{

            const data=await fetch(`http://localhost:3001/api/clients/${id}/programmes`)
            return data.json();
        }
        catch(error){
            console.log(error)
        }
      

    }

    const fetchMeasurements=async()=>{
        try{
            const data=await fetch('http://localhost:3001/api/measurements')
            return data.json()
        }
        catch(error){
            console.log(error)
        }
    }
    const fetchMeasurementsData=async()=>{
        try{
            const data=await fetch(`http://localhost:3001/api/clients/${id}/measurements?id=${measurementId()}`)
            return data.json();
        }
        catch(error)
        {
            console.log(error)
        }
    }


       

const updateSelectExercise=(item:Workout)=>{
    console.log(item)
    setExercise('id',item.exercise.id),
    setExercise('name',item.exercise.name)

   
}


    const[exercises,myExercises]=createResource(workoutHistoryDate,fetchExercises)
    const[programmes,myProgrammes]=createResource(fetchProgrammes);
    const[workoutStats]=createResource(fetchWorkoutStats);
    const[clientStats,setClientStats]=createResource(exerciseId,fetchStats)
    const[measurements]=createResource(fetchMeasurements)
    const[measurementData]=createResource(measurementId, fetchMeasurementsData);
    const [allExercises] = createResource<exerciseInformation>(

        () => [searchString(), type(), equipment()],
        ([]) => fetchAllExercises()
      );
    const getClientDetails=async()=>{
        try{
           const data= await fetch(`http://localhost:3001/api/clients/${id}`,{

                method:'GET',
                
                })
                return data.json();
    
        }
        catch(error)
        {
            console.log(error)
        }
        
    }
    const [myClient]=createResource(getClientDetails)


  createEffect(()=>{
    console.log(exerciseId())
  })
    
    return(
        <div class="flex flex-col">
       
            <Show when={myClient()}>

            

          

                <div class="border-b">

        


                   <ManagerClientHeader removeItem={(number,value,key)=>removeItem(number,value,key)} setDate={(item)=>setMyWorkout('date',item)} setWorkoutName={(item)=>setMyWorkout('name',item)} myExercise={myWorkout.workout} workoutName={myWorkout.name}    searchString={searchString()} setSearchString={(item)=>setSearchString(item) } equipment={equipment()} setEquipment={(item)=>setEquipment(item)}  setType={(item)=>setType(item)}    type={type()} addExercise={(item)=>addExercise(item)} name={myClient().client.name} exercises={allExercises()}/ >
                   <TabBar handleTabChange={(item)=>setSelectedTab(item)} selectedTab={selectedTab()} items={tabBarItems}></TabBar>
                </div>
          
                


<Show when={selectedTab()==='Overview'}>
    <div class="flex flex-col">



  <Notes/>
<WorkoutProgrammeOverview name={myClient().client.programme.name}/>
  </div>
</Show>
            <div class="grid grid-cols-2 gap-x-3 py-3">

           
                <Show when={selectedTab()==='Exercise Statistics'}>
                    <div  class="min-h-screen">

             
                    <ClientWorkoutHistory selectExercise={selectedExercise()} updatingExercise={(item)=>updateSelectExercise(item)} types={bodyPart} equipment={equipment} workout={exercises()}/>
                    </div>
                    <div class="flex flex-col gap-y-3">
{selectedExercise()}
                    
                    <AboutExercise targetMuscleGroup={exercise.target} equipment={exercise.equipment} name={exercise.name}/>
      <ClientStats heaviestWeight={clientStats()}/>
               </div>
                </Show>
      

        
            
         
</div>
<Show when={selectedTab()==='Settings'}>
              
            
              <Settings  name={myClient().client.name} email={myClient().client.email} age={myClient().client.age}>
                  </Settings>
              
              </Show>

              <Show when={selectedTab()==='Body Measurements'}>
<div class="grid grid-cols-2 gap-3">
    <div class="min-h-screen">

  
    <MeasurementLibrary setMeasurementId={(item)=>setMeasurement('id',item)  } setMeasurementName={(item)=>setMeasurement('name',item)}  measurements={measurements()}>

    </MeasurementLibrary>
    </div>
    
    <MeasurementScreen measurement={measurementData()} name={measurement.name}></MeasurementScreen>
    </div>

              </Show>

              <Show when={selectedTab()==='Weekly Stats'}>
                <WorkoutStats endDate={endDate()} startDate={startDate()} setStartDate={(item)=>setStartDate(item)} stats={workoutStats()}>

                </WorkoutStats>
              </Show>

              <Show when={selectedTab()==='Assigned Programme'}>
                <div class="grid grid-cols-2 gap-x-3">
                    <AssignedProgramme workout={programmes()}  >

                    </AssignedProgramme>
                    
     
          <WorkoutHistory date={workoutHistoryDate()} setDate={(item)=>setWorkoutHistoryDate(item)} workout={exercises()}></WorkoutHistory>
                </div>x
              </Show>
              </Show>
            </div>

     
        
           

     
    )

}
export default ViewClient;