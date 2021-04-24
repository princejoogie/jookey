import { WIDTH } from '../../constants';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import tailwind from 'tailwind-rn';

interface ExpandProps {}

const Expand: React.FC<ExpandProps> = () => {
  const pressed = useSharedValue(false);

  const width = useDerivedValue(() => {
    return pressed.value ? Math.random() * WIDTH - 20 : 100;
  });

  const styles = useAnimatedStyle(() => ({
    width: withSpring(width.value, { damping: 150, stiffness: 200 }),
  }));

  return (
    <View style={tailwind('flex flex-1 items-center justify-center')}>
      <Animated.View style={[styles, tailwind('h-10 bg-red-500')]} />

      <TouchableOpacity
        onPress={() => {
          pressed.value = !pressed.value;
        }}
        activeOpacity={0.7}
        style={tailwind('mt-10 px-4 py-2 bg-green-300 rounded')}>
        <Text>Expand</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Expand;
