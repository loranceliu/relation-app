import React, { useEffect, useState } from 'react'
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import Template from '../../template/template'
import SelectorInput from '../../components/selector/SelectorInput'
import { RelationApi } from '../../api/relation'
import CommonCalendar from '../../components/calendar/Calendar'
import { TransactionType } from '../../constants/transcation-constant'
import Toast from 'react-native-toast-message'
import { Routes } from '../../constants/router-constant'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '../../utils/Icon/Icon'


const TransactionManageScreen: React.FC = () => {

    const defaultForm :RelationForm = {
        relationId: undefined,
        relationUserId:  undefined,
        relationTypeId: undefined,
        transactionType:  TransactionType.INCOME,
        money: undefined,
        remark:  undefined,
        date:  undefined,
        relationTypeName: undefined,
        relationUserName: undefined    
    }

    const [selectedElement, setSelectedElement] = useState<number>(TransactionType.INCOME)
    const [form, setForm] = useState<RelationForm>(defaultForm)

    const params = useRoute().params;
    const navigation = useNavigation<NavigationProps>()

    useEffect(() => {
    
        if(params != undefined) {
            const record = params as RelationForm
            record.date = record.date?.toString().replace(/年|月/g, '-').replace('日', '')
            setForm(record)
            setSelectedElement(record.transactionType as number)
            navigation.setOptions({
                headerTitle: () => {
                    return <Text style={styles.headerTitle}>编辑账单</Text>
                }
            })
        }

    },[params])

    const fetchPerson = async () => {
        const res = await RelationApi.getRelationUser({page: 1, pageSize: 1000, status: 1});
        if(res.data.data != null) {
            const data = res.data.data as RelationUser[]
            const items : Item[] = data.map((item) => ({
                id: item.relationUserId,
                value: item.relationUserName
            }))
            return items
        }
        return []
    }

    const fetchCate = async() => {
        const res = await RelationApi.getRelationType();
        if(res.data != null) {
            const items : Item[] = res.data.map((item: any) => ({
                id: item.relationTypeId,
                value: item.relationTypeName
            }))
            return items
        }
        return []
    }

    const handlePress = (type: number) => {
        setSelectedElement(type)  
        setForm(prev => ({
            ...prev,
            transactionType: type
        }))
    }

    const handleSelectPersonId = (id: number) => {
        setForm(prev => ({
            ...prev,
            relationUserId: id
        }))
    }

    const handleSelectCateId = (id: number) => {
        setForm(prev => ({
            ...prev,
            relationTypeId: id
        }))
    }

    const handleSelectDate = (date: string) => {
        setForm(prev => ({
            ...prev,
            date: date
        }))
    }

    const handleMoney = (money: string) => {

        let m :  number | undefined

        if(money != ''){
            m = parseInt(money)
        } else {
            m = undefined
        }

        setForm(prev => ({
            ...prev,
            money: m 
        }))
    }

    const handleRemark = (remark: string) => {
        setForm(prev => ({
            ...prev,
            remark: remark
        }))
    }

    const handleSubmit = async () => {
        Keyboard.dismiss()
        if(form.relationUserId == undefined) {
            Toast.show({
                type: 'short',
                text1: '请选择入账对象',
                position: 'bottom'
            })
            return
        }

        if(form.money == undefined || form.money < 1) {
            Toast.show({
                type: 'short',
                text1: '请填写入账金额',
                position: 'bottom'
            })
            return
        }

        if(form.date == undefined) {
            Toast.show({
                type: 'short',
                text1: '请选择入账日期',
                position: 'bottom'
            })
            return
        }

        if(form.relationTypeId == undefined) {
            Toast.show({
                type: 'short',
                text1: '请选择入账类目',
                position: 'bottom'
            })
            return
        }
        
        let res
        if(form.relationId == undefined) {
            res = await RelationApi.addRelation(form)
        } else {
            res = await RelationApi.editRelation(form)
        }

        if(res.code === 200) {
            if(form.relationId == undefined) {
                Toast.show({
                    type: 'confirm',
                    text1: '添加成功',
                    text2: '继续添加请按取消，查看列表请按确认',
                    autoHide: false,
                    onPress: () => {
                        navigation.navigate(Routes.TRANSCATION, {type: selectedElement})
                    },
                })
            } else {
                navigation.navigate(Routes.TRANSCATION, {type: selectedElement})
            }
        }
    }

    const handleAdd = (type: Routes) => {
        if (type === Routes.PERSON_MANAGE) {
            navigation.navigate(Routes.PERSON_MANAGE)
        }

        if (type === Routes.CATEGORY_MANAGE) {
            navigation.navigate(Routes.CATEGORY_MANAGE)
        }
    }

    const controlIncomeOpacity = StyleSheet.compose(styles.controlOpacity,selectedElement === TransactionType.INCOME && styles.controlOpacityPress)
    const controlIncomeText = StyleSheet.compose(styles.controlText,selectedElement === TransactionType.INCOME && styles.controlTextPress)

    const controlExpendOpacity = StyleSheet.compose(styles.controlOpacity,selectedElement === TransactionType.EXPEND && styles.controlOpacityPress)
    const controlExpendText = StyleSheet.compose(styles.controlText,selectedElement === TransactionType.EXPEND && styles.controlTextPress)

    interface HeaderProps {
        type: Routes,
        name: string
    }

    const SelectorHeader = (props: HeaderProps) => {
        const headerStyles = StyleSheet.create({
            root: {
                flexDirection:'row'
            },
            text: {
                flex: 1,
                color: 'black',
                fontWeight: 'bold',
                fontSize: 17
            },
            icon: {
                flex: 1,
                textAlign:'right'
            }
        })

        return (
            <View style={headerStyles.root}>
                <Text style={headerStyles.text}>{props.name}</Text>
                <TouchableOpacity onPress={() => handleAdd(props.type)}>
                    <Icon style={headerStyles.icon} name='add2' color="black" size={26} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.root}>
            <View style={styles.control}>
                <TouchableOpacity 
                    onPress={() => handlePress(TransactionType.INCOME)} 
                    style={controlIncomeOpacity}
                    activeOpacity={1}
                >
                    <Text style={controlIncomeText}>入账</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => handlePress(TransactionType.EXPEND)} 
                    style={controlExpendOpacity}
                    activeOpacity={1}
                >
                    <Text style={controlExpendText}>出账</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <View>
                    <SelectorInput 
                        header={<SelectorHeader name='入账对象' type={Routes.PERSON_MANAGE} />}
                        value={form.relationUserId}
                        h={322}
                        placeholder='选择入账对象'
                        fetchData={fetchPerson} 
                        onSelect={(id) => handleSelectPersonId(id)}
                    />
                </View>
                <View style={styles.separator}></View>
                <View>
                    <TextInput 
                        value={form.money !== undefined ? `${form.money}` : ""}
                        style={styles.textInput} 
                        placeholderTextColor='#A9A9A9' 
                        placeholder='添加入账金额'
                        keyboardType='numeric'
                        onChange={(e) => handleMoney(e.nativeEvent.text)}
                    />
                </View>
                <View style={styles.separator}></View>
                <View>
                    <CommonCalendar 
                        value={form.date}
                        placeholder='选择入账日期'
                        onSelect={(date) => handleSelectDate(date)}
                    />
                </View>
                <View style={styles.separator}></View>
                <View>
                    <SelectorInput 
                        header={<SelectorHeader name='入账类目' type={Routes.CATEGORY_MANAGE} />}
                        value={form.relationTypeId}
                        h={322}
                        placeholder='选择入账类目'
                        fetchData={fetchCate} 
                        onSelect={(id) => handleSelectCateId(id)}
                    />
                </View>
                <View style={styles.separator}></View>
                <View>
                    <TextInput 
                        value={form.remark}
                        style={styles.textInput} 
                        placeholderTextColor='#A9A9A9'
                        placeholder='添加备注'
                        onChange={(e) => handleRemark(e.nativeEvent.text)}
                    />
                </View>

                <View style={styles.saveButton}>
                    <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                        <Text style={styles.submitText}>保存</Text>
                    </TouchableOpacity>
                </View>
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
    control: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlOpacity: {
        backgroundColor: '#F2F4FA',
        borderRadius: 15,
        height: 30,
        width: 110,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    controlOpacityPress: {
        backgroundColor: Template.defaultColor,
    },
    controlTextPress: {
        color: '#ffffff'
    },
    controlText: {
        color: '#B9BEBE',
        fontWeight: 'bold'
    },
    form: {
        flex: 13,
        paddingLeft: 15,
        paddingRight: 15
    },
    separator: {
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
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
    headerTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default TransactionManageScreen