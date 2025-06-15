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
import ExerciseLibrary from "./components/exercise/exerciseLibrary";
import { useAuth } from "clerk-solidjs";
import Button from './components/ui/button';
import Tabs, { TabsContent, TabsIndicator, TabsList, TabsTrigger } from "./components/ui/tabs";
const tabBarItems:string[]=['Overview','Assigned Programme','Body Measurements', 'Weekly Stats', 'Exercise Statistics','Settings']


type Measurement={
    id:number,
    name:string
}
type MeasurementStore={
    id:number,
    name:string,
    value:number
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
        created_at:new Date().toLocaleDateString()

    })
const [measurement,setMeasurement]=createStore<Measurement>({
    id:0,
    name:''

});

    const[selectedExercise,setSelectedExercise]=createSignal<string>('')
    const[workoutHistoryDate,setWorkoutHistoryDate]=createSignal('')

    const[searchString,setSearchString]=createSignal<string>('')
    const[equipment,setEquipment]=createSignal<string>('Equipment')
    const[type,setType]=createSignal('Type')

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

    const fetchAllProgrammes=async()=>{
        try{
            const token=await getToken();
            const data=await fetch(`http://localhost:3001/api/programme`,{
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

            const data=await fetch(`http://localhost:3001/api/clients/${id}/programmes`)
            return data.json();
        }
        catch(error){
            console.log(error)
        }
      



    }

    const fetchMeasurements=async()=>{
        try{
            const token=await getToken();
            const data=await fetch('http://localhost:3001/api/measurements',{
                method:'GET',
                headers:{
                 'Authorization':`Bearer ${token}`
                }
            })
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

const updateMeasurement=(key:number,value:number)=>{
  
  
    setMeasurementStore(key,(current)=>({
        ...current,
        value:value

    }))

}

       

const submitWorkout=async()=>{
   const token=await getToken();
   try{
    const data=await fetch(`http://localhost:3001/api/clients/${id}/workout/store`,{
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
        console.log(weight.scaleWeight)
        console.log(weight.created_at)
        return;

        const token=await getToken();
        const data=await fetch(`http://localhost:3001/api/clients/${id}/weights/store`,{
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


    const[exercises,myExercises]=createResource(workoutHistoryDate,fetchExercises)
    const[programmes,myProgrammes]=createResource(fetchProgrammes);
    const programmeId=createMemo(()=>programmes()?.id)
    const[workoutStats]=createResource(fetchWorkoutStats);
    const[clientStats,setClientStats]=createResource(exerciseId,fetchStats)
    const[measurements]=createResource(fetchMeasurements)
    const[measurementData]=createResource(measurementId, fetchMeasurementsData);
    const[allProgrammes]=createResource(fetchAllProgrammes);
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
  const[measurementStore,setMeasurementStore]=createStore<MeasurementStore[]>([]);


  
  createEffect(()=>{
  if(measurements()){
for(let i=0; i<measurements().length; i++){
setMeasurementStore((current)=>[
    ...current,{
        id:measurements()[i].id,
        name:measurements()[i].name,
        value:0
    }
])
}





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
const[workoutFind,setWorkoutFind]=createSignal<number>(0)
 
 


 createEffect(()=>{
    if(programmes() && programmes().workout){
   
 
 


     if(programmeNames()==false){
        console.log("FALSE")
            
  setProgrammeType('id',programmes().workout[workoutFind()].id)
  setProgrammeType('name',programmes().workout[workoutFind()].name)


     for(let i=0; i<programmes().workout.length; i++){
         setProgrammTypes((current)=>[
         ...current,{
             id:programmes().workout[i].id,
             name:programmes().workout[i].name
         }
         ])
 
 
       
     
 }
}
setProgrammeNames(true)
setProgrammeExercise([])

if(programmeNames()==true){
    console.log("TRUE")
console.log(programmeTypeSelected.id,"IDs")
    const findWorkoutType=programmes().workout.findIndex(item=>item.id==programmeTypeSelected.id);
    console.log(findWorkoutType,"FIND")
    setWorkoutFind(findWorkoutType)
    console.log("Workout Find","YES")
    if(workoutFind()===-1){
       return;
    }
}

 for(let i=0; i<programmes().workout[workoutFind()]?.details.length; i++)
 {
     
 
           
     setProgrammeExercise((current)=>[
         ...current,{
             id:programmes().workout[workoutFind()].details[i].exercise.id,
             name:programmes().workout[workoutFind()].details[i].exercise.name,
             equipment:programmes().workout[workoutFind()].details[i].exercise.equipment
 
            
 
         }
     ])
 }
 
 
 
     
    }
    console.log("Progamme Exercise",programmeExercise)

 
  })









    return(
        <div class="flex flex-col">
          

            <Show when={myClient()}>


                    


 
                   <ManagerClientHeader updateProgrammeType={(item)=>setProgrammeType('id',item)}  programmeTypeSelected={programmeTypeSelected} programmeTypes={programmeTypes} showProgramme={showProgramme()} setShowProgramme={(item:string)=>setShowProgramme(item)} programmeExercise={programmeExercise}  updateWorkout={(id,value,key,field)=>updateWorkout(id,value,key,field)}   submitWorkout={submitWorkout} updateMeasurement={(key,item)=>updateMeasurement(key,item)}
                     measurements={measurementStore}  weight={weight.scaleWeight} weightCreated={weight.created_at} updateScaleWeight={(item)=>setWeight('scaleWeight',item)} updateWeightDate={(item)=>setWeight('created_at',item)}  addWeight={addWeight}  removeItem={(number,value,key)=>removeItem(number,value,key)} setDate={(item)=>setMyWorkout('date',item)} setWorkoutName={(item)=>setMyWorkout('name',item)} myExercise={myWorkout.workout} workoutName={myWorkout.name}    searchString={searchString()} setSearchString={(item)=>setSearchString(item) } equipment={equipment()} setEquipment={(item)=>setEquipment(item)}  setType={(item)=>setType(item)}    type={type()} addExercise={(item)=>addExercise(item)} name={myClient().client.name} exercises={allExercises()}/ >
                 
                 
                 
                 
            <Tabs  defaultValue="Overview" class="w-400px">
                        <TabsList class="flex overflow-x-auto whitespace-nowrap no scrollbar gap-2">

                            
                            <TabsTrigger  value="overview">
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="assignedProgramme">
                               Assigned Programme
                            </TabsTrigger>
                            <TabsTrigger value="bodyMeasurements">
                              Body Measurements
                            </TabsTrigger>
                            <TabsTrigger value="weeklyStats">
                             Weekly Stats
                            </TabsTrigger>


                            <TabsTrigger value="exerciseStats">
                          Exercise Statistics
                            </TabsTrigger>

                            <TabsTrigger value="settings">
                         Settings
                            </TabsTrigger>




                            <TabsIndicator class="bg-gray-300" variant="block"/>

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
                        <TabsContent value="overview">
                        <WorkoutProgrammeOverview name={myClient().client.programme.name}/>
               
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

              
            
              <Settings  name={myClient().client.name} email={myClient().client.email} age={myClient().client.age}>
                  </Settings>
              
      </TabsContent>

              <TabsContent value="bodyMeasurements">
<div class="grid grid-cols-2 gap-3">
    <div class="min-h-screen">

  
    <MeasurementLibrary setMeasurementId={(item)=>setMeasurement('id',item)  } setMeasurementName={(item)=>setMeasurement('name',item)}  measurements={measurements()}>

    </MeasurementLibrary>
    </div>
    
    <MeasurementScreen measurement={measurementData()} name={measurement.name}></MeasurementScreen>
    </div>
</TabsContent>
       

             <TabsContent value="weeklyStats">
      
                <WorkoutStats endDate={endDate()} startDate={startDate()} setStartDate={(item)=>setStartDate(item)} stats={workoutStats()}>

                </WorkoutStats>
            
</TabsContent>
<TabsContent value="assignedProgramme">


          
                <div class="grid grid-cols-2 gap-x-3">
                    <AssignedProgramme programme_id={programmeId()} allProgramme={allProgrammes()} programme={programmes()}  >

                    </AssignedProgramme>
                    
     
          <WorkoutHistory date={workoutHistoryDate()} setDate={(item)=>setWorkoutHistoryDate(item)} workout={exercises()}></WorkoutHistory>
               </div>
     
           </TabsContent>
              </Tabs>
              </Show>
            </div>

     
        
           

     
    )

}
export default ViewClient;