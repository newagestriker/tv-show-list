import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomScreenProps} from '../App';
export const LogoutScreen = (): JSX.Element => {
  const navigation = useNavigation<CustomScreenProps['navigation']>();
  return (
    <SafeAreaView>
      <Text>You have successfully logged out!!</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("Login");
          
        }}
      />
    </SafeAreaView>
  );
};
