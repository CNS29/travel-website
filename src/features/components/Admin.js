import React, { useEffect, useState } from "react";
import Nav from "./../container/admin/nav/Nav";
import Error from "./Error";
import inforApi from "../../api/inforApi";

export default function Admin() {
  const [state, setState] = useState(true);
  useEffect(() => {
    async function checkToken() {
      await inforApi.infor().catch((err) => setState(false));
    }
    checkToken();
  }, []);

  return state ? (
    <Nav />
  ) : (
    <Error message="Tài khoản hết hiệu lực hoặc chưa đăng nhập. Vui lòng đăng nhập lại" />
  );
}
