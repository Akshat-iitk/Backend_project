const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    // ==> in this we will create give the schema user ID se data to keep track that which user have created this
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // => this reference  we will give to the name of the Model object id which we will want to keep track on
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  caption: {
    type: String,
    default:"",
  },
});
module.exports = mongoose.model("post", postSchema);
