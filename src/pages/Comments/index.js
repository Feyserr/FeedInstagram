import React, {useState, useEffect} from 'react'
import {View, StyleSheet, SafeAreaView, FlatList, Text} from 'react-native'
import PostListItem from './PostListItem'
import {Loading } from './styles';
import axios from 'axios';



const Comments = props => {
    const {onPressItem} = props
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]); 
    const post = props.route.params.post;

    async function getComments() {
        
        setLoading(true);
        axios
        .get(`https://5fc2a1819210060016869a4b.mockapi.io/comentarios`)
        .then(response => {
          const data = response.data.filter((dataItem)=>{
                return dataItem.id_post === post;
          });

          setComments(data);

         setError("Usuário ou Senha Inválidos");
        })
        .catch(err => {
          setError(err.message);
        })
        .finally(()=>{setLoading(false)});
    }
    useEffect(()=>{
        getComments();
    },[]);

    const renderItem = ({item}) => {
        return (
            <PostListItem 
                key={item.id} 
                comments={item}
            />
        )
    }

    const header= () => {
        return (
            <View style={style.headerStyle}>
                <Text style={style.titleStyle}>
                    Listagem de Comentários
                </Text>
            </View>
        )
    }

    if(loading){
        return(
            <Loading/>
        )
    }

    return (
        <View style={style.container}>
            <SafeAreaView>
                <FlatList
                    data={comments}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => {item.id + index}}
                    ListHeaderComponent={header}
                    stickyHeaderIndices={[0]}
                />
            </SafeAreaView>
        </View>
    )
}

const style = StyleSheet.create(
    {
        container: {
            backgroundColor: '#fff'
        },
        headerStyle: {
            flex: 1,
            height: 50,
            width: '100%',
            backgroundColor: "#00BFFF",
            justifyContent: "center",
            alignItems: 'center'
        },
        titleStyle: {
            color: '#000',
            fontSize: 20
        }
    }
)

export default Comments;