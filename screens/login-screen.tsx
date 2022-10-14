import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import {HomeSceen} from './home-screen';

import { useAuth} from '../hooks/use-auth';
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';

export function LoginScreen(): JSX.Element {
  const {userId, loading, setfetch} = useAuth();
  console.log(userId);

  return loading ? (
    <View
      style={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" />
    </View>
  ) : userId ? (
    <HomeSceen />
  ) : (
    <SafeAreaView>
      <Text>You are not authorized to view this page</Text>
    </SafeAreaView>
  );
}
