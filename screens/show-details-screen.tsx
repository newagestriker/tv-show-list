import {useContext} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  SafeAreaView
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {DetailsScreenProps} from '../App';
import {ThemeContext} from '../providers/ThemeProvider';

export const ShowDetailsScreen : React.FC<DetailsScreenProps> = ({route}: DetailsScreenProps) : JSX.Element=> {
  const theme = useContext(ThemeContext);
  const {image, name, language, genres, officialSite, rating} =
    route?.params || {};
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
      padding: 5,
    },
    img: {
      height: 300,
      width: 300,
    },
    details: {
      margin: 10,
      backgroundColor: theme.secondary,
      borderRadius: 5,
      width: '98%',
      padding: 10,
    },
    title: {
      fontSize: 30,
      alignSelf: 'center',
      fontWeight: 'bold',
      color: theme.onSecondary,
      padding: 5,
    },
    language: {
      padding: 5,
      fontSize: 18,
    },
    genres: {
      padding: 5,
      fontSize: 15,
      alignSelf: 'flex-end',
    },
    officialSite: {
      fontStyle: 'italic',
      textDecorationLine: 'underline',
      padding: 5,
      fontSize: 18,
      color: theme.onSecondary,
    },
  });
  return (
    <SafeAreaView style={style.container}>
      <Image
        style={style.img}
        source={{uri: image?.medium}}
        resizeMode="contain"
      />
      <View style={style.details}>
        <Text style={style.title}>{name}</Text>
        {genres && genres.length > 0 && (
          <Text style={style.genres}>~{genres.join(', ')}.</Text>
        )}
        {language && <Text style={style.language}>{language}</Text>}
        {officialSite && (
          <TouchableOpacity onPress={() => Linking.openURL(officialSite)}>
            <Text style={style.officialSite}>Official Site</Text>
          </TouchableOpacity>
        )}
        {rating.average && (
          <AirbnbRating
            defaultRating={Math.round(rating.average / 2)}
            count={5}
            size={20}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
