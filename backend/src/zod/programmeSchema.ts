import { z } from "zod";

const programmeDeletionSchema=z.object({
    id:z.number()
})
export{programmeDeletionSchema}