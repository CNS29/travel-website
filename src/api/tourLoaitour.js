import { message } from "antd";
import axiosClient from "./axiosClient";

class TourloaitourApi {
  getAll = (params) => {
    const url = "/tourloaitour";
    return axiosClient.get(url, { params });
  };
  posttourloaitour = (params) => {
    const url = "/tourloaitour";
    return axiosClient.post(url, params);
  };
  deletetourloaitour = (id) => {
    const url = `/tourloaitour/${id}`;
    return axiosClient.delete(url);
  };
  edittourloaitour = (params) => {
    const url = `/tourloaitour/${params.idsua}`;
    return axiosClient
      .patch(url, params)
      .then((data) => {
        message.success("Sửa thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
}
const tourloaitourApi = new TourloaitourApi();
export default tourloaitourApi;
