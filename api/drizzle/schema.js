import { pgTable, integer, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
export const measurements = pgTable("measurements", {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "measurements_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
});
export const exercise = pgTable("exercise", {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "exercise_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
    name: text().notNull(),
    type: text().notNull(),
    equipment: text().notNull(),
});
export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
    age: integer().notNull(),
    name: text().notNull(),
    email: text().notNull(),
});
export const customExercise = pgTable("customExercise", {
    id: serial().primaryKey().notNull(),
    name: text(),
    equipment: text(),
    targetMuscleGroup: text(),
    type: text(),
    instructions: text(),
    photo: text(),
    userId: integer("user_id"),
});
export const foodsTable = pgTable("foodsTable", {
    id: serial().primaryKey().notNull(),
    foodName: text(),
    defaultProtein: numeric(),
    defaultServing: numeric(),
    defaultCalories: numeric(),
    defaultCarbs: numeric(),
    defaultFat: numeric(),
    userId: integer("user_id"),
});
export const heightUnit = pgTable("heightUnit", {
    id: serial().primaryKey().notNull(),
    unit: text().notNull(),
});
export const latestActivities = pgTable("latestActivities", {
    id: serial().primaryKey().notNull(),
    senderId: integer("sender_id"),
    recieverId: integer("reciever_id"),
    message: text(),
});
export const measurementsData = pgTable("measurementsData", {
    id: serial().primaryKey().notNull(),
    userId: integer("user_id").notNull(),
    measurementId: integer("measurement_id"),
    value: numeric(),
    createdAt: timestamp("created_at", { mode: 'string' }),
});
export const messages = pgTable("messages", {
    id: serial().primaryKey().notNull(),
    content: text(),
    createdAt: timestamp("created_at", { mode: 'string' }),
    userId: integer("user_id"),
    roomId: integer("room_id"),
});
export const nutrition = pgTable("nutrition", {
    id: serial().primaryKey().notNull(),
    calories: numeric(),
    protein: numeric(),
    fat: numeric(),
    carbs: numeric(),
    createdAt: timestamp("created_at", { mode: 'string' }),
    userId: integer("user_id").notNull(),
});
export const programmeDetails = pgTable("programmeDetails", {
    id: serial().primaryKey().notNull(),
    exerciseId: integer("exercise_id"),
    repRange: text(),
    programmeWorkoutId: integer("programme_workoutId"),
    sets: integer(),
});
export const programmeWorkout = pgTable("programmeWorkout", {
    id: serial().primaryKey().notNull(),
    name: text().notNull(),
    programmeId: integer("programme_id"),
});
export const programme = pgTable("programme", {
    id: serial().primaryKey().notNull(),
    name: text(),
    description: text(),
    userId: integer("user_id"),
    assignedTo: integer("assigned_to"),
});
export const roomMembers = pgTable("roomMembers", {
    id: serial().primaryKey().notNull(),
    userId: integer("user_id"),
    roomId: integer("room_id"),
});
export const rooms = pgTable("rooms", {
    id: serial().primaryKey().notNull(),
    name: text(),
    userId: integer("user_id"),
});
export const userProgramme = pgTable("userProgramme", {
    id: serial().primaryKey().notNull(),
    userId: integer("user_id"),
    programmeId: integer("programme_id"),
    status: text(),
});
export const weight = pgTable("weight", {
    id: serial().primaryKey().notNull(),
    scaleWeight: numeric(),
    createdAt: timestamp("created_at", { mode: 'string' }),
    trendWeight: numeric(),
    userId: integer("user_id").notNull(),
});
export const weightUnits = pgTable("weightUnits", {
    id: serial().primaryKey().notNull(),
    unit: text().notNull(),
});
export const workoutDetails = pgTable("workoutDetails", {
    id: serial().primaryKey().notNull(),
    workoutId: integer("workout_id"),
    set: numeric(),
    reps: numeric(),
    weight: numeric(),
    rir: numeric(),
    exerciseId: integer("exercise_id"),
});
export const workout = pgTable("workout", {
    id: serial().primaryKey().notNull(),
    userId: integer("user_id"),
    name: text(),
    programmeId: integer("programme_id"),
    createdAt: timestamp("created_at", { mode: 'string' }),
});
