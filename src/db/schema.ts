import {sql,relations} from "drizzle-orm";
import { timestamp} from "drizzle-orm/mysql-core";
import {int,text,numeric ,sqliteTable, } from "drizzle-orm/sqlite-core";
export const usersTable=sqliteTable(
    "users",
    {
        id:int().primaryKey({autoIncrement:true}),
        name:text().notNull(),
        age:int().notNull(),
        email:text().notNull(),


        user_id:numeric(),
        parent_id:int(),

    }

)



export const measurementsTable=sqliteTable(
    'measurements',{
        id:int().primaryKey({autoIncrement:true}),
        name:text().notNull()


    }


)



export const measurementsDataTable=sqliteTable(
    'measurementsData',{

        id:int().primaryKey({autoIncrement:true}),
        user_id:int().notNull().references(()=>usersTable.id),
        measurement_id:int().references(()=>measurementsTable.id),
        value:numeric(),
        created_at:text(),
      

        


    }
)






export const weightTable=sqliteTable(
    "weight",{

        id:int().primaryKey({autoIncrement:true}),
        scaleWeight:numeric(),
        created_at:text(),
        trendWeight:numeric(),
        user_id:int().notNull().references(()=>usersTable.id)


    }
)
export const nutritionTable=sqliteTable(
    "nutrition",{
        id:int().primaryKey({autoIncrement:true}),
        calories:numeric(),
        protein:numeric(),
        fat:numeric(),
        carbs:numeric(),
       created_at:text(),
        user_id:int('user_id').notNull().references(()=>usersTable.id)

    }

)

export const weightUnitsTable=sqliteTable(
    "weightUnits",{
        id:int().primaryKey({autoIncrement:true}),
        unit:text().notNull(),


    }

)
export const customFoodTable=sqliteTable(
    "foodsTable",{
        id:int().primaryKey({autoIncrement:true}),
        foodName:text(),
        defaultProtein:numeric(),
        defaultServing:numeric(),
        defaultCalories:numeric(),
        defaultCarbs:numeric(),
        defaultFat:numeric(),
        user_id:int('user_id').references(()=>usersTable.id),

    }
)




export const heightUnitTable=sqliteTable(
    "heightUnit",{
        id:int().primaryKey({autoIncrement:true}),
        unit:text().notNull()

    }

)


export const programmesTable=sqliteTable(
    "programme",{
        id:int().primaryKey({autoIncrement:true}),
        name:text(),
        description:text(),
        user_id:int('user_id').references(()=>usersTable.id),
        assigned_to:int().references(()=>usersTable.id)
       

    }
    
)

export const exerciseTable=sqliteTable(
    "exercise",{
        id:int().primaryKey({autoIncrement:true}),
        name:text(),
        equipment:text(),
        targetMuscleGroup:text(),
        type:text(),
        instructions:text(),
        photo:text()
    }

)
export const customExerciseTable=sqliteTable('customExercise',{
    id:int().primaryKey({autoIncrement:true}),
        name:text(),
        equipment:text(),
        targetMuscleGroup:text(),
        type:text(),
        instructions:text(),
        photo:text(),
        user_id:int('user_id').references(()=>usersTable.id)


})




export const workoutTable=sqliteTable(
    "workout",{
        id:int().primaryKey({autoIncrement:true}),
        user_id:int('user_id').references(()=>usersTable.id),
        name:text(),
        programme_id:int().references(()=>programmesTable.id),
        created_at:text(),


    }
)

export const userProgrammeTable=sqliteTable(
    'userProgramme',{
        id:int().primaryKey({autoIncrement:true}),
        user_id:int('user_id').references(()=>usersTable.id),
        programme_id:int('programme_id').references(()=>programmesTable.id),
        status:text()

    }
)




export const latestActivitiesTable=sqliteTable('latestActivities',{
    id:int().primaryKey({autoIncrement:true}),
    sender_id:int().references(()=>usersTable.id),
    reciever_id:int().references(()=>usersTable.id),
    message:text()
    

})



export const programmeWorkoutTable=sqliteTable(
    "programmeWorkout",{
        id:int().primaryKey({autoIncrement:true}),
        name:text().notNull(),
        programme_id:int().references(()=>programmesTable.id)
    }

)



export const programmeDetailsTable=sqliteTable(
    "programmeDetails",{
        id:int().primaryKey({autoIncrement:true}),
        exercise_id:int().references(()=>exerciseTable.id),
        repRange:text(),
        programme_workoutId:int().references(()=>programmeWorkoutTable.id),
        sets:int()


    }
)


export const roomsTable=sqliteTable(
    'rooms',{
        id:int().primaryKey({autoIncrement:true}),
        name:text(),
        user_id:int('user_id').references(()=>usersTable.id)


    }
)
export const roomMembersTable=sqliteTable(
    'roomMembers',{
        id:int().primaryKey({autoIncrement:true}),
        user_id:int().references(()=>usersTable.id),
        room_id:int().references(()=>roomsTable.id)
        
    }
)
export const messagesTable=sqliteTable(
    'messages',{
        id:int().primaryKey({autoIncrement:true}),
        content:text(),
        created_at:timestamp(),
        user_id:int('user_id').references(()=>usersTable.id),
        room_id:int('room_id').references(()=>roomsTable.id)

    }
)







export const workoutDetailsTable=sqliteTable(
    "workoutDetails",{
        id:int().primaryKey({autoIncrement:true}),
        workout_id:int('workout_id').references(()=>workoutTable.id),
        set:numeric(),
        reps:numeric(),
        weight:numeric(),
        rir:numeric(),
       exercise_id:int("exercise_id").references(()=>exerciseTable.id)


    }
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




export const customFoodRelation=relations(customFoodTable,({one})=>({
    user:one(usersTable,{
        fields:[customFoodTable.user_id],
        references:[usersTable.id]
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




export const userRelations=relations(usersTable,({many})=>({
    weight:many(weightTable),
    
    nutrients:many(nutritionTable),
    measurementData:many(measurementsDataTable),
    workout:many(workoutTable),
    customFood:many(customFoodTable),
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

//Room relation with RoomMembers

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

export const weightRelations=relations(weightTable,({one})=>({
    user:one(usersTable,{
        fields:[weightTable.user_id],
        references:[usersTable.id]
    })
    
}))
export const nutritionRelations=relations(nutritionTable,({one})=>({
    user:one(usersTable,{
        fields:[nutritionTable.user_id],
        references:[usersTable.id]
    })

}))










export type User = typeof usersTable.$inferSelect;
export type Exercise=typeof exerciseTable.$inferSelect
export type InsertUser = typeof usersTable.$inferInsert;
export type Weight= typeof weightTable.$inferSelect
export type InsertWeight= typeof weightTable.$inferInsert

