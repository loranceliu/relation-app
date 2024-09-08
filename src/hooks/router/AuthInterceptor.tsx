import { RouteProp } from "@react-navigation/native"
import { Routes } from "../../constants/router-constant"
import { getToken } from "../../utils/token-util"

const AuthInterceptor = async (navication: any,route: RouteProp<any>) => {
    const token = await getToken();
    if ( token === null && route.name !== Routes.LOGIN) {
        navication.navigate(Routes.LOGIN)
    }
}

export default AuthInterceptor