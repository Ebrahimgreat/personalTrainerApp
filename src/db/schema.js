// Converted to Postgres-compatible Drizzle schema using `pg-core`
import { pgTable, serial, text, integer, numeric, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
export const usersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    age: integer('age').notNull(),
    notes: text('notes'),
    user_id: text('user_id'),
    parent_id: integer('parent_id'),
});
export const measurementsTable = pgTable('measurements', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
});
export const measurementsDataTable = pgTable('measurementsData', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => usersTable.id),
    measurement_id: integer('measurement_id').references(() => measurementsTable.id),
    value: numeric('value'),
    created_at: timestamp('created_at', { mode: 'string' })
});
export const weightTable = pgTable('weight', {
    id: serial('id').primaryKey(),
    scaleWeight: numeric('scaleWeight'),
    created_at: timestamp('created_at'),
    trendWeight: numeric('trendWeight'),
    user_id: integer('user_id').notNull().references(() => usersTable.id),
});
export const nutritionTable = pgTable('nutrition', {
    id: serial('id').primaryKey(),
    calories: numeric('calories'),
    protein: numeric('protein'),
    fat: numeric('fat'),
    carbs: numeric('carbs'),
    created_at: timestamp('created_at'),
    user_id: integer('user_id').notNull().references(() => usersTable.id),
});
export const weightUnitsTable = pgTable('weightUnits', {
    id: serial('id').primaryKey(),
    unit: text('unit').notNull(),
});
export const customFoodTable = pgTable('foodsTable', {
    id: serial('id').primaryKey(),
    foodName: text('foodName'),
    defaultProtein: numeric('defaultProtein'),
    defaultServing: numeric('defaultServing'),
    defaultCalories: numeric('defaultCalories'),
    defaultCarbs: numeric('defaultCarbs'),
    defaultFat: numeric('defaultFat'),
    user_id: integer('user_id').references(() => usersTable.id),
});
export const heightUnitTable = pgTable('heightUnit', {
    id: serial('id').primaryKey(),
    unit: text('unit').notNull(),
});
export const programmesTable = pgTable('programme', {
    id: serial('id').primaryKey(),
    name: text('name'),
    description: text('description'),
    user_id: integer('user_id').references(() => usersTable.id),
    assigned_to: integer('assigned_to').references(() => usersTable.id),
});
export const exerciseTable = pgTable('exercise', {
    id: serial('id').primaryKey(),
    name: text('name'),
    equipment: text('equipment'),
    type: text('type'),
    instructions: text('instructions'),
    photo: text('photo'),
});
export const customExerciseTable = pgTable('customExercise', {
    id: serial('id').primaryKey(),
    name: text('name'),
    equipment: text('equipment'),
    type: text('type'),
    instructions: text('instructions'),
    photo: text('photo'),
    user_id: integer('user_id').references(() => usersTable.id),
});
export const workoutTable = pgTable('workout', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => usersTable.id),
    name: text('name'),
    programme_id: integer('programme_id').references(() => programmesTable.id),
    created_at: timestamp('created_at'),
});
export const userProgrammeTable = pgTable('userProgramme', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => usersTable.id),
    programme_id: integer('programme_id').references(() => programmesTable.id),
    status: text('status'),
});
export const latestActivitiesTable = pgTable('latestActivities', {
    id: serial('id').primaryKey(),
    sender_id: integer('sender_id').references(() => usersTable.id),
    reciever_id: integer('reciever_id').references(() => usersTable.id),
    message: text('message'),
});
export const programmeWorkoutTable = pgTable('programmeWorkout', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    programme_id: integer('programme_id').references(() => programmesTable.id),
});
export const programmeDetailsTable = pgTable('programmeDetails', {
    id: serial('id').primaryKey(),
    exercise_id: integer('exercise_id').references(() => exerciseTable.id),
    repRange: text('repRange'),
    programme_workoutId: integer('programme_workoutId').references(() => programmeWorkoutTable.id),
    sets: integer('sets'),
});
export const roomsTable = pgTable('rooms', {
    id: serial('id').primaryKey(),
    name: text('name'),
    user_id: integer('user_id').references(() => usersTable.id),
});
export const roomMembersTable = pgTable('roomMembers', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => usersTable.id),
    room_id: integer('room_id').references(() => roomsTable.id),
});
export const messagesTable = pgTable('messages', {
    id: serial('id').primaryKey(),
    content: text('content'),
    created_at: timestamp('created_at'),
    user_id: integer('user_id').references(() => usersTable.id),
    room_id: integer('room_id').references(() => roomsTable.id),
});
export const workoutDetailsTable = pgTable('workoutDetails', {
    id: serial('id').primaryKey(),
    workout_id: integer('workout_id').references(() => workoutTable.id),
    set: numeric('set'),
    reps: numeric('reps'),
    weight: numeric('weight'),
    rir: numeric('rir'),
    exercise_id: integer('exercise_id').references(() => exerciseTable.id),
});
//Relations
export const userRelations = relations(usersTable, ({ many }) => ({
    weight: many(weightTable),
    nutrients: many(nutritionTable),
    measurementData: many(measurementsDataTable),
    workout: many(workoutTable),
    customFood: many(customFoodTable),
    programmes: many(programmesTable),
    userProgramme: many(userProgrammeTable),
    rooms: many(roomsTable),
    room_members: many(roomMembersTable),
    messages: many(messagesTable),
    customExercises: many(customExerciseTable),
    sender: many(latestActivitiesTable, {
        relationName: 'senderActivity',
    }),
    reciever: many(latestActivitiesTable, {
        relationName: 'receiverActivity',
    })
}));
export const roomRelations = relations(roomsTable, ({ one, many }) => ({
    roomMembers: many(roomMembersTable),
    messages: many(messagesTable),
    user: one(usersTable, {
        fields: [roomsTable.user_id],
        references: [usersTable.id]
    })
}));
//messages RElations
export const messagesRelations = relations(messagesTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [messagesTable.user_id],
        references: [usersTable.id]
    }),
    room: one(roomsTable, {
        fields: [messagesTable.room_id],
        references: [roomsTable.id]
    })
}));
//room Members Relations
export const roomMembersRelations = relations(roomMembersTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [roomMembersTable.user_id],
        references: [usersTable.id]
    }),
    room: one(roomsTable, {
        fields: [roomMembersTable.room_id],
        references: [roomsTable.id]
    })
}));
export const measurementRelationwithData = relations(measurementsTable, ({ many }) => ({
    measurementData: many(measurementsDataTable)
}));
export const measurementDataTableWithMeasurement = relations(measurementsDataTable, ({ one }) => ({
    measurement: one(measurementsTable, {
        fields: [measurementsDataTable.measurement_id],
        references: [measurementsTable.id]
    }),
    user: one(usersTable, {
        fields: [measurementsDataTable.user_id],
        references: [usersTable.id]
    })
}));
export const parent_child = relations(usersTable, ({ one, many }) => ({
    parent: one(usersTable, {
        fields: [usersTable.parent_id],
        references: [usersTable.id],
        relationName: 'children'
    }),
    children: many(usersTable, {
        relationName: 'children'
    })
}));
export const weightRelations = relations(weightTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [weightTable.user_id],
        references: [usersTable.id]
    })
}));
export const nutritionRelations = relations(nutritionTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [nutritionTable.user_id],
        references: [usersTable.id]
    })
}));
export const customExerciseRelationWithUser = relations(customExerciseTable, ({ one }) => ({
    'user': one(usersTable, {
        fields: [customExerciseTable.user_id],
        references: [usersTable.id]
    })
}));
export const programmeUserRelationWithUser = relations(userProgrammeTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [userProgrammeTable.user_id],
        references: [usersTable.id]
    })
}));
export const programmeUserRelationWithProgramme = relations(userProgrammeTable, ({ one }) => ({
    programme: one(programmesTable, {
        fields: [userProgrammeTable.programme_id],
        references: [programmesTable.id]
    })
}));
//relation of Latest Activities
export const workoutDetailRelationWithExercise = relations(workoutDetailsTable, ({ one }) => ({
    exercise: one(exerciseTable, {
        fields: [workoutDetailsTable.exercise_id],
        references: [exerciseTable.id]
    })
}));
export const programmeRelationsWithUser = relations(programmesTable, ({ one }) => ({
    usersTable: one(usersTable, {
        fields: [programmesTable.user_id],
        references: [usersTable.id]
    })
}));
export const childRelationwithParent = relations(usersTable, ({ one }) => ({
    parent: one(usersTable, {
        fields: [usersTable.parent_id],
        references: [usersTable.id]
    })
}));
export const workoutRelationWithUser = relations(workoutTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [workoutTable.user_id],
        references: [usersTable.id]
    }),
    programme: one(programmesTable, {
        fields: [workoutTable.programme_id],
        references: [programmesTable.id]
    })
}));
export const exerciseWorkoutRelation = relations(exerciseTable, ({ many }) => ({
    workout: many(workoutDetailsTable),
    programmeDetails: many(programmeDetailsTable)
}));
export const workoutRelations = relations(workoutTable, ({ many }) => ({
    workoutDetail: many(workoutDetailsTable)
}));
export const workoutDetailRelation = relations(workoutDetailsTable, ({ one }) => ({
    workout: one(workoutTable, {
        fields: [workoutDetailsTable.workout_id],
        references: [workoutTable.id]
    })
}));
export const programmeDetailsRelationWithProgramme = relations(programmeDetailsTable, ({ one }) => ({
    programmeWorkout: one(programmeWorkoutTable, {
        fields: [programmeDetailsTable.programme_workoutId],
        references: [programmeWorkoutTable.id]
    })
}));
//Programme RElation with User Programme and Programme Details(Many TO One)
//
export const programmeRelationWithProgramme = relations(programmesTable, ({ many }) => ({
    userProgramme: many(userProgrammeTable),
    workout: many(workoutTable),
    programmeWorkout: many(programmeWorkoutTable),
}));
export const programmeWorkoutRelation = relations(programmeWorkoutTable, ({ one }) => ({
    programme: one(programmesTable, {
        fields: [programmeWorkoutTable.programme_id],
        references: [programmesTable.id]
    })
}));
export const programmeWorkoutDetailRelation = relations(programmeWorkoutTable, ({ many }) => ({
    programmeDetails: many(programmeDetailsTable)
}));
export const programmeDetailRelationWithExercise = relations(programmeDetailsTable, ({ one }) => ({
    exercise: one(exerciseTable, {
        fields: [programmeDetailsTable.exercise_id],
        references: [exerciseTable.id]
    })
}));
export const customFoodRelation = relations(customFoodTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [customFoodTable.user_id],
        references: [usersTable.id]
    })
}));
export const activtiesRelation = relations(latestActivitiesTable, ({ one }) => ({
    sender: one(usersTable, {
        fields: [latestActivitiesTable.sender_id],
        references: [usersTable.id],
        relationName: 'senderActivity'
    }),
    reciever: one(usersTable, {
        fields: [latestActivitiesTable.reciever_id],
        references: [usersTable.id],
        relationName: 'receiverActivity'
    })
}));
