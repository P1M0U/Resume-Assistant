import { post, get, put, del } from './index';
export const login = async (data) => {
    return await post('/user/login', data);
};
export const register = async (data) => {
    return await post('/user/register', data);
};
export const getCurrentUser = async () => {
    return await get('/user/me');
};
export const updateUser = async (data) => {
    return await put('/user/me', data);
};
export const getAllUsers = async (skip = 0, limit = 100) => {
    return await get(`/user/?skip=${skip}&limit=${limit}`);
};
export const updateUserByAdmin = async (userId, data) => {
    return await put(`/user/${userId}`, data);
};
export const deleteUser = async (userId) => {
    return await del(`/user/${userId}`);
};
