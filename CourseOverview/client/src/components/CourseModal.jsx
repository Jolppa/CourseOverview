import { Modal, Button, Alert, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_COURSE } from "../graphql/mutations";
import { GET_COURSES } from "../graphql/queries";
import { useState } from "react";
import { useQuery } from "@apollo/client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const CourseModal = () => {
  const { loading, error, data } = useQuery(GET_COURSES);

  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [courseCredit, setCourseCredit] = useState("");

  //! Validation states
  const [validName, setValidName] = useState(true);
  const [errorNameMessage, setErrorNameMessage] = useState("");

  const [validStartDate, setValidStartDate] = useState(true);
  const [errorStartDateMessage, setErrorStartDateMessage] = useState("");

  const [validEndDate, setValidEndDate] = useState(true);
  const [errorEndDateMessage, setErrorEndDateMessage] = useState("");

  const [validCourseCredit, setValidCourseCredit] = useState(true);
  const [errorCourseCreditMessage, setErrorCourseCreditMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const [addCourse] = useMutation(ADD_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
    update(cache, { data: { addCourse } }) {
      const { courses } = cache.readQuery({ query: GET_COURSES });
      cache.writeQuery({
        query: GET_COURSES,
        data: { courses: courses.concat([addCourse]) },
      });
    },
    onError(err) {
      console.log(err.message);
    },
  });

  const handleChange = (setFunc, e) => {
    setFunc(e.target.value);
  };

  const handleClear = () => {
    setName("");
    setStartDate("");
    setEndDate("");
    setCourseCredit("");

    setValidName(true);
    setErrorNameMessage("");
    setValidStartDate(true);
    setErrorStartDateMessage("");
    setValidEndDate(true);
    setErrorEndDateMessage("");
    setValidCourseCredit(true);
    setErrorCourseCreditMessage("");
  };

  const handleClose = () => {
    setShow(false);
    handleClear();
    setSuccess(false);
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { courses } = data;

    setValidName(true);
    setValidEndDate(true);
    setValidStartDate(true);
    let error = false;

    // Error handling

    // Name
    if (name === "") {
      setValidName(false);
      setErrorNameMessage("Kurssin nimi ei voi olla tyhjä!");
      error = true;
    }

    if (!name.split("").every((char) => char.match(/^[a-zA-Z\s]*$/))) {
      setValidName(false);
      setErrorNameMessage("Kurssin nimi voi sisältää vain kirjaimia!");
      error = true;
    }

    if (name.length > 20) {
      setValidName(false);
      setErrorNameMessage("Kurssin nimi ei voi olla yli 20 merkkiä pitkä!");
      error = true;
    }

    courses.forEach((course) => {
      if (course.name.toLowerCase() === name.toLowerCase()) {
        setValidName(false);
        setErrorNameMessage("Kurssin nimi on jo käytössä!");
        error = true;
      }
    });

    // END Name

    // Start date
    if (startDate === "") {
      setValidStartDate(false);
      setErrorStartDateMessage("Kurssin aloituspäivä ei voi olla tyhjä!");
      error = true;
    }

    if (!startDate.split("").every((char) => char.match(/[0-9 | -]/))) {
      setValidStartDate(false);
      setErrorStartDateMessage(
        "Kurssin aloituspäivä voi sisältää vain numeroita!"
      );
      error = true;
    }

    if (startDate.length > 10 || startDate.length < 10) {
      setValidStartDate(false);
      setErrorStartDateMessage(
        "Kurssin aloituspäivän tulee olla muodossa pp.kk.vvvv!"
      );
      error = true;
    }

    // END Start date

    // End date
    if (endDate === "") {
      setValidEndDate(false);
      setErrorEndDateMessage("Kurssin loppumispäivä ei voi olla tyhjä!");
      error = true;
    }

    if (!endDate.split("").every((char) => char.match(/[0-9 | -]/))) {
      setValidEndDate(false);
      setErrorEndDateMessage(
        "Kurssin loppumispäivä voi sisältää vain numeroita!"
      );
      error = true;
    }

    if (endDate.length > 10 || endDate.length < 10) {
      setValidEndDate(false);
      setErrorEndDateMessage(
        "Kurssin loppumispäivän tulee olla muodossa pp.kk.vvvv!"
      );
      error = true;
    }
    // END End date

    // Course credit
    if (courseCredit === "") {
      //! Issue here maybe?
      setCourseCredit(5);
    } else if (courseCredit < 1 || courseCredit > 10) {
      setValidCourseCredit(false);
      setErrorCourseCreditMessage(
        "Kurssin opintopistemäärä voi olla vain väliltä 1-10!"
      );
      error = true;
    }
    // END Course credit

    // END Error handling

    //! Will not add course on the first try, but will on the second try?
    if (!error) {
      addCourse({
        variables: {
          name: name,
          start_date: startDate,
          end_date: endDate,
          grade: 0,
          //! Needed to parse int here, otherwise it would try to add a string to the database
          course_credit: parseInt(courseCredit),
        },
      });
      setSuccess(true);
    }
    error = false;
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Lisää kurssi
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Lisää Kurssi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Alerts */}
          <Alert variant="success" show={success}>
            <div className="m-2 d-inline">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            Kurssi lisätty onnistuneesti!
          </Alert>
          <Alert variant="danger" show={!validName} className="alert-danger">
            <div className="m-2 d-inline">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
            {errorNameMessage}
          </Alert>
          <Alert
            variant="danger"
            show={!validStartDate}
            className="alert-danger"
          >
            <div className="m-2 d-inline">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
            {errorStartDateMessage}
          </Alert>
          <Alert variant="danger" show={!validEndDate} className="alert-danger">
            <div className="m-2 d-inline">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
            {errorEndDateMessage}
          </Alert>
          <Alert
            variant="danger"
            show={!validCourseCredit}
            className="alert-danger"
          >
            <div className="m-2 d-inline">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
            {errorCourseCreditMessage}
          </Alert>

          {/* END Alerts */}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Label>Kurssin nimi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kurssin nimi"
                value={name}
                onChange={(e) => handleChange(setName, e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicStartDate" className="mb-3">
              <Form.Label>Aloituspäivä</Form.Label>
              <Form.Control
                type="date"
                placeholder="Kurssin aloituspäivä"
                value={startDate}
                onChange={(e) => handleChange(setStartDate, e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicEndDate" className="mb-3">
              <Form.Label>Päättymispäivä</Form.Label>
              <Form.Control
                type="date"
                placeholder="Kurssin päättymispäivä"
                value={endDate}
                onChange={(e) => handleChange(setEndDate, e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicCourseCredit" className="mb-3">
              <Form.Label>Kurssin opintopistemäärä</Form.Label>
              <Form.Control
                type="number"
                placeholder="Oletusarvo 5"
                value={courseCredit}
                onChange={(e) => handleChange(setCourseCredit, e)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Lisää Kurssi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CourseModal;
