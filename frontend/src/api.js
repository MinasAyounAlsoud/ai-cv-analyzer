import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/cv",
});

export const analyzeCV = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return API.post("/analyze", formData);
};
