const Exams = [
  {
    id: "exam-1",
    title: "Exam 1",
    date: "2018-01-01",
    grade: 5,
    course_id: "course-1",
  },
  {
    id: "exam-2",
    title: "Exam 2",
    date: "2018-01-15",
    grade: 5,
    course_id: "course-1",
  },
  {
    id: "exam-3",
    title: "Exam 3",
    date: "2018-02-01",
    grade: 5,
    course_id: "course-2",
  },
  {
    id: "exam-4",
    title: "Exam 4",
    date: "2018-02-15",
    grade: 5,
    course_id: "course-2",
  },
];
const Courses = [
  {
    id: "course-1",
    title: "Course 1",
    start_date: "2018-01-01",
    end_date: "2018-01-31",
    exam_ids: ["exam-1", "exam-2"],
    grade: 5,
  },
  {
    id: "course-2",
    title: "Course 2",
    start_date: "2018-02-01",
    end_date: "2018-02-28",
    exam_ids: ["exam-3", "exam-4"],
    grade: 5,
  },
];

module.exports = { Courses, Exams };
