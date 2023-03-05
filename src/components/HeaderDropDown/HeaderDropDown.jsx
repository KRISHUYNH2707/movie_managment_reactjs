import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserInfor } from "store/actions/userInfor";
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

export default function HeaderDropDown() {

    const movieState = useSelector((state) => state.movieReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("USER_INFO_KEY")
        dispatch(setUserInfor(null))
        navigate("/login")
    }

    return (
        <div className="d-flex ml-auto px-5 py-3">
            <div className='mt-2 mr-3 fs-5'>
                Hi, {movieState.userInfor.hoTen}
            </div>
            <button className="pl-1 btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
    );
}
