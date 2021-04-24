import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import { AuthContext } from 'contexts/FirestoreContext';
import Home from './Home';
import { WIDTH } from '../constants';
import Landing from '@components/svgs/Landing';
import BgDrop from '@components/svgs/BgDrop';
import Svg, { Path } from 'react-native-svg';

interface LoginProps {
  navigation: any;
  route: any;
}

const Login: React.FC<LoginProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [hidden, setHidden] = useState(true);
  const { user } = useContext(AuthContext);

  const isValid = () => {
    if (!email || !password) {
      setError('One or more missing fields required.');
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const handleError = (err: Error) => {
    let msg = err.message.split(' ');
    msg.splice(0, 1);
    setError(msg.join(' '));
  };

  const login = () => {
    if (isValid()) {
      auth()
        .signInWithEmailAndPassword(email.trim(), password.trim())
        .then(() => {
          setEmail('');
          setPassword('');
        })
        .catch(handleError);
    }
  };

  const signup = () => {
    if (isValid()) {
      auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .then(res => {
          db().collection('users').doc(res.user.uid).collection('keys').add({
            name: 'Test',
            email: 'your@email.com',
            password: 'your_password',
          });
          console.log(res);
          setEmail('');
          setPassword('');
        })
        .catch(handleError);
    }
  };

  if (user) {
    return <Home navigation={navigation} route={route} />;
  }

  return (
    <View style={tailwind('flex flex-1 items-center justify-center')}>
      <Text style={tailwind('absolute top-8 text-2xl')}>Jookey</Text>

      <View style={tailwind('absolute top-24 z-10')}>
        <Landing width={WIDTH} />
      </View>
      <View style={tailwind('absolute bottom-0')}>
        <BgDrop width={WIDTH} />
      </View>

      {error !== '' && (
        <Text
          style={[
            tailwind(
              'bg-gray-100 py-2 px-4 mt-1 text-red-500 text-xs w-3/4 rounded text-center z-20',
            ),
            styles.input,
          ]}>
          {error}
        </Text>
      )}

      <TextInput
        onChangeText={text => {
          setEmail(text);
          setError('');
        }}
        style={[
          tailwind('mt-6 px-4 py-2 bg-white text-sm w-3/4 rounded z-20'),
          styles.input,
        ]}
        placeholder="Email"
        keyboardType="email-address"
      />

      <View
        style={[
          tailwind(
            'mt-4 px-4 bg-white w-3/4 flex flex-row items-center justify-center rounded z-20',
          ),
          styles.input,
        ]}>
        <TextInput
          onChangeText={text => {
            setPassword(text);
            setError('');
          }}
          style={tailwind('text-sm flex-1 py-2 ')}
          placeholder="Password"
          secureTextEntry={hidden}
        />

        <TouchableOpacity onPress={() => setHidden(!hidden)}>
          <Svg
            style={tailwind('text-gray-700 h-5 w-5')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            {hidden && (
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            )}
            {hidden && (
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            )}
            {!hidden && (
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            )}
          </Svg>
        </TouchableOpacity>
      </View>

      <View style={tailwind('w-full mt-4 z-20')}>
        <TouchableOpacity
          onPress={login}
          activeOpacity={0.7}
          style={tailwind(
            'px-4 py-2 bg-green-500 rounded flex items-center justify-center self-center w-1/2',
          )}>
          <Text style={tailwind('text-white')}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={tailwind('w-full mt-2 z-20')}>
        <TouchableOpacity
          onPress={signup}
          activeOpacity={0.7}
          style={tailwind(
            'px-4 py-2 bg-gray-300 rounded flex items-center justify-center self-center w-1/2',
          )}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Login;
