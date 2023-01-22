import { Navbar, Container } from "react-bootstrap";
import logo from "./assets/logo.png";
import { useQuery } from "@apollo/client";
import { GET_EXAMS } from "../graphql/queries";

const Header = () => {
  const { loading, error, data } = useQuery(GET_EXAMS);

  // const nextExam = () => {
  //   if (loading || error) {
  //     return "???";
  //   } else {
  //     return data.exams[0].name;
  //   }
  // };

  // function, that calculates the next exam in days
  const nextExamInDays = () => {
    if (loading || error) {
      return "???";
    } else {
      // https://stackoverflow.com/questions/53420055/error-while-sorting-array-of-objects-cannot-assign-to-read-only-property-2-of
      let nextExam = [...data.exams]
        .sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        })
        .filter((exam) => {
          return new Date(exam.date) > new Date();
        })[0];
      const today = new Date();
      const examDate = new Date(nextExam.date);
      // const diffTime = Math.abs(examDate - today);
      const diffTime = examDate - today;
      // const diffTime = new Date(data.exams[4].date) - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
  };

  return (
    <>
      <Navbar bg="light" className="p-0 mb-4">
        <Container>
          <Navbar.Brand href="#home" className="d-flex justify-content-between">
            <img alt="" src={logo} width="30" height="30"></img>
            <p className="m-0 fw-bold">Provided by GraphQL</p>
          </Navbar.Brand>
          <p className="m-0 fw-bold">Seuraava koe: {nextExamInDays()} päivää</p>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
