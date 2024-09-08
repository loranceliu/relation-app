import { StyleSheet, Text, View } from "react-native";
import BaseChart from "../../components/chart/BaseChart";
import { useEffect, useState } from "react";
import { StatisticsApi } from "../../api/statistics";
import { useNavigation } from "@react-navigation/native";
import React from "react";


const TotalPieChart: React.FC = () => {

    const defaultOption = {
        color:[
            '#83F3C6',
            '#ED4AA4'
        ],
        tooltip: {
            trigger: 'item'
        },
        title: {
            text: "",
            left: 'center',
            top: 'center',
            textStyle:{
                lineHeight: 12,
                fontWeight: 'normal',
                fontSize: 10,
                color:'#9E9E9E',
            }
        },
        series: [
            {
                type: 'pie',
                radius: ['45%', '75%'],
                center: ['50%','50%'],
                label: {
                    formatter: '{b} {d}%',
                    fontSize: 11,
                    color: '#9E9E9E'
                },
                labelLine: {
                    length: 1
                },
                data: [{name: '入账', value: '0'},{name: '出账', value: '0'}]
            }
        ]
    };

    const [option, setOption] = useState<any>(defaultOption);
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async ()=> {
            const res = await StatisticsApi.getRelationTotalMoney();
            if (res.data != null) {
                const data = res.data as PieItem[]
                const initialValue = parseFloat(res.data[0].value);
                const diffValue = data.slice(1).reduce((accumulator : number, currentValue : PieItem) => {
                    return accumulator - parseFloat(currentValue.value);
                }, initialValue);
                const updatedOption = {
                    ...option, // 复制当前选项
                    title: {
                        ...option.title, // 复制标题配置
                        text: `利润\n${diffValue}` // 更新标题文本
                    },
                    series: [{...option.series[0], data: data}] // 更新数据
                };
                setOption(updatedOption)
            }    
        })
        return unsubscribe
    },[navigation])

    return (
        <Component option={option} />
    )
}

type Props = {
    option: any
}

const Component = React.memo((props: Props) => {
    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>总额分布</Text>
            </View>
            <BaseChart option={props.option} />
        </>
    )
},(pre: Props,next: Props) =>{
    return JSON.stringify(pre.option) == JSON.stringify(next.option)
})

const styles = StyleSheet.create({
    header: {
        height: "20%",
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 5
    }
})

export default TotalPieChart