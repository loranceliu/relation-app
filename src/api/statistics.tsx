import api from "./api";

  export const StatisticsApi = {
    getRelationTypeNum: async () => {
      try {
        const response = await api.post('/statistics/relationTypeNum');
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    getRelationTypeMoney: async () => {
      try {
        const response = await api.post('/statistics/relationTypeMoney');
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    getRelationTotalMoney: async () => {
      try {
        const response = await api.post('/statistics/relationTotalMoney');
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    getRelationUserTop: async (t : number) => {
      try {
        const response = await api.get('/statistics/relationUserTop',{params: {type: t}});
        return response.data;
      } catch (error) {
        throw error;
      }
    }, 
    getRelationUserProfitTop: async (t : number) => {
      try {
        const response = await api.get('/statistics/relationUserProfitTop',{params: {type: t}});
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    getRelationCurrentYearTrend: async () => {
      try {
        const response = await api.post('/statistics/relationCurrentYearTrend');
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    getRelationTenYearTrend: async () => {
      try {
        const response = await api.post('/statistics/relationTenYearTrend');
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  };
  