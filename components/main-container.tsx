import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { StyleSheet, Platform, View, StatusBar } from "react-native";
import { SearchText } from "./search-view";
import { ShowList } from "./show-list";
import { useState } from "react";

export const MainContainer:React.FC = () => {
  const theme = useContext(ThemeContext);
  const [query, setQuery] = useState("");
  const searchShows = (text:string) => {
    setQuery(text);
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
      color: theme.onBackground,
      paddingTop: Platform.OS === "android" ? 35 : 0,
      paddingBottom: Platform.OS === "android" ? 30 : 0,
    },
  });
  return (
    <View style={styles.container}>
      <SearchText onSearchPressed={searchShows} />
      <ShowList query={query}  />
      <StatusBar />
    </View>
  );
};
