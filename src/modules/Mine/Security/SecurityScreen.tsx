import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Template from "../../../template/template"
import { SystemApi } from "../../../api/system"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Routes } from "../../../constants/router-constant"

const SecurityScreen: React.FC = () => {

    const [form, setForm] = useState<UserInfo>({password: ''})

    const navigation = useNavigation<NavigationProps>()

    const handlePassword = (pass: string) => {
        setForm({password: pass})
    }

    const handleSubmit = async () => {
        const res: ResInfo = await SystemApi.updateUserPassword(form)
        if(res.code == 200) {
            navigation.navigate(Routes.MINE);
        }
    }

    return (
        <View style={styles.root}>
            <TextInput 
                placeholder="修改密码"
                value={form?.name}
                style={styles.textInput} 
                placeholderTextColor='#A9A9A9' 
                onChange={(e) => handlePassword(e.nativeEvent.text)}
            />

            <View style={styles.saveButton}>
                <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
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

export default SecurityScreen