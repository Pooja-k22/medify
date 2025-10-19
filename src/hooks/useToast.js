// src/hooks/useToast.js
import { toast } from "react-toastify";

export const useToast = () => {
  const showToast = (message, type = "info") => {
    const options = {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "warning":
        toast.warning(message, options);
        break;
      default:
        toast.info(message, options);
        break;
    }
  };

  return { showToast };
};
