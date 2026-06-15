import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-cv-analyzer-mcld.onrender.com/api/cv",
});

export const analyzeCV = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return API.post("/analyze", formData);
};
