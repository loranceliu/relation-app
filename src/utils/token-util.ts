import AsyncStorage from '@react-native-async-storage/async-storage';


export const setToken = async (token: string, expirationInMinutes: number) => {
    const expirationTime = new Date().getTime() + expirationInMinutes * 60 * 1000;
    const tokenData = { token, expirationTime };

    try {
        await AsyncStorage.setItem('authToken', JSON.stringify(tokenData))
    } catch (error) {
        throw error
    }
};

export const getToken = async () => {

    try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
            const tokenData = JSON.parse(storedToken);
            const currentTime = new Date().getTime();
            if (currentTime < tokenData.expirationTime) {
            return tokenData.token;
            } else {
                AsyncStorage.removeItem('authToken');
            }
        }
        return storedToken
    } catch (error) {
        throw error
    }
}

export const clearToken = async () => {
    try {
        await AsyncStorage.removeItem('authToken');
    } catch (error) {
        throw error
    }
};

  