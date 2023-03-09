import axios from "axios";
import { BASE_URL, MA_NHOM, TOKEN_CYBERSOFT } from "../constants";
import { axiosRequest } from "../configs/axios.config";

export const loginApi = (information) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/DangNhap`,
    method: "POST",
    data: information,
  });
};

export const registerApi = (information) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/DangKy`,
    method: "POST",
    data: information,
  });
};

export const inforTkApi = () => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/ThongTinTaiKhoan`,
    method: "POST",
  });
};

export const updateApi = (data) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    method: "PUT",
    data: data,
  });
};

export const getUserListApi = () => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${MA_NHOM}`,
    method: "GET",
  });
};

export const searchUserListApi = (tuKhoa) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${MA_NHOM}&tuKhoa=${tuKhoa}`,
    method: "GET",
  });
};

export const fetchListTypeUserApi = () => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`,
    method: "GET",
  });
};

export const addUserApi = (data) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/ThemNguoiDung`,
    method: "POST",
    data: data,
  });
};

export const updateUserApi = (data) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    method: "POST",
    data: data,
  });
};
