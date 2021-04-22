import { SectionListData, SectionListProps, TextStyle, ViewStyle } from "react-native";

export interface IData {
  value: string;
  key: string;
}

export interface ISectionData<ItemT> {
  title: string;
  data: ItemT[];
  index?: number;
}
export interface IIndexLetterProps<ItemT> {
  item: ISectionData<ItemT>,
  index: number,
  onPress: () => void;
}

export interface AlphabetListProps<Item> extends Partial<SectionListProps<Item>> {
  data: Item[];
  index?: string[],
  style?: ViewStyle;
  indexLetterStyle?: TextStyle,
  indexLetterContainerStyle?: ViewStyle,
  letterIndexContainer?: ViewStyle,
  renderCustomItem?: (item: Item) => JSX.Element;
  renderCustomSectionHeader?: (section: SectionListData<Item>) => JSX.Element;
  renderCustomListHeader?: () => JSX.Element;
  renderCustomIndexLetter?: ({ item, index, onPress }: IIndexLetterProps) => JSX.Element;
  getItemHeight?: (sectionIndex: number, rowIndex: number) => number;
  sectionHeaderHeight?: number;
  listHeaderHeight?: number;
  uncategorizedAtTop?: boolean;
}
