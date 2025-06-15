import { MeasurementAll } from "../measurements/measure"
import { DetailedWorkout } from "../workout/workout"

export type Client={
    name:string,
    age:number,
    email:string,
}
export type DetailedClient= Client &{
  
 measurement:MeasurementAll;
   programme:Programme,
   workout:DetailedWorkout[]

}