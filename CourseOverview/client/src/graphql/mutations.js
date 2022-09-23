import { gql } from "@apollo/client";

const ADD_COURSE = gql`
  mutation AddCourse(
    $name: String!
    $start_date: String!
    $end_date: String!
    $grade: Int
    $course_credit: Int
  ) {
    addCourse(
      name: $name
      start_date: $start_date
      end_date: $end_date
      grade: $grade
      course_credit: $course_credit
    ) {
      name
    }
  }
`;

//! How to implement this?!?
const ADD_EXAM = gql`
  mutation AddExam(
    $name: String!
    $date: String!
    $grade: Int
    $course_id: ID!
  ) {
    addExam(name: $name, date: $date, grade: $grade, course_id: $course_id) {
      id
      name
    }
  }
`;

export { ADD_COURSE, ADD_EXAM };
