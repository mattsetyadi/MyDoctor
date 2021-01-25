import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { ILNullPhoto } from '../../../assets'
import { colors, fonts, getData } from '../../../utils'

const HomeProfile = ({onPress}) => {
    const [profile, setProfile] = useState({
        photo: ILNullPhoto,
        fullName:  '',
        profession: '',
    });
    useEffect(() => {
        getData('user').then(res=> {
           // console.log('data user: ', res);
            const data = res;
            //fungsi dibawah untuk memaksa data base64 string menjadi objek uri kembali agar dapat menampilkan foto
            data.photo = {uri: res.photo}
            setProfile(res);
        });
    }, []);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={profile.photo} style={styles.avatar} />
            <View >
                <Text style={styles.name}>{profile.fullName}</Text>
                <Text style={styles.profession}>{profile.profession}</Text>
            </View>
            
        </TouchableOpacity>
    )
}

export default HomeProfile

const styles = StyleSheet.create({
    container:  {flexDirection: 'row',
                },
    
    avatar:     {height: 46,
                width: 46,
                borderRadius: 46/2,
                marginRight: 12,},

    name:       {fontSize: 16,
                fontFamily: fonts.primary[600],
                color: colors.text.primary,
                textTransform: 'capitalize',
            },

    profession: {fontSize: 12,
                fontFamily: fonts.primary[400],
                color: colors.text.secondary,
                textTransform: 'capitalize',
            }
})
