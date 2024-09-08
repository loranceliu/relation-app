import api from "./api";

export const RelationApi = {
  getRelation: async (params: RelationApiParams) => {
    try {
      const response = await api.post('/relation', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getRelationUser: async (params: RelationUserPageParams) => {
    try {
      const response = await api.post('/relation/user', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getRelationUserIndex: async (params: {search: string}) => {
    try {
      const response = await api.post('/relation/user/index',params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getRelationType: async () => {
    try {
      const response = await api.post('/relation/type');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addRelationType: async (params: RelationType) => {
    try {
      const response = await api.post('/relation/type/add', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  editRelationType: async (params: RelationType) => {
    try {
      const response = await api.post('/relation/type/edit', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteRelationType: async (params: DeleteParams) => {
    try {
      const response = await api.post('/relation/type/delete', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addRelation: async (params: RelationForm) => {
    try {
      const response = await api.post('/relation/add', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  editRelation: async (params: RelationForm) => {
    try {
      const response = await api.post('/relation/edit', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteRelation: async (params: DeleteParams) => {
    try {
      const response = await api.post('/relation/delete', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addRelationUser: async (params: RelationUserForm) => {
    try {
      const response = await api.post('/relation/user/add', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  editRelationUser: async (params: RelationUserForm) => {
    try {
      const response = await api.post('/relation/user/edit', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, 
  deleteRelationUser: async (params: DeleteParams) => {
    try {
      const response = await api.post('/relation/user/delete', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
  