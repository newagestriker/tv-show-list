import AsyncStorage from '@react-native-community/async-storage';
import {useLayoutEffect, useState} from 'react';
import AzureAuth from 'react-native-azure-auth';
import {CLIENT_ID, SCOPE} from '@env';

export const useAuth = (onSuccess?: () => void, onFailure?: () => void) => {
  const [fetch, setfetch] = useState<{}>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<String | undefined>();

  const azureAuth = new AzureAuth({
    clientId: CLIENT_ID,
  });

  console.log('Reload', fetch);

  useLayoutEffect(() => {
    setLoading(true);

    (async () => {
      const stored_user_id = (await AsyncStorage.getItem('userId')) ?? '';
      if (stored_user_id) {
        try {
          let tokens = await azureAuth.auth.acquireTokenSilent({
            scope: SCOPE,
            userId: stored_user_id,
          });
          if (tokens) {
            setUserId(tokens.userId);
            await AsyncStorage.setItem('userId', tokens.userId);
            onSuccess?.();
          }
        } catch (error) {
          console.log(error);
          onFailure?.();
        } finally {
          setLoading(false);
        }
      } else {
        try {
          let tokens = await azureAuth.webAuth.authorize({
            scope: SCOPE,
          });
          setUserId(tokens.userId);
          await AsyncStorage.setItem('userId', tokens.userId);
          onSuccess?.();
        } catch (error) {
          console.log(error);
          onFailure?.();
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [fetch]);
  return {userId, loading, setfetch};
};
