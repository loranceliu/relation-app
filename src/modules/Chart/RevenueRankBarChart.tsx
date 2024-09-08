import { StyleSheet, Text, View } from "react-native";
import BaseChart from "../../components/chart/BaseChart";
import { useEffect, useState } from "react";
import { StatisticsApi } from "../../api/statistics";
import { useNavigation } from "@react-navigation/native";
import React from "react";

interface RankBarProps {
  title: string,
  type: number,
  color: string
}

const RevenueRankBarChart: React.FC<RankBarProps> = ({title ,type , color}) => {

    const  getDefaultOption = () => ({
      color: [
        color
      ],
      xAxis: {
        type: 'category',
        data: ['','', '', '', ''],
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
        top: '11%',
        left: '14%',
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
      },
      series: [
        {
          data: [0, 0, 0, 0, 0],
          type: 'bar',
          barWidth: 10
        }
      ]
    });
    const navigation = useNavigation()
    const [option,setOption] = useState(getDefaultOption());

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', async ()=> {
        StatisticsApi.getRelationUserProfitTop(type)
        .then((res) => {
          if(res.data.data != null) {
            const data = res.data
            const updatedOption = {
              ...option,
              xAxis: {
                ...option.xAxis,
                data: data.name, 
              },
              series:[{...option.series[0],data: data.data}]
            }
            setOption(updatedOption)
          }
       })
      })

    return unsubscribe
    },[navigation])

    return (
      <Component option={option} title={title} />
    )
}

type Props = {
  option: any
  title: string
}

const Component = React.memo((props: Props) => {

    return (
      <>
          <View style={styles.header}>
              <Text style={styles.headerTitle}>{props.title}</Text>
          </View>
          <BaseChart option={props.option} />
      </>
    )

},(pre: Props,next: Props) =>{
  return JSON.stringify(pre.option) == JSON.stringify(next.option)
})

const styles = StyleSheet.create({
    header: {
        height: 45,
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 10,
    }
})

export default RevenueRankBarChart