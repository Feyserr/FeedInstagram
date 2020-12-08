import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList,Button , View, ScrollView, TextInput, TouchableOpacity, Text, Image} from 'react-native';
import axios from 'axios'
import LazyImage from '../../components/LazyImage';
import { AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { Container, Post, Header, Avatar, Name, Description, Loading } from './styles';

export default function Feed(props) {
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewable, setViewable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  const [btnClick, setBtnClick] = useState(false);
  const [myLikes, setMyLikes] = useState([]);
  const [users, setUsers] = useState([]);
  const MAX_LENGTH = 250;
  const userId = props.route.params.userId;
  const userName = props.route.params.userName;
  const userAvatar = props.route.params.userAvatar;

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    console.log(pageNumber);
    console.log(total);
    
    if (loading) return;

    setLoading(true);
    //http://localhost:3000/feed?_expand=author&_limit=4&_page=1
    //utilizar server.js no jsonserver
    //https://5fa103ace21bab0016dfd97e.mockapi.io/api/v1/feed?page=1&limit=4
    //utilizar o server2.js no www.mockapi.io
    axios
    .get(`https://5fc2a1819210060016869a4b.mockapi.io/posts`)
    .then(response => {
      const totalItems = response.headers["x-total-count"]
      const data = response.data
      //console.log(data)
      getLikes();
      getUsers();
      getComments();
      
      setTotal(Math.floor(totalItems / 4));
      setPage(pageNumber + 1);
      setFeed(shouldRefresh ? data : [...feed, ...data]);
    })
    .catch(err => {
      setError(err.message);
      setLoading(true)
    })
  }
  async function getLikes() {
    if (loading || !userId ) return;
    
    setLoading(true);
    
    axios
    .get(`https://5fc2a1819210060016869a4b.mockapi.io/likes`)
    .then(response => {
      const data = response.data
      console.log(data.filter((item) => {
        return item.id_user === userId;
     }));
      setMyLikes(data.filter((item) => {
        return item.id_user === userId;
     }));
      

    })
    .catch(err => {
      setError(err.message);
      setLoading(false)
    })
    .finally(()=>{setLoading(false)});
  }

  async function getComments() {
    if (loading || !userId) return;
    
    setLoading(true);
    
    axios
    .get(`https://5fc2a1819210060016869a4b.mockapi.io/comentarios`)
    .then(response => {
      const data = response.data;
      setComments(data);
      setLoading(false);

    })
    .catch(err => {
      setError(err.message);
      setLoading(false)
    })
  }

  async function getUsers() {
    
    setLoading(true);
    
    axios
    .get(`https://5fc2a1819210060016869a4b.mockapi.io/users`)
    .then(response => {
      const data = response.data;
      setUsers(data);
      setLoading(false);

    })
    .catch(err => {
      setError(err.message);
      setLoading(false)
    })
  }


  async function like(postId) {
    if (loading || !userId || !userName || !userAvatar) return;
    const undoLike = myLikes.filter((lk)=>{return lk.id_post===postId});
    setLoading(true);
    if(undoLike.length){
      axios
    .delete(`https://5fc2a1819210060016869a4b.mockapi.io/likes/${undoLike[0].id}`)
    .then(response => {
      console.log(response);
      setLoading(false);
      loadPage(1,true);
    })
    
    .catch(err => {
      setError(err.message);
      setLoading(true)
    })
    }else{

    axios
    .post(`https://5fc2a1819210060016869a4b.mockapi.io/likes`, {id_post:postId, id_user:userId, name:userName, avatar:userAvatar})
    .then(response => {
      console.log(response);
      setLoading(false);
      refreshList();
    })
    
    .catch(err => {
      setError(err.message);
      setLoading(true)
    })
  }
}
  async function comment(postId) {
    if (loading || !userId || !userName || !userAvatar) return;
    
    setLoading(true);
    
    axios
    .post(`https://5fc2a1819210060016869a4b.mockapi.io/comentarios`, {id_post:postId,id_user:userId, name:userName, comentarios:text})
    .then(response => {
      const data = response.data
      setLoading(false);
      refreshList();
    })
    .catch(err => {
      setError(err.message);
      setLoading(false)
    })
  }

  async function refreshList() {
    setRefreshing(true);
    
    await loadPage(1, true);

    setRefreshing(false);
  }




  useEffect(() => {
    loadPage()
  }, []);

 

  const renderItem = ({item}) => {
    let counter =0;
    return (
      <Post key = {item.id}>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
            </Header>

            <LazyImage
              aspectRatio={item.aspectRatio} 
              shouldLoad={viewable.includes(item.id)} 
              smallSource={{ uri: item.small }}
              source={{ uri: item.photo }}
            />
              
        <View style ={{flexDirection:'row'}}>
        
        <TouchableOpacity
            onPress ={()=>like(item.id)}
          > 
          <Image style={styles.heartIcon}source={myLikes.some((lk)=>{return lk.id_post===item.id})
            ? require("../../../assets/heart.png")
            : require("../../../assets/heart-outline.png")}/>

        </TouchableOpacity>

        <TouchableOpacity
        
            onPress={()=>{navigation.push("Comentarios", {post: item.id})}}>
 
          <Image style={styles.heartIcon} source={require("../../../assets/botao_comentario.png")}/>

        </TouchableOpacity>

        </View>
              
              {comments.map((cmt)=>{
                
                if(cmt.id_post===item.id && counter<2){
                  counter++;
                  const userData = users.filter((usr)=>{return usr.id === cmt.id_user})
                  return(
                    <View>
                        
                      <Description>
                          {userData.length?
                      <Name>{userData[0].name}:</Name>  

                      :<Text/>} 
                            <Text>
                                {cmt.comentarios}
                            </Text>
                  </Description>
              
                  </View>
                  );
                  
                }
              })}

            <TextInput
              multiline={true}
              onChangeText={(text) => setText(text)}
              placeholder={"Comentários"}
              style={[styles.text]}
              maxLength={MAX_LENGTH}
              />

        
        <Button
              title="Salvar"
              onPress={() => comment(item.id)}
              accessibilityLabel="Salvar">
            </Button>
              <View style ={{flexDirection:'row'}}>
           
           <TouchableOpacity
            style={styles.btn}
            onPress={()=>{navigation.push("Likes", {post: item.id})}}>

          <Text style={styles.btnName}>Curtidas</Text>

        </TouchableOpacity>
        
        
        </View>
            
      </Post>
    )
  }
  
  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  return (
    <Container>
      <FlatList
        key="list"
        data={feed}
        keyExtractor={(item, index)=> String(item.id + index)}
        renderItem={renderItem}
        ListFooterComponent={loading && <Loading />}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 10,
        }}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadPage()}
      />
    </Container>
  );
}

const styles = StyleSheet.create(
  {text: {
    fontSize: 30,
    lineHeight: 33,
    color: "#333333",
    padding: 16,
    paddingTop: 16,
    minHeight: 170,
    borderTopWidth: 1,
    borderColor: "rgba(212,211,211, 0.3)"


  },
  btnClick:{
    backgroundColor:"#FF6B6B",
    width:100,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:5
  },
  btn:{
    backgroundColor:"#35AAFF", 
    width:100,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:5, 
   
  },
  btnName:{
    alignItems: 'center',
    color:"#fff"

  },
  iconRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  heartIcon: {
    width: 20,
    height: 20,
    marginLeft:10
  }

})
