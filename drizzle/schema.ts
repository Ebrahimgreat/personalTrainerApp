import { sqliteTable, AnySQLiteColumn, integer, text, foreignKey, numeric } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const heightUnit = sqliteTable("heightUnit", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	unit: text().notNull(),
});

export const weightUnits = sqliteTable("weightUnits", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	unit: text().notNull(),
});

export const workoutDetails = sqliteTable("workoutDetails", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	workoutId: integer("workout_id").references(() => workout.id),
	set: numeric(),
	reps: numeric(),
	weight: numeric(),
	rir: numeric(),
	exerciseId: integer("exercise_id").references(() => exercise.id),
});

export const foodsTable = sqliteTable("foodsTable", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	defaultProtein: numeric(),
	defaultServing: numeric(),
	defaultCalories: numeric(),
	defaultCarbs: numeric(),
	defaultFat: numeric(),
	userId: integer("user_id").references(() => users.id),
	foodName: text(),
});

export const exercise = sqliteTable("exercise", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text(),
	type: text(),
	instructions: text(),
	equipment: text(),
	targetMuscleGroup: text(),
	photo: text(),
});

export const users = sqliteTable("users", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	age: integer().notNull(),
	userId: numeric("user_id"),
	parentId: integer("parent_id"),
});

export const programme = sqliteTable("programme", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text(),
	description: text(),
	userId: integer("user_id").references(() => users.id),
	assignedTo: integer("assigned_to").references(() => users.id),
});

export const userProgramme = sqliteTable("userProgramme", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("user_id").references(() => users.id),
	programmeId: integer("programme_id").references(() => programme.id),
	status: text(),
});

export const latestActivities = sqliteTable("latestActivities", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	senderId: integer("sender_id").references(() => users.id),
	recieverId: integer("reciever_id").references(() => users.id),
	message: text(),
});

export const programmeWorkout = sqliteTable("programmeWorkout", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	programmeId: integer("programme_id").references(() => programme.id),
});

export const programmeDetails = sqliteTable("programmeDetails", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	exerciseId: integer("exercise_id").references(() => exercise.id),
	repRange: text(),
	programmeWorkoutId: integer("programme_workoutId").references(() => programmeWorkout.id),
	sets: integer(),
});

export const roomMembers = sqliteTable("roomMembers", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("user_id").references(() => users.id),
	roomId: integer("room_id").references(() => rooms.id),
});

export const rooms = sqliteTable("rooms", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text(),
	userId: integer("user_id").references(() => users.id),
});

export const messages = sqliteTable("messages", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	content: text(),
	createdAt: numeric("created_at"),
	userId: integer("user_id").references(() => users.id),
	roomId: integer("room_id").references(() => rooms.id),
});

export const customExercise = sqliteTable("customExercise", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text(),
	equipment: text(),
	targetMuscleGroup: text(),
	type: text(),
	instructions: text(),
	photo: text(),
	userId: integer("user_id").references(() => users.id),
});

export const workout = sqliteTable("workout", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("user_id").references(() => users.id),
	name: text(),
	programmeId: integer("programme_id").references(() => programme.id),
	createdAt: text("created_at"),
});

export const nutrition = sqliteTable("nutrition", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	calories: numeric(),
	protein: numeric(),
	fat: numeric(),
	carbs: numeric(),
	createdAt: text("created_at"),
	userId: integer("user_id").notNull().references(() => users.id),
});

export const weight = sqliteTable("weight", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	scaleWeight: numeric(),
	createdAt: text("created_at"),
	trendWeight: numeric(),
	userId: integer("user_id").notNull().references(() => users.id),
});

export const measurements = sqliteTable("measurements", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
});

export const measurementsData = sqliteTable("measurementsData", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("user_id").notNull().references(() => users.id),
	measurementId: integer("measurement_id").references(() => measurements.id),
	createdAt: text("created_at"),
	value: numeric(),
});

