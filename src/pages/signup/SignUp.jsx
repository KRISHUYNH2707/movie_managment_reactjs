import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { Button, Checkbox, Form, Input, notification } from "antd";
import { addUser, loginApi } from "services/user";
import { setUserInfor } from "store/actions/userInfor";

// import { loginApi } from "../../services/user";
// import { setUserInfoAction } from "../../store/actions/userAction";

export default function SignUp() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [form] = Form.useForm();
    const fullName = Form.useWatch("hoTen", form);
    const email = Form.useWatch("email", form);
    const phoneNumber = Form.useWatch("soDT", form);
    const userName = Form.useWatch("taiKhoan", form);
    const password = Form.useWatch("matKhau", form);

    const onFinish = async () => {

        try {
            console.log({'taiKhoan': userName, 
            'matKhau': password, 
            'email': email, 
            'soDT': phoneNumber,
            'maNhom': 'GP02', 
            'maLoaiNguoiDung': 'QuanTri', 
            'hoTen': fullName})
            const result = await addUser({'taiKhoan': userName, 
                                          'matKhau': password, 
                                          'email': email, 
                                          'soDT': phoneNumber,
                                          'maNhom': 'GP02', 
                                          'maLoaiNguoiDung': 'QuanTri', 
                                          'hoTen': fullName})
            notification.success({
                message: 'Chúc mừng bạn đã đăng ký thành công'
            })
            navigate('/login')
        }
        catch (error) {
            notification.error({
                message: error.response.data.content
            })
        }


    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="signup-page">
            <div className="signup-box">
                <Form
                    form={form}
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <p className="form-title">Đăng ký Admin</p>
                    <p></p>
                    <Form.Item
                        name="hoTen"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập họ và tên",
                            },
                        ]}
                    >
                        <Input placeholder="Họ và tên" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email",
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="soDT"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số điện thoại",
                            },
                        ]}
                    >
                        <Input placeholder="Số điện thoại" />
                    </Form.Item>
                    
                    <Form.Item
                        name="taiKhoan"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên tài khoản",
                            },
                        ]}
                    >
                        <Input placeholder="Tên người dùng" />
                    </Form.Item>

                    <Form.Item
                        name="matKhau"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Mật khẩu" />
                    </Form.Item>

                    <Form.Item className="my-1" name="agreed" valuePropName="checked" rules={[{required: true, message: "Vui lòng xác nhận"}]}>
                        <Checkbox>Tôi đã hiểu và đồng ý với các điều khoản</Checkbox>
                    </Form.Item>
                    <Form.Item name="promotion" valuePropName="checked">
                        <Checkbox>Nhận thông tin chương trình khuyết mãi</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            ĐĂNG KÝ
                        </Button>
                    </Form.Item>
                    <div className="centered-text">
                        <NavLink to="/admin/movie-management">Cancel</NavLink>
                    </div>



                </Form>
            </div>
        </div>
    );
}
