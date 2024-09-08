import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Template from "../../../template/template"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react"
import Toast from "react-native-toast-message"
import { SystemApi } from "../../../api/system"
import { Routes } from "../../../constants/router-constant"

const PersonalInfoScreen: React.FC = () => {

    const defaultForm: UserInfo= {
        email: '',
        name: ''
    }

    const [form, setForm] = useState<UserInfo>(defaultForm)

    const params = useRoute().params
    const navigation = useNavigation<NavigationProps>()

    useEffect(() => {
        if(params != undefined) {
            setForm(params as UserInfo)
        }
    },[params])

    const handleForm = (key :string,value: string) => {
        setForm(prev => ({
            ...prev,
            [key]: value
        }));
    }

    const handleSubmit = async () => {
        if(form.name === '') {
            Toast.show({
                type: 'short',
                text1: '名称不能为空',
                position: 'bottom'
            })
            return
        }

        if(form?.email === '') {
            Toast.show({
                type: 'short',
                text1: '邮箱不能为空',
                position: 'bottom'
            })
            return
        }

        const res : ResInfo = await SystemApi.updateUser(form)

        if(res.code == 200) {
            navigation.navigate(Routes.MINE)
        }
    }

    return (
        <View style={styles.root}>
            <TextInput 
                value={form?.name}
                style={styles.textInput} 
                placeholderTextColor='#A9A9A9' 
                onChange={(e) => handleForm('name',e.nativeEvent.text)}
            />

            <View style={styles.separator}></View>

            <TextInput 
                value={form?.email}
                style={styles.textInput} 
                placeholderTextColor='#A9A9A9' 
                onChange={(e) => handleForm('email',e.nativeEvent.text)}
            />

            <View style={styles.separator}></View>

            <View style={styles.saveButton}>
                <TouchableOpacity style={styles.submit} onPress={() => handleSubmit()}>
                    <Text style={styles.submitText}>保存</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingLeft: 18,
        paddingRight: 18
    },
    textInput: {
        color: 'black',
        fontSize: 16
    },
    separator: {
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
    },
    submit: {
        width: 280,
        height: 40,
        borderRadius: 18,
        backgroundColor: Template.defaultColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    saveButton: {
        height:80,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default PersonalInfoScreen