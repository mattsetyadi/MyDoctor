import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { colors, fonts } from '../../../utils'
import { Button } from '../../atoms'

const InputChat = () => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Tulis pesan untuk Nairobi" />
            <Button type="btn-icon-send"/>
        </View>
    )
}

export default InputChat

const styles = StyleSheet.create({
    input:      {
                    backgroundColor: colors.disable,
                    padding: 14,
                    borderRadius: 10,
                    flex:1,
                    marginRight: 10,
                    fontSize:14,
                    fontFamily: fonts.primary.normal,
                    maxHeight: 45,
                },

    container:  {
                    padding: 16,
                    flexDirection:'row',
                },
})
