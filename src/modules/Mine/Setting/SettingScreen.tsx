import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { clearToken } from "../../../utils/token-util"
import { useNavigation } from "@react-navigation/native"
import { Routes } from "../../../constants/router-constant"

const SecurityScreen: React.FC = () => {

    const navigation = useNavigation<NavigationProps>()

    const handleLogout = async () => {
        await clearToken()
        navigation.navigate(Routes.LOGIN)
    }

    return (
        <View style={styles.root}>
            <TouchableOpacity style={styles.operation}>
                <Text style={styles.text}>更改主题</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.operation} onPress={() => handleLogout()}>
                <Text style={styles.text}>退出登录</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingLeft: 18,
        paddingRight: 18,
    },
    text: {
        fontSize: 16,
        color: 'black'
    },
    operation: {
        height:38,
        justifyContent: 'center',
    },
    separator: {
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
    },
})

export default SecurityScreen