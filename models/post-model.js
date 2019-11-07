const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
   {
      creator: {
         type: Schema.Types.ObjectId,
         ref: 'users'
      },
      image: {
         type: String
      },
      title: {
         type: String,
         required: true,
         trim: true
      },
      content: {
         type: String
      }
   },
   { timestamps: true }
);

module.exports = Post = mongoose.model('post', PostSchema);
