import { Calendar } from "react-native-calendars";
import Template from "../../template/template";
import { StyleSheet, TouchableOpacity, Text, View, Modal, TouchableWithoutFeedback, ViewProps } from "react-native";
import Icon from "../../utils/Icon/Icon";
import { useEffect, useRef, useState } from "react";
import React from "react";
import dayjs from "dayjs";
import CommonModal from "../modal/CommonModal";

interface CommonCalendarProps {
    value?: string
    placeholder?: string 
    onSelect: (date: string)  => void
}


const CommonCalendar: React.FC<CommonCalendarProps> = ({onSelect,value,placeholder}) => {
    const customHeaderProps: any = useRef();

    const initialDate = dayjs().format('YYYY-MM-DD');;

    const [currentMonth, setCurrentMonth] = useState(initialDate);
    const [visible,setVisible] = useState(false)
    const [text,setText] = useState(value)

    useEffect(() => {
        setText(value)
    },[value])

    const setCustomHeaderNewMonth = (next = false,monthNum : number) => {
        const add = next ? monthNum : -monthNum;
        const month = new Date(customHeaderProps?.current?.month);
        const newMonth = new Date(month.setMonth(month.getMonth() + add));
        customHeaderProps?.current?.addMonth(add);
        setCurrentMonth(newMonth.toISOString().split('T')[0]);
    };

    const moveNext = (month: number) => {
        setCustomHeaderNewMonth(true,month);
    };

    const movePrevious = (month: number) => {
        setCustomHeaderNewMonth(false,month);
    };

    const closeModal = () => {
        setVisible(false)
    }

    const handleSelect = (day :string) => {
        onSelect(day)
        setCurrentMonth(day)
        setText(day)
        setVisible(false)
    }

    const handleModal = async () => {
        setVisible(true)
    }

    const textValue = text === undefined?placeholder : text;
    const textStyle = text === undefined?styles.text : [styles.text,styles.textBlack]

    const CustomHeader = React.forwardRef<View, ViewProps>((props, ref) => {
        customHeaderProps.current = props;

        return (
            <View ref={ref} {...props} style={styles.root}>
                <View  style={styles.control}>
                    <View style={styles.arrow}>
                        <TouchableOpacity style={styles.touch} onPress={() => movePrevious(12)}>
                            <Icon size={18} color={Template.defaultColor} name="leftDoubleArrow" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch} onPress={() => movePrevious(1)}>
                            <Icon size={18} color={Template.defaultColor} name="leftArrow" />
                        </TouchableOpacity>
                    </View> 
                    <Text style={styles.headerText}>
                    {currentMonth}
                    </Text>
                    <View style={styles.arrow}>
                        <TouchableOpacity style={styles.touch} onPress={() => moveNext(1)}>
                            <Icon size={18} color={Template.defaultColor} name="rightArrow" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch} onPress={() => moveNext(12)}>
                            <Icon size={18} color={Template.defaultColor} name="rightDoubleArrow" />
                        </TouchableOpacity>
                    </View> 
                </View>
                <View style={styles.week}>
                    <Text style={styles.weekText}>周日</Text>
                    <Text style={styles.weekText}>周一</Text>
                    <Text style={styles.weekText}>周二</Text>
                    <Text style={styles.weekText}>周三</Text>
                    <Text style={styles.weekText}>周四</Text>
                    <Text style={styles.weekText}>周五</Text>
                    <Text style={styles.weekText}>周六</Text>
                </View>
            </View>
        )
    }) 


    return (
        <View>
            <Text style={textStyle} onPress={handleModal}>{textValue}</Text>
            <CommonModal isVisible={visible} w={"90%"} h={360} onClose={closeModal}>
                <Calendar
                    theme={{
                        todayTextColor: Template.defaultColor,
                    }}
                    initialDate={initialDate}
                    customHeader={CustomHeader}
                    onDayPress={day => handleSelect(day.dateString)}
                />
            </CommonModal>
        </View>
    )
}

export default CommonCalendar

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
    },
    week: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    weekText: {
        flex: 1,
        color:'#b1b1b1',
        textAlign: 'center'
    },
    control: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        flex: 2,
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        alignContent: 'center'
    },
    headerTextChild: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center'
    },
    arrow: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    touch: {
        flex:1,
        alignItems:'center'
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
    }
})