import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import AzureAuth from 'react-native-azure-auth';

import React, {useLayoutEffect, useState} from 'react';
import {HomeSceen} from './home-screen';
import AsyncStorage from '@react-native-community/async-storage';

export const LoginScreen = (): JSX.Element => {
  let stored_user_id = '';


  const [token, setToken] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const azureAuth = new AzureAuth({
    clientId: 'a53834ee-4ff1-48ed-a7fc-3a74fb091a72',
  });

  useLayoutEffect(() => {
    (async () => {
        stored_user_id = (await AsyncStorage.getItem('userId')) ?? '';
      if (stored_user_id) {
        setLoading(true);
        console.log('userId found:' + userId);
        try {
          let tokens = await azureAuth.auth.acquireTokenSilent({
            scope: 'openid profile User.Read',
            userId: stored_user_id,
          });
          if (tokens) {
            setToken(tokens.accessToken);
            setUserId(tokens.userId);
            await AsyncStorage.setItem('userId', tokens.userId);
          }
        } catch (error) {
          console.log(error);
        } finally {
        }
        setLoading(false);
      }
    })();
  }, []);

  return loading ? (
    <View
      style={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" />
    </View>
  ) : token ? (
    <HomeSceen />
  ) : (
    <SafeAreaView>
      <Button
        title="Sign In"
        onPress={async () => {
          setLoading(true);
          try {
            let tokens = await azureAuth.webAuth.authorize({
              scope: 'openid profile User.Read Mail.Read',
            });
            await setToken(tokens.accessToken);

            setUserId(tokens.userId);
            AsyncStorage.setItem('userId', tokens.userId);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }}
      />
    </SafeAreaView>
  );
};
