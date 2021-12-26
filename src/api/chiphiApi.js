import { message } from "antd";
import axiosClient from "./axiosClient";

class ChiphiApi {
  getAll = (params) => {
    const url = "/chiphi";
    return axiosClient.get(url, { params });
  };
  postchiphi = (params) => {
    const url = "/chiphi";
    return axiosClient
      .post(url, params)
      .then((data) => {
        message.success("Thêm thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  deletechiphi = (id) => {
    const url = `/chiphi/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        message.success("Xoá thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  editchiphi = (params) => {
    const url = `/chiphi/${params.idsua}`;
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
const chiphiApi = new ChiphiApi();
export default chiphiApi;
