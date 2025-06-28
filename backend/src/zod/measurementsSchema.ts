import{z} from '@hono/zod-openapi';
const measurementSchema=z.object({
    created_at:z.string(),
    measurement_id:z.number(),
    value:z.number()
})
const insertWeightSchema=z.object({
    created_at:z.string(),
  scaleWeight:z.number()

})


const measurementFieldSchema=z.object({
    id:z.number(),
    name:z.string(),
    value:z.number()
})
const insertMeasurementMultipleSchema=z.object({

    created_at:z.string(),

    measurement:z.array(measurementFieldSchema)

})

const deleteMeasurementSchema=z.object({
    id:z.number()

})

const updateMeasurementSchema=z.object({
    id:z.number(),
    value:z.number(),
    created_at:z.string()
})

export{measurementSchema,updateMeasurementSchema,insertWeightSchema,deleteMeasurementSchema,insertMeasurementMultipleSchema}