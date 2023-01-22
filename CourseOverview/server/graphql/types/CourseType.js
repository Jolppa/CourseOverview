const {
  GraphQLList,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require("graphql");

const ENV = process.env.NODE_ENV || "demo";

//! for testing
//! Set ENV to "demo" in schema.js, types\CourseType.js and types\ExamType.js
// const ENV = "demo";

const Course = require("../../models/Course");
const Exam = require("../../models/Exam");

const MockData = require("../mockData");

const CourseType = (types) => {
  return new GraphQLObjectType({
    name: "Course",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      start_date: { type: GraphQLString },
      end_date: { type: GraphQLString },
      exams: {
        type: new GraphQLList(types.ExamType),
        //! Maybe like this:
        resolve: async (parent) => {
          if (ENV === "demo") {
            return MockData.Exams.filter((exam) => exam.course === parent.id);
          }
          const exams = await Exam.find({ course: parent.id });
          return exams;
        },
      },
      grade: {
        type: GraphQLInt,
      },
      course_credit: {
        type: GraphQLInt,
      },
    }),
  });
};

module.exports = CourseType;
