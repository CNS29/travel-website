import { message } from "antd";
import axiosClient from "./axiosClient";

class LoaitourApi {
  getAll = (params) => {
    const url = "/loaitour";
    return axiosClient.get(url, { params });
  };
  postloaitour = (params) => {
    const url = "/loaitour";
    return axiosClient
      .post(url, params)
      .then((data) => {
        message.success("Thêm thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  deleteLoaitour = (id) => {
    const url = `/loaitour/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        message.success("Xoá thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  editLoaitour = (params) => {
    const url = `/loaitour/${params.idsua}`;
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
const loaitourApi = new LoaitourApi();
export default loaitourApi;
