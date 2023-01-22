import { Container } from "react-bootstrap";
import Header from "./components/Header";
import InfoPanel from "./components/InfoPanel";
import ExamList from "./components/ExamList";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import CourseModal from "./components/CourseModal";
import ExamModal from "./components/ExamModal";

const port = 5000;

const client = new ApolloClient({
  uri: `http://localhost:${port}/graphql`,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <Container>
          <div className="d-flex justify-content-around mb-4">
            <CourseModal />
            <ExamModal />
          </div>
          <div className="d-flex flex-column flex-md-row-reverse align-items-center align-items-md-start">
            <InfoPanel />
            <ExamList />
          </div>
        </Container>
      </ApolloProvider>
    </>
  );
}

export default App;
