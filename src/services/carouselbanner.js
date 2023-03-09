import { axiosRequest } from "configs/axios.config";

export const fetchBannerCarouselListApi = () => {
  return axiosRequest({
    url: `/QuanLyPhim/LayDanhSachBanner`,
    method: "GET",
  });
};
