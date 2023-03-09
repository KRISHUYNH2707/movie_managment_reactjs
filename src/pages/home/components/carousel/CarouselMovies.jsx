import React, { Fragment, useEffect, useState } from "react";
import { Space } from "antd";
import { fetchBannerCarouselListApi } from "services/carouselbanner";

import { CloseOutlined } from "@ant-design/icons";
import homeCarouselData from "constants/homecarouseldata";

const contentStyle = {
  width: "100%",
  height: "100vh",
  objectFit: "cover",
};

export default function CarouselMovies() {
  const [bannerList, setBannerList] = useState([]);

  useEffect(() => {
    getBannerCarouselList();
  }, []);

  const getBannerCarouselList = async () => {
    const result = await fetchBannerCarouselListApi();
    console.log(result);
    setBannerList(result.data.content);
  };

  // const renderBannerList = () => {
  //   return bannerList.map((item, index) => {
  //     return (
  //       <div key={index}>
  //         <div style={{ height: "100%" }}>
  //           <img
  //             // className="img-fluid"
  //             style={contentStyle}
  //             src={item.hinhAnh}
  //             className="img-fluid "
  //           />
  //         </div>
  //       </div>
  //     );
  //   });
  // };

  const renderBannerList = () => {
    return bannerList.map((item, index) => {
      return (
        <div
          key={index}
          className={`carousel-item ${index === 0 && "active"}`}
          style={contentStyle}
        >
          <img
            className="d-block w-100 img-fluid"
            src={item.hinhAnh}
            alt="Second slide"
            style={{ height: "100%" }}
          />

          <a
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            type="button"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            <img src="./img/play-video.png" alt="" />
          </a>
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content ">
                <Space>
                  <CloseOutlined
                    className="text-white"
                    style={{
                      position: "absolute",
                      right: "-60px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  />
                </Space>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/uqJ9u7GSaYM?controls=0"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    // <Carousel
    //   style={{ position: "relative", width: "100%", overflow: "hidden" }}
    //   afterChange={onChange}
    //   dotPosition="bottom"
    //   autoplay={true}
    // >
    //   {renderBannerList()}
    // </Carousel>

    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide "
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to={0}
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to={1} />
          <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        </ol>
        <div className="carousel-inner">{renderBannerList()}</div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}
