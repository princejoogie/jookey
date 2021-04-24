import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import db from '@react-native-firebase/firestore';
import { AuthContext } from '@contexts/FirestoreContext';

interface AddKeyModalProps {
  setIsOpen(arg0: boolean): void;
}

type ValuesType = {
  name: string;
  email: string;
  password: string;
};

const AddKeyModal: React.FC<AddKeyModalProps> = ({ setIsOpen }) => {
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState<ValuesType>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (key: string, text: string) => {
    setValues(old => ({ ...old, [key]: text }));
  };

  const onSubmit = () => {
    console.log(values);
    if (user) {
      db()
        .collection('users')
        .doc(user.uid)
        .collection('keys')
        .add(values)
        .then(() => setIsOpen(false));
    }
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  return (
    <View style={tailwind('flex flex-row flex-1 items-center justify-center')}>
      <View
        onTouchStart={() => {
          setIsOpen(false);
        }}
        style={[StyleSheet.absoluteFill, styles.modal]}
      />
      <View style={tailwind('flex flex-1')}>
        <View
          style={tailwind('p-4 w-2/3 self-center bg-gray-100 z-30 rounded-md')}>
          <TextInput
            placeholder="Name of Account"
            onChangeText={text => handleChange('name', text)}
            style={[styles.input, tailwind('w-full bg-white px-4 py-2')]}
          />
          <TextInput
            placeholder="Email"
            onChangeText={text => handleChange('email', text)}
            style={[styles.input, tailwind('mt-2 w-full bg-white px-4 py-2')]}
          />
          <TextInput
            placeholder="Password"
            onChangeText={text => handleChange('password', text)}
            style={[styles.input, tailwind('mt-2 w-full bg-white px-4 py-2')]}
          />

          <View style={tailwind('mt-4 flex w-full flex-row')}>
            <TouchableOpacity
              onPress={onCancel}
              activeOpacity={0.7}
              style={tailwind(
                'px-4 py-2 flex flex-1 items-center justify-center rounded',
              )}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <View style={tailwind('w-4')} />

            <TouchableOpacity
              onPress={onSubmit}
              activeOpacity={0.7}
              style={tailwind(
                'px-4 py-2 flex flex-1 bg-green-500 items-center justify-center rounded',
              )}>
              <Text style={tailwind('text-white')}>Add</Text>
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
  input: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default AddKeyModal;
