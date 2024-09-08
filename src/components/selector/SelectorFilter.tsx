import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View ,ScrollView, TouchableOpacity, TextInput} from 'react-native'
import CommonModal from '../modal/CommonModal';
import Icon from '../../utils/Icon/Icon';


interface SelectorFilterProps {
    title: string;
    value?: number,
    placeholder?: string 
    fetchData: () => Promise<Item[]>;
    onSelect: (id: number) => void
    h?: number
}

const SelectorFilter: React.FC<SelectorFilterProps> = ({title,value,placeholder,h,fetchData,onSelect}) => {

    
    const [text,setText] = useState<undefined | string>(undefined)
    const [visible,setVisible] = useState(false)
    const [data,setData] = useState<Item[]>([])

    useEffect(() => {
        if(value != undefined) {
            fetchData().then((data) => {
                if(data.length > 0) {
                    data.map(item => {
                        if(item.id === value) {
                            setText(item.value)
                            return
                        }
                    })
                }
            })
        } else {
            setText(undefined)
        }
    },[value])

    const handleModal = async () => {
        setVisible(true)
        const data : Item[] = await fetchData()
        if(data.length > 0) {
            setData(data)
        }
    }

    const closeModal = () => {
        setVisible(false)
    }

    const handleSelection = (id: number,value: string) => {
        closeModal()
        setText(value)
        onSelect(id)
    }

    const handleSearch = async (value: string) => {
        const data : Item[] = await fetchData()
        if(data.length > 0) {
            const filteredData = data.filter(item => item.value.includes(value));
            setData(filteredData)
        }
    }

    const textValue = text === undefined?placeholder : text;
    const textStyle = text === undefined?styles.filterText : [styles.filterText,styles.textBlack]
    const textIconStyle = text === undefined?styles.filterIcon : [styles.filterIcon,styles.textBlack]

    return (
        <>
            <TouchableOpacity style={styles.filterItem} onPress={handleModal}>
                <Text style={textStyle}>{textValue}</Text>
                <Icon style={textIconStyle} name="downArrow" color="#b1b1b1" size={17} />
            </TouchableOpacity>
            <CommonModal isVisible={visible} title={title} h={h} onClose={closeModal}>
                <View style={styles.search}>
                    <Icon style={styles.searchIcon} name="search" size={18} color='#b1b1b1' />
                    <TextInput style={styles.searchInput} returnKeyType='search' onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)} />
                </View>
                <ScrollView contentContainerStyle={styles.content}>
                    {
                        data && data.length > 0 && data.map((item,index) => {
                            const isLastItem = index === data.length - 1
                            return (
                                <TouchableOpacity 
                                    key={`to${index}`} 
                                    style={styles.contentOpacity} 
                                    onPress={() => handleSelection(item.id,item.value)}
                                >
                                    <Text style={styles.contentText}>
                                        {item.value}
                                    </Text>
                                    {!isLastItem && <View style={styles.separator}></View>}
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView> 

            </CommonModal>
        </>
    )
}

const styles = StyleSheet.create({
    separator: {
        width: '100%',
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        marginBottom: 12,
        marginTop: 10
    },
    content: {
        paddingTop: 20,
        paddingBottom: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentText: {
        color: 'black'
    },
    contentOpacity: {
        width: '100%',
        alignItems: 'center'
    },
    textBlack: {
        color:'#212121'
    },
    filterItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:"center",
        borderRadius: 20,
        backgroundColor:'#ffffff',
        height: 22,
        marginHorizontal: 3
    },
    filterText: {
        color: '#b1b1b1',
        flex: 3,
        textAlign:'center',
        marginRight: 3
    },
    filterIcon: {
        flex: 1,
        marginRight: 2
    },
    search: {
        height: 27,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#b1b1b1',
        borderRadius: 18
    },
    searchInput: {
        width: '80%',
        textAlign: 'center',
        padding: 0,
        color: 'black'
    },
    searchIcon: {
        marginLeft: -8
    }
});

export default SelectorFilter