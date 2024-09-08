import React, { useEffect, useRef, useState } from "react"
import { DefaultSectionT, RefreshControl, SectionList, SectionListData, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { RelationApi } from "../../../api/relation"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Routes } from "../../../constants/router-constant"
import Toast from "react-native-toast-message"
import CommonHeader from "../../../components/header/CommonHeader"
import Icon from "../../../utils/Icon/Icon"

const PersonScreen: React.FC = () => {

    const [sections, setSections] = useState<RelationUserIndex[]>([])
    const [index, setIndex] = useState<string[]>([])
    const [refreshing, setRefreshing] = useState(false)

    const listRef = useRef<SectionList>(null)
    const navigation = useNavigation<NavigationProps>()
    const params = useRoute().params

    const Header = CommonHeader(undefined,
        ()=>(
            <TextInput 
                style={styles.search} 
                placeholderTextColor='#b1b1b1' 
                placeholder='搜下姓名吧' 
                onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
                returnKeyType='search'
            />
        ),
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
        getRelationUserIndex('')
        navigation.setOptions({
            header: () => (
                <Header 
                    back={ ()=> {navigation.goBack()}} 
                    operate={() =>{navigation.navigate(Routes.PERSON_MANAGE)}} 
                />
            )
        })
    },[params])

    const handleSearch = (search : string) => {
        getRelationUserIndex(search)
    }

    const handleScrollUp = () => {
        setRefreshing(true)
        getRelationUserIndex('')
        setRefreshing(false)
    }

    const getRelationUserIndex = async(s: string) => {
        const res = await RelationApi.getRelationUserIndex({search: s})
        if(res.data.item != null) {
            const data = res.data.item as RelationUserIndex[] 
            setSections(data)
            setIndex(res.data.index)
        } else {
            setSections([])
            setIndex([])
        }
    }

    const scrollToSection = (type: string) => {
        const index = sections.findIndex(item => item.type === type)
        if(index != -1) {
            listRef.current?.scrollToLocation({
                sectionIndex: index,
                itemIndex: 0,
                animated: true
            })
        }
    }

    const renderItem = ({item} : {item: RelationUser}) => {
        return (
            <TouchableOpacity style={styles.sectionItem} onPress={() => navigation.navigate(Routes.PERSON_MANAGE,item)}>
                <Text style={styles.sectionItemText}>{item.relationUserName}</Text>
            </TouchableOpacity>
        )
    }

    const renderSectionHeader = ({section} : {section: SectionListData<RelationUser, DefaultSectionT>}) => {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{section.type}</Text>
            </View>
        )
    }

    const renderIndex = ( 
        index && 
        <View style={styles.index}>
            {index.map((s,i) => 
                <TouchableOpacity key={`${s}-${i}`} onPress={() => scrollToSection(s)}>
                    <Text style={styles.indexText}>{s}</Text>
                </TouchableOpacity>
            )}
        </View>
    )

    return (
        <>
            <SectionList
                style={styles.root}
                ref={listRef}
                sections={sections} 
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => `${item}-${index}`}
                keyboardShouldPersistTaps='handled'
                ItemSeparatorComponent={() => 
                    <View style={styles.separator}></View>
                }
                overScrollMode='never'
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleScrollUp} />
                }
            />
            {renderIndex}
        </>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#ffffff'
    },
    separator: {
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        marginLeft: 20,
        marginRight: 20
    },
    sectionItem: {
        height: 55,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        paddingLeft: 30
    },
    sectionItemText: {
        color: 'black',
        fontSize: 18
    },
    sectionHeader: {
        height: 30,
        justifyContent: 'center',
        paddingLeft: 30,
        backgroundColor: '#f2f2f2'
    },
    sectionHeaderText: {
        color: 'black',
        fontWeight:'bold',
        fontSize: 19
    },
    index: {
        position: 'absolute',
        top: 48,
        right: 10,
        zIndex: 1,
    },
    indexText: {
        color: '#b1b1b1',
        fontSize: 15,
        marginVertical: 1
    },
    search: {
        width: '90%',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingTop: 0,
        paddingBottom:0,
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#ffffff',
        borderRadius: 13
    } 
})

export default PersonScreen