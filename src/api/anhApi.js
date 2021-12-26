import { message } from "antd";
import axiosClient from "./axiosClient";

class AnhApi {
  getAll = (params) => {
    const url = "/anh";
    return axiosClient.get(url, { params });
  };
  postanh = (params) => {
    const url = "/anh";
    return axiosClient.post(url, params);
  };
  deleteanh = (id) => {
    const url = `/anh/${id}`;
    return axiosClient.delete(url);
  };
  editanh = (params) => {
    const url = `/anh/${params.idsua}`;
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
const anhApi = new AnhApi();
export default anhApi;
