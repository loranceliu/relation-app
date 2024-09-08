import { useEffect, useState } from "react";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native"
import Svg, { Path } from "react-native-svg"
import Template from "../../template/template";

const GlobalHeader: React.FC = () => {

    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    
    useEffect(() => {
        const dimensions = Dimensions.addEventListener("change", handleDimensionsChange);
      return () => {
        dimensions.remove()
      };
    }, []);
  
    const handleLayout = (e: any) => {
      const { width, height } = e.nativeEvent.layout;
      setWidth(width);
      setHeight(height);
    };
  
    const handleDimensionsChange = (e: any) => {
      const { width, height } = e.screen;
      setWidth(width);
      setHeight(height);
    };

    return (
        <View 
          style={styles.header}
          onLayout = {handleLayout}
        >
        <StatusBar 
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
          <Svg>
            <Path 
                d={`M0 0 L${width} 0 L${width} ${height - 16} Q${height-6} ${height} 0 ${height - 16} Z`}
                fill={Template.defaultColor}
                stroke={Template.defaultColor}
                strokeWidth="2" 
            />
          </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 46,
        height: 200
    },
})

export default GlobalHeader