import React, { useContext, useState } from 'react';
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import tailwind from 'tailwind-rn';
import Svg, { Path } from 'react-native-svg';
import { AuthContext } from '@contexts/FirestoreContext';
import Navbar from '@components/Navbar';
import KeyItem from '@components/KeyItem';
import AddKeyModal from 'components/modals/AddKeyModal';

interface HomeProps {
  navigation: any;
  route: any;
}

const Home: React.FC<HomeProps> = () => {
  const { keys } = useContext(AuthContext);
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <View style={tailwind('flex flex-1')}>
      <View style={tailwind('flex flex-1 z-10')}>
        <StatusBar backgroundColor="#ffffff" />

        {/* FAB */}
        <TouchableOpacity
          onPress={() => {
            setAddModalOpen(!addModalOpen);
          }}
          activeOpacity={0.7}
          style={[
            tailwind(
              'absolute bottom-4 right-4 p-2 rounded-full bg-blue-500 z-50',
            ),
            styles.shadow,
          ]}>
          <Svg
            style={tailwind('text-gray-200 h-8 w-8')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </Svg>
        </TouchableOpacity>

        <Navbar />

        <ScrollView>
          {keys.map(key => (
            <KeyItem yourKey={key} key={key.id} />
          ))}

          <View style={tailwind('w-full h-20')} />
        </ScrollView>
      </View>

      <Modal animationType="fade" transparent={true} visible={addModalOpen}>
        <AddKeyModal setIsOpen={setAddModalOpen} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default Home;
