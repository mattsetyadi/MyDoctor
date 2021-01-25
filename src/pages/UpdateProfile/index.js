import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {Header, Profile, Input, Button, Gap} from '../../components'
import { colors, getData, storeData } from '../../utils'
import {Fire} from '../../config'
import ImagePicker from 'react-native-image-picker'
import {ILNullPhoto} from '../../assets'
import { showMessage } from 'react-native-flash-message'

const UpdateProfile = ({navigation}) => {
    const [profile, setProfile] = useState({
        fullName:'',
        profession: '',
        email: '',
    })

    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(ILNullPhoto);
    const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photoForDB = res?.photo?.length > 1 ? res.photo : ILNullPhoto;
      const tempPhoto = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setPhoto(tempPhoto);
      setProfile(data);
    });
  }, []);

    const update = () => {
        console.log('profile: ', profile);
        

        console.log('new Password:', password);

        if(password.length > 0){
            if(password.length < 6){
                showMessage({
                    message: 'Password kurang dari 6 karakter',
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white,
                });
            } else {
                //update password
                updatePassword;
                updateProfileData;
                navigation.replace('MainApp');
            }
        } else {
            updateProfileData;
            navigation.replace('MainApp');
        }       
    };


    //khusus merubah password (fungsi)
    const updatePassword = () => {
        Fire.auth()
        .onAuthStateChanged(user => {
            if(user){
                //update password
                user.updatePassword(password)
                .catch(err => {
                    showMessage({
                        message: err.message,
                        type: 'default',
                        backgroundColor: colors.error,
                        color: colors.white,
                    })
                })
            } 
        })
    }


    //husus merubah profile (fungsi)
    const updateProfileData = () => {
        const data = profile;
        data.photo = photoForDB;
        Fire.database()
                .ref(`users/${profile.uid}/`)
                .update(data)
                .then(() => {
            console.log('success: ')
            storeData('user', data);
                }).catch(err => {
            showMessage({
                message: err.message,
                type: 'defaut',
                backgroundColor: colors.error,
                color: colors.white,
            })
        })
    }

    const changeText= (key, value) => {
        setProfile({
            ...profile,
            [key]: value,
        })
    }

    const getImage = () => {
          //fungsi option seperti quality, maxHeight, maxWidth untuk mengkompres kualitas dan ukuran foto
          ImagePicker.launchImageLibrary({quality: 0.5,maxWidth: 200, maxHeight: 200}, response => {
            console.log('response: ', response);
            if(response.didCancel || response.error) {
                showMessage({
                    message: 'oops, sepertinya anda tidak meilih foto nya?',
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white,  
                })
            } else {
                    console.log('response getImage: ', response)
                    const source = {uri: response.uri};
                    //poto untuk disimpan di firebase diubah menggnakan base64
                    //untuk meringkas pengetika menggunakan backtik `` dan JS ${}
                    //ketika sudah mendapat poto, disini akan diubah state nya setPhotoForDB
                    setPhotoForDB(`data:${response.type};base64, ${response.data}`);
                    
                    
                    setPhoto(source);
                    
            }
        });
    }

    return (
        <View style={styles.page}>
            <Header title="Edit Profile" onPress={() => navigation.goBack() } />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Profile isRemove photo={photo} onPress={getImage} />
                    <Gap height={26} />
                    <Input label="Full Name" value={profile.fullName} onChangeText={(value) => changeText('fullName', value)} />
                    <Gap height={24} />
                    <Input label="Pekerjaan" value={profile.profession} onChangeText={(value) => changeText('profession', value)} />
                    <Gap height={24} />
                    <Input label="Email" value={profile.email} disable />
                    <Gap height={24} />
                    <Input label="Password" secureTextEntry value={password} onChangeText={(value) => setPassword(value)} />
                    <Gap height={40} />
                    <Button title="Save Profile" onPress={update} />
                </View>
            </ScrollView>
        </View>
    )
}
//kasus disable pada email adalah contoh penggunaan lebih mudahnya
//pada input.js, mengubah true=disable

export default UpdateProfile

const styles = StyleSheet.create({
    page:   {
        backgroundColor: colors.white,
        flex:1,
    },

    content:    {
        padding: 40,
        paddingTop: 0,
    },
})
