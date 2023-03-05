import { Outlet, useLocation, useNavigate} from "react-router-dom";
import {
    FileOutlined,
    PieChartOutlined,
    UserOutlined,
    DesktopOutlined,
    TeamOutlined,
    OrderedListOutlined,
    FileAddOutlined,
    Icon,
    LogoutOutlined,
    SettingOutlined,
    UserAddOutlined
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Image} from "antd";
import { useEffect, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPath } from "store/actions/pathDetail";
import HeaderDropDown from "components/HeaderDropDown/HeaderDropDown";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}



const items = [
    getItem(
        "Danh sách phim",
        "/admin/movie-management",
        <OrderedListOutlined />
    ),
    getItem("Thêm Phim", "/admin/movie-management/add", <FileAddOutlined />),
    getItem("Thêm Admin", "/admin-sign-up", <UserAddOutlined />),
  
    getItem("Khách hàng", "sub1", <UserOutlined />, [
        getItem("Danh sách phim", "3"),
        getItem("Đặt vé", "4"),
    ]),
    getItem("Đăng xuất", "/login", <LogoutOutlined />),
];


export const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pathState = useSelector((state) => state.movieReducer);

    const handleMenuClick = ({ key }) => {
        if (key) {
            navigate(key);
            dispatch(setCurrentPath(key));
        }
    };

    const check_breadcrumb_word = () => {
        if (pathState.currentPath === "/admin/movie-management") {
            return "Movie-List";
        } else if (pathState.currentPath === "/admin/movie-management/add") {
            return "Add-movie";
        }
    };

    const onMenuClick = useCallback(
      console.log('Testing')
    );

    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="pt-3 px-3">
                    <Image
                        width={150}
                        height={50}
                        src="https://cybersoft.edu.vn/wp-content/uploads/2022/10/cyberlogo-white.png"
                    />
                </div>

                <Menu
                    theme="dark"
                    defaultSelectedKeys={["/admin/movie-management"]}
                    mode="inline"
                    items={items}
                    onClick={handleMenuClick}
                    selectedKeys={[pathState.currentPath]}
                />
            </Sider>
            <Layout className="site-layout">
                <HeaderDropDown></HeaderDropDown>
                <Content
                    style={{
                        margin: "0 16px",
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: "16px 0",
                        }}
                    >
                        <Breadcrumb.Item>Admin</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {check_breadcrumb_word()}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
