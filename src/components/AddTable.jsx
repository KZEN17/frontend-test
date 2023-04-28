// import React, { useState } from "react";
// import {
//   FormGroup,
//   FormControl,
//   InputLabel,
//   Input,
//   Button,
//   styled,
//   Typography,
// } from "@mui/material";
// import { addTable } from "../service/api";
// import { useNavigate } from "react-router-dom";

// const initialValue = {
//   name: "",
//   number: "",
// };

// const Container = styled(FormGroup)`
//     width: 50%;
//     margin: 5% 0 0 25%;
//     & > div {
//         margin-top: 20px;
// `;

// const AddTable = () => {
//   const [table, setTable] = useState(initialValue);
//   const { name, number } = table;
//   let navigate = useNavigate();

//   const onValueChange = (e) => {
//     setTable({ ...table, [e.target.name]: e.target.value });
//   };

//   const addTableDetails = async () => {
//     await addTable(table);
//     navigate("/tables");
//   };

//   return (
//     <Container>
//       <Typography variant="h4">Add a Table</Typography>
//       <FormControl>
//         <InputLabel htmlFor="my-input">Name</InputLabel>
//         <Input
//           onChange={(e) => onValueChange(e)}
//           name="name"
//           value={name}
//           id="my-input"
//         />
//       </FormControl>
//       <FormControl>
//         <InputLabel htmlFor="my-input">Number</InputLabel>
//         <Input
//           onChange={(e) => onValueChange(e)}
//           name="number"
//           value={number}
//           id="my-input"
//         />
//       </FormControl>

//       <FormControl>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => addTableDetails()}
//         >
//           Add a Table
//         </Button>
//       </FormControl>
//     </Container>
//   );
// };

// export default AddTable;
import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
} from "@mui/material";
import { addTable } from "../service/api";
import { useNavigate } from "react-router-dom";

const initialValue = {
  name: "",
  number: "",
};

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% 0 0 25%;
  & > div {
    margin-top: 20px;
  }
`;

const AddTable = () => {
  const [table, setTable] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const { name, number } = table;
  let navigate = useNavigate();

  const validateInputs = () => {
    let errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!number.trim()) {
      errors.number = "Number is required";
    } else if (isNaN(number)) {
      errors.number = "Number should be a valid number";
    }
    return errors;
  };

  const onValueChange = (e) => {
    setTable({ ...table, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const addTableDetails = async () => {
    const errors = validateInputs();
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    await addTable(table);
    navigate("/tables");
  };

  return (
    <Container>
      <Typography variant="h4">Add a Table</Typography>
      <FormControl error={!!errors.name}>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={name}
          id="name"
        />
        {errors.name && <Typography color="error">{errors.name}</Typography>}
      </FormControl>
      <FormControl error={!!errors.number}>
        <InputLabel htmlFor="number">Number</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="number"
          value={number}
          id="number"
        />
        {errors.number && (
          <Typography color="error">{errors.number}</Typography>
        )}
      </FormControl>

      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addTableDetails()}
        >
          Add a Table
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddTable;
