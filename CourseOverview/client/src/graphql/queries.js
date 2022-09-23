import { gql } from "@apollo/client";

const GET_EXAMS = gql`
  query GetExams {
    exams {
      id
      name
      date
      grade
      course {
        id
        name
        start_date
        end_date
        grade
      }
    }
  }
`;

const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      name
      start_date
      end_date
      grade
      exams {
        id
        name
        date
        grade
      }
      course_credit
    }
  }
`;

const GET_ALL = gql`
  query GetAll {
    exams {
      id
      name
      date
      grade
      course {
        id
        name
        start_date
        end_date
        grade
      }
    }
    courses {
      id
      name
      start_date
      end_date
      grade
      exams {
        id
        name
        date
        grade
      }
      course_credit
    }
  }
`;

export { GET_COURSES, GET_EXAMS, GET_ALL };
