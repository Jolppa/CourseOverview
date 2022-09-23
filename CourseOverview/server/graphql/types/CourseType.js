const {
  GraphQLList,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require("graphql");

const Course = require("../../models/Course");
const Exam = require("../../models/Exam");

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
