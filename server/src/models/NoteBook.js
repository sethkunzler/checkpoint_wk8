import { Schema } from "mongoose";

export const NotebookSchema = new Schema(
  {
    title: {type: String, required: true, minlength: 3, maxlength: 50},
    icon: {type: String, required: true, minlength:3, maxlength: 100},
    color: {type: String, required: true, length: 7}, // #FFFFFF hexadecimal string
    coverImg: {type: String, required: true, minlength: 1, maxlength: 500,},
    creatorId: {type: Schema.ObjectId, required: true}
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
NotebookSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
NotebookSchema.virtual('entryCount', {
  localField: '_id',
  foreignField: 'notebookId',
  justOne: true,
  ref: 'Entry'
})