import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import SelectorInput from "../../../components/selector/SelectorInput"
import Template from "../../../template/template"
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { RelationApi } from "../../../api/relation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Routes } from "../../../constants/router-constant";
import CommonHeader from "../../../components/header/CommonHeader";
import Icon from "../../../utils/Icon/Icon";

const PersonManageScreen : React.FC = () => {

    const defaultForm : RelationUserForm = {
        relationUserId: undefined,
        relationUserName: undefined,
        sex: undefined,
        status: undefined,
        remark: undefined,
        income: undefined,
        expend: undefined
    }

    const params = useRoute().params
    const navigation = useNavigation<NavigationProps>()

    const [form, setForm] = useState<RelationUserForm>(defaultForm);

    const Header = CommonHeader(undefined,undefined,(props)=> (
            <TouchableOpacity onPress={props.operate}>
                <Icon name="remove" color="#ffffff" size={20} />
                </TouchableOpacity>
        )
    )

    useEffect(() => {
        if(params != undefined) {
            const data = params as RelationUserForm
            setForm(data)
            navigation.setOptions({
                header: () => {
                    return <Header 
                        back={ ()=> {navigation.goBack()}} 
                        operate={() =>{handleTarget(data.relationUserId as number)}} 
                    />
                 }
            })
        }
    },[params])

    const fetchSex = async () => {
        const types : Item[] = [
          {id: 2, value: "男"},
          {id: 1, value: "女"}
        ]
    
        return types
    }

    const fetchStatus = async () => {
        const types : Item[] = [
          {id: 1, value: "正常"},
          {id: 2, value: "禁用"}
        ]
    
        return types
    }

    const handleTarget = async (id : number) => {
        const res: ResInfo= await RelationApi.deleteRelationUser({ids: [id]})
        if(res.code == 200) {
            navigation.navigate(Routes.PERSON,{operation: 1})
        }
    }

    const handleUserName = (name : string) => {
        setForm(prev => ({
            ...prev,
            relationUserName: name
        }))
    }

    const handleSelectSex = (id : number) => {
        setForm(prev => ({
            ...prev,
            sex: id
        }))
    }

    const handleSelectStatus = (id : number) => {
        setForm(prev => ({
            ...prev,
            status: id
        }))
    }

    const handleRemark = (remark : string) => {
        setForm(prev => ({
            ...prev,
            remark: remark
        }))
    }

    const handleSubmit = async () => {
        Keyboard.dismiss()
        if(form.relationUserName == undefined) {
            Toast.show({
                type: 'short',
                text1: '请填写对象名称',
                position: 'bottom'
            })
            return
        }

        if(form.sex == undefined) {
            Toast.show({
                type: 'short',
                text1: '请选择性别',
                position: 'bottom'
            })
            return
        }

        if(form.sex == undefined) {
            Toast.show({
                type: 'short',
                text1: '请选择状态',
                position: 'bottom'
            })
            return
        }
        
        let res
        if(form.relationUserId == undefined) {
            res = await RelationApi.addRelationUser(form)
        } else {
            res = await RelationApi.editRelationUser(form)
        }

        if(res.code === 200) {
            if(form.relationUserId == undefined) {
                Toast.show({
                    type: 'confirm',
                    text1: '添加成功',
                    text2: '继续添加请按取消，查看列表请按确认',
                    autoHide: false,
                    onPress: () => {
                        navigation.navigate(Routes.PERSON,{operation: 2})
                    },
                })
            } else {
                navigation.navigate(Routes.PERSON,{operation: 1})
            }
        }
    }


    return (
        <View style={styles.form}>
            <TextInput 
                value={form.relationUserName}
                style={styles.textInput} 
                placeholderTextColor='#A9A9A9' 
                placeholder='添加对象名称'
                onChange={(e) => handleUserName(e.nativeEvent.text)}
            />
            <View style={styles.separator}></View>

            <SelectorInput 
                title='性别' 
                value={form.sex} 
                placeholder='选择性别'
                fetchData={fetchSex} 
                onSelect={(id) => handleSelectSex(id)}
            />
            <View style={styles.separator}></View>

            <SelectorInput 
                title='状态' 
                value={form.status}
                placeholder='选择状态'
                fetchData={fetchStatus} 
                onSelect={(id) => handleSelectStatus(id)}
            />

            <View style={styles.separator}></View>

            <TextInput 
                style={styles.textInput} 
                value={form.remark}
                placeholderTextColor='#A9A9A9'
                placeholder='添加备注'
                onChange={(e) => handleRemark(e.nativeEvent.text)}
            />
            <View style={styles.separator}></View>

            {form.relationUserId != undefined && <Text style={styles.text}>
                入账: {' '}{form.income}{'   '}
                出账: {' '}{form.expend}{'   '}
                结余: {' '}<Text>{(form.income || 0) - (form.expend || 0)}</Text>
            </Text>}
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
        backgroundColor: '#FFFFFF'
    },
    form: {
        flex: 13,
        paddingLeft: 15,
        paddingRight: 15
    },
    textInput: {
        color: 'black',
        fontSize: 16
    },
    text: {
        color: 'black',
        fontSize: 16,
        marginTop: 12,
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

export default PersonManageScreen