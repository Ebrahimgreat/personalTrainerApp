export type Exercise={
    id:number,
    name:string,

}
export type ExerciseDetailed={
    id:number,
    name:string,
    equipment:string,
    instructions?:string[],
    photo?:string,
    target:string
}
