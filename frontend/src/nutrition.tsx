import { createResource,Show,For,createSignal } from "solid-js";


import Button from "./components/button";
import Table from "./components/table";
import{nutrient,setNutrition,removeNutrient,submitForm,updateNutrientField} from "./nutritionForm";
import { useNavigate } from "@solidjs/router";
import { useSearchParams } from "@solidjs/router";



function nutrition()
{
    const[searchParams,setSearchParams]=useSearchParams();

    const navigate=useNavigate();


    const[page,setPage]=createSignal<number>(1)


    const fetchData=async()=>{
        
        const result=await fetch(`http://localhost:3001/api/nutrition?page=${page()}`,{
            method:'GET'
        })
   
        return result.json();

    

    }
  






    const [erors,setErrors]=createSignal('')

        

    const columns:string[]=['Date','Calories','Protein','Carbs','Actions','View']
const keys=[{name:'created_at',format:'date'},{name:'calories',format:''},{name:'protein',format:'protein'},{name:'carbs',format:'carbs'}]



async function removingNutrient(item:object)
{
    
  
    try{
        const data=await fetch('http://localhost:3001/api/nutrition/remove',{
            method:'POST',
            body:JSON.stringify({
                id:item.id,
                user_id:1
            })
        })
        refetch();
    }
    catch(error){
        console.log(error)
    }
}




const view:{name:string,value:(item:object)=>void}[]=[
    {name:'view',value:(item)=>{
        setSearchParams({date:item.created_at})
       navigate(`/nutrition/show?date=${item.created_at}`)
    }}
]

const actions:{name:string,value:(item:object)=>void}[]=[
    {name:'delete',value:(item)=>{
        if(item!=null){
    removingNutrient(item)
        }
   

    }}
]

const [myValue,{refetch},]=createResource(page,fetchData)
const [foodName,setFoodName]=createSignal('')


async function handleRemoveItem(item)
{
    removeNutrient(item)
}

async function handleForm(event:Event)

{
    event.preventDefault()
    
     submitForm(nutrient)
     refetch()
}




    
    return(
        <div>
            <div class="flex items-center justify-center gap-x-5">

            
            <Button onClick={()=>navigate('/nutrition/search')}>
                Search
               </Button>

               <Button onClick={()=>navigate('/nutrition/create')}>
               Create
               </Button>
               </div>

            <Show when={myValue()}>
              

               
              
                


<div class=" border h-[100px] sm:h-[300px] md:h-[400px] lg:h-[500px]">



                <Table view={view} actions={actions}  columns={columns} data={myValue()} keys={keys}>

                </Table>
               

               {myValue().length==0? 'No items': ''}

            



                  

                </div>

                 <h2 class="text-center">

        
                Showing result of page {page()}
</h2>

<div class="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
   Showing {page()}
    </div>
                <div class="flex flex-cols gap-x-5 overflow-x-auto">
                <Button class="w-16" onClick={()=>setPage(1)}>
                    1
                </Button>
                <Button class="w-16" onClick={()=>myValue().length==0?console.log('hello'):setPage(2)}>
                    2
                </Button>
                <Button class="w-16" onClick={()=>setPage(3)}>
                    3
                </Button>
                <Button class="w-16" onClick={()=>setPage(4)}>
                    4
                </Button>
                <Button class="w-16" onClick={()=>setPage(5)}>
                    5
                </Button>
                <Button class="w-16" onClick={()=>setPage(6)}>
                    6
                </Button>
            </div>

         
            </Show>

 
       

            
           
        </div>
    );

}
export default nutrition;