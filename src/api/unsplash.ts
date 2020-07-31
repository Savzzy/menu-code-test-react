import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization:
      "Client-ID 3d36c43b692816cb74ca648cfe7f137ad5a32db8fb65f540bd1252cc39b46dce",
  },
});
