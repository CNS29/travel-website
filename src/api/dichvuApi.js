import { message } from "antd";
import axiosClient from "./axiosClient";

class DichvuApi {
  getAll = (params) => {
    const url = "/dichvu";
    return axiosClient.get(url, { params });
  };
  postdichvu = (params) => {
    const url = "/dichvu";
    return axiosClient
      .post(url, params)
      .then((data) => {
        message.success("Thêm thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  deletedichvu = (id) => {
    const url = `/dichvu/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        message.success("Xoá thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  editdichvu = (params) => {
    const url = `/dichvu/${params.idsua}`;
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
const dichvuApi = new DichvuApi();
export default dichvuApi;
