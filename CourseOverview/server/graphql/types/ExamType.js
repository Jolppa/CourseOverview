const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");

const ENV = process.env.NODE_ENV || "demo";

//! for testing
//! Set ENV to "demo" in schema.js, types\CourseType.js and types\ExamType.js
// const ENV = "demo";

const MockData = require("../mockData.js");
const Course = require("../../models/Course");

const ExamType = (types) => {
  return new GraphQLObjectType({
    name: "Exam",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      date: { type: GraphQLString },
      grade: {
        type: GraphQLInt,
        defaultValue: 0,
      },
      course: {
        type: types.CourseType,
        resolve: (parent, args) => {
          if (ENV === "demo") {
            return MockData.Courses.find(
              (course) => course.id === parent.course
            );
          }
          return Course.findById(parent.course);
        },
      },
    }),
  });
};

module.exports = ExamType;
