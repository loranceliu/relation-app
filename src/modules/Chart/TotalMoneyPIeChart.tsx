import { StyleSheet, Text, View } from "react-native";
import BaseChart from "../../components/chart/BaseChart";
import { useEffect, useState } from "react";
import { StatisticsApi } from "../../api/statistics";


const TotalMoneyPieChart: React.FC = () => {

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
                data: [{name: '', value: '0'},{name: '', value: '0'}]
            }
        ]
    };

    const [option, setOption] = useState<any>(defaultOption);

    useEffect(() => {
        StatisticsApi.getRelationTypeMoney().then((res) => {
            if (res.data != null) {
                const data = res.data as PieItem[]
                defaultOption.series[0].data = data
                setOption((prev:any) => ({
                    ...prev,
                    series: defaultOption.series
                }))
            }    
        })
    },[])

    

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>金额分布</Text>
            </View>
            <BaseChart option={option} />
        </>
    )
}

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

export default TotalMoneyPieChart