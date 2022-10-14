import AsyncStorage from '@react-native-community/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {CustomScreenProps} from './App';

export const ConnectionView = () => {
  const netInfo = useNetInfo();
  const {linkSpeed} = (netInfo.details as any) || {};
  const navigation = useNavigation<CustomScreenProps['navigation']>();
  const [user, setUser] = useState<string | null>();

  useLayoutEffect(() => {
    (async () => {
      const tempUser = await AsyncStorage.getItem('userId');
      setUser(tempUser);
    })();
  }, []);

  return (
    <View>
      {user && (
        <Button
          title="Logout"
          onPress={async () => {
            await AsyncStorage.removeItem('userId');
            setUser(null);
            navigation.reset({
              index: 0,
              routes: [{name: 'Logout'}],
            });
          }}
        />
      )}
      {!netInfo.isInternetReachable && (
        <Text>You don't seem to be connected to the internet :(</Text>
      )}
    </View>
  );
};
