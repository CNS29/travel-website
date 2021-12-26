import { message } from "antd";
import axiosClient from "./axiosClient";

class UserroleApi {
  getAll = async (params) => {
    const url = "/userrole";
    return await axiosClient.get(url, { params });
  };
  postuserrole = (params) => {
    const url = "/userrole";
    return axiosClient
      .post(url, params)
      .then((data) => {
        message.success("Thêm thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  deleteuserrole = (id) => {
    const url = `/userrole/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        message.success("Xoá thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  edituserrole = (params) => {
    const url = `/userrole/${params.idsua}`;
    console.log(params);
    return axiosClient
      .patch(url, params)
      .then((data) => {
        message.success("Cấp quyền thành công!");
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  edituserroleHeader = (params) => {
    const url = `/userrole/${params.idsua}`;
    console.log(params);
    return axiosClient
      .patch(url, params)
      .then((data) => {
        return data.data;
      })
      .catch((err) => {
        message.error("Có lỗi xảy ra!");
      });
  };
  getuserrole = () => {
    const url = "/userrole";
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
}
const userroleApi = new UserroleApi();
export default userroleApi;
