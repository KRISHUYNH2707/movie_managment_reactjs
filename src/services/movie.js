import axios from "axios"
import { axiosRequest } from "../configs/axios.config"
import { GROUP_ID } from "../constants"

export const fetchMovieListApi = () => {
    return axiosRequest({
        url: `/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`,
        method: "GET"
    })
}

export const fetchMovieDetailApi = (id) => {
    return axiosRequest({
        url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
        method: 'GET'
    })
}

export const addMovieApi = (data) => {
    return axiosRequest({
        url: "/QuanLyPhim/ThemPhimUploadHinh",
        method: "POST",
        data: data
    })
}

export const deleteMovieApi = (id) => {
    return axiosRequest({
        url:  `/QuanLyPhim/XP?MaPhim=${id}`,
        method: "DELETE"
    })
}

export const editMovieApi = (data) => {
    return axiosRequest({
      url: "/QuanLyPhim/CapNhatPhimUpload",
      method: "POST",
      data: data,
    });
}