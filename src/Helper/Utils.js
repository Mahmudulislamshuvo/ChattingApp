import { toast, Bounce, Slide } from "react-toastify";

function firetoastsuccess(
  msg = "Missing",
  position = "top-right",
  TimeClose = 5000,
) {
  toast.success(msg, {
    position: position,
    autoClose: TimeClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  });
}

// Error toast fire
function firetoasterror(
  msg = "Missing",
  position = "top-right",
  TimeClose = 5000,
) {
  toast.error(msg, {
    position: position,
    autoClose: TimeClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  });
}

export { firetoastsuccess, firetoasterror };
