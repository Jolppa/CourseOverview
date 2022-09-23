import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COURSES, GET_EXAMS } from "../graphql/queries";
import { ADD_EXAM } from "../graphql/mutations";

const ExamModal = () => {
  const { loading, error, data } = useQuery(GET_COURSES);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setExamName("");
    setDate("");

    setValidExamName(true);
    setErrorExamNameMessage("");
    setValidDate(true);
    setErrorDateMessage("");
    setSuccess(false);
  };

  const [examName, setExamName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [date, setDate] = useState("");

  const [validExamName, setValidExamName] = useState(true);
  const [errorExamNameMessage, setErrorExamNameMessage] = useState("");

  const [validDate, setValidDate] = useState(true);
  const [errorDateMessage, setErrorDateMessage] = useState("");

  const [validCourseName, setValidCourseName] = useState(true);
  const [errorCourseNameMessage, setErrorCourseNameMessage] = useState("");

  const [success, setSuccess] = useState(false);

  //! Issue here with courseId
  const [addExam] = useMutation(ADD_EXAM, {
    variables: {
      name: examName,
      date: date,
      grade: 0,
      course_id: courseId,
    },
    //! Might need to refetch GET_COURSES
    refetchQueries: [{ query: GET_EXAMS }],
    update(cache, { data: { addExam } }) {
      const { exams } = cache.readQuery({ query: GET_EXAMS });
      cache.writeQuery({
        query: GET_EXAMS,
        data: { exams: exams.concat([addExam]) },
      });
    },
  });

  const handleShow = () => {
    setShow(true);
    setCourseName(data.courses[0].name);
    setCourseId(data.courses[0].id);
    console.log(data.courses);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(examName, courseName, date);
    console.log(courseId);
    const { courses } = data;

    setValidExamName(true);
    setValidDate(true);
    setValidCourseName(true);
    let error = false;

    // Error handling

    // Exam name
    if (examName === "") {
      setValidExamName(false);
      setErrorExamNameMessage("Kurssin nimi ei voi olla tyhjä");
      error = true;
    }

    //! Might need to change this (i.e. if I want to use convention of "Exam 1" etc.)")
    if (!examName.split("").every((char) => char.match(/^[a-zA-Z\s]*$/))) {
      setValidExamName(false);
      setErrorExamNameMessage("Kurssin nimi voi sisältää vain kirjaimia");
      error = true;
    }

    if (examName.length > 20) {
      setValidExamName(false);
      setErrorExamNameMessage("Kurssin nimi ei voi olla yli 20 merkkiä");
      error = true;
    }

    //!Test
    courses.forEach((course) => {
      course.exams.forEach((exam) => {
        if (exam.name.toLowerCase() === examName.toLowerCase()) {
          setValidExamName(false);
          setErrorExamNameMessage("Kurssilla on jo samanniminen tentti");
          error = true;
        }
      });
    });

    // END Exam name

    // Date
    if (date === "") {
      setValidDate(false);
      setErrorDateMessage("Päivämäärä ei voi olla tyhjä");
      error = true;
    }

    if (!date.split("").every((char) => char.match(/[0-9 | -]/))) {
      setValidDate(false);
      setErrorDateMessage("Päivämäärä voi sisältää vain numeroita");
      error = true;
    }

    if (date.length > 10 || date.length < 10) {
      setValidDate(false);
      setErrorDateMessage("Päivämäärä ei voi olla yli 10 merkkiä");
      error = true;
    }

    // END Date

    // Course name
    if (courseName === "") {
      setValidCourseName(false);
      setErrorCourseNameMessage("Kurssin nimi ei voi olla tyhjä");
      error = true;
    }

    // END Course name

    // END Error handling

    if (!error) {
      //! This is empty?
      console.log(courseId);
      addExam();
      setSuccess(true);
      console.log("Success!");
    }
    error = false;
  };
  const handleChange = (setFunc, e) => {
    setFunc(e.target.value);
  };

  return (
    <>
      <>
        <Button variant="secondary" onClick={handleShow}>
          Lisää koe
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Lisää koe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName" className="mb-3">
                <Form.Label>Kokeen nimi</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Kokeen nimi"
                  value={examName}
                  onChange={(e) => handleChange(setExamName, e)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicDate" className="mb-3">
                <Form.Label>Päivämäärä</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Päivämäärä"
                  value={date}
                  onChange={(e) => handleChange(setDate, e)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCourseName" className="mb-3">
                <Form.Label>Kurssin nimi</Form.Label>
                <Form.Select
                  placeholder="Kurssin nimi"
                  value={courseName}
                  onChange={(e) => {
                    handleChange(setCourseName, e);
                    setCourseId(
                      data.courses.find((course) => course.name === courseName)
                        .id
                    );
                  }}
                >
                  {loading ? (
                    <option>Ladataan...</option>
                  ) : error ? (
                    <option>Virhe</option>
                  ) : (
                    data.courses.map((course) => (
                      <option key={course.id}>{course.name}</option>
                    ))
                  )}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
              Lisää koe
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default ExamModal;
