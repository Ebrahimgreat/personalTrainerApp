// Converted to Postgres-compatible Drizzle schema using `pg-core`

import { pgTable, serial, text, integer, numeric, timestamp, real } from 'drizzle-orm/pg-core';
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
  user_id: integer('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  measurement_id: integer('measurement_id').references(() => measurementsTable.id, { onDelete: 'cascade' }),
  value: real('value'),
  created_at: timestamp('created_at', { mode: 'string' }),
});

export const weightUnitsTable = pgTable('weightUnits', {
  id: serial('id').primaryKey(),
  unit: text('unit').notNull(),
});

export const heightUnitTable = pgTable('heightUnit', {
  id: serial('id').primaryKey(),
  unit: text('unit').notNull(),
});

export const programmesTable = pgTable('programme', {
  id: serial('id').primaryKey(),
  name: text('name'),
  description: text('description'),
  user_id: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
  assigned_to: integer('assigned_to').references(() => usersTable.id, { onDelete: 'cascade' }),
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
  user_id: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const workoutTable = pgTable('workout', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
  name: text('name'),
  programme_id: integer('programme_id').references(() => programmesTable.id, { onDelete: 'cascade' }),
  created_at: timestamp('created_at', { mode: 'string' }),
});

export const userProgrammeTable = pgTable('userProgramme', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
  programme_id: integer('programme_id').references(() => programmesTable.id, { onDelete: 'cascade' }),
  status: text('status'),
});

export const latestActivitiesTable = pgTable('latestActivities', {
  id: serial('id').primaryKey(),
  sender_id: integer('sender_id').references(() => usersTable.id, { onDelete: 'cascade' }),
  reciever_id: integer('reciever_id').references(() => usersTable.id, { onDelete: 'cascade' }),
  message: text('message'),
});

export const programmeWorkoutTable = pgTable('programmeworkout', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  programme_id: integer('programme_id').references(() => programmesTable.id, { onDelete: 'cascade' }),
});

export const programmeDetailsTable = pgTable('programmeDetails', {
  id: serial('id').primaryKey(),
  exercise_id: integer('exercise_id').references(() => exerciseTable.id, { onDelete: 'cascade' }),
  repRange: text('repRange'),
  programme_workoutId: integer('programme_workoutId').references(() => programmeWorkoutTable.id, { onDelete: 'cascade' }),
  sets: integer('sets'),
});

