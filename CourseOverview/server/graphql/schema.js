const {
  GraphQLList,
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require("graphql");

// This was needed in order to fix this issue:
// https://stackoverflow.com/questions/61259799/graphql-one-of-the-provided-types-for-building-the-schema-is-missing-a-name
const CourseTypeInject = require("./types/CourseType");
const ExamTypeInject = require("./types/ExamType");
const types = {};
types.CourseType = CourseTypeInject(types);
types.ExamType = ExamTypeInject(types);
const CourseType = types.CourseType;
const ExamType = types.ExamType;

const Course = require("../models/Course");
const Exam = require("../models/Exam");

//! Old mock data
// const { Courses, Exams } = require("./mockData.js");

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    courses: {
      type: new GraphQLList(CourseType),
      resolve: async () => {
        const courses = await Course.find();
        return courses;
        //! Old way using mock data:
        // resolve: () => Courses,
      },
    },
    course: {
      type: CourseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        const course = await Course.findById(args.id);
        return course;
        //! Old way using mock data:
        // return Courses.find((course) => course.id === args.id);
      },
    },
    exams: {
      type: new GraphQLList(ExamType),
      resolve: async () => {
        const exams = await Exam.find();
        return exams;
        //! Old way using mock data:
        // return Exams;
      },
    },
    exam: {
      type: ExamType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        const exam = await Exam.findById(args.id);
        return exam;
        //! Old way using mock data:
        // return Exams.find((exam) => exam.id === args.id);
      },
    },
  }),
});
// Mutations
const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    //! Add a new course
    addCourse: {
      type: CourseType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        start_date: { type: new GraphQLNonNull(GraphQLString) },
        end_date: { type: new GraphQLNonNull(GraphQLString) },
        course_credit: { type: GraphQLInt, defaultValue: 5 },
        grade: {
          type: GraphQLInt,
          defaultValue: 0,
        },
      },
      resolve: async (parent, args) => {
        const course = new Course({
          name: args.name,
          start_date: args.start_date,
          end_date: args.end_date,
          grade: args.grade,
        });
        const newCourse = await course.save();
        return newCourse;
      },
    },
    //! Add a new exam
    addExam: {
      type: ExamType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        grade: {
          type: GraphQLInt,
          defaultValue: 0,
        },
        course_id: { type: new GraphQLNonNull(GraphQLID) },
        // course_id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const exam = new Exam({
          name: args.name,
          date: args.date,
          grade: args.grade,
          course: args.course_id,
        });
        const newExam = await exam.save();
        const course = await Course.findById(args.course_id);
        course.exams.push(args.course_id);
        console.log(course);
        return newExam;
      },
    },
    //! Update a course
    updateCourse: {
      type: CourseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
        grade: { type: GraphQLInt },
        course_credit: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        const course = await Course.findByIdAndUpdate(args.id, args, {
          new: true,
        });
        return course;
      },
    },
    //! Update an exam
    updateExam: {
      type: ExamType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        date: { type: GraphQLString },
        grade: { type: GraphQLInt },
        course_id: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        const exam = await Exam.findByIdAndUpdate(args.id, args, {
          new: true,
        });
        return exam;
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
