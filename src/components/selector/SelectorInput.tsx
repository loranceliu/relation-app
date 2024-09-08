import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View ,ScrollView, TouchableOpacity, TextInput} from 'react-native'
import CommonModal from '../modal/CommonModal';
import Icon from '../../utils/Icon/Icon';


interface SelectorInputProps {
    title?: string;
    value?: number,
    placeholder?: string 
    header?: React.ReactElement
    fetchData: () => Promise<Item[]>;
    onSelect: (id: number) => void
    h?: number
}

const SelectorInput: React.FC<SelectorInputProps> = ({title,value,placeholder,h,header,fetchData,onSelect}) => {

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
    const textStyle = text === undefined?styles.text : StyleSheet.compose(styles.text,styles.textBlack)

    return (
        <View>
            <Text style={textStyle} onPress={handleModal}>{textValue}</Text>

            <CommonModal isVisible={visible} title={title} h={h} onClose={closeModal}>
                {header}
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
        </View>
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
    text: {
        color:'#A9A9A9',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 4,
        fontSize: 16
    },
    textBlack: {
        color:'#212121'
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

export default SelectorInput