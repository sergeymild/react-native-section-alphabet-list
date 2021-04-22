import * as React from "react";
import {useEffect, useState, useRef, PureComponent} from 'react'
import { SectionList, View, Text, SectionListData } from "react-native";
import sectionListGetItemLayout from "react-native-section-list-get-item-layout";
import { getSectionData } from "../../utils/getSectionData";
import { ListLetterIndex } from "../ListLetterIndex";
import { IData, ISectionData, AlphabetListProps } from "./types";
import { styles } from "./styles";
import { sizes } from "../../values/sizes";
import { DEFAULT_CHAR_INDEX } from "../../values/consts"

interface State<ItemT> {
  sectionData: ISectionData<ItemT>[]
}

export class AlphabetList<ItemT extends IData> extends React.PureComponent<AlphabetListProps<ItemT>, State<ItemT>> {
  sectionListRef = React.createRef<SectionList>()

  constructor(props: AlphabetListProps<ItemT>) {
    super(props);
    const sectionData = getSectionData(this.props.data, this.props.index ?? DEFAULT_CHAR_INDEX, this.props.uncategorizedAtTop)
    this.state = {sectionData}
  }

  onScrollToSection = (sectionIndex: number) => {
    const sectionList = this.sectionListRef.current! as SectionList;
    if (!sectionList) return

    sectionList.scrollToLocation({
      sectionIndex,
      itemIndex: 0,
    });
  }

  componentWillReceiveProps(nextProps: Readonly<AlphabetListProps<ItemT>>, nextContext: any) {
    const sectionData = getSectionData(nextProps.data, nextProps.index ?? DEFAULT_CHAR_INDEX, nextProps.uncategorizedAtTop)
    this.setState({sectionData})
  }

  onGetItemLayout: any = sectionListGetItemLayout({
    getItemHeight: (_rowData, sectionIndex: number, rowIndex: number) => {
      return this.props.getItemHeight?.(sectionIndex, rowIndex) ?? sizes.itemHeight
    },
    getSectionHeaderHeight: () => this.props.sectionHeaderHeight ?? sizes.itemHeight,
    getSectionFooterHeight: () => 0,
    listHeaderHeight: this.props.listHeaderHeight ?? sizes.listHeaderHeight,
  });

  onRenderSectionHeader = ({ section }: { section: SectionListData<ItemT> }) => {
    if (this.props.renderCustomSectionHeader) return this.props.renderCustomSectionHeader(section);

    return (
      <View testID="header" style={styles.sectionHeaderContainer}>
        <Text testID="header__label" style={styles.sectionHeaderLabel}>{section.title}</Text>
      </View>
    );
  };

  onRenderItem = ({ item }: { item: ItemT }) => {
    if (this.props.renderCustomItem) return this.props.renderCustomItem(item);

    return (
      <View testID="cell" style={styles.listItemContainer}>
        <Text testID="cell__label" style={styles.listItemLabel}>{item.value}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <SectionList<ItemT>
          {...this.props}
          accessibilityLabel="sectionList"
          ref={this.sectionListRef}
          sections={this.state.sectionData}
          keyExtractor={(item: IData) => item.key}
          renderItem={this.onRenderItem}
          renderSectionHeader={this.onRenderSectionHeader}
          ListHeaderComponent={this.props.renderCustomListHeader}
          getItemLayout={this.onGetItemLayout}
        />

        <ListLetterIndex
          letterIndexContainer={this.props.letterIndexContainer}
          sectionData={this.state.sectionData}
          onPressLetter={this.onScrollToSection}
          indexLetterStyle={this.props.indexLetterStyle}
          indexLetterContainerStyle={this.props.indexLetterContainerStyle}
          renderCustomIndexLetter={this.props.renderCustomIndexLetter}
        />
      </View>
    );

  }
}

// export const AlphabetList: React.FC<AlphabetListProps> = (props) => {
//   const {
//     data,
//     index = DEFAULT_CHAR_INDEX,
//     style,
//     indexLetterStyle,
//     indexLetterContainerStyle,
//     getItemHeight: onGetItemHeight = () => sizes.itemHeight,
//     sectionHeaderHeight = sizes.itemHeight,
//     listHeaderHeight = sizes.listHeaderHeight,
//     uncategorizedAtTop = false,
//     renderCustomSectionHeader,
//     renderCustomItem,
//     renderCustomListHeader,
//     renderCustomIndexLetter,
//     letterIndexContainer,
//     ...sectionListProps
//   } = props
//
//   const sectionListRef = useRef(null);
//   const [sectionData, setSectionData] = useState<ISectionData[]>([])
//
//   useEffect(() => {
//     setSectionData(getSectionData(data, index, uncategorizedAtTop))
//   }, [data])
//
//   const onScrollToSection = (sectionIndex: number) => {
//     const sectionList = sectionListRef.current! as SectionList;
//     if (!sectionList) return
//
//     sectionList.scrollToLocation({
//       sectionIndex,
//       itemIndex: 0,
//     });
//   }
//
//
//   const onGetItemLayout: any = sectionListGetItemLayout({
//     getItemHeight: (_rowData, sectionIndex: number, rowIndex: number) => {
//       return onGetItemHeight(sectionIndex, rowIndex)
//     },
//     getSectionHeaderHeight: () => sectionHeaderHeight,
//     getSectionFooterHeight: () => 0,
//     listHeaderHeight,
//   });
//
//   const onRenderSectionHeader = ({ section }: { section: SectionListData<IData> }) => {
//     if (renderCustomSectionHeader) return renderCustomSectionHeader(section);
//
//     return (
//       <View testID="header" style={styles.sectionHeaderContainer}>
//         <Text testID="header__label" style={styles.sectionHeaderLabel}>{section.title}</Text>
//       </View>
//     );
//   };
//
//   const onRenderItem = ({ item }: { item: IData }) => {
//     if (renderCustomItem) return renderCustomItem(item);
//
//     return (
//       <View testID="cell" style={styles.listItemContainer}>
//         <Text testID="cell__label" style={styles.listItemLabel}>{item.value}</Text>
//       </View>
//     );
//   };
//
//
// }
