import React, { useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Cascader,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
    Upload,
    Image,
    notification
} from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMovieApi, editMovieApi, fetchMovieDetailApi } from "services/movie";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import { GROUP_ID } from "constants";
import { useDispatch } from "react-redux";
import { setCurrentPath } from "store/actions/pathDetail";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function MovieForm() {
    const [form] = useForm();
    // const [componentDisabled, setComponentDisabled] = useState(true);
    const params = useParams();
    const [file, setFile] = useState();
    const [imagePreview, setImagePreview] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (params.id) {
            getMovieDetail();
        }
    });

    const getMovieDetail = async () => {
        const result = await fetchMovieDetailApi(params.id);

        form.setFieldsValue({
            tenPhim: result.data.content.tenPhim,
            moTa: result.data.content.moTa,
            ngayKhoiChieu: moment(result.data.content.ngayKhoiChieu),
            trailer: result.data.content.trailer,
            sapChieu: result.data.content.sapChieu,
            dangChieu: result.data.content.dangChieu,
            hot: result.data.content.hot,
            danhGia: result.data.content.danhGia,
        });
        setImagePreview(result.data.content.hinhAnh);
    };

    const handleFile = (event) => {
        console.log(event);
        setFile(event.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
            console.log(event.target.result);
            setImagePreview(event.target.result);
        };
    };

    const handleFinish = async (values) => {
        values.ngayKhoiChieu = values.ngayKhoiChieu.format("DD/MM/YYYY")
        const formData = new FormData()
        formData.append("maNhom", GROUP_ID)
        formData.append("tenPhim", values.tenPhim)
        formData.append("moTa", values.moTa);
        formData.append("trailer", values.trailer);
        formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
        formData.append("sapChieu", values.sapChieu);
        formData.append("dangChieu", values.dangChieu);
        formData.append("hot", values.hot);
        formData.append("danhGia", values.danhGia);
        file && formData.append("File", file, file.name);

    if (params.id) {
        formData.append("maPhim", params.id);
        try {
            await editMovieApi(formData);
            notification.success({
                message: "Sửa phim thành công",      
            })
    
        } catch (error) {
            console.log(error);
            notification.error({
                message: error.response.data.content,
            });
        }
    }
    else {
        try {
            await addMovieApi(formData);
            notification.success({
                message: "Thêm phim thành công",      
            })
    
        } catch (error) {
            console.log(error);
            notification.error({
                message: error.response.data.content,
            });
        }
    }


    // notification.success({
    //     message: params.id ? "Sửa phim thành công" : "Thêm phim thành công",
    //   });
  
      navigate("/admin/movie-management");
      dispatch(setCurrentPath("/admin/movie-management"))
    }

    return (
        <Form
            form={form}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                tenPhim: "",
                trailer: "",
                moTa: "",
                ngayKhoiChieu: "",
                sapChieu: true,
                dangChieu: true,
                hot: true,
                danhGia: 10,
            }}
            onFinish={handleFinish}
        >
            <Form.Item label="Tên phim" name="tenPhim">
                <Input />
            </Form.Item>
            <Form.Item label="Trailer" name="trailer">
                <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name="moTa">
                <Input />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu" name="ngayKhoiChieu">
                <DatePicker />
            </Form.Item>
            {/* <Form.Item label="Lịch Chiếu" valuePropName="checked" name="dangChieu">
                <Checkbox>Đang chiếu</Checkbox>
                <Checkbox>Chưa chiếu</Checkbox>
            </Form.Item> */}
            <Form.Item
                label="Đang chiếu"
                valuePropName="checked"
                name="dangChieu"
            >
                <Switch />
            </Form.Item>
            <Form.Item
                label="Sắp chiếu"
                valuePropName="checked"
                name="sapChieu"
            >
                <Switch />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked" name="hot">
                <Switch />
            </Form.Item>

            <Form.Item label="Số sao" name="danhGia">
                <Input />
            </Form.Item>

            <Form.Item label="Hình ảnh">
                <Input type="file" onChange={handleFile} />
            </Form.Item>
            <Image src={imagePreview} height={300} />
            <Form.Item label="Tác vụ">
                <Button htmlType="submit">LƯU</Button>
            </Form.Item>
        </Form>
    );
}
