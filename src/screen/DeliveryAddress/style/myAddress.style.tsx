import {Image, Text} from 'react-native';
import {View} from 'react-native';
import styled from 'styled-components';
import {Color} from '../../../infrastructuer/theme/colors.style';
export const ViewPopUp = styled(View).attrs(props => ({
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 30,
    height: 150,
}))``;
export const ViewItemAddress = styled(View).attrs(props => ({
    flexDirection: 'row', justifyContent: 'space-between'
}))``;
export const TitleAddressTitle = styled(Text).attrs(props => ({
  numberOfLines:2,
}))`
font-size: 16;
color: ${Color.brand.black};
`;
export const TitleAddress = styled(Text).attrs(props => ({
    numberOfLines:3,
}))`
  font-size: 14;
  color: ${Color.brand.black};
`;
export const TitleAddressBlue = styled(Text).attrs(props => ({
  numberOfLines:2,

}))`
font-size: 14;
align-self: flex-end;
color: ${Color.brand.blue};
`;
export const DetailsAddress = styled(Text).attrs(props => ({
    numberOfLines:1,
}))`
  font-size: 14;
  color: ${Color.brand.textGrey};
`;
export const Menu = styled(Image).attrs(props => ({
    resizeMode: 'contain',
  }))`
    width: 26;
    height: 26;
  `;