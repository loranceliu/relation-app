import React from 'react'
import { RouteConfig, NavigationState, EventMapBase, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import TabScreen from '../modules/Tab/TabScreen'
import Template from '../template/template'
import LoginScreen from '../modules/Login/LoginScreen'
import MessageNotice from '../hooks/message/MessageNotice'
import AuthInterceptor from '../hooks/router/AuthInterceptor'
import {Routes} from '../constants/router-constant'
import { navigationRef } from '../utils/navigation-util'
import SearchScreen from '../modules/Search/SearchScreen'
import TransactionManageScreen from '../modules/Transaction/TransactionManageScreen'
import PersonScreen from '../modules/Mine/Person/PersonScreen'
import PersonManageScreen from '../modules/Mine/Person/PersonManageScreen'
import PersonalInfoScreen from '../modules/Mine/PersonalInfo/PersonInfoScreen'
import SecurityScreen from '../modules/Mine/Security/SecurityScreen'
import SettingScreen from '../modules/Mine/Setting/SettingScreen'
import CategoryScreen from '../modules/Mine/Category/CategoryScreen'
import CategoryManageScreen from '../modules/Mine/Category/CategoryManageScreen'

export type AppRouteConfig = RouteConfig<AppParamList, keyof AppParamList, NavigationState, NativeStackNavigationOptions, EventMapBase>

const routes: AppRouteConfig[] = [ 
    {
        name: Routes.TAB,
        getComponent: () => TabScreen,
        options: {
            headerShown: false
        }
    },
    {
        name: Routes.TRANSCATION_MANAGE,
        component: TransactionManageScreen,
        options: {
            title: '添加账单'
        }
    },
    {
        name: Routes.LOGIN,
        component: LoginScreen,
        options: {
            headerShown: false
        }
    },
    {
        name: Routes.SEARCH,
        component: SearchScreen,
        options: {
            headerShown: false
        }
    },
    {
        name: Routes.PERSON,
        component: PersonScreen
    },
    {
        name: Routes.PERSON_MANAGE,
        component: PersonManageScreen,
        options: {
            title: '添加对象'
        }
    },
    {
        name: Routes.PERSONAL_INFO,
        component: PersonalInfoScreen,
        options: {
            title: '修改资料'
        }
    },
    {
        name: Routes.SECURITY,
        component: SecurityScreen,
        options: {
            title: '账号安全'
        }
    },
    {
        name: Routes.SETTING,
        component: SettingScreen,
        options: {
            title: '设置'
        }
    },
    {
        name: Routes.CATEGORY,
        component: CategoryScreen,
        options: {
            title: '类目管理'
        }
    },
    {
        name: Routes.CATEGORY_MANAGE,
        component: CategoryManageScreen,
        options: {
            title: '添加类目'
        }
    }
]

const Stack = createNativeStackNavigator<AppParamList>()

const AppNavigation = () => {

    return (
        <>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: Template.defaultColor
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        },
                        headerBackTitle: ''
                    }}
                    screenListeners={({navigation,route}) => ({
                        state: () => AuthInterceptor(navigation,route)
                    })}
                >
                    {routes.map(route =>
                        route.component ? (
                            <Stack.Screen name={route.name} component={route.component} options={route.options} key={route.name} />
                        ) : (
                            <Stack.Screen name={route.name} getComponent={route.getComponent!} options={route.options} key={route.name} />
                        )
                    )}
                </Stack.Navigator>
            </NavigationContainer>

            <MessageNotice />
        </>
    )
}

export default AppNavigation