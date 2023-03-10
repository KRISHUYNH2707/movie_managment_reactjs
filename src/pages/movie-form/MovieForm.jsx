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
                message: "S???a phim th??nh c??ng",      
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
                message: "Th??m phim th??nh c??ng",      
            })
    
        } catch (error) {
            console.log(error);
            notification.error({
                message: error.response.data.content,
            });
        }
    }


    // notification.success({
    //     message: params.id ? "S???a phim th??nh c??ng" : "Th??m phim th??nh c??ng",
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
            <Form.Item label="T??n phim" name="tenPhim">
                <Input />
            </Form.Item>
            <Form.Item label="Trailer" name="trailer">
                <Input />
            </Form.Item>
            <Form.Item label="M?? t???" name="moTa">
                <Input />
            </Form.Item>
            <Form.Item label="Ng??y kh???i chi???u" name="ngayKhoiChieu">
                <DatePicker />
            </Form.Item>
            {/* <Form.Item label="L???ch Chi???u" valuePropName="checked" name="dangChieu">
                <Checkbox>??ang chi???u</Checkbox>
                <Checkbox>Ch??a chi???u</Checkbox>
            </Form.Item> */}
            <Form.Item
                label="??ang chi???u"
                valuePropName="checked"
                name="dangChieu"
            >
                <Switch />
            </Form.Item>
            <Form.Item
                label="S???p chi???u"
                valuePropName="checked"
                name="sapChieu"
            >
                <Switch />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked" name="hot">
                <Switch />
            </Form.Item>

            <Form.Item label="S??? sao" name="danhGia">
                <Input />
            </Form.Item>

            <Form.Item label="H??nh ???nh">
                <Input type="file" onChange={handleFile} />
            </Form.Item>
            <Image src={imagePreview} height={300} />
            <Form.Item label="T??c v???">
                <Button htmlType="submit">L??U</Button>
            </Form.Item>
        </Form>
    );
}
