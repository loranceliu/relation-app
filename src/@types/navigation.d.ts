/**
 * 定义App提供的所有页面路由名称以及参数
 * 其中 key 为路由跳转时的名称, value 为路由跳转时携带的参数
 */
declare type AppParamList = {
    Tab: object | undefined
    Home: object | undefined
    Mine: object | undefined
    Analyse: object | undefined
    Person: object | undefined
    PersonManage: object | undefined
    Transaction: object | undefined
    TransactionManage: object | undefined
    Login: object | undefined
    Search: object | undefined
    PersonalInfo: object | undefined
    Security: object | undefined
    Setting: object | undefined
    Category: object | undefined
    CategoryManage: object | undefined
}

type NavigationProps = NativeStackScreenProps<AppParamList, 'Mine'>;

interface ParamList  {
    name: string,
    params:  Record<string,any>
}

interface TransactionRouteParam {
    type: number
}