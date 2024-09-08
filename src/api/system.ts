import api from "./api";

export const SystemApi = {
  login: async (params: LoginApiParams) => {
    try {
      const response = await api.post('/login', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getUserInfo: async () => {
    try {
      const response = await api.post('/user/mine/info');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (params: UserInfo) => {
    try {
      const response = await api.post('/user/psersonal/edit', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateUserPassword: async (params: UserInfo) => {
    try {
      const response = await api.post('/user/password/edit', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
  