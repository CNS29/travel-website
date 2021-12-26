import { message } from "antd";
import axiosClient from "./axiosClient";

class QuocgiaApi {
  getAll = (params) => {
    const url = "/quocgia";
    return axiosClient.get(url, { params });
  };
  getOne = (id) => {
    const url = `/quocgia/${id}`;
    return axiosClient.get(url);
  };
  postquocgia = (params) => {
    const url = "/quocgia";
    return axiosClient
      .post(url, params)
      .then((data) => {
        message.success("Thêm thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  deletequocgia = (id) => {
    const url = `/quocgia/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        message.success("Xoá thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  editquocgia = (params) => {
    const url = `/quocgia/${params.idsua}`;
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
const quocgiaApi = new QuocgiaApi();
export default quocgiaApi;
