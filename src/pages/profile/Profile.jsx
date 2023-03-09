import React, { useContext, useEffect, useRef, useState } from "react";
import { Space, Tag, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MA_NHOM } from "constants";
import { inforTkApi, updateApi } from "services/user";
import { formatDate } from "utils";
import Swal from "sweetalert2";
import { LoadingContext } from "contexts/loading/LoadingContext";

export default function Profile() {
  const formRef = useRef(null);
  const [laodingState, setLoadingState] = useContext(LoadingContext);
  const [stateInfoTk, setStateInfoTk] = useState([]);
  const [stateValues, setStateValues] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: MA_NHOM,
    maLoaiNguoiDung: stateInfoTk.maLoaiNguoiDung,
    hoTen: "",
  });

  useEffect(() => {
    getInforTk();
  }, []);

  const getInforTk = async () => {
    setLoadingState({ isLoading: true });
    const result = await inforTkApi();
    console.log(result);
    setStateInfoTk(result.data.content);
    setLoadingState({ isLoading: false });
  };

  // const updateForm = async (data) => {
  //   const result = await updateApi(data);
  //   console.log(result);
  // };

  const renderContentTable = () => {
    return stateInfoTk.thongTinDatVe?.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.tenPhim}</td>
          <td>
            <img src={item.hinhAnh} alt="" width={50} height={50} />
          </td>
          <td>{item.thoiLuongPhim}</td>
          <td>
            {item.danhSachGhe?.map((dsGhe, index) => {
              return <span key={index}>{dsGhe.tenCumRap},</span>;
            })}
          </td>

          <td>{formatDate(item.ngayDat)}</td>
          <td>{item.maVe}</td>
          <td>
            {item.danhSachGhe?.map((dsGhe, index) => {
              return <span key={index}>{dsGhe.tenGhe},</span>;
            })}
          </td>

          <td>{item.giaVe.toLocaleString()} vnd</td>
        </tr>
      );
    });
  };

  const updateForm = async (data) => {
    await updateApi(data);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cập nhật thành công",
      showConfirmButton: false,
      confirmButtonText: "Ok",
      timer: 1500,
    });
  };

  useEffect(() => {
    if (stateInfoTk) {
      setStateValues({
        taiKhoan: stateInfoTk.taiKhoan,
        matKhau: stateInfoTk.matKhau,
        email: stateInfoTk.email,
        soDt: stateInfoTk.soDT,
        hoTen: stateInfoTk.hoTen,
        maLoaiNguoiDung: stateInfoTk.maLoaiNguoiDung,
        maNhom: stateInfoTk.maNhom,
      });
    }
  }, [stateInfoTk]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.value);

    setStateValues({
      ...stateValues,
      [name]: value,
    });
  };

  const { taiKhoan, matKhau, email, soDt, hoTen } = stateValues || {};

  return (
    <>
      <div className="container-xl my-5" style={{ overflowX: "hidden" }}>
        <div className="row">
          <div className="col-3 text-center">
            <Space className="mt-5">
              <Avatar
                style={{
                  backgroundColor: "#87d068",
                  width: "150px",
                  height: "150px",
                  lineHeight: "150px",
                }}
                icon={
                  <UserOutlined
                    className="text-center"
                    style={{ lineHeight: "150px", fontSize: "30px" }}
                  />
                }
              />
            </Space>
            <p className="mt-3">{stateInfoTk.hoTen}</p>
            <p className="text-primary"></p>
          </div>
          <div className="col-9 ">
            <div>
              <Space className="mt-5">
                <Tag color="#108ee9">
                  <h3>Thông tin người dùng</h3>
                </Tag>
              </Space>

              <form ref={formRef} className="form-group container mt-4">
                <div className="row">
                  <div className="col-6">
                    <label>Tài khoản:</label>
                    <input
                      type="text"
                      name="taiKhoan"
                      value={taiKhoan}
                      onChange={(event) => handleChange(event)}
                      className="form-control w-100"
                    />
                  </div>
                  <div className="col-6">
                    <label>Số điện thoại:</label>
                    <input
                      type="text"
                      name="soDt"
                      value={soDt}
                      onChange={(event) => handleChange(event)}
                      className="form-control w-100"
                    />
                  </div>
                  <div className="col-6">
                    <label>Mật khẩu:</label>
                    <input
                      type="text"
                      name="matKhau"
                      value={matKhau}
                      onChange={(event) => handleChange(event)}
                      className="form-control w-100"
                    />
                  </div>
                  <div className="col-6">
                    <label>Họ tên:</label>
                    <input
                      type="text"
                      name="hoTen"
                      value={hoTen}
                      onChange={(event) => handleChange(event)}
                      className="form-control w-100"
                    />
                  </div>
                  <div className="col-6">
                    <label>Email:</label>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={(event) => handleChange(event)}
                      className="form-control w-100"
                    />
                  </div>
                  <div className="col-12 mt-4">
                    <Space wrap>
                      <Button onClick={() => updateForm(stateValues)}>
                        Cập nhật
                      </Button>
                    </Space>
                  </div>
                </div>
              </form>

              <div className="container">
                <h4 className="text-primary">Lịch sử đặt vé</h4>
                <table class="table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên phim</th>
                      <th>Hình ảnh</th>
                      <th>Thời lượng phim</th>
                      <th>Tên rạp</th>
                      <th>Ngày đặt</th>
                      <th>Mã vé</th>
                      <th>Tên ghế</th>
                      <th>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>{renderContentTable()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
