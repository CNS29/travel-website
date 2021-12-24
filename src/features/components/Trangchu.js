import React from "react";
import Banner from "../container/trangchu/banner/Banner";
import Touryeuthich from "../container/trangchu/touryeuthich/Touryeutich";
import Tourtrongnuoc from "../container/trangchu/tourtrongnuoc/Tourtrongnuoc";
import Tournuocngoai from "../container/trangchu/tournuocngoai/Tournuocngoai";
import Tintuc from "../container/trangchu/tintuc/Tintuc";
import Ykienkhachhang from "../container/trangchu/ykienkhachhang/ykienkhachhang";
import Dichvu from "../container/trangchu/dichvu/Dichvu";
import Footer from "../container/trangchu/footer/Footer";
import { useSelector } from "react-redux";

export default function Trangchu() {
  const state = useSelector((state) => state);
  console.log(state);
  return (
    <div>
      <Banner />
      <Touryeuthich />
      <Tourtrongnuoc />
      <Tournuocngoai />
      <Dichvu />
      <Tintuc />
      <Ykienkhachhang />
      <Footer />
    </div>
  );
}
