import { notification } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminGuard() {
  const userState = useSelector((state) => state.movieReducer);
  const navigate = useNavigate();

  useEffect(() => {
    // ng dùng chưa đăng nhập
    if (!userState.userInfor) {
      notification.warning({
        message: "Vui lòng đăng nhập để có thể truy cập",
      });

      navigate("/login");
    } else {
      // ng dùng đã đăng nhập nhưng maLoaiNguoiDung = Khach Hang
      if (userState.userInfor.maLoaiNguoiDung === 'KhachHang') {
        notification.warning({
          message: "Khách hàng không có quyền truy cập",
        });

        navigate("/login");
      }
    }
  }, []);

  return <Outlet />;
}
