import React from "react";
import { NavLink } from "react-router-dom";
import { getPropertys } from "../../UserFunction/UserFunction";

class Apartments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Propertys: null,
      countApartment: "",
      firstprice: "",
      lastprice: "",
    };
    this.handleinputfiltr = this.handleinputfiltr.bind(this);
  }
  componentDidMount() {
    getPropertys().then((res) => {
      console.log(res);
      this.setState({ Propertys: res });
    });
  }

  handleinputfiltr(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  selectproperty(property) {
    this.props.setProperty(property);
  }

  render() {
    console.log(parseInt(this.state.firstprice));
    return (
      <section className="content">
        <div className="row">
          <span className="title_ned">ЗАГОРОДНЫЕ ДОМА</span>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-8">
            <div className="row">
              {this.state.Propertys
                ? this.state.Propertys.map((Propertys) => {
                    return (
                      Propertys.typeProperty == "Дом" &&
                      (this.state.countApartment == Propertys.countApartment ||
                        this.state.countApartment == "") &&
                      ((parseInt(Propertys.Place) >=
                        parseInt(this.state.firstprice) &&
                        parseInt(Propertys.Place) <=
                          parseInt(this.state.lastprice)) ||
                      (this.state.firstprice == "" &&
                        this.state.lastprice == "") ? (
                        <div className="col-sm-4 mx-6 d-flex justify-content-center">
                          <button
                            onClick={() => this.selectproperty(Propertys)}
                          >
                            <NavLink exact to="/Property">
                              <span data-descr="">
                                <div className="card shadow d-flex align-items-center">
                                  <div className="main_img">
                                    {Propertys.uploadedFile ? (
                                      <img
                                        /* {`./${Propertys.uploadedFile[0].destination.slice(
                                          8
                                        )}/${
                                          Propertys.uploadedFile[0].filename
                                        }`} */
                                        alt=""
                                      />
                                    ) : null}
                                  </div>
                                  <div className="card__street">
                                    {`${Propertys.Street} ${Propertys.House}`}
                                  </div>
                                  <div className="card-body">
                                    <div className="card__title row d-flex ">
                                      Тип :{` ${Propertys.typeProperty}`}
                                    </div>
                                    <div className="card__coap row d-flex ">
                                      Кол-во комнат :
                                      {` ${Propertys.countApartment}`}
                                    </div>
                                    <div className="card__space row d-flex ">
                                      Площадь :{` ${Propertys.Space}`}
                                    </div>
                                    <div className="card__place row d-flex ">
                                      {` ${Propertys.Place} ₽`}
                                    </div>
                                  </div>
                                </div>
                              </span>
                            </NavLink>
                          </button>
                        </div>
                      ) : null)
                    );
                  })
                : null}
            </div>
          </div>
          <div className="col-4 mt-3">
            <label className="col-4">Цена: </label>
            <div className="d-flex mt-3">
              <label className="col-2">От: </label>
              <input
                className="col-6"
                placeholder="₽"
                type="text"
                name="firstprice"
                onChange={this.handleinputfiltr}
                id=""
                value={this.state.firstprice}
              />
            </div>
            <div className="d-flex mt-3">
              <label className="col-2">До: </label>
              <input
                className="col-6"
                placeholder="₽"
                type="text"
                name="lastprice"
                onChange={this.handleinputfiltr}
                id=""
                value={this.state.lastprice}
              />
            </div>
            <div class="form_radio_btn mt-3">
              <input
                id="radio-1"
                type="radio"
                name="countApartment"
                onChange={this.handleinputfiltr}
                value="Студия"
              />
              <label for="radio-1">Студия</label>
            </div>

            <div class="form_radio_btn">
              <input
                id="radio-2"
                type="radio"
                name="countApartment"
                onChange={this.handleinputfiltr}
                value="1"
              />
              <label for="radio-2">1</label>
            </div>

            <div class="form_radio_btn">
              <input
                id="radio-3"
                type="radio"
                name="countApartment"
                onChange={this.handleinputfiltr}
                value="2"
              />
              <label for="radio-3">2</label>
            </div>
            <div class="form_radio_btn">
              <input
                id="radio-4"
                type="radio"
                name="countApartment"
                onChange={this.handleinputfiltr}
                value="3"
              />
              <label for="radio-4">3</label>
            </div>
            <div class="form_radio_btn">
              <input
                id="radio-5"
                type="radio"
                name="countApartment"
                onChange={this.handleinputfiltr}
                value="4"
              />
              <label for="radio-5">4+</label>
            </div>
            <div class="form_radio_btn">
              <input
                id="radio-6"
                type="radio"
                name="countApartment"
                onChange={this.handleinputfiltr}
                value=""
                
              />
              <label for="radio-6">Любое</label>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Apartments;
