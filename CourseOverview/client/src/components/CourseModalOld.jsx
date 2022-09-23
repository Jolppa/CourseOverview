import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COURSES } from "../graphql/queries";
import { ADD_COURSE } from "../graphql/mutations";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const CourseModal = (show) => {
  const { loading, error, data } = useQuery(GET_COURSES);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [courseCredit, setCourseCredit] = useState("");

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
    variables: {
      name: name,
      start_date: startDate,
      end_date: endDate,
      grade: 0,
      course_credit: courseCredit,
    },
    refetchQueries: [{ query: GET_COURSES }],
    update(cache, { data: { addCourse } }) {
      const { courses } = cache.readQuery({ query: GET_COURSES });
      cache.writeQuery({
        query: GET_COURSES,
        data: { courses: courses.concat([addCourse]) },
      });
    },
  });

  const handleChange = (setFunc, e) => {
    setFunc(e.target.value);
  };

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

    //Test
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

    if (!error) {
      setSuccess(true);
      addCourse();
    }
    error = false;
  };

  //! Fix so when submitted the form is reset and modal is closed
  // Maybe this?
  // https://stackoverflow.com/questions/59067149/how-to-use-data-target-and-data-toggle-in-reactjs

  return (
    <>
      {/* <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#courseModal"
      >
        Lisää kurssi
      </button> */}

      <div
        className="modal fade"
        id="courseModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="courseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="courseModalLabel">
                Lisää Kurssi
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* alerts */}
              {success && (
                <div className="alert alert-success" role="alert">
                  <div className="m-2 d-inline">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </div>
                  Kurssi lisätty onnistuneesti!
                </div>
              )}
              {!validName && (
                <div className="alert alert-danger" role="alert">
                  <div className="m-2 d-inline">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                  </div>
                  {errorNameMessage}
                </div>
              )}
              {!validStartDate && (
                <div className="alert alert-danger" role="alert">
                  <div className="m-2 d-inline">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                  </div>
                  {errorStartDateMessage}
                </div>
              )}
              {!validEndDate && (
                <div className="alert alert-danger" role="alert">
                  <div className="m-2 d-inline">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                  </div>
                  {errorEndDateMessage}
                </div>
              )}
              {!validCourseCredit && (
                <div className="alert alert-danger" role="alert">
                  <div className="m-2 d-inline">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                  </div>
                  {errorCourseCreditMessage}
                </div>
              )}
              <form onSubmit={handleSubmit} id="my_form">
                <div className="form-group">
                  <label htmlFor="courseName">Kurssin nimi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="courseName"
                    placeholder="Kurssin nimi"
                    value={name}
                    onChange={(e) => {
                      handleChange(setName, e);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">Alkamispäivä</label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => {
                      handleChange(setStartDate, e);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">Päättymispäivä</label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    placeholder="Kurssin nimi"
                    value={endDate}
                    onChange={(e) => {
                      handleChange(setEndDate, e);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">
                    Kurssista saatava opintopistemäärä
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="courseCredit"
                    placeholder="Oletus on 5"
                    value={courseCredit}
                    onChange={(e) => {
                      handleChange(setCourseCredit, e);
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button form="my_form" type="submit" className="btn btn-primary">
                Lisää kurssi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseModal;
