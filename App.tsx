import {MainContainer} from './components/main-container';
import {defaultTheme, ThemeProvider} from './providers/ThemeProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ShowDetails} from './components/show-details';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ShowItem} from './components/show-list-item';
import {ConnectionView} from './ConnectionView';

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
            component={MainContainer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Details"
            component={ShowDetails}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
