import { message } from "antd";
import axiosClient from "./axiosClient";

class DiadiemApi {
  getAll = (params) => {
    const url = "/diadiem";
    return axiosClient.get(url, { params });
  };
  postdiadiem = (params) => {
    const url = "/diadiem";
    return axiosClient
      .post(url, params)
      .then((data) => {
        message.success("Thêm thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  deletediadiem = (id) => {
    const url = `/diadiem/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        message.success("Xoá thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  editdiadiem = (params) => {
    const url = `/diadiem/${params.idsua}`;
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
const diadiemApi = new DiadiemApi();
export default diadiemApi;
