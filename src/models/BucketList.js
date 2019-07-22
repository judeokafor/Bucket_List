import mongoose from 'mongoose';
const { Schema } = mongoose;

const bucketListSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 255,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        name: {
          type: String,
        },
        done: {
          type: Boolean,
          default: false,
        },
      },
      {
        timestamps: true,
      },
    ],
  },
  { timestamps: true },
);
const BucketList = mongoose.model('BucketList', bucketListSchema);
export default BucketList;
