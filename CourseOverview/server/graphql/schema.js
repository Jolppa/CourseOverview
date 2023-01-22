const {
  GraphQLList,
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require("graphql");

const ENV = process.env.NODE_ENV || "demo";

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

const MockData = require("./mockData.js");

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    courses: {
      type: new GraphQLList(CourseType),
      resolve: async () => {
        if (ENV === "demo") {
          return MockData.Courses;
        }
        const courses = await Course.find();
        return courses;
      },
    },
    course: {
      type: CourseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        //! Not tested yet
        if (ENV === "demo") {
          return MockData.Courses.find((course) => course.id === args.id);
        }
        const course = await Course.findById(args.id);
        return course;
      },
    },
    exams: {
      type: new GraphQLList(ExamType),
      resolve: async () => {
        if (ENV === "demo") {
          return MockData.Exams;
        }
        const exams = await Exam.find();
        return exams;
      },
    },
    exam: {
      type: ExamType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        //! Not tested yet
        if (ENV === "demo") {
          return MockData.Exams.find((exam) => exam.id === args.id);
        }
        const exam = await Exam.findById(args.id);
        return exam;
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
        if (ENV === "demo") {
          return MockData.Courses.push({
            name: args.name,
            start_date: args.start_date,
            end_date: args.end_date,
            course_credit: args.course_credit,
            grade: args.grade,
          });
        }
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
      },
      resolve: async (parent, args) => {
        if (ENV === "demo") {
          return MockData.Exams.push({
            name: args.name,
            date: args.date,
            grade: args.grade,
            course_id: args.course_id,
          });
        }
        const exam = new Exam({
          name: args.name,
          date: args.date,
          grade: args.grade,
          course: args.course_id,
        });
        const newExam = await exam.save();
        const course = await Course.findById(args.course_id);
        course.exams.push(args.course_id);
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
        //! Not tested yet
        if (ENV === "demo") {
          const course = MockData.Courses.find(
            (course) => course.id === args.id
          );
          course.name = args.name;
          course.start_date = args.start_date;
          course.end_date = args.end_date;
          course.grade = args.grade;
          course.course_credit = args.course_credit;
          return course;
        }
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
        //! Not tested yet
        if (ENV === "demo") {
          const exam = MockData.Exams.find((exam) => exam.id === args.id);
          exam.name = args.name;
          exam.date = args.date;
          exam.grade = args.grade;
          exam.course_id = args.course_id;
          return exam;
        }
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
