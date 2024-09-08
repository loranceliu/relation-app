import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, StatusBar, Image} from 'react-native';
import Icon from '../../utils/Icon/Icon';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import avatar from '../../assets/images/avatar.png'
import { useDispatch, useSelector } from 'react-redux';
import { SystemApi } from '../../api/system';
import { pullUserInfo } from '../../stores/redux-action';
import { Routes } from '../../constants/router-constant';
import GlobalHeader from '../../components/header/GlobalHeader';

const MineScreen: React.FC<NativeStackScreenProps<AppParamList, 'Mine'>> = (props) => {

  const {navigation} = props

  const dispatch = useDispatch();

  const {userInfo} = useSelector((store :any) => store.asyncReducer)

  useEffect(() =>{
    const unsubscribe = navigation.addListener('focus', async ()=> {
      const infoData = await SystemApi.getUserInfo();
      const data = infoData.data as UserInfo
      if(data != null) {
          dispatch(pullUserInfo(data))
      }
    })

    return unsubscribe
  },[navigation])

  const floatingLayer = StyleSheet.compose(styles.floatingLayer,{height : 200 - 43})

  return (
    <View style={styles.root}>

        <GlobalHeader />

        <View style={styles.floatingHeader}>
          <Text style={styles.floatingHeaderText}>我的</Text>
          <TouchableOpacity style={styles.floatingHeaderIcon} onPress={() => navigation.navigate(Routes.SETTING)}>
            <Icon name="setting" color='#ffffff' size={23} />
          </TouchableOpacity>
        </View>
        <View style={floatingLayer}>
          <View style={styles.floatingImageContent}>
            <View>
              <Image style={styles.avatar} source={avatar} />
            </View>

            <View>
              <Text style={styles.username}>{userInfo.name}</Text>
              <Text style={styles.userId}>ID:{userInfo.userId}</Text>
            </View>
          </View>

          <View style={styles.floatingTextContent}>
            <View style={styles.textContentItem}>
              <Text style={styles.textContentItemNum}>{userInfo.time}</Text>
              <Text style={styles.textContentItemText}>记账天数</Text>
            </View>

            <View style={styles.textContentItem}>
              <Text style={styles.textContentItemNum}>{userInfo.incomeNum}</Text>
              <Text style={styles.textContentItemText}>入账笔数</Text>
            </View>

            <View style={styles.textContentItem}>
              <Text style={styles.textContentItemNum}>{userInfo.expendNum}</Text>
              <Text style={styles.textContentItemText}>出账笔数</Text>
            </View>

            <View style={styles.textContentItem}>
              <Text style={styles.textContentItemNum}>{userInfo.revenue}</Text>
              <Text style={styles.textContentItemText}>净资产</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.contentItem} onPress={() => navigation.navigate(Routes.PERSONAL_INFO,userInfo)}>
            <Icon name="personInfo" size={25} color="black" />
            <Text style={styles.contentItemText}>个人资料</Text>
            <Icon style={styles.rightArrow} name="rightArrow" size={23} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentItem} onPress={() => navigation.navigate(Routes.PERSON)}>
            <Icon name="transactionMg" size={25} color="black" />
            <Text style={styles.contentItemText}>对象管理</Text>
            <Icon style={styles.rightArrow} name="rightArrow" size={23} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentItem} onPress={() => navigation.navigate(Routes.CATEGORY)}>
            <Icon name="cate" size={25} color="black" />
            <Text style={styles.contentItemText}>类目管理</Text>
            <Icon style={styles.rightArrow} name="rightArrow" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentItem} onPress={() => navigation.navigate(Routes.SECURITY)}>
            <Icon name="security" size={25} color="black" />
            <Text style={styles.contentItemText}>账号安全</Text>
            <Icon style={styles.rightArrow} name="rightArrow" size={23} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentItem}>
            <Icon name="feedback" size={25} color="black" />
            <Text style={styles.contentItemText}>意见反馈</Text>
            <Icon style={styles.rightArrow} name="rightArrow" size={23} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentItem}>
            <Icon name="about" size={25} color="black" />
            <Text style={styles.contentItemText}>关于往来</Text>
            <Icon style={styles.rightArrow} name="rightArrow" size={23} color="black" />
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%'
  },
  header: {
    marginBottom: 40,
    height: 200
  },
  content: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    gap: 15, 
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingTop: 18,
    paddingLeft: 18
  },
  contentItem: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center'
  },
  contentItemText: {
    fontSize: 15,
    color: 'black',
    marginLeft: 12
  },
  rightArrow: {
    position: 'absolute',
    right: 15
  },
  floatingLayer: {
    position: 'absolute',
    top: 75,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    zIndex: 1,
  },
  floatingHeader: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width:60,
    height:60,
    borderRadius:50,
    marginLeft: 15,
    marginRight: 15
  },
  username: {
    fontSize:16,
    fontWeight:'bold',
    color:'black'
  },
  userId: {
    fontSize: 12,
    marginTop: 3, 
    color: '#b1b1b1'
  },
  floatingImageContent: {
    flexDirection: 'row',
    height: "60%",
    alignItems: 'center'
  },
  floatingTextContent: {
    height: "30%",
    flexDirection: 'row',
    alignItems:'center'
  },
  textContentItem: {
    flex: 1,
  },
  textContentItemNum: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center' ,
  },
  textContentItemText: {
    fontSize: 12,
    textAlign: 'center' ,
    marginTop: 5,
    color: '#b1b1b1'
  },
  floatingHeaderText: {
    fontSize: 18,
    color: '#FFFFFF',
    flex: 1
  },
  floatingHeaderIcon: {
    color: '#FFFFFF',
    flex: 1,
    alignItems: 'flex-end'
  },
  floatingText: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default MineScreen;
