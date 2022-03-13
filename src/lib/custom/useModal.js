import { useRef, useState } from "react";

export const useModal = () => {
  const [modalState, setModalState] = useState(false);

  const modalRef = useRef();

  const handleShowModal = () => {
    setModalState(!modalState);
  };
  const handleCloseModal = (e) => {
    console.log("이벤트 실행");
    if (modalState && !modalRef.current?.contains(e.target)) {
      setModalState(false);
    }
  };
  return {
    modalState,
    handleShowModal,
    handleCloseModal,
    modalRef,
  };
};
