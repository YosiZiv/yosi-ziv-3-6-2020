import Axios from "axios";
export const axios = Axios.create({
  baseURL: "http://dataservice.accuweather.com/",
});
