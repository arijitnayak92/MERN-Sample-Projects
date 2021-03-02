import { API, ROOT_ROUTE,PROD_ROUTE } from "../uri";
import axios from "axios";
import history from '../routes/history'


axios.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt")).token;
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if(error.message === 'Network Error' || error.message === 'Failed to fetch')
    {

    }
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url === "http://localhost:8080/checkToken"
    )
    {
      localStorage.clear();
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._isRetry)
    {;
      originalRequest._isRetry = true;
      const refresh_token = JSON.parse(localStorage.getItem("jwt")).refreshToken;
      const user_id = JSON.parse(localStorage.getItem("jwt")).userId;

      return axios
        .post(`${API}/checkToken`, {
          refreshToken: refresh_token,
          userId: user_id,
        })
        .then((res) => {
          if (res.status === 200) {
            let data = JSON.parse(localStorage.getItem("jwt"));
            data.token = res.data.newAccessToken;
            localStorage.setItem("jwt", JSON.stringify(data));
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + JSON.parse(localStorage.getItem("jwt")).token;
            return axios(originalRequest);
          }
        })
        .catch((err) => {
          return err ;
        });
    }
    if (error.response.status === 504 || error.response.status === 503)
    {
      history.push('/bad-gateway')
    }
    return Promise.reject(error);
  }
);


export const fetchProduct=async(data)=>{
  return await fetch(`${PROD_ROUTE}/getImage/0e972784-1167-44f3-8739-a1bd6c9361ae`,{
    method: "GET",
    headers: {
      Accept: "applicatioin/json",
      "Content-Type": "application/json",
    },
  })
  .then(res=>{
    return res.json();
  })
  .catch(err=>{
    return err;
  })
}

export const loginRoute=async(data)=>{
  return await fetch(`${API}/login`,{
    method: "POST",
    headers: {
      Accept: "applicatioin/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(res=>{
    return res.json();
  })
  .catch(err=>{
    return err;
  })
}

export const signupRoute=async(data)=>{
  console.log(data);
  return await fetch(`${API}/signup`,{
    method: "POST",
    headers: {
      Accept: "applicatioin/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(res=>{
    return res.json();
  })
  .catch(err=>{
    return err;
  })
}

export const checktokenRoute=async()=>{
  return await axios.post(`${API}/checkToken`)
  .then(res=>{
    return res;
  })
  .catch(err=>{
    return err.response;
  })
}
