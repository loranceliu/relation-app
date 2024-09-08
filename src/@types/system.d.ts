interface Item {
    id: number; 
    value: string 
}

interface LoginApiParams {
    username: string | undefined
    password: string | undefined
}

interface LoginData {
    userId: number | undefined;
    username: string | undefined;
    name: string | undefined;
    email: string | undefined;
    token: string 
    isAdmin: false
    exp: number
}

interface ResInfo {
    code: number,
    data: any,
    message: string | undefined
}

interface UserInfo {
    id?: number,
    name?: string,
    password?: string,
    time?: number,
    email?: string,
    incomeNum?: number,
    expendNum?: number
    revenue?: number
}

interface Config {
    baseURL: string;
    timeout: number;
}