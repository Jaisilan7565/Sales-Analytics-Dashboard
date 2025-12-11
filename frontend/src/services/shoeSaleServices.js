import { BASE_URL } from "../utils/url";
import axios from "axios";

export const getAllShoeSales = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/shoe-sales`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
