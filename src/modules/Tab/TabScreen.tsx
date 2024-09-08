import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '../../utils/Icon/Icon'
import Template from '../../template/template'
import ManageScreen from '../Transaction/TransactionScreen'
import HomeScreen from '../Home/HomeScreen'
import MineScreen from '../Mine/MineScreen'
import AnalyseScreen from '../Analyse/AnalyseScreen'
import { Routes } from '../../constants/router-constant'
const Tab = createBottomTabNavigator()
const TabScreen: React.FC<{}> = props => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: Template.defaultColor,
            }}>
            <Tab.Screen 
                name={Routes.HOME}
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                    headerShown: false
                }} 
                initialParams={{routeName: '1'}}
            />
            <Tab.Screen 
                name={Routes.ANALYSE}
                component={AnalyseScreen} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="analyse" color={color} size={size} />
                    ),
                    headerShown: false
                }} 
                initialParams={{routeName: '2'}}
            />
            <Tab.Screen 
                name={Routes.TRANSCATION}
                component={ManageScreen} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="manage" color={color} size={size} />
                    ),
                    headerShown: false
                }} 
            />
            <Tab.Screen 
                name={Routes.MINE}
                component={MineScreen} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="mine" color={color} size={size} />
                    ),
                    headerShown: false
                }} 
            />
        </Tab.Navigator>
    )
}
export default TabScreen