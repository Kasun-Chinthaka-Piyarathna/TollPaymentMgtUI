import axios from 'axios';
import authHeader from './auth-header';

const RIDES_URL = 'http://localhost:8080/api/rides';
const USERS_URL = 'http://localhost:8080/api/users';

/*
ACCESS for USER only APIs
*/
export const getAllRides = (userId) => {
    return axios.get(RIDES_URL + '/ridesperuser?userId=' + userId, { headers: authHeader() });
}

export const createRide = async (
    user_id,
    entry_time,
    exit_time,
    distance,   
    speed,
    ride_fee,
    fine,
    total_fee,
    start_balance,
    remaining_balance,
    transaction_time,
    transaction_status) => {
    return axios.post(RIDES_URL + "/create", {
        user_id: user_id,
        entry_time: entry_time,
        exit_time: exit_time,
        distance: distance,
        speed: speed,
        ride_fee: ride_fee,
        fine: fine,
        total_fee: total_fee,
        start_balance: start_balance,
        remaining_balance: remaining_balance,
        transaction_time: transaction_time,
        transaction_status: transaction_status
    }, { headers: authHeader() });
}


export const updateRide = async (
    id,
    transaction_time,
    total_fee,
) => {
    return axios.put(RIDES_URL, {
        id: id,
        transaction_time: transaction_time,
        payment: total_fee,
    }, { headers: authHeader() });
}

export const getUser = (userId) => {
    return axios.get(USERS_URL + '/getuser?userId=' + userId, { headers: authHeader() });
}

/*
*****************************************************************************************
*/

/*
ACCESS for ADMIN only APIs
*/

export const getAllUsers = () => {
    return axios.get(USERS_URL + '/all', { headers: authHeader() });
}

export const getAllUsersRides = () => {
    return axios.get(RIDES_URL + '/all', { headers: authHeader() });
}

export const updateUserWallet = async (id,wallet) => {
    return axios.put(USERS_URL, {
        id: id,
        wallet: wallet,
    }, { headers: authHeader() });
}
