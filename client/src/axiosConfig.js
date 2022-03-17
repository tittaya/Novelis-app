import axios from "axios";
require("dotenv").config();

const api = axios.create({
  baseURL: process.env.CLOUDINARY_URL
});

export default api;