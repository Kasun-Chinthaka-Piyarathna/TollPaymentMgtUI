import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";

export const login = async (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const register = async (
    firstName,
    lastName,
    username,
    phoneNumber,
    vehicleNumber,
    address,
    email,
    password) => {
    return axios.post(API_URL + "signup", {
        username,
        firstname: firstName,
        lastname: lastName,
        phonenumber: phoneNumber,
        vehiclenumber: vehicleNumber,
        postaladdress: address,
        email,
        password
    });
}



export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
}
