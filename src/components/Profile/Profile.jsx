import React from "react";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

class Profile extends React.Component {
  state = {
    login: true,
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
              <div className="user  d-flex justify-content-around align-items-center">
                <div className="d-flex align-items-center">
                  <span data-descr="">
                    <button className="load_avatar">
                      <img className="avatar" src={this.props.img_url} alt="" />
                    </button>
                  </span>
                </div>
                <div className=" align-items-center ">
                  <div className="col d-flex justify-content-end ">
                    <h1>
                     
                      {this.props.first_name} {this.props.last_name}
                    </h1>
                  </div>
                  <div className="col d-flex justify-content-end ">
                    <h4>+7 996 333 10 20</h4>
                  </div>
                </div>
                <div className="d-flex align-items-center ">
                  <button className="header__btn btn py-2 px-4">
                    Изменить
                  </button>
                </div>
              </div>
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
