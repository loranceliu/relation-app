import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, Vibration, TextInput} from 'react-native';
import Template from '../../template/template';
import Icon from '../../utils/Icon/Icon';
import { TransactionType } from '../../constants/transcation-constant';
import { RelationApi } from '../../api/relation';
import * as RootNavigation from '../../utils/navigation-util';


import dayjs from 'dayjs';
import { Routes } from '../../constants/router-constant';
import { useRoute } from '@react-navigation/native';
import CommonModal from '../../components/modal/CommonModal';
import Toast from 'react-native-toast-message';
import SelectorFilter from '../../components/selector/SelectorFilter';

const TransactionScreen: React.FC = () => {

  const defaultApiParams :RelationApiParams = {
    page: 1,
    pageSize: 10,
    transactionType: TransactionType.INCOME
  }

  const [selectedElement, setSelectedElement] = useState<number>(TransactionType.INCOME)

  const [apiParams, setApiParmas] = useState<RelationApiParams>(defaultApiParams)

  const [totalPage, setTotalPage] = useState<number>(0)

  const [transcations, setTranscations] = useState<Transaction[]>([])

  const [refreshing, setRefreshing] = useState(false)

  const [downLoading, setDownLoding] = useState(false)

  const [visible, setVisible] = useState(false)

  const [transaction, setTransaction] = useState<Transaction>()

  const [isSearch, setSearch] = useState(false)
  
  const params = useRoute().params;

  useEffect(() => {
    if(params != undefined) {
      const {type} :any = params
      defaultApiParams.transactionType = type
      setSelectedElement(type)
      Toast.show({
        type: 'short',
        text1: '操作成功',
        position: 'bottom'
      })
    }
    setApiParmas(defaultApiParams)
    getRelation(defaultApiParams)
    .then((data: Transaction[]) => {
      setTranscations(data)
    })

  },[params])

  useEffect(() => {
    apiParams.page = 1
    getRelation(apiParams)
    .then(data => {
      setTranscations(data)
    })
  },[apiParams.relationUserId,apiParams.relationTypeId,apiParams.transactionType])
  


  const handlePress = (type: TransactionType) => {
    setSelectedElement(type)
    handleSelector("transactionType",type)
  }


  const getRelation = async (apiParams : RelationApiParams): Promise<Transaction[]>=> {
    const res = await RelationApi.getRelation(apiParams);
    setTotalPage(res.data.totalPage)
    if(res.data.data != null) {
      const newTranscations: Transaction[] = res.data.data.map((item: any) => ({
        ...item,
        date: dayjs(item.date).format('YYYY年MM月DD日'),
      }))
      
      return newTranscations
    }

    return []
  }

  const handleScrollUp = async () => {
    apiParams.page = defaultApiParams.page
    const data = await getRelation(apiParams)
    if(data.length > 0) {
      setTranscations(data)
      setRefreshing(false)
    }
  }

  const handleScrollDown = async() => {
    setDownLoding(true)
    if(apiParams.page < totalPage) {
      const newParams = { ...apiParams, page: apiParams.page + 1 };
      setApiParmas(newParams)
      const data = await getRelation(newParams)
      if(data.length > 0) {
        setTranscations(prevTransactions => [
          ...prevTransactions,
          ...data
        ]);    
      }
    }
    setDownLoding(false)
  }

  const handleLongPress = (item: Transaction) => {
    setVisible(true)
    setTransaction(item)
    Vibration.vibrate(30)
  }

  const handleNav = () => {
    setVisible(false)
    RootNavigation.navigate(Routes.TRANSCATION_MANAGE,transaction)
  }

  const handleDelete = async () => {
    const res : ResInfo = await RelationApi.deleteRelation({ids: [transaction?.relationId as number]})
    if(res.code == 200) {
      defaultApiParams.transactionType = selectedElement
      setApiParmas(defaultApiParams)
      getRelation(defaultApiParams)
      .then((data :Transaction[]) =>{
        setTranscations(data)
      })
      Toast.show({
        type: 'short',
        text1: '操作成功',
        position: 'bottom'
      })
      setVisible(false)
    }
  }

  const fetchPerson = async () => {
    const res = await RelationApi.getRelationUser({page: 1, pageSize: 1000});
    if(res.data.data != null) {
        const data = res.data.data as RelationUser[]
        const items : Item[] = data.map((item) => ({
            id: item.relationUserId,
            value: item.relationUserName
        }))
        return items
    }
    return []
  }

  const fetchCate = async() => {
    const res = await RelationApi.getRelationType();
    if(res.data != null) {
        const items : Item[] = res.data.map((item: any) => ({
            id: item.relationTypeId,
            value: item.relationTypeName
        }))
        return items
    }
    return []
  }

  const fetchType = async () => {
    const types : Item[] = [
      {id: TransactionType.INCOME, value: "入账"},
      {id: TransactionType.EXPEND, value: "出账"}
    ]

    return types
  }

  const handleSelector = (type: string, id: number) => {
    setApiParmas(prev => ({
        ...prev,
        [type]: id
    }))
  }

  const handleChange = (text: string) => {
    setApiParmas(prev => ({
        ...prev,
        remark: text
    }))
  }

  const handleSearch = async (apiParams: RelationApiParams) => {
      apiParams.page = 1
      const data = await getRelation(apiParams)
      setTranscations(data)
    }

  const handleClearFilter = () => {
    setSelectedElement(TransactionType.INCOME)
    setApiParmas(defaultApiParams)
  }

  const handleBack = () => {
    setSearch(false)
    handleClearFilter()
  }

  const renderItem = ({item , index}: { item: Transaction, index: number }) => {
    return (
      <TouchableOpacity key={`r${index}`} style={styles.contentItem} onLongPress={() => handleLongPress(item)}>
        <View style={styles.contentItemPartOne}>
          <Text style={styles.contentTextOne}>
            {item.transactionType === TransactionType.INCOME
            ? `${item.relationUserName}对我的入账`
            : `我对${item.relationUserName}的出账`}
          </Text>
          <Text style={styles.contentTextTwo}>{item.date}</Text>
        </View>
        <View style={styles.contentItemPartTwo}>
          <Text style={styles.contentTextOne}>{item.money}</Text>
          <Text style={styles.contentTextTwo}>{item.relationTypeName}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const controlIncomeOpacity = StyleSheet.compose(styles.controlOpacity,selectedElement === TransactionType.INCOME && styles.controlOpacityPress)
  const controlIncomeText = StyleSheet.compose(styles.controlText,selectedElement === TransactionType.INCOME && styles.controlTextPress)

  const controlExpendOpacity = StyleSheet.compose(styles.controlOpacity,selectedElement === TransactionType.EXPEND && styles.controlOpacityPress)
  const controlExpendText = StyleSheet.compose(styles.controlText,selectedElement === TransactionType.EXPEND && styles.controlTextPress)

  const ListHeader = !isSearch ? (

    <View style={styles.control}>
      <TouchableOpacity style={styles.touchOpacity} onPress={() => setSearch(true)}>
          <Icon name="search" color='black' size={24} />
      </TouchableOpacity>

      <TouchableOpacity 
          onPress={() => handlePress(TransactionType.INCOME)} 
          style={controlIncomeOpacity}
          activeOpacity={1}
      >
          <Text style={controlIncomeText}>入账</Text>
      </TouchableOpacity>

      <TouchableOpacity 
          onPress={() => handlePress(TransactionType.EXPEND)} 
          style={controlExpendOpacity}
          activeOpacity={1}
      >
          <Text style={controlExpendText}>出账</Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.touchOpacity} onPress={() => RootNavigation.navigate(Routes.TRANSCATION_MANAGE)}>
          <Icon name="add2" color='black' size={30} />
      </TouchableOpacity>
    </View>
  ) : (
    <>
      <View style={styles.control}>
        <TouchableOpacity style={styles.touchOpacity} onPress={() => handleBack()}>
            <Icon name="back" color='black' size={22} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Icon style={styles.searchIcon} name="search" size={22} color='black' />
          <TextInput 
            value={apiParams.remark}
            style={styles.searchInput} 
            placeholder='搜索' 
            placeholderTextColor="#b1b1b1" 
            onChange={(e) => handleChange(e.nativeEvent.text)} 
            onSubmitEditing={() => handleSearch(apiParams)}
            returnKeyType='search'
          />
        </View>
        <TouchableOpacity style={styles.touchOpacity} onPress={() => RootNavigation.navigate(Routes.TRANSCATION_MANAGE)}>
            <Icon name="add3" color='black' size={26} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row',marginHorizontal: 10,marginTop: 1,marginBottom: 8}}>
        <SelectorFilter 
          value={apiParams.relationUserId} 
          h={322}
          title='选择对象' 
          placeholder='对象' 
          fetchData={fetchPerson} 
          onSelect={(id) => handleSelector("relationUserId",id)} 
        />
        <SelectorFilter 
          value={apiParams.relationTypeId} 
          h={322}
          title='选择类目' placeholder='类目' 
          fetchData={fetchCate} 
          onSelect={(id) => handleSelector("relationTypeId",id)} 
        />
        <SelectorFilter 
          value={apiParams.transactionType} 
          title='选择类型' placeholder='类型' 
          fetchData={fetchType} 
          onSelect={(id) => handleSelector("transactionType",id)} 
        />
        {(apiParams.relationUserId !== undefined || apiParams.relationTypeId !== undefined) && 
        <TouchableOpacity style={styles.filterItem} onPress={() => handleClearFilter()}>
            <Text style={styles.clear}>清空</Text>
        </TouchableOpacity>
        }
      </View>
    </>
  )

  const ListFotter = () => {
    return (
      downLoading &&
      <View style={styles.loadMore}>
        <ActivityIndicator
            style={styles.indicator}
            size={"large"}
            color={Template.defaultColor}
            animating={true}
        />
        <Text style={styles.indicatorText}>正在加载更多</Text>
      </View>
    )
  }

  return (
    <View style={styles.root}>
        {ListHeader}
        <FlatList 
          data={transcations} 
          style={styles.content} 
          ListFooterComponent={ListFotter}
          renderItem={renderItem} 
          keyExtractor={(item, index) => `${item.relationId}-${index}`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleScrollUp} />
          }
          onEndReached={handleScrollDown}
          onEndReachedThreshold={0.1}
          scrollEventThrottle={16}
        />
        <CommonModal 
          isVisible={visible} 
          title='操作' 
          onClose={() => setVisible(false)}
          h={150}
        >
          <TouchableOpacity onPress={() => handleNav()} style={styles.operation}>
            <Text style={styles.operationText}>编辑</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operation} onPress={() => handleDelete()} >
            <Text style={[styles.operationText,styles.operationDanger]}>删除</Text>
          </TouchableOpacity>
        </CommonModal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
      height: '100%',
      width: '100%',
      backgroundColor: '#F2F4FA',
      paddingTop: 30
  },
  control: {
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  controlOpacity: {
      flex: 3,
      backgroundColor: '#DEDEDE',
      borderRadius: 15,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10
  },
  controlOpacityPress: {
      backgroundColor: Template.defaultColor,
  },
  controlTextPress: {
      color: '#ffffff'
  },
  controlText: {
      color: '#969697',
      fontWeight: 'bold'
  },
  add: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  search: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  content: {
    padding: 15,
    paddingTop: 0,
    marginBottom: 7
  },
  contentItem: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10
  },
  contentItemPartOne: {
    flex: 1,
    padding: 13,
    paddingLeft: 20,
  },
  contentItemPartTwo: {
    flex: 1,
    padding: 13,
    paddingRight: 20,
    alignItems: 'flex-end'
  },
  contentTextOne: {
    marginBottom: 3,
    color: 'black',
    fontSize: 15
  },
  contentTextTwo: {
    fontSize: 13,
    color: '#b1b1b1'
  },
  loadMore: {
    alignItems: "center",
    marginBottom: 10
  },
  indicator: {
    margin: 5
  },
  indicatorText: {
    color: '#b1b1b1'
  },
  operationText: {
    color: 'black',
    fontSize: 16
  },
  operationDanger: {
    color: 'red',
  },
  operation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchOpacity: {
    flex: 2,
    alignItems:'center'
  },
  searchContainer: {
    flex: 6,
    height: 37,
    backgroundColor:'#ffffff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems:'center'
  },
  searchInput: {
    flex: 8,
    color: 'black',
    paddingLeft: 50,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 16,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  searchIcon: {
    flex: 2,
    paddingLeft: 8
  },
  filterItem: {
    width: 35,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:"center",
    borderRadius: 20,
    backgroundColor:'#ffffff',
    height: 22,
    marginHorizontal: 2
  },
  clear: {
    color:'black'
  }
});

export default TransactionScreen;
