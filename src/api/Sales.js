import axios from "axios";

const endPoint = process.env.REACT_APP_BACKEND_DOMAIN;

export const GetAnswers = async () => {
  return await axios.get(`${endPoint}/answers`);
};

export const PostData = async (data) => {
  return await axios.post(`${endPoint}/threaded`, data);
};

export const GetBoard = async () => {
  return await axios.get(`${endPoint}/threaded`);
};
