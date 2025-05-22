type Programme={
    name:string,
    description:string,
}
function WorkoutProgrammeOverview(props:Programme)
{
    return(<div class="bg-white flex flex-col shadow-md p-3 space y-4 h-full w-full">
<h1 class="font-semi-bold text-2xl border-b">
   Active Programme
</h1>
<div class="bg-white">
   {props.name}
  
</div>
    </div>)

}
export default WorkoutProgrammeOverview;