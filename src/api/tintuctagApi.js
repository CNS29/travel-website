import { message } from "antd";
import axiosClient from "./axiosClient";

class TintuctagApi {
  getAll = (params) => {
    const url = "/tintuctag";
    return axiosClient.get(url, { params });
  };
  posttintuctag = async (params) => {
    const url = "/tintuctag";
    console.log(params);
    return await axiosClient
      .post(url, params)
      .then((data) => {
        message.success("Sửa thành công!");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  deletetintuctag = (id) => {
    const url = `/tintuctag/${id}`;
    return axiosClient.delete(url);
  };
  edittintuctag = (params) => {
    const url = `/tintuctag/${params.idsua}`;
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
const tintuctagApi = new TintuctagApi();
export default tintuctagApi;
