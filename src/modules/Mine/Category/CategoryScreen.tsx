import { useEffect, useState } from "react"
import { RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { RelationApi } from "../../../api/relation"
import React from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Routes } from "../../../constants/router-constant"
import Toast from "react-native-toast-message"
import CommonHeader from "../../../components/header/CommonHeader"
import Icon from "../../../utils/Icon/Icon"

const CategoryScreen: React.FC = () => {

    const [data, setData] = useState<RelationType[]>([])

    const [refreshing, setRefreshing] = useState(false)

    const navigation = useNavigation<NavigationProps>()

    const params = useRoute().params

    const Header = CommonHeader(undefined,undefined,
        (props)=>(
            <TouchableOpacity onPress={props.operate}>
                <Icon name="add2" color="#ffffff" size={30} />
            </TouchableOpacity>
        )
    )

    useEffect(() => {
        if(params != undefined) {
            Toast.show({
                type: 'short',
                text1: '操作成功',
                position: 'bottom'
            })
        }

        RelationApi.getRelationType()
        .then((res) => {
            if(res.data != null) {
                const cates = res.data as RelationType[]
                setData(cates)
            }
        })

        navigation.setOptions({
            header: () => (
                <Header back={() => navigation.goBack()} operate={() => navigation.navigate(Routes.CATEGORY_MANAGE)} />
            )
        })
    },[params])

    const handleScrollUp = async () => {
        setRefreshing(true)
        const res = await RelationApi.getRelationType();
        if(res.data != null) {
            const cates = res.data as RelationType[]
            setData(cates)
            setRefreshing(false)
        }
    }

    return (
        <ScrollView 
            style={styles.root}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleScrollUp} />
            }
        >
            { data.length > 0 && data.map((item,index) => (
                <React.Fragment key={`item-${index}`}>
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(Routes.CATEGORY_MANAGE, item)}>
                        <Text style={styles.itemText}>{item.relationTypeName}</Text>
                    </TouchableOpacity>            
                    <View style={styles.separator} />
                </React.Fragment>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#ffffff'
    },
    item: {
        height: 45,
        justifyContent: 'center',
        marginLeft: 20,
        marginVertical: 2
    },
    itemText: {
        color: 'black',
        fontSize: 16,
    },
    separator: {
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        marginLeft: 20,
        marginRight: 20
    },
})

export default CategoryScreen