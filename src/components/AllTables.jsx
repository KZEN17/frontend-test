import { useState, useEffect } from "react";

import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getTables, deleteTable } from "../service/api";
import { Link } from "react-router-dom";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 0px 0 0 50px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #031927;
    color: #ffffff;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

const AllTables = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    getAllTables();
  }, []);

  const deleteTableData = async (id) => {
    await deleteTable(id);
    getAllTables();
  };

  const getAllTables = async () => {
    let response = await getTables();
    setTables(response.data);
  };

  return (
    <>
      <Button
        href="/add-table"
        variant="contained"
        sx={{
          float: "right",
          padding: "15px 25px",
          margin: "0 10% 15px 0",
          backgroundColor: "#508aa8",
        }}
      >
        <AddIcon />
        Add Table
      </Button>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Number</TableCell>
            {/* <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell> */}
            <TableCell></TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {tables.map((table) => (
            <TRow key={table.id}>
              <TableCell>{table.id}</TableCell>
              <TableCell>{table.name}</TableCell>
              <TableCell>{table.number}</TableCell>
              {/* <TableCell>{table.email}</TableCell>
              <TableCell>{table.phone}</TableCell> */}
              <TableCell sx={{ float: "right", marginRight: "25px" }}>
                <Button
                  sx={{ backgroundColor: "#9dd1f1" }}
                  variant="contained"
                  style={{ marginRight: 10 }}
                  component={Link}
                  to={`/edit-table/${table.id}`}
                >
                  Edit
                </Button>
                <Button
                  sx={{ backgroundColor: "#ba1200" }}
                  variant="contained"
                  onClick={() => deleteTableData(table.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default AllTables;
