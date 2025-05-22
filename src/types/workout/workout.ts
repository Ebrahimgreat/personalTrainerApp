import { Exercise } from "../Exercise/exercise"

export type Workout={
    id:number
    name:string,
    created_at:string,
}
export type workoutDetails={
   id:number,
   set:number,
   weight:number,
   reps:number
   rir:number,
   exercise:Exercise
   programme:Programme
   

}
export type DetailedWorkout=Workout &{
   workout:workoutDetails[]

}
