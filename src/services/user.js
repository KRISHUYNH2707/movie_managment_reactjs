import { axiosRequest } from "configs/axios.config"

export const loginApi = (information) => {
    return axiosRequest(
        {
            url: `/QuanLyNguoiDung/DangNhap`,
            method: "POST",
            data: information,
        }
    )
}

export const addUser = (information) => {
    return axiosRequest(
        {
            url: `QuanLyNguoiDung/ThemNguoiDung`,
            method: "POST",
            data: information
        }
    )
}
