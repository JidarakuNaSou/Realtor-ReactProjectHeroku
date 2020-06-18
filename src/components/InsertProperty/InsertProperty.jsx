import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { uploadProperty } from "../UserFunction/UserFunction";

export default function InsertProperty(props) {
  const [uploadedFile, setUploadedFile] = useState();
  const [mainPhoto, setMainPhoto] = useState();
  const { register, handleSubmit } = useForm();
  const [pathFile, setPathFile] = useState("");
  const [sketch3D, setSketch3D] = useState(null);
  const [video, setVideo] = useState(null);
  const [typeProperty, setTypeProperty] = useState("Выбрать");
  const [countApartment, setCountApartment] = useState();

  const handleOnDrop = (files, rejectedFiles) => {
    setUploadedFile(files);
    let pathfiles = [];
    for (var i = 0, f; (f = files[i]); i++) {
      pathfiles.push(URL.createObjectURL(f));
    }
    setPathFile(pathfiles);
    setMainPhoto(pathfiles[0]);
  };
  const handleClose3D = () => {
    props.setShowModal3D(false);
    setSketch3D(null);
  };
  const handleSave3D = () => {
    props.setShowModal3D(false);
  };
  const handleShow3D = () => props.setShowModal3D(true);

  const handleCloseVideo = () => props.setShowModalVideo(false);
  const handleShowVideo = () => props.setShowModalVideo(true);

  const onSubmit = (data, event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < uploadedFile.length; i++) {
      formData.append("files[]", uploadedFile[i]);
    }

    formData.append("typeProperty", typeProperty);
    formData.append("countApartment", countApartment);
    formData.append("House", data.House);
    formData.append("Apartaments", data.Apartaments);
    formData.append("Place", data.Place);
    formData.append("Street", data.Street);
    formData.append("Space", data.Space);
    formData.append("Title", data.Title);
    formData.append("phone", props.phone);
    formData.append("last_name", props.last_name);
    formData.append("first_name", props.first_name);
    formData.append("img_url", props.img_url);
    formData.append("sketch3D", sketch3D);
    console.log(data);
    console.log(typeProperty);
    console.log(countApartment);
    uploadProperty(formData);
  };

  const handleTypeProperty = (e) => {
    setTypeProperty(e.target.value);
  };
  const handleCountApartment = (e) => {
    setCountApartment(e.target.value);
  };

  const onChange3D = (e) => {
    setSketch3D(e.target.value);
  };
  const onChangeVideo = (e) => {
    setVideo(e.target.value);
  };
  const handleMainPhoto = (photo) => {
    setMainPhoto(photo);
  };

  return (
    <section className="content  ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row headerIP d-flex justify-content-between align-items-center ">
          <div title_ned>ЗАГРУЗИТЬ НЕДВИЖИМОСТЬ</div>
          <button type="submit" className="header__btn ">
            СОХРАНИТЬ
          </button>
        </div>

        <div class="row Insertform shadow">
          <div class="col-8">
            <div className="col-12">
              <label>Тип недвижимости</label>
            </div>
            <div className="col-12">
              <div class="btn-group dropright">
                <button
                  type="button"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {typeProperty}
                </button>
                <div class="dropdown-menu shadow">
                  <div className="d-flex justify-content-center">
                    <div class="form_radio_btn">
                      <input
                        id="radio-6"
                        type="radio"
                        name="radio2"
                        onChange={handleTypeProperty}
                        value="Квартира"
                      />
                      <label for="radio-6">Квартира</label>
                    </div>
                    <div class="form_radio_btn">
                      <input
                        id="radio-7"
                        type="radio"
                        name="radio2"
                        onChange={handleTypeProperty}
                        value="Дом"
                      />
                      <label for="radio-7">Дом</label>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center">
                    <div class="form_radio_btn">
                      <input
                        id="radio-8"
                        type="radio"
                        name="radio2"
                        onChange={handleTypeProperty}
                        value="Часть Дома"
                      />
                      <label for="radio-8">Часть Дома</label>
                    </div>
                    <div class="form_radio_btn">
                      <input
                        id="radio-9"
                        type="radio"
                        name="radio2"
                        onChange={handleTypeProperty}
                        value="Таунхаус"
                      />
                      <label for="radio-9">Таунхаус</label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div class="form_radio_btn">
                      <input
                        id="radio-10"
                        type="radio"
                        name="radio2"
                        value="Дуплекс"
                        onChange={handleTypeProperty}
                      />
                      <label for="radio-10">Дуплекс</label>
                    </div>
                    <div class="form_radio_btn">
                      <input
                        id="radio-11"
                        type="radio"
                        name="radio2"
                        value="Офисное помещение"
                        onChange={handleTypeProperty}
                      />
                      <label for="radio-11">Офисное помещение</label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div class="form_radio_btn">
                      <input
                        id="radio-12"
                        type="radio"
                        name="radio2"
                        value="Торговое помещение"
                        onChange={handleTypeProperty}
                      />
                      <label for="radio-12">Торговое помещение</label>
                    </div>
                    <div class="form_radio_btn">
                      <input
                        id="radio-13"
                        type="radio"
                        name="radio2"
                        value="radio2"
                        onChange={handleTypeProperty}
                      />
                      <label for="radio-13">Складское помещение</label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div class="form_radio_btn">
                      <input
                        id="radio-14"
                        type="radio"
                        name="radio2"
                        value="Готовый бизнес"
                        onChange={handleTypeProperty}
                      />
                      <label for="radio-14">Готовый бизнес</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 adress">
              <label>Адрес</label>
            </div>
            <div className="col-12 adress_items">
              <input
                type="text"
                className="col-4"
                name="Street"
                ref={register}
                placeholder="УЛИЦА/ПРОСПЕКТ"
              />
              <input
                type="text"
                className="col-3"
                name="House"
                ref={register}
                placeholder="НОМЕР ДОМА"
              />
              <input
                type="text"
                className="col-2"
                name="Apartaments"
                ref={register}
                placeholder="КВАРТИРА"
              />
            </div>

            <div className="col-12">
              <label>Количество комнат</label>
            </div>
            <div className="col-12">
              <div class="form_radio_btn">
                <input
                  id="radio-1"
                  type="radio"
                  name="radio"
                  onChange={handleCountApartment}
                  value="Студия"
                />
                <label for="radio-1">Студия</label>
              </div>

              <div class="form_radio_btn">
                <input
                  id="radio-2"
                  type="radio"
                  name="radio"
                  onChange={handleCountApartment}
                  value="1"
                />
                <label for="radio-2">1</label>
              </div>

              <div class="form_radio_btn">
                <input
                  id="radio-3"
                  type="radio"
                  name="radio"
                  onChange={handleCountApartment}
                  value="2"
                />
                <label for="radio-3">2</label>
              </div>
              <div class="form_radio_btn">
                <input
                  id="radio-4"
                  type="radio"
                  name="radio"
                  onChange={handleCountApartment}
                  value="3"
                />
                <label for="radio-4">3</label>
              </div>
              <div class="form_radio_btn">
                <input
                  id="radio-5"
                  type="radio"
                  name="radio"
                  onChange={handleCountApartment}
                  value="4"
                />
                <label for="radio-5">4+</label>
              </div>
            </div>

            <div className="col-12 Sap">
              <label className="col-6">Площадь</label>
              <label className="col-6">Цена</label>
            </div>
            <div className="col-12 SaP_items">
              <input
                className="col-4"
                placeholder="м/кв"
                type="text"
                name="Space"
                ref={register}
                id=""
              />
              <input
                className="col-4"
                placeholder="₽"
                type="text"
                name="Place"
                ref={register}
                id=""
              />
            </div>

            <div className="col-12">
              <label>Описание</label>
            </div>
            <div className="col-12">
              <textarea
                name="Title"
                id=""
                cols="80"
                rows="15"
                ref={register}
              ></textarea>
            </div>
          </div>

          {!pathFile ? (
            <Dropzone
              maxFiles="4"
              onDrop={handleOnDrop}
              maxSize="100000"
              accept=".jpg,.png,.jpeg"
            >
              {({ getRootProps, getInputProps }) => (
                <div class="col-4 mt-5">
                  <span data-descr="" {...getRootProps()}>
                    <div className="col-12 mainphoto d-flex justify-content-center align-items-center">
                      <input {...getInputProps()} />
                      <div className="upmessage">
                        Нажмите, что бы загрузить фотографии
                      </div>
                      <button className=""></button>
                    </div>
                  </span>
                </div>
              )}
            </Dropzone>
          ) : (
            <div class="col-4 mt-5">
              <span className="d-flex">
                <div className="col-12 d-flex mainimage justify-content-center align-items-center">
                  <span data-delete="">
                    <button>
                      <img src={mainPhoto} class="d-block " alt="Природа"></img>
                    </button>
                  </span>
                </div>
              </span>
              <div className="col-12 caruselphoto">
                <div
                  id="sliderBigImages"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <div class="carousel-inner">
                    <div class="carousel-item active ">
                      <div className="row">
                        {pathFile.map((pathFile, index) => {
                          return (
                            <div className="item" key={index}>
                              <span data-delete="">
                                <button
                                  onClick={() => handleMainPhoto(pathFile)}
                                >
                                  <img
                                    src={pathFile}
                                    class="d-block "
                                    alt="Природа"
                                  ></img>
                                </button>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
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
          )}
        </div>

        <div className="row Insertform">
          <div className="col-4 shadow upl3dmodel d-flex justify-content-center align-items-center">
            {props.showModal3D == false && sketch3D == null ? (
              <button onClick={handleShow3D} className="header__btn m3dbtn">
                Загрузить 3D Модель
              </button>
            ) : (
              <div class="sketchfab-embed-wrapper item_3D  d-flex justify-content-center align-items-center">
                <iframe
                  title="A 3D model"
                  width="200"
                  height="200"
                  src={sketch3D}
                  frameborder="0"
                  allow="autoplay; fullscreen; vr"
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                ></iframe>
              </div>
            )}
          </div>

          <div className="col-1"></div>
          <div className="col-7 shadow uplvideo d-flex justify-content-center align-items-center">
            {props.showModalVideo == false ? (
              <button
                onClick={handleShowVideo}
                className="header__btn videobtn"
              >
                Загрузить Видео
              </button>
            ) : null}
          </div>
        </div>
        <div className="row Insertform d-flex justify-content-center">
          <button type="submit" className="header__btn ">
            СОХРАНИТЬ
          </button>
        </div>
      </form>

      <Modal show={props.showModal3D} onHide={handleClose3D} centered={true}>
        <div className="shadow modal-content">
          <div className="container sketch">
            <div class="modal-header d-flex justify-content-center">
              <h5 class="modal-title">Загрузите 3D Модель</h5>
            </div>
            <div class="modal-body d-flex justify-content-center">
              <input
                type="text"
                onChange={onChange3D}
                name="3DModel"
                placeholder="Введите ссылку на 3D модель"
                ref={register}
              />
              <button onClick={handleSave3D}>Сохранить</button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        show={props.showModalVideo}
        onHide={handleCloseVideo}
        centered={true}
      >
        <div className="shadow modal-content">
          <div className="container sketch">
            <div class="modal-header d-flex justify-content-center">
              <h5 class="modal-title">Загрузите Видео</h5>
            </div>
            <div class="modal-body d-flex justify-content-center">
              <input
                type="text"
                name="Video"
                onChange={onChangeVideo}
                placeholder="Введите ссылку на видео"
                ref={register}
              />
              <button>Сохранить</button>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
