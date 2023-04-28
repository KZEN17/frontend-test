import axios from "axios";

const presentersUrl = "http://localhost:3002/presenters";
const tablesUrl = "http://localhost:3002/tables";

export const getPresenters = async (id) => {
  id = id || "";
  try {
    return await axios.get(`${presentersUrl}/${id}`);
  } catch (error) {
    console.log("Error while calling getUsers api ", error);
  }
};

export const addPresenter = async (user) => {
  return await axios.post(`${presentersUrl}`, user);
};

export const deletePresenter = async (id) => {
  return await axios.delete(`${presentersUrl}/${id}`);
};

export const editPresenter = async (id, user) => {
  return await axios.put(`${presentersUrl}/${id}`, user);
};

// Tables CRUD
export const getTables = async (id) => {
  id = id || "";
  try {
    return await axios.get(`${tablesUrl}/${id}`);
  } catch (error) {
    console.log("Error while calling getUsers api ", error);
  }
};

export const addTable = async (table) => {
  return await axios.post(`${tablesUrl}`, table);
};

export const deleteTable = async (id) => {
  return await axios.delete(`${tablesUrl}/${id}`);
};

export const editTable = async (id, table) => {
  return await axios.put(`${tablesUrl}/${id}`, table);
};
