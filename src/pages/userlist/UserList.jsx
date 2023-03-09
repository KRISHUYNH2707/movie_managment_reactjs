import React, { useContext, useEffect, useState } from "react";
import { Space, Tag, Table, Button, Input } from "antd";
import { getUserListApi, searchUserListApi } from "services/user";
import { LoadingContext } from "contexts/loading/LoadingContext";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserListAction } from "store/actions/userListAction";

export default function UserList() {
  const navigate = useNavigate();
  const [_, setLoadingState] = useContext(LoadingContext);
  const [userList, setUserList] = useState([]);

  const dispatch = useDispatch();

  const [keyword, setKeyWord] = useState("");
  const [filterData, setFilterData] = useState(null);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    setLoadingState({ isLoading: true });
    const result = await getUserListApi();
    console.log(result.data.content);
    setUserList(result.data.content);
    setLoadingState({ isLoading: false });
  };

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "1",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      key: "2",
    },
    {
      title: "Loại người dùng",
      key: "3",
      dataIndex: "maLoaiNguoiDung",
    },
    {
      title: "Email",
      key: "4",
      dataIndex: "email",
    },
    {
      title: "Họ tên",
      key: "5",
      dataIndex: "hoTen",
    },
    {
      title: "Sdt",
      key: "6",
      dataIndex: "soDT",
    },
    {
      title: "Thao tác",
      key: "7",
      render: (text) => {
        return (
          <div>
            <Button
              onClick={() => {
                dispatch(setUserListAction(text));
                navigate("/admin/adduser");
              }}
              size="small"
            >
              <Space>
                <EditOutlined />
              </Space>
            </Button>

            <Button size="small">
              <Space>
                <DeleteOutlined />
              </Space>
            </Button>
          </div>
        );
      },
    },
  ];

  const handleSearch = async () => {
    const dataKey = await searchUserListApi(keyword);
    setFilterData(dataKey.data.content);
  };

  return (
    <div>
      <Space>
        <Tag color="#2db7f5">
          <h4>Danh sách User</h4>
        </Tag>
      </Space>
      <div className="mt-3">
        <Button onClick={() => navigate("/admin/adduser")}>
          Thêm người dùng
        </Button>
      </div>
      <div className="mt-3">
        <Input.Search
          placeholder="Search here"
          enterButton
          className="mb-3"
          onSearch={handleSearch}
          onChange={(event) => setKeyWord(event.target.value)}
        />
        <Table
          columns={columns}
          dataSource={filterData === null ? userList : filterData}
        />
      </div>
    </div>
  );
}
