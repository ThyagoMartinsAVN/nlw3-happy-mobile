import React ,{ useEffect, useState }from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import mapMarker from '../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import api from '../api';

interface Orphanage {
  id: number;
  name: String;
  latitude: number;
  longitude: number;
}


export default function OrphanagesMap(){
    
  const [orphanages, setOrphnages] = useState<Orphanage[]>([]);

    const navigation = useNavigation();

    useEffect(() => {
      api.get('orphanages').then(response => {
        setOrphnages(response.data);
      });
    });
    
    function handleNavigationOrphanageDetails(id: number) {
        navigation.navigate('OrphanageDetails', {id});
    }

    function handleNavigateToCreateOrphanage(){
      navigation.navigate('SelectMapPosition');
    }
    
    return(
        <View style={styles.container}>
      <MapView 
        style= {styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion= {{
          latitude: -14.4829683,
          longitude: -46.4929425,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
      
      {orphanages.map(orphanage => {
        return(
          <Marker
            key={orphanage.id} 
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
          >
            <Callout tooltip={true} onPress={() => handleNavigationOrphanageDetails(orphanage.id)}>
              <View style={styles.calloutContainer}>
          <Text style={styles.calloutText}>{ orphanage.name }</Text>
              </View>
            </Callout>
          </Marker>
        );
      })}

      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF"/>
        </RectButton>
      </View>
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255,255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
  
      elevation: 3,
    },
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
    },
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
    },
    footerText: {
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold'
    },
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  });