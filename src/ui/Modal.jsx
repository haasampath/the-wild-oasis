import { createContext } from "react";
import { cloneElement, useContext } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
import { useState } from "react";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

//1) create new context
const ModalContext = createContext();

//2) create paren component- modal itself
function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName(""); // handler functions
  const open = setOpenName; // opening means set openname simply 'cabin-form'

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3)
function Open({ children, opens: opensWindowName }) {
  // open componenet
  const { open } = useContext(ModalContext); // access to open function iwith context
  //return children; // children is button here
  return cloneElement(children, { onClick: () => open(opensWindowName) }); // clone element with new props(button clone here and add function to it bcz befor passing cant pass event from addCabin)
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  // const ref = useRef();
  // useEffect(
  //   function () {
  //     function handleClick(e) {
  //       if (ref.current && !ref.current.contains(e.target)) close();
  //     }
  //     document.addEventListener("click", handleClick, true); // addtrue prevent buble up and close modal while open btn click
  //     return () => document.removeEventListener("click", handleClick, true);
  //   },
  //   [close]
  // );

  if (name !== openName) return null;

  return createPortal(
    // createportal remove modal from flow of element
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>
          {cloneElement(children, { onCloseModal: close })}
          {/* here is how add click event */}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// implement
Modal.Open = Open;
Modal.Window = Window;
export default Modal;
