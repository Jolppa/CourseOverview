import { useQuery } from "@apollo/client";
import { GET_EXAMS } from "../graphql/queries";

const ExamList = () => {
  const { loading, error, data } = useQuery(GET_EXAMS);

  return (
    <div className="col-8">
      <h2>Exams</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error :(</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Grade</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {data.exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.name}</td>
                <td>{exam.date}</td>
                <td>{exam.grade}</td>
                <td>{exam.course.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExamList;
