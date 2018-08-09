const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Create Schema
const PostSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: 'users'
    //biar komen gak ikut ilang kalo user yang comment delete account-nya. Gravatar dan username otomatis terisi saat komen.
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  //Likes akan terhubung dengan si user, bukan hanya lambang yang bisa naik turun. User delete account, like tetap ada.
  comments: [
    {
      user: {
        type: schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
        // Date untuk Comment, bukan Post
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
    //Date untuk postingan
  }
})

module.exports = Post = mongoose.model('post', PostSchema);