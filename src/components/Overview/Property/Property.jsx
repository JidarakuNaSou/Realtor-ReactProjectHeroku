import React from "react";

class Property extends React.Component {
  render() {
    return (
      <section className="Property">
        <div className="col ml-3 mt-5 d-flex justify-content-between title-street">
          <h1>
            {`${this.props.property.Street} ${this.props.property.House}`}{" "}
            {this.props.property.Apartaments != ""
              ? `, кв ${this.props.property.Apartaments}`
              : null}
          </h1>
        </div>

        <div className="mt-3">
          <div className="row shadow infoproperty m-4">
            <div className="col-7">
              <div className="row description">
                {this.props.property.Title
                  ? this.props.property.Title
                  : "Нет описания"}
              </div>
              <div className="row">
                <div className="col-4 user">
                  <div className="col-3 d-flex align-items-center">
                    <img src={this.props.property.user_image} alt="" />
                  </div>
                  <div className="col-9 ml-3 d-flex align-items-center">
                    <div className="row">
                      <div className="col-12 user_info"><h6>{`${this.props.property.first_name} ${this.props.property.last_name}`}</h6></div>
                      <div className="col-12 user_info"><h6>{this.props.property.phone}</h6></div>
                    </div>
                  </div>
                </div>
                <div className="col-1 d-flex d-flex align-items-center ">
                  <div className="col-12">
                    <div className="d-flex justify-content-center countapart">
                      {this.props.property.countApartment === "" ||
                      this.props.property.countApartment === "undefined"
                        ? ""
                        : this.props.property.countApartment}
                    </div>
                  </div>
                </div>
                <div className="col-3 d-flex align-items-center ">
                  <div className="col-12">
                    <div className="d-flex justify-content-center space">
                      {this.props.property.Space === ""
                        ? ""
                        : `${this.props.property.Space}м/кв`}
                    </div>
                  </div>
                </div>
                <div className="col-3 d-flex d-flex align-items-center ">
                  <div className="col-12">
                    
                    <h1 className="d-flex justify-content-center">
                      {this.props.property.Place === ""
                        ? ""
                        : `${this.props.property.Place}₽`}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-5 d-flex align-items-center">
              <div className="col-12 caruselphoto">
                <div
                  id="sliderBigImages"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <div class="carousel-inner d-flex align-items-center">
                    {this.props.property.uploadedFile.map(
                      (uploadedFile, index) => {
                        return index == 0 ? (
                          <div class="carousel-item active">
                            <div className="row d-flex justify-content-center">
                              <div className="item" key={index}>
                                <span data-delete="">
                                  <img
                                    src={uploadedFile.location}
                                    class="d-block "
                                    alt="Природа"
                                  ></img>
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div class="carousel-item">
                            <div className="row d-flex justify-content-center">
                              <div className="item" key={index}>
                                <span data-delete="">
                                  <img
                                    src={uploadedFile.location}
                                    class="d-block "
                                    alt="Природа"
                                  ></img>
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <ol class="carousel-indicators">
                  {this.props.property.uploadedFile.map(
                    (uploadedFile, index) => {
                      return index === 0 ? (
                        <li
                          data-target="#sliderBigImages"
                          data-slide-to={`${index}`}
                          key={index}
                        ></li>
                      ) : (
                        <li
                          data-target="#sliderBigImages"
                          data-slide-to={`${index}`}
                          key={index}
                        ></li>
                      );
                    }
                  )}
                </ol>
                <a
                  class="carousel-control-prev"
                  href="#sliderBigImages"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#sliderBigImages"
                  role="button"
                  data-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
          <div className="row  media m-4">
            <div className="col-4 model3D shadow">
              <div class="sketchfab-embed-wrapper ">
                <iframe
                  title="A 3D model"
                  width="200"
                  height="200"
                  src={
                    this.props.property.sketch3D === "null"
                      ? null
                      : this.props.property.sketch3D
                  }
                  frameborder="0"
                  allow="autoplay; fullscreen; vr"
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                ></iframe>
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-7 video shadow">
              <iframe
                width="560"
                height="250"
                src={
                  this.props.property.video === "null"
                    ? null
                    : this.props.property.video
                }
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="true"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Property;
