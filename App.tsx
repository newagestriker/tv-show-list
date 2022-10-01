import { HomeSceen } from './screens/home-screen';
import { defaultTheme, ThemeProvider } from './providers/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShowDetailsScreen } from './screens/show-details-screen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShowItem } from './components/show-list-item';
import { ConnectionView } from './ConnectionView';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Home: undefined;
  Details: ShowItem;
};
export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details',
  'Show'
>;
export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <ThemeProvider value={defaultTheme}>
      <NavigationContainer>
        <ConnectionView />
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeSceen}
            options={{ headerShown: Platform.OS === "ios", title: "Shows" }}
          />
          <Stack.Screen
            name="Details"
            component={ShowDetailsScreen}
            options={({ route }) => ({ headerShown: Platform.OS === "ios", title: route.params.name })}
          />
        </Stack.Navigator>
      </NavigationContainer>

    </ThemeProvider>
  );
}
