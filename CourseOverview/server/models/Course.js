const { Schema, model } = require("mongoose");

const CourseSchema = new Schema({
  name: String,
  start_date: String,
  end_date: String,
  grade: {
    type: Number,
    default: 0,
  },
  course_credit: {
    type: Number,
    default: 5,
  },
  exams: [
    {
      // https://mongoosejs.com/docs/populate.html
      type: Schema.Types.ObjectId,
      ref: "Exam",
    },
  ],
});

module.exports = model("Course", CourseSchema);
