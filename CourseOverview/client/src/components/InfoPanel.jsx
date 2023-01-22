import { GET_ALL } from "../graphql/queries";
import { Spinner } from "react-bootstrap";

const { useQuery } = require("@apollo/client");

const InfoPanel = () => {
  const { loading, error, data } = useQuery(GET_ALL);

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <p>Error :( {error.message}</p>;

  const course_avarage = () => {
    const courses = data.courses.filter((course) => course.grade !== 0);
    if (courses.length === 0) return 0;
    return (
      courses
        .map((course) => course.grade)
        .reduce((prev, curr) => prev + curr) / courses.length
    );
  };

  const exam_avarage = () => {
    const exams = data.exams.filter((exam) => exam.grade !== 0);
    if (exams.length === 0) return 0;
    return (
      exams.map((exam) => exam.grade).reduce((prev, curr) => prev + curr) /
      exams.length
    );
  };

  const credits_incoming = () => {
    return data.courses
      .filter((course) => course.grade === 0)
      .map((course) => course.course_credit)
      .reduce((prev, curr) => prev + curr, 0);
  };

  const credits_collected = () => {
    return data.courses
      .filter((course) => course.grade !== 0)
      .map((course) => course.course_credit)
      .reduce((prev, curr) => prev + curr, 0);
  };

  return (
    <div className="col-8 col-md-4 mb-5 ms-md-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center">Info</h3>
          <ul className="list-group">
            <li className="list-group-item">
              <p className="m-0">Kursseja yhteensä: {data.courses.length}</p>
            </li>
            <li className="list-group-item">
              <p className="m-0">Kokeita yhteensä: {data.exams.length}</p>
            </li>
            <li className="list-group-item">
              <p className="m-0">Kurssien keskiarvo: {course_avarage()} </p>
            </li>
            <li className="list-group-item">
              <p className="m-0">Kokeiden keskiarvo: {exam_avarage()}</p>
            </li>
            <li className="list-group-item">
              <p className="m-0">
                Opintopisteitä tulossa: {credits_incoming()}
              </p>
            </li>
            <li className="list-group-item">
              <p className="m-0">
                Opintopisteitä kerätty: {credits_collected()}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
