import { configureStore } from "@reduxjs/toolkit";
import tintucReducer from "../features/container/admin/tintuc/tintucSlice";
import userReducer from "./userSlice";
import taikhoanReducer from "../features/container/admin/taikhoan/taikhoanSlice";
import quocgiaReducer from "../features/container/admin/Quocgia/quocgiaSlice";
import loaitourReducer from "../features/container/admin/Loaitour/loaitourSlice";
import mangxahoiReducer from "../features/container/admin/mxh/mangxahoiSlice";
import diadiemReducer from "../features/container/admin/DiaDiem/diadiemSlice";
import tourReducer from "../features/container/admin/Tour/tourSlice";
import binhluanReducer from "../features/container/admin/Binhluan/binhluanSlice";
import tagReducer from "../features/container/admin/Tag/tagSlice";
import anhReducer from "../features/container/admin/Anh/anhSlice";
import dichvuReducer from "../features/container/admin/Dichvu/dichvuSlice";
import hoadonReducer from "../features/container/admin/Hoadon/hoadonSlice";
import tintuctagReducer from "../features/container/admin/tintuc/tintuctagSlice";
import roleReducer from "../features/container/admin/Role/roleSlice";
import lienheReducer from "../features/container/admin/Lienhe/lienheSlice";
import khuyenmaiReducer from "../features/container/admin/Khuyenmai/khuyenmaiSlice";
import ngaydiReducer from "../features/container/admin/Ngaydi/ngaydiSlice";
import camnangReducer from "../features/container/admin/Camnangdulich/camnangdulichSlice";
import userroleReducer from "../features/container/admin/header/userroleSlice";
import inforReducer from "../features/container/login/inforSlice";
import chitieuReducer from "../features/container/admin/Doanhthu/chitieuSlice";
import thanhtoanReducer from "../features/container/detailtour/tour/thanhtoanSlice";
import hoadoncanhanReducer from "../features/container/admin/Hoadoncanhan/hoadoncanhanSlice";
import thongbaoReducer from "../features/container/admin/Kiemduyet/thongbaoSlice";
const rootReducer = {
  tintuc: tintucReducer,
  user: userReducer,
  taikhoan: taikhoanReducer,
  quocgia: quocgiaReducer,
  loaitour: loaitourReducer,
  mangxahoi: mangxahoiReducer,
  diadiem: diadiemReducer,
  tour: tourReducer,
  binhluan: binhluanReducer,
  tag: tagReducer,
  anh: anhReducer,
  dichvu: dichvuReducer,
  hoadon: hoadonReducer,
  tintuctag: tintuctagReducer,
  role: roleReducer,
  lienhe: lienheReducer,
  ngaydi: ngaydiReducer,
  camnangdulich: camnangReducer,
  userrole: userroleReducer,
  infor: inforReducer,
  chitieu: chitieuReducer,
  khuyenmai: khuyenmaiReducer,
  thanhtoan: thanhtoanReducer,
  hoadoncanhan: hoadoncanhanReducer,
  thongbao: thongbaoReducer,
};

export default configureStore({
  reducer: rootReducer,
});
