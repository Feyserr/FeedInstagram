import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'


const PostListItem = props => {
    const {comments} = props
    return(
        
            <View style={style.line}>
    <Text style={style.lineText} key={comments.id}>
        {comments.name }
    </Text>

                
                <Text style={style.lineText} key={comments.id}>
                    {comments.comentarios}
                </Text>
            </View>
    
    )

}

const style = StyleSheet.create({
        line: {
            height:60,
            borderBottomWidth: 1,
            borderBottomColor: '#bbb',
            alignItems: 'center',
            flexDirection: 'row'
        },
        avatar: {
            aspectRatio: 1,
            marginLeft: 10,
            flex: 1,
            borderRadius: 50
        },
        lineText: {
            fontSize: 20,
            paddingLeft: 20,
            flex: 7
        }
    }
)
export default PostListItem













