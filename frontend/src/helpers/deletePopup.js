
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);


export const deletePopup = (handleDelete, text) => {
  console.log('POPUP',text)
  let items;
  if (typeof text === 'object'){
    let string = '';
    const entries = Object.entries(text)
    for (const entry of entries){
      if (entry[0] === '_id'){
        continue
      }else{
        string += `<p>${entry[1]}<p>`
      }
      console.log(string)
    }
    items = string;

  }else{
    items=text;
  }
    MySwal.fire({
      title: "Are you sure you want to delete?",
      html: items,
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
