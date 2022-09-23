import CourseModal from "./CourseModalOld";
import CourseModalBoot from "./CourseModal";
import ExamWindow from "./ExamWindow";

const Modal = () => {
  return (
    <div className="container mb-4">
      <div className="d-flex justify-content-around">
        {/* <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#courseModal"
        >
          Lisää kurssi
        </button> */}
        {/* <CourseModal /> */}
        {/* <CourseModalBoot /> */}
        <button className="btn btn-secondary">Lisää koe</button>
      </div>
    </div>
  );
};

export default Modal;
