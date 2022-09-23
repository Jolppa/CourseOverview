import React from "react";
import logo from "./assets/logo.png";
import { useQuery } from "@apollo/client";
import { GET_EXAMS } from "../graphql/queries";

const Header = () => {
  const { loading, error, data } = useQuery(GET_EXAMS);
  const current_date = new Date().toLocaleDateString("fi-FI");
  const milliseconds_in_day = 1000 * 60 * 60 * 24;

  // Calculate the number of days until the next exam.
  //! FIx
  // const calc_days = () => {
  //   let days = null;
  //   data.exams.forEach((exam) => {
  //     if()
  //     if (
  //       (new Date(exam.date).getTime() - current_date) * milliseconds_in_day <
  //       (new Date(prev.date).getTime() - current_date) * milliseconds_in_day
  //     )
  //   }
  //   const next_exam = data.exams.reduce((prev, curr) => {
  //     if (
  //       (new Date(curr.date).getTime() - current_date) * milliseconds_in_day <
  //       (new Date(prev.date).getTime() - current_date) * milliseconds_in_day
  //     ) {
  //       return curr;
  //     } else {
  //       return prev;
  //     }
  //   });
  // };

  return (
    <nav className="navbar bg-light p-0 mb-4">
      <div className="container">
        <div className="navbar-brand d-flex justify-content-between">
          <img src={logo} alt="Provided by GraphQL" />
          <p className="m-0 fw-bold">Provided by GraphQL</p>
        </div>
        <div>
          <p className="m-0 fw-bold">
            Seuraava koe: {loading || error ? "???" : "asd"}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Header;
