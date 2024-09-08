import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import CheckBox  from '@react-native-community/checkbox'
import Template from "../../template/template";
import { SystemApi } from "../../api/system";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { pullUserInfo } from "../../stores/redux-action";
import { useDispatch } from "react-redux";
import { setToken } from "../../utils/token-util";
import { Routes } from "../../constants/router-constant";


const LoginScreen: React.FC = () => {

    const dispatch = useDispatch()

    const navigation = useNavigation();

    const defaultParams : LoginApiParams = {
        username : '',
        password : '' 
    }

    const [apiParams, setApiParams] = useState<LoginApiParams>(defaultParams);

    const[focusElement, setFocusElement] = useState('')

    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const handleChange = (key : string, value : string) => {
        setApiParams((item) => ({
            ...item,
            [key]: value
        }))
    }

    const handleFocus = (type: string) => {
        setFocusElement(type)
    }
    

    const handleSubmit = () => {

        if(apiParams.username === '') {
            Toast.show({
                type: 'short',
                text1: '请输入账号',
                position: 'bottom'
            })
            return
        }

        if(apiParams.password === '') {
            Toast.show({
                type: 'short',
                text1: '请输入密码',
                position: 'bottom',
            })
            return
        }

        if(!toggleCheckBox) {
            Toast.show({
                type: 'accept',
                text1: '服务条款和隐私条款',
                text2: '已阅读并同意《用户协议》和《隐私政策》',
                autoHide: false,
                onPress: () => {
                    setToggleCheckBox(true)
                    submit()
                }
              })
              return
        }

        submit()    
    }

    const submit = async () => {
        const res = await SystemApi.login(apiParams);
        if(res.data != null) {
            const loginData = res.data as LoginData
            await setToken(loginData.token, loginData.exp)

            const infoData = await SystemApi.getUserInfo();
            const data = infoData.data as UserInfo

            if(data != null) {
                dispatch(pullUserInfo(data))
            }
            // @ts-ignore
            navigation.navigate(Routes.TAB);
        }
    }

    return (
        <View style={styles.root}>
            <StatusBar 
                backgroundColor="transparent" 
                barStyle={'dark-content'}
            />
            <Text style={styles.title}>Hi,  欢迎使用往来</Text>
            <View style={styles.form}>
                <TextInput 
                    onChange={(e) => handleChange('username',e.nativeEvent.text)} 
                    value={apiParams.username}
                    onFocus={() => handleFocus('username')} 
                    style={[styles.textInput,focusElement === 'username' && styles.textInputFocus]} 
                    placeholderTextColor='#b1b1b1'
                    placeholder="账号" 
                />
                <TextInput 
                    secureTextEntry
                    value={apiParams.password}
                    onChange={(e) => handleChange('password',e.nativeEvent.text)} 
                    onFocus={() => handleFocus('password')} style={[styles.textInput,focusElement === 'password' && styles.textInputFocus]} 
                    placeholderTextColor='#b1b1b1'
                    placeholder="密码" 
                />
            </View>
            <View style={styles.control}>
                <TouchableOpacity onPress={handleSubmit} style={styles.loginOpacity}>
                    <Text style={styles.controlText}>登录</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.checkTerms}>
                <CheckBox 
                    style={{transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]}}
                    value={toggleCheckBox} 
                    tintColors={{true: Template.defaultColor, false: '#7b7b7b'}}
                    onValueChange={(val) => setToggleCheckBox(val)}
                />
                <Text style={styles.textTotal}>已阅读并同意
                    <Text style={styles.policy}>《用户协议》</Text>
                    和
                    <Text style={styles.policy}>《隐私政策》</Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 180,
        paddingLeft: 30,
        paddingRight: 30
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 25
    },
    form: {
        marginLeft: -4,
        marginBottom: 30
    },
    textInput: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        color: 'black'
    },
    placeHolder: {
        color: '#b1b1b1'
    },
    textInputFocus: {
        borderBottomColor: Template.defaultColor
    },
    control: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    controlText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    loginOpacity: {
        backgroundColor: Template.defaultColor,
        borderRadius: 18,
        height: 42,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    checkTerms: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textTotal: {
        color: '#b1b1b1'
    },
    policy: {
        color: Template.defaultColor
    }
})

export default LoginScreen