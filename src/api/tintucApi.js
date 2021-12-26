import { message } from "antd";
import axiosClient from "./axiosClient";

class TintucApi {
  getAll = (params) => {
    const url = "/tintuc";
    return axiosClient.get(url, { params });
  };
  posttintuc = (params) => {
    const url = "/tintuc";
    return axiosClient
      .post(url, params)
      .then((data) => {
        message.success("Thêm thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  deletetintuc = (id) => {
    const url = `/tintuc/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        message.success("Xoá thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  edittintuc = (params) => {
    const url = `/tintuc/${params.id}`;
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
const tintucApi = new TintucApi();
export default tintucApi;
