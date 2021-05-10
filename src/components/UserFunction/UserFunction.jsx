import axios from "axios";
import jwt_decode from "jwt-decode";

export async function register(newUser) {
  return axios
    .post("https://realtor3d.herokuapp.com/users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      user_image: newUser.user_image,
      phone:newUser.phone
    })
    .then((res) => {
      return res.data;
    });
}
export async function getUserOwerview(user_id) {
  return axios
    .get(`https://realtor3d.herokuapp.com/users/findUserOwerview?user_id=${user_id}`)
    .then((res) => {
      if (res.data !== undefined) {
        console.log(res.data);
        return res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateUserInfo(formData) {
  return axios
    .post("https://realtor3d.herokuapp.com/users/updateUserInfo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
}

export async function uploadProperty(formData) {
  return axios
    .post("https://realtor3d.herokuapp.com/upload-property", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
}

export async function getProperty(propertyId) {
  return axios.get(`https://realtor3d.herokuapp.com/getProperty?propertyId=${propertyId}`).then((res) => {
    if (res.data !== undefined) {
      return res.data;
    }
  });
}

export async function getUserPropertys(user_id) {
  return axios.get(`https://realtor3d.herokuapp.com/getUserPropertys?user_id=${user_id}`).then((res) => {
    if (res.data !== undefined) {
      return res.data;
    }
  });
}

export async function getPropertys(typeProperty) {
  return axios.get(`https://realtor3d.herokuapp.com/getPropertys?propertyType=${typeProperty}`).then((res) => {
    if (res.data !== undefined) {
      return res.data;
    }
  });
}

export async function propertyStatus(propertyStatus,propertyId) {
  return axios.post(`https://realtor3d.herokuapp.com/users/propertyStatus`,{propertyStatus,propertyId}).then((res) => {
    if (res.data !== undefined) {
      return res.data;
    }
  });
}



export async function login(user) {
  
  return axios
    .post("https://realtor3d.herokuapp.com/users/login", {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      
      if (res.data.error === null) {
     
        sessionStorage.setItem("accesstoken", res.data.tokens.accessToken);
        sessionStorage.setItem("refreshtoken", res.data.tokens.refreshToken);
        return res.data;
      } else {
        sessionStorage.setItem("accesstoken", undefined);
        sessionStorage.setItem("refreshtoken", undefined);
        return res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function userdata() {
  await RefreshTokens();
  const accessToken = sessionStorage.getItem("accesstoken");
  const AuthStr = "Bearer ".concat(accessToken);
  return axios
    .get("http://localhost:4000/users/finduser", { headers: { Authorization: AuthStr } })
    .then((res) => {
      if (res.data !== undefined) {
        return res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export const GetTokens = async (refreshToken) => {
  await axios
    .post("https://realtor3d.herokuapp.com/refresh-tokens", { refreshToken })
    .then((res) => {
      if (res.data !== undefined) {
        sessionStorage.removeItem("accesstoken");
        sessionStorage.removeItem("refreshtoken");
        sessionStorage.setItem("accesstoken", res.data.accessToken);
        sessionStorage.setItem("refreshtoken", res.data.refreshToken);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export async function RefreshTokens() {
  var decoded = jwt_decode(sessionStorage.getItem("accesstoken"));
  let date = Date.now();

  if (date > decoded.exp * 1000) {
    let refreshToken = sessionStorage.getItem("refreshtoken");
    await GetTokens(refreshToken);
  }
}
