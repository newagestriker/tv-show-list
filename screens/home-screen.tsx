import React, { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { StyleSheet, Platform, View, StatusBar } from "react-native";
import { SearchText } from "../components/search-view";
import { ShowList } from "../components/show-list";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export const HomeSceen: React.FC = (): JSX.Element => {
  const theme = useContext(ThemeContext);
  const [query, setQuery] = useState("");
  const searchShows = (text: string) => {
    setQuery(text);
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
      color: theme.onBackground,
    },
  });
  return (
    <View style={styles.container}>
      <SearchText onSearchPressed={searchShows} />
      {query && <ShowList query={query} />}
      <StatusBar />
    </View>
  );
};
