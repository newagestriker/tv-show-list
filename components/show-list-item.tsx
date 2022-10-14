import {Image, View, Text, TouchableOpacity} from 'react-native';
import {CustomScreenProps} from '../App';
import {useNavigation} from '@react-navigation/native';

type ShowListItemProps = {
  item: ShowItem;
  style: any;
  imgStyle: any;
  textStyle: any;
};

export type ShowItem = {
  image?: {medium?: string};
  name?: string;
  language: string;
  genres: [];
  officialSite: string;
  rating: {average: number};
};

export const ShowListItem: React.FC<ShowListItemProps> = ({
  item,
  style,
  imgStyle,
  textStyle,
}: ShowListItemProps) => {
  const navigation = useNavigation<CustomScreenProps['navigation']>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
      <View style={style}>
        <Image
          source={{uri: item?.image?.medium}}
          style={imgStyle}
          resizeMode="cover"
        />
        <Text style={textStyle}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
