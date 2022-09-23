import { GET_ALL } from "../graphql/queries";
import { Spinner } from "react-bootstrap";

const { useQuery } = require("@apollo/client");

const InfoPanel = () => {
  const { loading, error, data } = useQuery(GET_ALL);

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <p>Error :(</p>;

  return (
    <div className="col-8 col-md-4 mb-5">
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
              <p className="m-0">
                Kurssien keskiarvo:{" "}
                {data.courses.reduce((prev, curr) => prev + curr, 0) /
                  data.courses.filter((course) => course.grade !== 0).length ||
                  0}
              </p>
            </li>
            <li className="list-group-item">
              <p className="m-0">Kokeiden keskiarvo:</p>
            </li>
            <li className="list-group-item">
              <p className="m-0">
                Opintopisteitä tulossa:{" "}
                {data.courses
                  .filter((course) => course.grade === 0)
                  .map((course) => course.course_credit)
                  .reduce((prev, curr) => prev + curr, 0)}
              </p>
            </li>
            <li className="list-group-item">
              <p className="m-0">
                Opintopisteitä kerätty:{" "}
                {data.courses
                  .filter((course) => course.grade !== 0)
                  .map((course) => course.course_credit)
                  .reduce((prev, curr) => prev + curr, 0)}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
