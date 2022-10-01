import { TextInput, StyleSheet, View, Button } from 'react-native';
import React, { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';

export const SearchText = ({
  onSearchPressed,
}: {
  onSearchPressed: (text: string) => void;
}) => {
  const [text, onChangeText] = React.useState('');
  const theme = useContext(ThemeContext);
  const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.secondary,
      width: '98%',
      padding: 5,
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 5
    },
    text: {
      flex: 2,
      color: theme.onSecondary,
    },
  });
  return (
    <View style={style.container}>
      <TextInput
        clearButtonMode="while-editing"
        style={style.text}
        onChangeText={onChangeText}
        value={text}
        placeholder="Search for shows"
      />
      <Button
        title="Search"
        color={theme.background}
        onPress={() => onSearchPressed(text)}
      />
    </View>
  );
};
