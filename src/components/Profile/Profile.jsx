import React from "react";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { updateUserInfo } from "../UserFunction/UserFunction";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      last_name: "",
      first_name: "",
      phone: "",
      user_image: "",
      login: true,
      status: "Просмотр",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount = () => {
    this.setState({ last_name: this.props.last_name });
  };
  handleChangeStatus = (e) => {
    if (this.state.status === "Просмотр")
      this.setState({
        status: "Редактирование",
        last_name: this.props.last_name,
        first_name: this.props.first_name,
        phone: this.props.phone,
        user_image: this.props.user_image,
      });
    else if (this.state.status === "Редактирование") {
      this.setState({ status: "Просмотр" });
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    var decoded = jwt_decode(sessionStorage.getItem("accesstoken"));

    this.handleChangeStatus();
    const formData = new FormData();
    this.props.setUserData(
      this.state.last_name,
      this.state.first_name,
      this.state.user_image,
      this.state.phone
    );
    formData.append("last_name", this.state.last_name);
    formData.append("first_name", this.state.first_name);
    formData.append("phone", this.state.phone);
    formData.append("user_image", this.state.user_image);
    formData.append("userId", decoded.userId);
    updateUserInfo(formData)
    console.log(this.state);
  };

  render() {
    return (
      <section className="content">
        {localStorage.getItem("loginmethod") ? null : sessionStorage.getItem(
            "loginmethod"
          ) ? null : (
          <Redirect to="/" />
        )}
        <div className="row">
          <div className="container">
            <div className="col d-flex justify-content-between">
              <h2>ПРОФИЛЬ</h2>

              <NavLink exact to="/InsertProperty">
                <button className="header__btn  py-2 px-4">
                  Загрузить недвижимость
                </button>
              </NavLink>
            </div>
            <div className="profile shadow ">
              <div className="col ml-4 pt-3">
                <span>Информация</span>
              </div>
              {this.state.status === "Просмотр" ? (
                <div className="user  d-flex justify-content-around align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      className="avatar"
                      src={this.props.user_image}
                      alt=""
                    />
                  </div>
                  <div className=" align-items-center ">
                    <div className="col d-flex justify-content-end ">
                      <h1>
                        {this.props.first_name} {this.props.last_name}
                      </h1>
                    </div>
                    <div className="col d-flex justify-content-end ">
                      <h4>{this.props.phone}</h4>
                    </div>
                  </div>
                  <div className="d-flex align-items-center ">
                    <button
                      type="button"
                      onClick={this.handleChangeStatus}
                      className="header__btn py-2 px-4"
                    >
                      Изменить
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  className="user  d-flex justify-content-around align-items-center"
                  onSubmit={this.onSubmit}
                >
                  <div className="d-flex align-items-center">
                    <span data-descr="">
                      <button className="load_avatar">
                        <img
                          className="avatar"
                          src={this.state.user_image}
                          alt=""
                        />
                      </button>
                    </span>
                  </div>
                  <div className=" align-items-center ">
                    <div className="col d-flex justify-content-end ">
                      <>
                        <label htmlFor="">{`Имя: `}</label>
                        <input
                          value={this.state.first_name}
                          onChange={this.onChange}
                          name="first_name"
                          type="text"
                        />
                        <label htmlFor="">{`Фамилия: `}</label>
                        <input
                          value={this.state.last_name}
                          onChange={this.onChange}
                          name="last_name"
                          type="text"
                        />
                      </>
                    </div>
                    <div className="col d-flex justify-content-end ">
                      <>
                        <label
                          className="mt-3"
                          htmlFor=""
                        >{`Ном.телефона: `}</label>
                        <input
                          className="mt-3"
                          value={this.state.phone}
                          type="text"
                          onChange={this.onChange}
                          name="phone"
                        />
                      </>
                    </div>
                  </div>
                  <div className="d-flex align-items-center ">
                    <button type="submit" className="header__btn py-2 px-4">
                      Сохранить
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="client shadow">
              <div className="col ml-4 pt-3">
                <span>Текущая продажа</span>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="client shadow">
              <div className="col ml-4 pt-3">
                {" "}
                <span>История продаж</span>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Profile;
