import React from 'react';
import {View,Text, Button, KeyboardAvoidingView, TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login(){
    const navigation = useNavigation();
    return(
        <KeyboardAvoidingView style={styles.background}>
        <View style={styles.containerLogo}>
            <Image
                style={styles.logo}
                source={require('../../../assets/Instagram-Logo.png')}
            />
            
        </View>

        <View>
            <TextInput
                style={styles.input}
                placeholder ="Email"
                autoCorrect={false}
                onChangeText={()=>{}}
            />

            <TextInput
                style={styles.input}
                placeholder ="Senha"
                autoCorrect={false}
                onChangeText={()=>{}}
                secureTextEntry={true}
            />
        </View>

        <View style={styles.buttonContainer}>
        
        <TouchableOpacity
          style={styles.btnSubmit}> 
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
    }
})