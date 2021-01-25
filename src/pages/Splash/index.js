import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ILLogo } from '../../assets';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils';
import { Fire } from '../../config';

const Splash = ({navigation}) => {
  useEffect(() => {
            setTimeout(() =>{
                //fungsi session pada firebase
                //disini akan dicek apakah user masih login atau sudah logout
                Fire.auth()
                .onAuthStateChanged((user) => {
                    if(user){
                        //user lagi login
                        console.log('user: ', user);
                        navigation.replace('MainApp');
                    } else {
                        //user udah logout
                        navigation.replace('GetStarted');
                    }
                });
            },3000);
    }, [])
    return (
        <View style={styles.page}>
          <ILLogo />
          <Text style={styles.title}>
              My Doctor</Text>
            <Text style={styles.ams}>By Moch Setyadi</Text>
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({
    page: {backgroundColor: colors.white,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'},

    title: {fontSize: 20, 
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20},

    ams:    {fontSize: 20, 
        fontFamily: fonts.primary[700],
        color: colors.text.primary,
        marginTop: 25}
})
