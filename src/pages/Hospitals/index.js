import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import {ILHospitalBG, DummyHospital1, DummyHospital2, DummyHospital3, } from '../../assets'
import {fonts, colors} from '../../utils'
import ListHospital from '../../components/molecules/ListHospital'

const Hospitals = () => {
    return (
        <View style={styles.page}>
            <ImageBackground source={ILHospitalBG} style={styles.background} >
                <Text style={styles.title}>Nearby Hospitals</Text>
                <Text  style={styles.desc}>3 tersedia</Text>
            </ImageBackground>

            <View style={styles.content}>
                <ListHospital type="Rumah Sakit" name="Citra Bunga Merdeka" address="Jln. Surya Sejahtera 20" pic={DummyHospital1} />
                <ListHospital type="Rumah Sakit Anak" name="Happy Family Kids" address="Jln. Surya Sejahtera 20" pic={DummyHospital2} />
                <ListHospital type="Rumah Sakit Jiwa" name="Tingkatan Paling Atas" address="Jln. Surya Sejahtera 20" pic={DummyHospital3} />
            </View>

        </View>
    )
}

export default Hospitals

const styles = StyleSheet.create({
    background:     {
                        height: 240,
                        paddingTop:30,
                    },

    page:           {
                        backgroundColor: colors.secondary,
                        flex:1,
                    },

    content:        {
                        backgroundColor: colors.white,
                        borderRadius: 20,
                        marginTop:-30,
                        flex: 1,
                        paddingTop: 14,
                    },

    title:          {
                        fontSize: 20,
                        fontFamily: fonts.primary[600],
                        color: colors.white,
                        textAlign:'center',
                    },

    desc:           {
                        fontSize: 14,
                        fontFamily: fonts.primary[300],
                        color: colors.white, 
                        marginTop: 6,
                        textAlign: 'center',
                    },
})
