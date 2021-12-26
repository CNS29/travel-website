import { message } from "antd";
import axiosClient from "./axiosClient";

class ChitieuApi {
  getAll = (params) => {
    const url = "/chitieu";
    return axiosClient.get(url, { params });
  };
  postchitieu = (params) => {
    const url = "/chitieu";
    return axiosClient
      .post(url, params)
      .then((data) => {
        message.success("Thêm thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  deletechitieu = (id) => {
    const url = `/chitieu/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        message.success("Xoá thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  editchitieu = (params) => {
    const url = `/chitieu/${params.idsua}`;
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
const chitieuApi = new ChitieuApi();
export default chitieuApi;
