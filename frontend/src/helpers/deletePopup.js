
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);


export const deletePopup = (handleDelete, text) => {
    MySwal.fire({
      title: "Are you sure?",
      text: `Deleting: ${text}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };
