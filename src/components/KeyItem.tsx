import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tailwind from 'tailwind-rn';
import { AuthContext, KeyType } from '../contexts/FirestoreContext';
import db from '@react-native-firebase/firestore';

interface KeyItemProps {
  yourKey: KeyType;
}

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

const KeyItem: React.FC<KeyItemProps> = ({ yourKey: key }) => {
  const [shown, setShown] = useState(false);
  const [willDelete, setWillDelete] = useState(false);
  const placeholder: string = '●'.repeat(key.data.password.length);

  return (
    <View
      style={[
        tailwind('flex mt-4 rounded bg-white mx-4 px-4 py-2'),
        styles.shadow,
      ]}>
      <Modal animationType="fade" transparent={true} visible={willDelete}>
        <ConfirmDelete setIsOpen={setWillDelete} yourKey={key} />
      </Modal>

      <View
        style={tailwind('absolute rounded-l inset-y-0 left-0 w-1 bg-blue-500')}
      />

      <View style={tailwind('flex flex-row items-center justify-between')}>
        <Text style={tailwind('font-bold text-lg')}>{key.data.name}</Text>
        <TouchableOpacity onPress={() => setWillDelete(!willDelete)}>
          <Svg
            style={tailwind('text-red-300 h-4 w-4')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </Svg>
        </TouchableOpacity>
      </View>
      <View style={tailwind('flex-row h-6 items-center')}>
        <Text style={tailwind('text-xs text-gray-500')}>
          Username / Email:{' '}
        </Text>
        <Text selectable numberOfLines={1} style={tailwind('flex-1')}>
          {key.data.email}
        </Text>
      </View>
      <View style={tailwind('flex-row h-6 items-center')}>
        <Text
          onPress={() => setShown(!shown)}
          style={tailwind('text-xs text-gray-500')}>
          Password:{' '}
        </Text>
        <Text selectable numberOfLines={1} style={tailwind('flex-1')}>
          {shown ? key.data.password : placeholder}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

export default KeyItem;
