import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tailwind from 'tailwind-rn';
import auth from '@react-native-firebase/auth';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <View
      style={[
        tailwind(
          'flex flex-row items-center justify-between bg-white p-4 z-10',
        ),
        styles.nav,
      ]}>
      <TouchableOpacity>
        <Svg
          style={tailwind('text-gray-700 h-6 w-6')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h7"
          />
        </Svg>
      </TouchableOpacity>

      <Text style={tailwind('text-lg')}>Jookey</Text>

      <TouchableOpacity onPress={async () => await auth().signOut()}>
        <Svg
          style={tailwind('text-gray-700 h-6 w-6')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default Navbar;
