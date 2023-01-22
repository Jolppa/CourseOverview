const Exams = [
  {
    id: "exam-1",
    name: "Exam 1",
    date: "2018-01-01",
    grade: 3,
    course: "course-1",
  },
  {
    id: "exam-2",
    name: "Exam 2",
    date: "2018-01-15",
    grade: 4,
    course: "course-1",
  },
  {
    id: "exam-3",
    name: "Exam 3",
    date: "2018-02-01",
    grade: 5,
    course: "course-2",
  },
  {
    id: "exam-4",
    name: "Exam 4",
    date: "2024-11-15",
    grade: 0,
    course: "course-3",
  },
  {
    id: "exam-5",
    name: "Exam 5",
    date: "2025-01-01",
    grade: 0,
    course: "course-3",
  },
];
const Courses = [
  {
    id: "course-1",
    name: "Course 1",
    start_date: "2018-01-01",
    end_date: "2018-01-31",
    exams: [
      {
        id: "exam-1",
        name: "Exam 1",
        date: "2018-01-01",
        grade: 3,
        course: "course-1",
      },
      {
        id: "exam-2",
        name: "Exam 2",
        date: "2018-01-15",
        grade: 4,
        course: "course-1",
      },
    ],
    grade: 4,
    course_credit: 5,
  },
  {
    id: "course-2",
    name: "Course 2",
    start_date: "2018-02-01",
    end_date: "2018-02-28",
    exams: [
      {
        id: "exam-3",
        name: "Exam 3",
        date: "2018-02-01",
        grade: 5,
        course: "course-2",
      },
    ],
    grade: 5,
    course_credit: 2,
  },
  {
    id: "course-3",
    name: "Course 3",
    start_date: "2024-06-02",
    end_date: "2025-02-28",
    exams: [
      {
        id: "exam-4",
        name: "Exam 4",
        date: "2024-11-15",
        grade: 2,
        course: "course-3",
      },
      {
        id: "exam-5",
        name: "Exam 5",
        date: "2025-01-01",
        grade: 0,
        course: "course-3",
      },
    ],
    grade: 0,
    course_credit: 3,
  },
];

module.exports = { Courses, Exams };
