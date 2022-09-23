import { Navbar, Container } from "react-bootstrap";
import logo from "./assets/logo.png";
import { useQuery } from "@apollo/client";
import { GET_EXAMS } from "../graphql/queries";

const Header = () => {
  const { loading, error, data } = useQuery(GET_EXAMS);
  return (
    <>
      <Navbar bg="light" className="p-0 mb-4">
        <Container>
          <Navbar.Brand href="#home" className="d-flex justify-content-between">
            <img alt="" src={logo} width="30" height="30"></img>
            <p className="m-0 fw-bold">Provided by GraphQL</p>
          </Navbar.Brand>
          <p className="m-0 fw-bold">
            Seuraava koe: {loading || error ? "???" : "asd"}
          </p>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
