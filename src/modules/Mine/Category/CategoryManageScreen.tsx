import { number } from "echarts"
import { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Template from "../../../template/template"
import Toast from "react-native-toast-message"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Routes } from "../../../constants/router-constant"
import { RelationApi } from "../../../api/relation"
import CommonHeader from "../../../components/header/CommonHeader"
import Icon from "../../../utils/Icon/Icon"

const CategoryManageScreen: React.FC = () => {

    const defaultForm: RelationType= {
        relationTypeId: undefined,
        relationTypeName: undefined
    }

    const navigation = useNavigation<NavigationProps>();

    const params = useRoute().params

    const [form,setForm] = useState<RelationType>(defaultForm)

    const Header = CommonHeader(undefined,undefined,(props)=>(
            <TouchableOpacity onPress={props.operate}>
                <Icon name="remove" color="#ffffff" size={20} />
            </TouchableOpacity>
        )
    )

    const handleTarget = async (id : number) => {
        const res: ResInfo= await RelationApi.deleteRelationType({ids: [id]})
        if(res.code == 200) {
            navigation.navigate(Routes.CATEGORY,{operation: 1})
        }
    }

    useEffect(() => {
        if(params != undefined) {
            const data = params as RelationType
            setForm(data)
            navigation.setOptions({
                header: () => {
                   return  <Header back={() => navigation.goBack()}  operate={() => handleTarget(data.relationTypeId as number)} />
                }
            })
        }
    },[params])

    const handleForm = (name: string) => {
        setForm(prev => ({
            ...prev,
            relationTypeName: name
        }))
    }

    const handleSubmit = async () => {

        if(form.relationTypeName == undefined) {
            Toast.show({
                type: 'short',
                text1: '请填写类目名称',
                position: 'bottom'
            })
            return
        }

        let res: ResInfo

        if(form.relationTypeId === undefined) {
            res = await RelationApi.addRelationType(form); 
        } else {
            res = await RelationApi.editRelationType(form); 
        }

        if(res.code === 200) {
            if(form.relationTypeId == undefined) {
                Toast.show({
                    type: 'confirm',
                    text1: '添加成功',
                    text2: '继续添加请按取消，查看列表请按确认',
                    autoHide: false,
                    onPress: () => {
                        navigation.navigate(Routes.CATEGORY,{operation: 2})
                    },
                })
            } else {
                navigation.navigate(Routes.CATEGORY,{operation: 1})
            }
        }
    }

    return (
        <View style={styles.root}>
            <TextInput 
                value={form?.relationTypeName}
                style={styles.textInput} 
                placeholderTextColor='#A9A9A9' 
                placeholder="填写类目"
                onChange={(e) => handleForm(e.nativeEvent.text)}
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
    headerTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default CategoryManageScreen