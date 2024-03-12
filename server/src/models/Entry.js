import { Schema } from "mongoose"

export const EntrySchema = new Schema(
  {
    description: {type: String, required: true, maxlength: 2000},
    creatorId: {type: Schema.ObjectId, required: true},
    img: {type: String, maxlength: 500},
    notebookId: {type: Schema.ObjectId,}
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
EntrySchema.virtual('notebook', {
  localField: 'notebookId',
  foreignField: '_id',
  justOne: true,
  ref: 'Notebook'
})