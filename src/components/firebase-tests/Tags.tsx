import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

interface TagsProp {}

type TagProp = {
  id: string;
  data: FirebaseFirestoreTypes.DocumentData;
};

const Tags: React.FC<TagsProp> = () => {
  const [tags, setTags] = useState<Array<TagProp>>([]);

  useEffect(() => {
    const unsub = firestore()
      .collection('tags')
      .onSnapshot(snapshot => {
        setTags(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: { ...doc.data() },
          })),
        );
      });

    return unsub;
  }, []);

  return (
    <ScrollView style={tailwind('flex flex-1')}>
      {tags.map(tag => (
        <View
          key={tag.id}
          style={tailwind('mx-4 px-4 py-2 mt-4 bg-green-300 rounded')}>
          <Text selectable>{tag.data.url}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Tags;
