import React , {useState}from 'react';
import {View,Text, Button, KeyboardAvoidingView, TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Loading } from './styles';
import axios from 'axios';


export default function Login(){
    const navigation = useNavigation();
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    
    
    async function login() {
        if (loading || !email || !password) return;
        
        setLoading(true);
        
        axios
        .get(`https://5fc2a1819210060016869a4b.mockapi.io/users`)
        .then(response => {
          const data = response.data
          console.log(data)
          setLoading(false)
         
          data.forEach((item) => {
            if(item.email === email && item.password === password) {
               navigation.push("Feed", {userId: item.id, userName:item.name, userAvatar:item.avatar});
           }
         });

         setError("Usuário ou Senha Inválidos")
        })
        .catch(err => {
          setError(err.message);
          setLoading(false)
        })
      }
   
      return(
        <KeyboardAvoidingView style={styles.background}>
        <View style={styles.containerLogo}>
            <Image
                style={styles.logo}
                source={require('../../../assets/Instagram-Logo.png')}
            />
            
        </View>
        {loading ?
        <View>
            <Loading />
        </View>
        :
        <>

        <View>
        {error ? (
            <Text style={styles.msgError}>
                {error}
            </Text>
            
            ):<Text/>}

            <TextInput
                style={styles.input}
                placeholder ="Email"
                autoCorrect={false}
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                style={styles.input}
                placeholder ="Senha"
                autoCorrect={false}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />
        </View>

        <View style={styles.buttonContainer}>
        
        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={login}>

          <Text style={styles.submitText}>Entrar</Text>

        </TouchableOpacity>
    </View>
        
        
        <View style={styles.buttonContainer}>
        
        <TouchableOpacity
          style={styles.btnSubmit}
          onPress ={()=>navigation.push('Cadastro')}
          > 
          <Text style={styles.submitText}>Cadastro</Text>

        </TouchableOpacity>
    </View>
    </>}

        </KeyboardAvoidingView>

    );
}
const styles = StyleSheet.create({
    background:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        

    },
    containerLogo:{
        
        
        
    },
    
    logo:{
        width:200,
        height:65,
    },
    input:{
        width:300,
        height:50,
        marginTop:5,
        backgroundColor:'#D3D3D3',
        marginBottom:5,
        borderRadius:8,
        padding:11
    },
    buttonContainer:{
        marginTop:8,
        marginBottom:2
    },
    btnSubmit:{
        backgroundColor:'#35AAFF',
        width:300,
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8
    },
    submitText:{
        color:'#FFF',
        fontSize:18
    },
    msgError:{
        color:'red'
    }
})