import { relations } from "drizzle-orm/relations";
import { workout, workoutDetails, exercise, users, foodsTable, programme, userProgramme, latestActivities, programmeWorkout, programmeDetails, rooms, roomMembers, messages, customExercise, nutrition, weight, measurements, measurementsData } from "./schema";

export const workoutDetailsRelations = relations(workoutDetails, ({one}) => ({
	workout: one(workout, {
		fields: [workoutDetails.workoutId],
		references: [workout.id]
	}),
	exercise: one(exercise, {
		fields: [workoutDetails.exerciseId],
		references: [exercise.id]
	}),
}));

export const workoutRelations = relations(workout, ({one, many}) => ({
	workoutDetails: many(workoutDetails),
	programme: one(programme, {
		fields: [workout.programmeId],
		references: [programme.id]
	}),
	user: one(users, {
		fields: [workout.userId],
		references: [users.id]
	}),
}));

export const exerciseRelations = relations(exercise, ({many}) => ({
	workoutDetails: many(workoutDetails),
	programmeDetails: many(programmeDetails),
}));

export const foodsTableRelations = relations(foodsTable, ({one}) => ({
	user: one(users, {
		fields: [foodsTable.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	foodsTables: many(foodsTable),
	programmes_userId: many(programme, {
		relationName: "programme_userId_users_id"
	}),
	programmes_assignedTo: many(programme, {
		relationName: "programme_assignedTo_users_id"
	}),
	userProgrammes: many(userProgramme),
	latestActivities_recieverId: many(latestActivities, {
		relationName: "latestActivities_recieverId_users_id"
	}),
	latestActivities_senderId: many(latestActivities, {
		relationName: "latestActivities_senderId_users_id"
	}),
	roomMembers: many(roomMembers),
	rooms: many(rooms),
	messages: many(messages),
	customExercises: many(customExercise),
	workouts: many(workout),
	nutritions: many(nutrition),
	weights: many(weight),
	measurementsData: many(measurementsData),
}));

export const programmeRelations = relations(programme, ({one, many}) => ({
	user_userId: one(users, {
		fields: [programme.userId],
		references: [users.id],
		relationName: "programme_userId_users_id"
	}),
	user_assignedTo: one(users, {
		fields: [programme.assignedTo],
		references: [users.id],
		relationName: "programme_assignedTo_users_id"
	}),
	userProgrammes: many(userProgramme),
	programmeWorkouts: many(programmeWorkout),
	workouts: many(workout),
}));

export const userProgrammeRelations = relations(userProgramme, ({one}) => ({
	programme: one(programme, {
		fields: [userProgramme.programmeId],
		references: [programme.id]
	}),
	user: one(users, {
		fields: [userProgramme.userId],
		references: [users.id]
	}),
}));

export const latestActivitiesRelations = relations(latestActivities, ({one}) => ({
	user_recieverId: one(users, {
		fields: [latestActivities.recieverId],
		references: [users.id],
		relationName: "latestActivities_recieverId_users_id"
	}),
	user_senderId: one(users, {
		fields: [latestActivities.senderId],
		references: [users.id],
		relationName: "latestActivities_senderId_users_id"
	}),
}));

export const programmeWorkoutRelations = relations(programmeWorkout, ({one, many}) => ({
	programme: one(programme, {
		fields: [programmeWorkout.programmeId],
		references: [programme.id]
	}),
	programmeDetails: many(programmeDetails),
}));

export const programmeDetailsRelations = relations(programmeDetails, ({one}) => ({
	programmeWorkout: one(programmeWorkout, {
		fields: [programmeDetails.programmeWorkoutId],
		references: [programmeWorkout.id]
	}),
	exercise: one(exercise, {
		fields: [programmeDetails.exerciseId],
		references: [exercise.id]
	}),
}));

export const roomMembersRelations = relations(roomMembers, ({one}) => ({
	room: one(rooms, {
		fields: [roomMembers.roomId],
		references: [rooms.id]
	}),
	user: one(users, {
		fields: [roomMembers.userId],
		references: [users.id]
	}),
}));

export const roomsRelations = relations(rooms, ({one, many}) => ({
	roomMembers: many(roomMembers),
	user: one(users, {
		fields: [rooms.userId],
		references: [users.id]
	}),
	messages: many(messages),
}));

export const messagesRelations = relations(messages, ({one}) => ({
	room: one(rooms, {
		fields: [messages.roomId],
		references: [rooms.id]
	}),
	user: one(users, {
		fields: [messages.userId],
		references: [users.id]
	}),
}));

export const customExerciseRelations = relations(customExercise, ({one}) => ({
	user: one(users, {
		fields: [customExercise.userId],
		references: [users.id]
	}),
}));

export const nutritionRelations = relations(nutrition, ({one}) => ({
	user: one(users, {
		fields: [nutrition.userId],
		references: [users.id]
	}),
}));

export const weightRelations = relations(weight, ({one}) => ({
	user: one(users, {
		fields: [weight.userId],
		references: [users.id]
	}),
}));

export const measurementsDataRelations = relations(measurementsData, ({one}) => ({
	measurement: one(measurements, {
		fields: [measurementsData.measurementId],
		references: [measurements.id]
	}),
	user: one(users, {
		fields: [measurementsData.userId],
		references: [users.id]
	}),
}));

export const measurementsRelations = relations(measurements, ({many}) => ({
	measurementsData: many(measurementsData),
}));