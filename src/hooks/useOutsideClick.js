import { useRef, useEffect } from "react";

export default function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("click outside");
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing); // addtrue prevent buble up and close modal while open btn click
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
