import { Schema } from "mongoose"

export const EntrySchema = new Schema(
  {
    description: {type: String, required: true, maxlength: 2000},
    creatorId: {type: Schema.ObjectId, required: true},
    img: {type:}
  }
)