export type exercise={
    id:number,
    name:string,
    equipment:string,
    type:string
}
export type workoutDetail={
      id: number
      workout_id:number,
      set: number,
      reps: number,
      weight:number,
      exercise_id:number,
      exercise: exercise
}

export type WorkoutHistoryType = {
  id: number,
  user_id:number,
  name: string,
  programme_id:number,
  created_at: string,
  workoutDetail: workoutDetail[]
};
