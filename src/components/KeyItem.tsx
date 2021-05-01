import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tailwind from 'tailwind-rn';
import { KeyType } from '@contexts/FirestoreContext';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { WIDTH } from '../constants';
import ConfirmDelete from './modals/ConfirmDeleteModal';

interface KeyItemProps {
  yourKey: KeyType;
}

const KeyItem: React.FC<KeyItemProps> = ({ yourKey: key }) => {
  const [shown, setShown] = useState(false);
  const [willDelete, setWillDelete] = useState(false);
  const placeholder: string = '●'.repeat(key.data.password.length);
  const accent = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  // reanimated
  const x = useSharedValue(0);
  const color = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      if (event.translationX < 0) {
        x.value = ctx.startX + event.translationX;
        color.value = event.translationX;
      }
    },
    onEnd: event => {
      x.value = withSpring(0, { damping: 200, stiffness: 250 });
      color.value = withTiming(0);
      if (event.translationX < (WIDTH / 2) * -1) {
        runOnJS(setWillDelete)(true);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    const translateX = x.value;
    return {
      transform: [{ translateX }],
    };
  });

  const optionStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      x.value,
      [0, -WIDTH],
      [WIDTH + WIDTH * 0.5, 0],
    );
    const backgroundColor = interpolateColor(
      color.value,
      [0, -WIDTH],
      ['#FEF2F2', '#EF4444'],
    );

    return {
      width: WIDTH,
      backgroundColor,
      transform: [{ translateX }],
    };
  });

  return (
    <View style={tailwind('flex mt-4 px-4 flex-1')}>
      <Animated.View
        style={[
          tailwind(
            'absolute inset-y-4 right-0 flex flex-row items-center pl-4 rounded-full',
          ),
          optionStyle,
        ]}>
        <Svg
          style={tailwind('text-white h-6 w-6')}
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

        <Text style={tailwind('text-white ml-2')}>Release to Delete</Text>
      </Animated.View>

      <PanGestureHandler
        onGestureEvent={gestureHandler}
        minDist={10}
        failOffsetY={[-10, 10]}>
        <Animated.View
          style={[
            tailwind('flex rounded bg-white  px-4 py-2'),
            styles.shadow,
            cardStyle,
          ]}>
          <Modal animationType="fade" transparent={true} visible={willDelete}>
            <ConfirmDelete setIsOpen={setWillDelete} yourKey={key} />
          </Modal>

          <View
            style={[
              tailwind('absolute rounded-l inset-y-0 left-0 w-1'),
              { backgroundColor: accent },
            ]}
          />

          <View style={tailwind('flex flex-row items-center justify-between')}>
            <Text style={tailwind('font-bold text-lg')}>{key.data.name}</Text>
            <TouchableOpacity>
              <Svg
                style={tailwind('text-gray-400 h-4 w-4')}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
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
        </Animated.View>
      </PanGestureHandler>
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