export const roomsTable = pgTable('rooms', {
  id: serial('id').primaryKey(),
  name: text('name'),
  user_id: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const roomMembersTable = pgTable('roomMembers', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
  room_id: integer('room_id').references(() => roomsTable.id, { onDelete: 'cascade' }),
});

export const messagesTable = pgTable('messages', {
  id: serial('id').primaryKey(),
  content: text('content'),
  created_at: timestamp('created_at'),
  user_id: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
  room_id: integer('room_id').references(() => roomsTable.id, { onDelete: 'cascade' }),
});

export const workoutDetailsTable = pgTable('workoutDetails', {
  id: serial('id').primaryKey(),
  workout_id: integer('workout_id').references(() => workoutTable.id, { onDelete: 'cascade' }),
  set: real('set'),
  reps: real('reps'),
  weight: real('weight'),
  rir: real('rir'),
  exercise_id: integer('exercise_id').references(() => exerciseTable.id, { onDelete: 'cascade' }),
});

//Relations


export const userRelations=relations(usersTable,({many})=>({
 
  

  measurementData:many(measurementsDataTable),
  workout:many(workoutTable),
  programmes:many(programmesTable),
  userProgramme:many(userProgrammeTable),
  rooms:many(roomsTable),
  room_members:many(roomMembersTable),
  messages:many(messagesTable),
  customExercises:many(customExerciseTable),
  sender:many(latestActivitiesTable,{
      relationName:'senderActivity',
 
  }),
  reciever:many(latestActivitiesTable,{
      relationName:'receiverActivity',
   
  })
  

  
  
}))


export const roomRelations=relations(
  roomsTable,
  ({one,many})=>({
      roomMembers:many(roomMembersTable),
      messages:many(messagesTable),
      user:one(usersTable,{
          fields:[roomsTable.user_id],
          references:[usersTable.id]
       
      })
      
  })
  
  
)

//messages RElations

export const messagesRelations=relations(
  messagesTable,
  ({one,many})=>({
      
      user:one(usersTable,
          {
              fields:[messagesTable.user_id],
              references:[usersTable.id]
          }
      ),
      room:one(roomsTable,{
          fields:[messagesTable.room_id],
          references:[roomsTable.id]
      })

  }
)
)

//room Members Relations

export const roomMembersRelations=relations(
  roomMembersTable,({one})=>({
      user:one(usersTable,{
          fields:[roomMembersTable.user_id],
          references:[usersTable.id]
      }),
      room:one(roomsTable,{
          fields:[roomMembersTable.room_id],
          references:[roomsTable.id]
      })

  })

)

export const measurementRelationwithData=relations(measurementsTable,({many})=>({
  measurementData:many(measurementsDataTable)
}))

export const measurementDataTableWithMeasurement=relations(measurementsDataTable,({one})=>({
  measurement:one(measurementsTable,{
      fields:[measurementsDataTable.measurement_id],
      references:[measurementsTable.id]
      
  }),
  user:one(usersTable,{
      fields:[measurementsDataTable.user_id],
      references:[usersTable.id]
  })
}))

export const parent_child=relations(
  usersTable,
  ({one,many})=>({
      parent:one(usersTable,{
          fields:[usersTable.parent_id],
          references:[usersTable.id],
          relationName:'children'

      }),
      children:many(usersTable,{
          relationName:'children'

      })

  })
  

)





export const customExerciseRelationWithUser=relations(customExerciseTable,({one})=>({
  'user':one(usersTable,{
      fields:[customExerciseTable.user_id],
      references:[usersTable.id]
  })
}))

export const programmeUserRelationWithUser=relations(userProgrammeTable,({one})=>({
  user:one(usersTable,{
      fields:[userProgrammeTable.user_id],
      references:[usersTable.id]
  })

}))

export const programmeUserRelationWithProgramme=relations(userProgrammeTable,({one})=>({
  programme:one(programmesTable,{
      fields:[userProgrammeTable.programme_id],
      references:[programmesTable.id]
  })

}))

//relation of Latest Activities

export const workoutDetailRelationWithExercise=relations(workoutDetailsTable,({one})=>({
  exercise:one(exerciseTable,{
      fields:[workoutDetailsTable.exercise_id],
      references:[exerciseTable.id]
  })

}))
export const programmeRelationsWithUser=relations(programmesTable,({one})=>({
  usersTable:one(usersTable,{
      fields:[programmesTable.user_id],
      references:[usersTable.id]

  })

}))

export const childRelationwithParent=relations(usersTable,({one})=>({
  parent:one(usersTable,{
      fields:[usersTable.parent_id],
      references:[usersTable.id]

  })

}))

export const workoutRelationWithUser=relations(workoutTable,({one})=>({
  user:one(usersTable,{
      fields:[workoutTable.user_id],
      references:[usersTable.id]

  }),
  programme:one(programmesTable,{
      fields:[workoutTable.programme_id],
      references:[programmesTable.id]
  })

}))

export const exerciseWorkoutRelation=relations(exerciseTable,({many})=>({
  workout:many(workoutDetailsTable),
  programmeDetails:many(programmeDetailsTable)

}))
export const workoutRelations=relations(workoutTable,({many})=>({
  workoutDetail:many(workoutDetailsTable)

}))

export const workoutDetailRelation=relations(workoutDetailsTable,({one})=>({
  workout:one(workoutTable,{
      fields:[workoutDetailsTable.workout_id],
      references:[workoutTable.id]
  })


}))

export const programmeDetailsRelationWithProgramme=relations(programmeDetailsTable,({one})=>({
  programmeWorkout:one(programmeWorkoutTable,{
      fields:[programmeDetailsTable.programme_workoutId],
      references:[programmeWorkoutTable.id]
  })
}))
//Programme RElation with User Programme and Programme Details(Many TO One)

//



export const programmeRelationWithProgramme=relations(programmesTable,({many})=>({

  userProgramme:many(userProgrammeTable),
  workout:many(workoutTable),
  programmeWorkout:many(programmeWorkoutTable),
 
}))

export const programmeWorkoutRelation=relations(programmeWorkoutTable,({one})=>({
  programme:one(programmesTable,{
      fields:[programmeWorkoutTable.programme_id],
      references:[programmesTable.id]
  })

}))

export const programmeWorkoutDetailRelation=relations(programmeWorkoutTable,({many})=>({
  programmeDetails:many(programmeDetailsTable)

}))

export const programmeDetailRelationWithExercise=relations(programmeDetailsTable,({one})=>({
  exercise:one(exerciseTable,{
      fields:[programmeDetailsTable.exercise_id],
      references:[exerciseTable.id]
  })
  
}))


export const activtiesRelation=relations(latestActivitiesTable,({one})=>({
  sender:one(usersTable,{
      fields:[latestActivitiesTable.sender_id],
      references:[usersTable.id],
      relationName:'senderActivity'

  }),
  reciever:one(usersTable,{
      fields:[latestActivitiesTable.reciever_id],
      references:[usersTable.id],
      relationName:'receiverActivity'

  })

}))

export type User = typeof usersTable.$inferSelect;
export type Exercise=typeof exerciseTable.$inferSelect
export type InsertUser = typeof usersTable.$inferInsert;

export type Programme=typeof programmesTable.$inferSelect;
export type ProgrammeDetail=typeof programmesTable.$inferSelect;