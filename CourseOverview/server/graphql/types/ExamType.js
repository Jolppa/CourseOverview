const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");

// const { Courses } = require("../mockData.js");
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
          return Course.findById(parent.course);
        },
      },
    }),
  });
};

module.exports = ExamType;
