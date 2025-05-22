import { DetailedWorkout } from "../workout/workout"

export type Client={
    name:string,
    age:number,
    email:string,
}
export type DetailedClient= Client &{
  
   weight:Weight[],
   programme:Programme,
   workout:DetailedWorkout[]

}