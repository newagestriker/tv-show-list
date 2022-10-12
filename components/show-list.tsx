import React, {useContext} from 'react';
import {
  VirtualizedList,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {ThemeContext} from '../providers/ThemeProvider';
import {ShowListItem} from './show-list-item';
import {useResources} from '../useResources';

type ShowListProp = {query: string};

export const ShowList = ({query}: ShowListProp) => {
  const theme = useContext(ThemeContext);
  const {resource: showList, loading} = useResources(query);
  const style = StyleSheet.create({
    container: {
      width: '100%',
      marginTop: 2.5,
      flex: 1,
      flexGrow: 1,
    },
    listItem: {
      flexDirection: 'row',
      backgroundColor: theme.primary,
      color: theme.onPrimary,
      alignItems: 'center',
      margin: 2.5,
      borderRadius: 5,
    },
    listItemImage: {
      height: 100,
      width: 100,
      overflow: 'hidden',
      borderRadius: 50,
      margin: 5,
    },
    listItemText: {
      flex: 1,
      color: theme.onPrimary,
      marginStart: 5,
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

  const getItem = (data: Array<any>, index: number) => data[index];
  return (
    <KeyboardAvoidingView style={style.container}>
      {loading ? (
        <View
          style={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : showList.length > 0 ? (
        <VirtualizedList
          data={showList}
          keyExtractor={item => item.show?.id}
          getItemCount={() => showList.length}
          getItem={getItem}
          renderItem={({item}) => (
            <ShowListItem
              item={item.show}
              style={style.listItem}
              imgStyle={style.listItemImage}
              textStyle={style.listItemText}
            />
          )}
        />
      ) : query ? (
        <View
          style={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <Text>No Shows Found</Text>
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
};
