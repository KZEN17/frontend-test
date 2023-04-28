import { useState, useEffect } from "react";

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getTables, editTable } from "../service/api";

const initialValue = {
  name: "",
  number: "",
};

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;

const EditTable = () => {
  const [table, setTable] = useState(initialValue);
  const { name, number } = table;
  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getTables(id);
    setTable(response.data);
  };

  const editUserDetails = async () => {
    const response = await editTable(id, table);
    navigate("/tables");
  };

  const onValueChange = (e) => {
    console.log(e.target.value);
    setTable({ ...table, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Typography variant="h4">Edit Information</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={name}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="number"
          value={number}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>

      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => editUserDetails()}
        >
          Edit Table
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditTable;
