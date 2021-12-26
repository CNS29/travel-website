import { message } from "antd";
import axiosClient from "./axiosClient";

class NgaydiApi {
  getAll = (params) => {
    const url = "/ngaydi";
    return axiosClient.get(url, { params });
  };
  postngaydi = (params) => {
    const url = "/ngaydi";
    return axiosClient
      .post(url, params)
      .then((data) => {
        message.success("Thêm thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  deletengaydi = (id) => {
    const url = `/ngaydi/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        message.success("Xoá thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  editngaydi = (params) => {
    const url = `/ngaydi/${params.idsua}`;
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
const ngaydiApi = new NgaydiApi();
export default ngaydiApi;
