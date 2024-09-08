import { SVGRenderer, SkiaChart, SvgChart } from "@wuba/react-native-echarts";
import * as echarts from "echarts/core";
import { BarChart, LineChart, PieChart} from "echarts/charts";
import { GridComponent, TitleComponent, TooltipComponent } from "echarts/components";
import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet,View } from "react-native";

echarts.use([SVGRenderer,BarChart,PieChart,TitleComponent,LineChart,GridComponent,TooltipComponent]);

interface BaseChartProps {
    option: any
}

const BaseChart: React.FC<BaseChartProps> = ({option}) => {

    const chartRef = useRef<any>(null);
    const skiaRef = useRef<any>(null);

    const [chartWidth, setChartWidth] = useState<number>(0);
    const [chartHeight, setChartHeight] = useState<number>(0);
  
    useEffect(() => {
        const dimensions = Dimensions.addEventListener("change", handleDimensionsChange);
      return () => {
        dimensions.remove()
      };
    }, []);

    useEffect(() => {

        let chart: any;
        
        if (skiaRef.current) {
            chart = echarts.init(skiaRef.current,'light', {
                renderer: 'svg',
                width: chartWidth,
                height: chartHeight,
            });
            chart.setOption(option);
            chartRef.current = chart
        }
        return () => chart?.dispose();
    }, [option]);

    useEffect(() => {
        chartRef.current.resize({
          width: chartWidth,
          height: chartHeight,
        });
    }, [chartWidth, chartHeight])

    const handleLayout = (e: any) => {
        const { width, height } = e.nativeEvent.layout;
        setChartWidth(width);
        setChartHeight(height);
    };

    const handleDimensionsChange = (e: any) => {
        // const { width, height } = e.screen;
        // setChartWidth(width);
        // setChartHeight(height);
    };


    return (
        <View style={styles.container} onLayout={handleLayout}>
            <SvgChart ref={skiaRef} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default BaseChart