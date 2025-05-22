import AboutExercise from "../../exercise/about";

type props={
    heaviestWeight:object
}
function ClientStats(props:props){
    return(
        <div class="bg shadow-md flex flex-col">
       <h1 class="font-bold text-center">
        Stats Overview
        </h1>
        
        <p class="text-gray-600">
            Heaviest Weight {props.heaviestWeight.maximumWeight} KG
        </p>
      
            

        </div>
    )

}
export default ClientStats;