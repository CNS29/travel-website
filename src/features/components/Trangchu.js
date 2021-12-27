import React from "react";
import Banner from "../container/trangchu/banner/Banner";
import Touryeuthich from "../container/trangchu/tours/Touryeutich";
import Tourtrongnuoc from "../container/trangchu/tours/Tourtrongnuoc";
import Tournuocngoai from "../container/trangchu/tours/Tournuocngoai";
import SpecialSale from "../container/trangchu/giamgiadacbiet/SpecialSale";
import Tintuc from "../container/trangchu/tintuc/Tintuc";
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
      <SpecialSale />
      <Tournuocngoai />
      <Tintuc />
      <Footer />
    </div>
  );
}
