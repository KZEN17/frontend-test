import React, { useEffect, useState } from "react";
import { getTables, getPresenters } from "../service/api";
import TableComponent from "./TableComponent";
import { Typography } from "@mui/material";
let presenters = [];
const timeSlotDuration = 20 * 60 * 1000; // in milliseconds

const Home = () => {
  const [alltables, setTables] = useState([]);
  const [allpresenters, setAllPresenters] = useState([]);
  presenters = allpresenters.map((obj) => obj.name);
  let totalTables = alltables.map((obj) => obj.name + " " + obj.number);
  const tables = [...totalTables, "Break"];
  const numTables = tables.length;
  const numPresenters = tables.length + 1;
  const idealNumPresenters = numTables + 1;
  const numExtraPresenters = Math.max(0, numPresenters - idealNumPresenters);
  const startTime = new Date();
  const startTime2 = new Date();
  const startTime3 = new Date();
  startTime.setHours(9, 0, 0, 0); // 9:00 AM as the starting time shift 1
  startTime2.setHours(17, 0, 0, 0); // 9:00 AM as the starting time shift 2
  startTime3.setHours(1, 0, 0, 0); // 9:00 AM as the starting time shift 3

  const timeSlots = [];
  const timeSlots2 = [];
  const timeSlots3 = [];
  useEffect(() => {
    getAllTables();
    getAllPresenters();
  }, []);

  const getAllPresenters = async () => {
    let response = await getPresenters();
    setAllPresenters(response.data);
  };

  const getAllTables = async () => {
    let response = await getTables();
    setTables(response.data);
  };
  for (let i = 0; i < 24; i++) {
    // loop for 8 hours (24 time slots)
    const time = new Date(startTime.getTime() + i * timeSlotDuration);
    const time2 = new Date(startTime2.getTime() + i * timeSlotDuration);
    const time3 = new Date(startTime3.getTime() + i * timeSlotDuration);
    timeSlots.push(time);
    timeSlots2.push(time2);
    timeSlots3.push(time3);
  }

  const getPresenterTableRotation = (startTableIndex) => {
    const rotation = [];
    for (let i = 0; i < numTables; i++) {
      const presenterIndex = (startTableIndex + i) % numPresenters;
      const tableIndex = (startTableIndex + i) % numTables;
      rotation.push({
        presenter: presenters[presenterIndex],
        table: tables[tableIndex],
      });
    }

    if (numExtraPresenters > 0) {
      for (let i = 0; i < numExtraPresenters; i++) {
        const presenterIndex =
          (startTableIndex + numTables + i) % numPresenters;
        rotation.splice(i + 1, 0, {
          presenter: presenters[presenterIndex].name,
          table: "Break",
        });
      }
    }

    return rotation;
  };

  const rotations = [];
  for (let i = 0; i < numTables; i++) {
    const rotation = getPresenterTableRotation(i);
    rotations.push(rotation);
  }

  return (
    <>
      <Typography variant="h6">Shift 1</Typography>
      <TableComponent
        timeSlots={timeSlots}
        rotations={rotations}
        timeSlotDuration={timeSlotDuration}
        shiftIndex={0} // pass the shift index as a prop
      />
      <br />
      <Typography variant="h6">Shift 2</Typography>
      <TableComponent
        timeSlots={timeSlots2}
        rotations={rotations}
        timeSlotDuration={timeSlotDuration}
        shiftIndex={1} // pass the shift index as a prop
      />
      <br />
      <Typography variant="h6">Shift 3</Typography>
      <TableComponent
        timeSlots={timeSlots3}
        rotations={rotations}
        timeSlotDuration={timeSlotDuration}
        shiftIndex={2} // pass the shift index as a prop
      />
      {/* <Typography variant="h6">Shift 1</Typography>
      <TableComponent
        timeSlots={timeSlots}
        rotations={rotations}
        timeSlotDuration={timeSlotDuration}
      />
      <br />
      <Typography variant="h6">Shift 2</Typography>
      <TableComponent
        timeSlots={timeSlots2}
        rotations={rotations}
        timeSlotDuration={timeSlotDuration}
      />
      <br />
      <Typography variant="h6">Shift 3</Typography>
      <TableComponent
        timeSlots={timeSlots3}
        rotations={rotations}
        timeSlotDuration={timeSlotDuration}
      /> */}
    </>
  );
};

export default Home;
