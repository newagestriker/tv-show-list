import {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';

export const useResources = (
  query: string,
): {resource: Array<any>; loading: boolean} => {
  const [resource, setResource] = useState([]);
  const [loading, setLoading] = useState(false);
  const netinfo = useNetInfo();
  useEffect(() => {
    if (query) {
      (async () => {
        setLoading(true);
        if (netinfo.isInternetReachable) {
          const response = await axios.get(
            `https://api.tvmaze.com/search/shows?q=${query}`,
            {
              headers: {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                Expires: '0',
              },
            },
          );
          setResource(response.data);
          await AsyncStorage.setItem(query, JSON.stringify(response.data));
        } else {
          try {
            const result = await AsyncStorage.getItem(query);
            setResource(JSON.parse(result || '[]'));
          } catch (e: any) {
            setResource([]);
          }
        }
        setLoading(false);
      })();
    } else {
      setResource([]);
    }
  }, [query]);

  return {resource, loading};
};
