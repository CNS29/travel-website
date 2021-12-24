import axiosClient from "./axiosClient";
class InforApi {
  infor = () => {
    const url = "/checkuser";
    if (localStorage.getItem("token")) {
      return axiosClient.get(url);
    } else {
      return "";
    }
  };
}
const inforApi = new InforApi();
export default inforApi;
