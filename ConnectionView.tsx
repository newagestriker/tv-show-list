import {useNetInfo} from '@react-native-community/netinfo';
import React from 'react';
import {Text, View} from 'react-native';
export const ConnectionView = () => {
  const netInfo = useNetInfo();
  const {linkSpeed} = (netInfo.details as any) || {};
  return (
    <View>
      {!netInfo.isInternetReachable && (
        <Text>You don't seem to be connected to the internet :(</Text>
      )}
    </View>
  );
};
