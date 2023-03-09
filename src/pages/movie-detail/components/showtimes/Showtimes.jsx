import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMovieShowtimesApi } from "../../../../services/cinema";

import { formatTime } from "../../../../utils";

import { Tabs, Tag, Comment, Tooltip, List } from "antd";

const { TabPane } = Tabs;

export default function Showtimes() {
  //lấy params trên url
  const params = useParams();

  //render ra ngoài giao diện
  const [movieShowtimes, setMovieShowtimes] = useState({});

  useEffect(() => {
    getMovieShowtimes();
  }, []);

  const getMovieShowtimes = async () => {
    const result = await fetchMovieShowtimesApi(params.id);
    console.log(result);
    setMovieShowtimes(result.data.content);
  };

  const renderTabs = () => {
    return movieShowtimes.heThongRapChieu?.map((item, index) => {
      return (
        <TabPane
          tab={
            <div className="">
              <img src={item.logo} alt="" width={50} height={50} />
              <span className="ml-2">{item.maHeThongRap}</span>
            </div>
          }
          key={index}
        >
          {item.cumRapChieu?.map((cumRapChieu, index) => {
            return (
              <div key={index}>
                <div className="py-2">
                  <img
                    src={cumRapChieu.hinhAnh}
                    alt=""
                    width={60}
                    height={60}
                  />
                  <span className="ml-2">{cumRapChieu.tenCumRap}</span>
                </div>
                <div>
                  {cumRapChieu.lichChieuPhim?.map((lichChieu, index) => {
                    return (
                      <span key={index}>
                        <Tag color="lime">
                          <Link
                            to={`/booking/${lichChieu.maLichChieu}`}
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            {formatTime(lichChieu.ngayChieuGioChieu)}
                          </Link>
                        </Tag>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </TabPane>
      );
    });
  };

  return (
    <div className="glass__content mt-5">
      <Tabs style={{ color: "white" }}>
        <TabPane tab="Lịch chiếu" key={1}>
          <Tabs style={{ color: "white" }} tabPosition="left">
            {renderTabs()}
          </Tabs>
        </TabPane>
        <TabPane tab="Đánh giá" key={2}>
          <section>
            <div className="container text-dark">
              <div className="row d-flex justify-content-center">
                <div className="col-md-12 col-lg-10 col-xl-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-start">
                        <img
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
                          alt="avatar"
                          width={40}
                          height={40}
                        />
                        <div className="w-100">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-primary fw-bold mb-0">
                              lara_stewart
                              <span className="text-dark ml-2">
                                Phim hay, đáng xem
                              </span>
                            </h6>
                            <p className="mb-0">2 days ago</p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="small mb-0" style={{ color: "#aaa" }}>
                              <a href="#!" className="link-grey">
                                Remove
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Reply
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Translate
                              </a>
                            </p>
                            <div className="d-flex flex-row">
                              <i className="fas fa-star text-warning me-2" />
                              <i
                                className="far fa-check-circle"
                                style={{ color: "#aaa" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-start">
                        <img
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                          alt="avatar"
                          width={40}
                          height={40}
                        />
                        <div className="w-100">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-primary fw-bold mb-0">
                              the_sylvester_cat
                              <span className="text-dark ms-2">Vui!!</span>
                            </h6>
                            <p className="mb-0">3 days ago</p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="small mb-0" style={{ color: "#aaa" }}>
                              <a href="#!" className="link-grey">
                                Remove
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Reply
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Translate
                              </a>
                            </p>
                            <div className="d-flex flex-row">
                              <i className="far fa-check-circle text-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-start">
                        <img
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(20).webp"
                          alt="avatar"
                          width={40}
                          height={40}
                        />
                        <div className="w-100">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-primary fw-bold mb-0">
                              mindyy_def
                              <span className="text-dark ms-2">Hấp dẫn</span>
                            </h6>
                            <p className="mb-0">3 days ago</p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="small mb-0" style={{ color: "#aaa" }}>
                              <a href="#!" className="link-grey">
                                Remove
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Reply
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Translate
                              </a>
                            </p>
                            <div className="d-flex flex-row">
                              <i
                                className="fas fa-user-plus"
                                style={{ color: "#aaa" }}
                              />
                              <i
                                className="far fa-star mx-2"
                                style={{ color: "#aaa" }}
                              />
                              <i className="far fa-check-circle text-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-start">
                        <img
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(14).webp"
                          alt="avatar"
                          width={40}
                          height={40}
                        />
                        <div className="w-100">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-primary fw-bold mb-0">
                              t_anya
                              <span className="text-dark ms-2">Tuyệt </span>
                            </h6>
                            <p className="mb-0">4 days ago</p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="small mb-0" style={{ color: "#aaa" }}>
                              <a href="#!" className="link-grey">
                                Remove
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Reply
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Translate
                              </a>
                            </p>
                            <div className="d-flex flex-row">
                              <i className="far fa-check-circle text-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </TabPane>
      </Tabs>
    </div>
  );
}
