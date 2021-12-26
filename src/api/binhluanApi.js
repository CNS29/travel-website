import { message } from "antd";
import axiosClient from "./axiosClient";

class BinhluanApi {
  getAll = (params) => {
    const url = "/binhluan";
    return axiosClient.get(url, { params });
  };
  postbinhluan = (params) => {
    const url = "/binhluan";
    return axiosClient
      .post(url, params)
      .then((data) => {
        message.success("Thêm thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  deletebinhluan = (id) => {
    const url = `/binhluan/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        message.success("Xoá thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  editbinhluan = (params) => {
    const url = `/binhluan/${params.idsua}`;
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
const binhluanApi = new BinhluanApi();
export default binhluanApi;
