import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "../container/login/Login";
import Menu from "../container/trangchu/menu/Menu";
import Trangchu from "./Trangchu";
import Admin from "./Admin";
import Dangky from "../container/dangky/Dangky";
import Tour from "../container/detailtour/tour/Tour";
import Tintucdetail from "../container/tintuc/tintucdetail/Tintucdetail";
import Listtour from "../container/Listtour/Listtour";
import Dattour from "../container/detailtour/dattour/Dattour";
import Listtintuc from "../container/tintuc/listtintuc/Listtintuc";
import Stripe from "../teststripe/Stripe";
import { useDispatch } from "react-redux";
import { quocgiaData } from "../container/admin/Quocgia/quocgiaSlice";
import { tintucData } from "../container/admin/tintuc/tintucSlice";
import { loaitourData } from "../container/admin/Loaitour/loaitourSlice";
import { diadiemData } from "../container/admin/DiaDiem/diadiemSlice";
import { mangxahoiData } from "../container/admin/mxh/mangxahoiSlice";
import { binhluanData } from "../container/admin/Binhluan/binhluanSlice";
import { tagData } from "../container/admin/Tag/tagSlice";
import { anhData } from "../container/admin/Anh/anhSlice";
import { dichvuData } from "../container/admin/Dichvu/dichvuSlice";
import { hoadonData } from "../container/admin/Hoadon/hoadonSlice";
import { roleData } from "../container/admin/Role/roleSlice";
import { lienheData } from "../container/admin/Lienhe/lienheSlice";
import { ngaydiData } from "../container/admin/Ngaydi/ngaydiSlice";
import { tourData } from "../container/admin/Tour/tourSlice";
import { inforData } from "../container/login/inforSlice";
import CreateTour from "../container/createTour/CreateTour";
import Thongtin from "../container/trangchu/thongtin/Thongtin";

import inforApi from "../../api/inforApi";
import Contact from "../container/trangchu/contact/Contact";

export default function NestingExample() {
  const dispatch = useDispatch();
  useEffect(() => {
    const actionquocgia = async () => {
      await dispatch(quocgiaData());
    };
    const actiontintuc = async () => {
      await dispatch(tintucData());
    };
    const actionloaitour = async () => {
      await dispatch(loaitourData());
    };

    const actiondiadiem = async () => {
      await dispatch(diadiemData());
    };
    const actionmangxahoi = async () => {
      await dispatch(mangxahoiData());
    };
    const actionbinhluan = async () => {
      await dispatch(binhluanData());
    };
    const actiontag = async () => {
      await dispatch(tagData());
    };
    const actionanh = async () => {
      await dispatch(anhData());
    };
    const actiondichvu = async () => {
      await dispatch(dichvuData());
    };
    const actionhoadon = async () => {
      await dispatch(hoadonData());
    };
    const actionrole = async () => {
      await dispatch(roleData());
    };
    const actionlienhe = async () => {
      await dispatch(lienheData());
    };
    const actionngaydi = async () => {
      await dispatch(ngaydiData());
    };
    const actiontour = async () => {
      await dispatch(tourData());
    };
    const actioninfor = async () => {
      // Check token valid ?
      localStorage.getItem("token") &&
        (await inforApi
          .infor()
          .catch((err) => localStorage.removeItem("token")));
      await dispatch(inforData());
    };

    actionquocgia();
    actiontintuc();
    actionloaitour();

    actiondiadiem();
    actionmangxahoi();
    actionbinhluan();
    actiontag();
    actionanh();
    actiondichvu();
    actionhoadon();
    actionrole();
    actionlienhe();
    actionngaydi();
    actiontour();
    actioninfor();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/dangnhap" component="" />
        <Route path="/dangky" component="" />
        <Route path="/admin" component="" />
        <Route path="/">
          <Menu />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/">
          <Trangchu />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/thongtin/:id">
          <Thongtin />
        </Route>
        <Route path="/dangnhap">
          <CheckLogin />
        </Route>
        <Route path="/dangky">
          <Dangky />
        </Route>
        <Route path="/news">
          <Listtintuc />
        </Route>
        <Route path="/tours/:id">
          <Tour />
        </Route>
        <Route path="/detailnews/:id">
          <Tintucdetail />
        </Route>
        <Route path="/tours">
          <Listtour />
        </Route>
        <Route path="/dat-tour">
          <Dattour />
        </Route>
        <Route path="/create-tour">
          <CreateTour />
        </Route>
        <Route path="/stripe">
          <Stripe />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
    </Router>
  );
}

function CheckLogin() {
  return localStorage.getItem("token") ? <Redirect to="/" /> : <Login />;
}
