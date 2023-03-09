import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Divider,
  Space,
  Tag,
} from "antd";
import { fetchMovieDetailApi } from "services/movie";
import { useParams } from "react-router-dom";
import { fetchInfoCumRapApi, fetchInfoRapApi } from "services/inforcluster";
import { addCalenderMovieApi } from "services/ticket";

export default function MovieShowTime() {
  const params = useParams();
  const [state, setState] = useState({});
  const [heThongRap, setHeThongRap] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    getMovieDetails();
    getInforCluster();
  }, []);

  const getMovieDetails = async () => {
    const result = await fetchMovieDetailApi(params.id);
    setState(result.data.content);
  };

  const getInforCluster = async () => {
    const result = await fetchInfoRapApi();
    setHeThongRap(result.data.content);
  };

  const renderHeThongRap = () => {
    return heThongRap.map((item, index) => {
      return (
        <Select.Option key={index} value={item.maHeThongRap}>
          {item.maHeThongRap}
        </Select.Option>
      );
    });
  };

  const renderCumRap = () => {
    return cumRap.map((item, index) => {
      return (
        <Select.Option key={index} value={item.tenCumRap}>
          {item.tenCumRap}
        </Select.Option>
      );
    });
  };

  const handleChange = async (event) => {
    const result = await fetchInfoCumRapApi(event);
    setCumRap(result.data.content);
  };

  const handleFinish = async (values) => {
    values.ngayChieuGioChieu =
      values.ngayChieuGioChieu.format("DD/MM/YYYY h:mm:ss");

    const formData = new FormData();

    formData.append("maPhim", params.id);
    formData.append("ngayChieuGioChieu", values.ngayChieuGioChieu);
    formData.append("maRap", values.maRap);
    formData.append("giaVe", values.giaVe);

    await addCalenderMovieApi(formData);
  };

  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };

  return (
    <div>
      <div className="mb-4">
        <Space className="d-block">
          <Tag color="#2db7f5">
            <h3>Tạo lịch chiếu </h3>
          </Tag>
          <span>- {state.tenPhim}</span>
          <img src={state.hinhAnh} alt="" width={208} height={300} />
        </Space>
      </div>
      <div>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
            maPhim: 0,
            ngayChieuGioChieu: "",
            maRap: "",
            giaVe: 0,
          }}
          onFinish={handleFinish}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="Form Size" name="size">
            <Radio.Group>
              <Radio.Button value="small">Small</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Hệ thống rạp" name="maRap">
            <Select onChange={(event) => handleChange(event)}>
              {renderHeThongRap()}
            </Select>
          </Form.Item>
          <Form.Item label="Cụm rạp">
            <Select>{renderCumRap()}</Select>
          </Form.Item>
          <Form.Item label="Ngày chiếu" name="ngayChieuGioChieu" {...config}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          <Form.Item label="Giá vé" name="giaVe">
            <Input />
          </Form.Item>
          <Form.Item label="Button">
            <Button htmlType="submit">Tạo lịch chiếu</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
