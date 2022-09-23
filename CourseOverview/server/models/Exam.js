const { Schema, model } = require("mongoose");

const ExamSchema = new Schema({
  name: String,
  date: String,
  grade: {
    type: Number,
    default: 0,
  },
  course: {
    // https://mongoosejs.com/docs/populate.html
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
});

module.exports = model("Exam", ExamSchema);
