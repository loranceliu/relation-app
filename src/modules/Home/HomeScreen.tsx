import React, { useMemo } from 'react';
import {View, StyleSheet, StatusBar, ScrollView} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TotalPieChart from '../Chart/TotalPieChart';
import GlobalHeader from '../../components/header/GlobalHeader';
import RevenueRankBarChart from '../Chart/RevenueRankBarChart';

const HomeScreen: React.FC<NativeStackScreenProps<AppParamList, 'Home'>> = () => {

  return (
    <ScrollView style={styles.root}>
        <StatusBar 
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />

        <GlobalHeader />

        <View style={styles.header}>
            <TotalPieChart /> 
        </View>


        <View style={styles.content}>
          <View style={styles.contentItem}>
            <RevenueRankBarChart title='收益排行' type={1} color='#83F3C6' />
          </View>
          <View style={styles.contentItem}>
            <RevenueRankBarChart title='亏损排行' type={2} color='#ED4AA4' />
          </View>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%'
  },
  header: {
    height: 180,
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
  },
  content: {
    marginLeft: 20,
    marginRight: 20,
    gap: 15 
  },
  contentItem: {
    height: 240,
    backgroundColor: '#ffffff',
    borderRadius: 15,
  }
});

export default HomeScreen;
