import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feed from './src/pages/Feed';
import Login from './src/pages/Login';
import Cadastro from './src/pages/Cadastro';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LikeList from './src/pages/LikeList';
import Comments from './src/pages/Comments';

const Stack = createStackNavigator()

export default function App() {
  return (
    <View style={style.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Likes" component={LikeList} />
          <Stack.Screen name="Comentarios" component={Comments} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const style = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#fff' 
    }
  }
)


