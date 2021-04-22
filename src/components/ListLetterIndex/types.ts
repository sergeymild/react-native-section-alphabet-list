import {ViewStyle} from 'react-native'
import { AlphabetListProps, ISectionData } from "../AlphabetList/types"

export interface ListLetterIndexProps {
    onPressLetter: (sectionIndex: number) => void;
    sectionData: ISectionData[];
    letterIndexContainer?: ViewStyle
    indexLetterStyle?: AlphabetListProps["indexLetterStyle"],
    indexLetterContainerStyle?: AlphabetListProps["indexLetterContainerStyle"],
    renderCustomIndexLetter?: AlphabetListProps["renderCustomIndexLetter"],
}
