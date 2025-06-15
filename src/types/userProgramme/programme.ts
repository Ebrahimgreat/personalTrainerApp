import { ExerciseDetailed } from "../Exercise/exercise"

export type UserProgramme={
    name:string,
    id:number,
    description:string
    status:string,
    workout:ProgrammeWorkout
    

}


export type programmeDetails={
    id:number,
    name:string,
    repRange:string,
    sets:number,
    exercise:ExerciseDetailed


}
export type ProgrammeWorkout={
    id:number,
    name:string,
    details:programmeDetails
}
