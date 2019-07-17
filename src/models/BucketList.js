import mongoose from 'mongoose';
const { Schema } = mongoose;

const bucketItems = new Schema(
  {
    bucketName: {
      type: String,
      maxlength: 255,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
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
    items: [bucketItems],
  },
  { timestamps: true },
);
const BucketList = mongoose.model('BucketList', bucketListSchema);
const BucketItem = mongoose.model('BucketItem', bucketItems);
export { BucketList, BucketItem };
