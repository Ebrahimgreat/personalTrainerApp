import { ExerciseDetailed } from "../Exercise/exercise"

export type programme={
    name:string,
    id:number,

    description:string,
    workout:programmeWorkout
}


export type programmeDetails={
    id:number,
    repRange:string,
    sets:string,
    exercise:ExerciseDetailed

}
export type programmeWorkout={
    id:number,
    name:string,
    details:programmeDetails


}