import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ImagePickerIOS } from 'react-native'
import { Header, Button, Link, Gap } from '../../components'
import {ILNullPhoto, IconAddPhoto, IconRemovePhoto} from '../../assets'
import { colors, fonts } from '../../utils'
import ImagePicker from 'react-native-image-picker'
import {showMessage} from 'react-native-flash-message'
import { Fire } from '../../config'

const UploadPhoto = ({navigation, route}) => {
    const {fullName, profession, uid} = route.params;
    const [photoForDB, setPhotoForDB] = useState('');
    const [hasPhoto, setHasPhoto] = useState(false);
    const [photo, setPhoto] = useState(ILNullPhoto);
    const getImage = () =>{
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
                    //poto untuk disimpan di firebase diubah menggnakan base64
                    //untuk meringkas pengetika menggunakan backtik `` dan JS ${}
                    //ketika sudah mendapat poto, disini akan diubah state nya setPhotoForDB
                    setPhotoForDB(`data:${response.type};base64, ${response.data}`);
                    
                    const source = {uri: response.uri};
                    setPhoto(source);
                    setHasPhoto(true);
            }
        });
    };

    const uploadAndContinue = () => {
             //database perlu di update untuk menambahkan root image
             Fire
             .database()
             .ref('users/' + uid + '/')
             .update({photo: photoForDB});

             const data = route.params;
             data.photo = photoForDB;

             //isi dari 'data' akan disimpan di local storage
             storeData('user', data);

             navigation.replace('MainApp') 
    } 
    return (
        <View style={styles.page}>
            <Header title="Upload Photo" />
            <View style={styles.content}>
                <View style={styles.profile}>
                    <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
                        <Image source={photo} style={styles.avatar} />
                        {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
                        {!hasPhoto && <IconAddPhoto style={styles.addPhoto} /> }
                    </TouchableOpacity>
                    <Text style={styles.name}>{fullName}</Text>
                    <Text style={styles.profession}>{profession}</Text>
                </View>
                <View>
                    <Button 
                    disable = {!hasPhoto}
                    title="Upload and Continue" 
                    onPress={uploadAndContinue}/>
                    <Gap height={30} />
                    <Link title="Skip for this" align="center" size={16} onPress={() => navigation.replace('MainApp') } />
                </View>
            </View>
        </View>
    )
}

export default UploadPhoto

const styles = StyleSheet.create({
    avatar: {width: 110,
            height: 110,
            borderRadius: 110/2,
        },

    profile:    {alignItems: 'center',
                flex: 1,
                justifyContent: 'center',},

    avatarWrapper:  {width: 130,
                    height:130,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius:130/2,
                    alignItems: 'center',
                    justifyContent: 'center',},

    page:   {backgroundColor: colors.white,
            flex:1,},

    addPhoto:   {position: 'absolute',
                bottom: 8,
                right: 6,},

    name:   {fontSize: 24,
            color: colors.text.primary,
            fontFamily: fonts.primary[600],
            textAlign: 'center',},

    profession: {fontSize: 18,
                fontFamily: fonts.primary.normal,
                textAlign:'center',
                color: colors.text.secondary,
                marginTop: 4,},

    content:    {paddingHorizontal: 40,
                flex:1,
                paddingBottom: 64,
                justifyContent: 'space-between',}
})
