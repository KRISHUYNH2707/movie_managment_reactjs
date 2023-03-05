import React, { useEffect, useState } from "react";
import { Button, notification, Space, Table, Tag,Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useMovieList } from "hooks/useMovieList";
import { formatDate } from "utils";
import { deleteMovieApi, fetchMovieListApi } from "services/movie";
import { SearchOutlined } from "@ant-design/icons";

export default function MovieManagement() {
    const navigate = useNavigate();
    const movieList = useMovieList();
    const movieQty = movieList.length;
    const [movieKeyword, setMovieKeyWord] = useState("")
    const [filteredMovieList, setFilteredMovieList] = useState()

    useEffect(() => {
      if (movieList) {
        setFilteredMovieList(movieList)
      }
    },[movieList])

    useEffect(()=>{
      handleMovieSearch()
    },[movieKeyword])

    const handleMovieSearch = () => {
      console.log(movieKeyword)
      const returnedFilteredMovieList = movieList.filter((ele)=> {
        console.log(ele.tenPhim.toLowerCase())
        return (ele.tenPhim.toLowerCase().indexOf(movieKeyword.toLowerCase()) != -1) 
      })
      console.log(returnedFilteredMovieList)
      setFilteredMovieList(returnedFilteredMovieList)

    }

    const { Search } = Input;
    useEffect(() => {}, [movieQty]);
    const columns = [
        {
            title: "Tên phim",
            dataIndex: "tenPhim",
            key: "1",
            width: "10%",
        },
        {
            title: "Poster",
            dataIndex: "hinhAnh",
            key: "2",
            width: "10%",
            render: (hinhAnh) => (
                <img height={100} alt={hinhAnh} src={hinhAnh} />
            ),
        },
        {
            title: "Ngày khởi chiếu",
            dataIndex: "ngayKhoiChieu",
            key: "3",
            render: (text) => formatDate(text),
            width: "10%",
        },
        {
            title: "Mô tả",
            dataIndex: "moTa",
            key: "4",
            width: "30%",
        },

        {
            title: "Đánh giá",
            key: "5",
            dataIndex: "danhGia",
            width: "5%",
        },

        {
            title: "Hành động",
            key: "6",
            width: "25%",
            render: (text) => {
                return (
                    <div>
                        <Button
                            type="primary"
                            className="mx-2"
                            onClick={() =>
                                navigate(
                                    `/admin/movie-management/edit/${text.maPhim}`
                                )
                            }
                        >
                            EDIT
                        </Button>

                        <Button
                            type="primary"
                            danger
                            onClick={async () => {
                                try {
                                    await deleteMovieApi(text.maPhim);
                                    notification.success({
                                        message: "Xóa phim thành công",      
                                    })

                                } catch (error) {
                                    console.log(error);
                                    notification.error({
                                        message: error.response.data.content,
                                    });
                                }
                            }}
                        >
                            DELETE
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <Search onChange={(event) => setMovieKeyWord(event.target.value)} placeholder="Tìm kiếm phim theo tên"/>
            <Table columns={columns} dataSource={filteredMovieList} rowKey="Id" />
        </div>
    );
}
