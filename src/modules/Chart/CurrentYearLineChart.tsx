import { StyleSheet, Text, View } from "react-native";
import BaseChart from "../../components/chart/BaseChart";
import { useEffect, useState } from "react";
import { StatisticsApi } from "../../api/statistics";


const CurrentYearLineChart: React.FC = () => {

    const defaultOption = {
      color:[
          '#ED4AA4',
          '#83F3C6'
      ],
      xAxis:{
          type: 'category',
          data: ['','','','','','','','','','',],
          axisTick: {
              show: false
            },
            axisLine: {
              show: false
          },
          axisLabel: {
              color: '#9e9e9e',
              fontSize: 11
          }
      },
      grid:{
        top: '15%',
        left: '19%',
        right: '6%',
        bottom: '17%'
      },
      yAxis: [
        {
          type: 'value',
          show: true,
          splitLine: {
              show: true,
              lineStyle: {
                  color: '#e0e0e0',
                  type: 'solid'
              }
          },
          axisLabel: {
              color: '#9e9e9e',
              fontSize: 11
          }
        }
      ],
      tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
      },
      series: [
        {
          name: '入账',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 1.5
          },
          showSymbol: false,
          label: {
              show: false
          },
          emphasis: {
            focus: 'series',
          },
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: '出账',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 1.5
          },
          showSymbol: false,
          label: {
              show: false
          },
          emphasis: {
            focus: 'series',
          },
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
      ]
    };

    const [option,setOption] = useState(defaultOption);

    useEffect(() => {
      StatisticsApi.getRelationTenYearTrend()
      .then((res) => {
        if(res.data != null) {
          const data = res.data
          defaultOption.xAxis.data = data.cateData
          defaultOption.series[0].data = data.seriesData[0].data
          defaultOption.series[1].data = data.seriesData[1].data
          setOption((prev: any) => ({
            ...prev,
            xAxis: defaultOption.xAxis,
            series: defaultOption.series
          }))
        }
      })
    },[])

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>历年趋势</Text>
            </View>
            <BaseChart option={option} />
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 10,
    }
})

export default CurrentYearLineChart