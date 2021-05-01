import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import { AuthContext, KeyType } from '@contexts/FirestoreContext';
import db from '@react-native-firebase/firestore';

interface ConfirmDeleteProps {
  setIsOpen(arg0: boolean): void;
  yourKey: KeyType;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  setIsOpen,
  yourKey: key,
}) => {
  const { user } = useContext(AuthContext);

  const onDelete = () => {
    if (user) {
      db()
        .collection('users')
        .doc(user.uid)
        .collection('keys')
        .doc(key.id)
        .delete();
    }
  };

  return (
    <View
      style={tailwind('flex flex-row flex-1 px-6 items-center justify-center')}>
      <View
        onTouchStart={() => setIsOpen(false)}
        style={[StyleSheet.absoluteFill, styles.modal]}
      />
      <View style={tailwind('flex flex-1')}>
        <View
          style={tailwind(
            'p-2 pt-4 w-full self-center bg-gray-100 z-30 rounded-md',
          )}>
          <Text style={tailwind('self-center')}>
            Are you sure you want to delete {key.data.name}?
          </Text>

          <View
            style={tailwind(
              'mt-4 flex w-full flex-row border-t border-gray-300 pt-2',
            )}>
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              activeOpacity={0.7}
              style={tailwind(
                'px-4 py-2 flex flex-1 items-center justify-center rounded',
              )}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <View style={tailwind('w-4')} />

            <TouchableOpacity
              onPress={onDelete}
              activeOpacity={0.7}
              style={tailwind(
                'px-4 py-2 flex flex-1 bg-red-500 items-center justify-center rounded',
              )}>
              <Text style={tailwind('text-white')}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export default ConfirmDelete;
