import { Dimensions } from 'react-native';

let { width, height } = Dimensions.get('window');

export const aspect = parseFloat(parseFloat(height / width).toFixed(2))

export const isSmall = aspect <= 1.78

export const isBig = aspect <= 1.33


