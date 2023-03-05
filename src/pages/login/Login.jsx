import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { Button, Checkbox, Form, Input, notification } from "antd";
import { loginApi } from "services/user";
import { setUserInfor } from "store/actions/userInfor";

// import { loginApi } from "../../services/user";
// import { setUserInfoAction } from "../../store/actions/userAction";

export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [form] = Form.useForm();
    const userName = Form.useWatch("username", form);
    const password = Form.useWatch("password", form);

    const onFinish = async () => {

        // const result = await loginApi({'taiKhoan': userName, 'matKhau': password})
        // if (result instanceof Error) {
        //     console.log(result)
        // }
        // localStorage.setItem("USER_INFO_KEY", JSON.stringify(result.data.content))
        // dispatch(setUserInfor(result.data.content))
        // navigate('/admin/movie-management/')

        try {
            const result = await loginApi({'taiKhoan': userName, 'matKhau': password})
            console.log(result)
            localStorage.setItem("USER_INFO_KEY", JSON.stringify(result.data.content))
            dispatch(setUserInfor(result.data.content))
            navigate('/admin/movie-management/')
          } catch (error) {
                notification.error({
                    message: error.response.data.content
                })
            }
          


    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="illustration-wrapper">
                    <img
                        height={515}
                        src="https://i.ebayimg.com/images/g/GtEAAOSw1W9eN1cY/s-l1600.jpg"
                        alt="Login"
                    />
                </div>
                <Form
                    form={form}
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <p className="form-title">Welcome back</p>
                    <p></p>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            LOGIN
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        Not a member yet? <NavLink to="/signup" >Sign up</NavLink>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
