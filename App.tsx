import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from 'contexts/FirestoreContext';
import Login from '@pages/Login';
import tailwind from 'tailwind-rn';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaView style={tailwind('flex flex-1 bg-gray-100')}>
          <StatusBar backgroundColor="#F3F4F6" barStyle="dark-content" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
              {props => <Login {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
