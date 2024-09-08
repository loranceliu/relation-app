import React, { useMemo } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import CurrentMonthLineChart from '../Chart/CurrentMonthLineChart';
import CurrentYearLineChart from '../Chart/CurrentYearLineChart';
import TotalTypePieChart from '../Chart/TotalTypePieChart';
import TotalMoneyPieChart from '../Chart/TotalMoneyPIeChart';

const AnalyseScreen: React.FC = () => {

  const cache = useMemo(() => {

    return (
      <View style={styles.content}>

        <View style={styles.contentItem}>
          <CurrentMonthLineChart />
        </View>

        <View style={styles.contentItem}>
          <CurrentYearLineChart />
        </View>

        <View style={styles.contentItem}>
          <TotalTypePieChart />
        </View>

        <View style={styles.contentItem}>
          <TotalMoneyPieChart />
        </View>

      </View>
    )
  },[])

  return (
      <ScrollView style={styles.root}>
        {cache}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 15,
    paddingTop: 40,
    backgroundColor: '#F2F4FA',
  },
  content: {
    gap: 15,
    height: 900
  },
  contentItem: {
    height: 200,
    backgroundColor: '#ffffff',
    borderRadius: 15,
  } 
});

export default AnalyseScreen;
