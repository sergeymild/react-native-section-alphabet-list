import * as React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ListLetterIndexProps } from "./types"
import { styles } from "./styles";
import {IData, ISectionData} from '../AlphabetList/types'

export const ListLetterIndex: React.FC<ListLetterIndexProps> = ({
  sectionData,
  onPressLetter,
  indexLetterStyle,
  indexLetterContainerStyle,
  renderCustomIndexLetter,
  letterIndexContainer
}) => {
  const onRenderCustomIndexLetter = ({ item, index }: { item: ISectionData<IData>, index: number }) => {
    const onPress = () => onPressLetter(index)

    if (renderCustomIndexLetter) {
      return renderCustomIndexLetter({
        item,
        index,
        onPress,
      });
    }

    return (
      <TouchableOpacity testID="indexItem" onPress={onPress}>
        <View testID="indexItem__title-container" style={[styles.letterIndexItem, indexLetterContainerStyle]}>
          <Text testID="indexItem__title" style={[styles.letterIndexLabel, indexLetterStyle]}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.letterIndexContainer, letterIndexContainer]}>
      <FlatList
        contentContainerStyle={styles.letterIndexList}
        data={sectionData}
        keyExtractor={(i) => i.title}
        renderItem={onRenderCustomIndexLetter}
      />
    </View>
  )
}
