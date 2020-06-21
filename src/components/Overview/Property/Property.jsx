import React from "react";

class Property extends React.Component {
  render() {
    return (
      <section className="Property">
        <div className="col ml-3 mt-5 d-flex justify-content-between">
          <h2>{`${this.props.property.Street} ${this.props.property.House}`}</h2>
        </div>

        <div className="mt-3">
          <div className="row shadow infoproperty m-4">
            <div className="col-8">
              <div className="row ">
                <textarea
                  className="infoarea"
                  name="Title"
                  id=""
                  disabled
                  cols="95"
                  rows="10"
                  value={this.props.property.Title}
                ></textarea>
              </div>
              <div className="row">
                <div className="col-5 user">
                  <div className="col-3">
                    <img src={this.props.property.img_url} alt="" />
                  </div>
                  <div className="col-9 ml-3">
                    <div className="row">{`${this.props.property.first_name} ${this.props.property.last_name}`}</div>
                    <div className="row">{this.props.property.phone}</div>
                  </div>
                </div>
                <div className="col-2 d-flex align-items-end mb-3">
                  {this.props.property.countApartment === "" || this.props.property.countApartment === "undefined" ? "Не указано": this.props.property.countApartment}
                </div>
                <div className="col-2 d-flex align-items-end mb-3">
                  {this.props.property.Space=== "" ? "Не указано": this.props.property.Space}
                </div>
                <div className="col-2 d-flex align-items-end mb-3">
                  {this.props.property.Place=== "" ? "Не указано": this.props.property.Place}
                </div>
              </div>
            </div>
            <div className="col-4">
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
                            <div className="row">
                              <div className="item" key={index}>
                                <span data-delete="">
                                  <img
                                    src={this.props.property.uploadedFile[0].location}
                                    class="d-block "
                                    alt="Природа"
                                  ></img>
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div class="carousel-item">
                            <div className="row">
                              <div className="item" key={index}>
                                <span data-delete="">
                                  <img
                                    src={this.props.property.uploadedFile.location}
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
                  src={this.props.property.sketch3D === "null"
                  ? null
                  : this.props.property.sketch3D}
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
