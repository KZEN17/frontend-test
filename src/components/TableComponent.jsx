import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
const TableComponent = ({
  timeSlots,
  rotations,
  timeSlotDuration,
  shiftIndex,
}) => {
  const rows = rotations.map((rotation, index) => (
    <TableRow key={index}>
      <TableCell
        sx={{
          minWidth: "100px",
          fontSize: "12px",
          fontWeight: "bold",
          backgroundColor: "#031927",
          color: "white",
        }}
      >
        {rotation[0].presenter}
      </TableCell>
      {timeSlots.map((time, timeIndex) => {
        const slotIndex = Math.floor((time - timeSlots[0]) / timeSlotDuration);
        const slot = rotation[slotIndex % rotation.length];
        return (
          <TableCell
            key={timeIndex}
            sx={{ minWidth: "100px", fontSize: "12px" }}
          >
            {slot.table}
          </TableCell>
        );
      })}
    </TableRow>
  ));

  return (
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#031927" }}>
          <TableCell
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              minWidth: "100px",
              color: "#fff",
            }}
          >
            Time
          </TableCell>
          {timeSlots.map((time, index) => (
            <TableCell
              key={index}
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                minWidth: "100px",
                color: "#fff",
              }}
            >
              {time.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
              {" - "}
              {index < timeSlots.length - 1 && (
                <>
                  {" "}
                  {timeSlots[index + 1].toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}{" "}
                </>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{rows}</TableBody>
    </Table>
  );
};

export default TableComponent;
