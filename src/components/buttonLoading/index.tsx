import React, {PureComponent, useRef} from 'react';
import {useEffect} from 'react';
import {View} from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import {Color} from '../../infrastructuer/theme/colors.style';

export const LoadingButton = ({onClose, onNext, isActive,title}) => {
  const loadingButton = useRef();
  const _onPressHandler = () => {
    onNext();
    // mock
  };
  useEffect(() => {
    console.log(isActive);

    if (!isActive) {
      setTimeout(() => {
        loadingButton?.current?.showLoading(false);
      }, 3000);
    } else {
      loadingButton?.current?.showLoading(true);

      setTimeout(() => {
        onClose();
      }, 5000);
    }
  }, [isActive]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgb(255,255,255)',
        justifyContent: 'center',
      }}>
      <AnimateLoadingButton
        ref={loadingButton}
        width={330}
        height={50}
        title={title}
        borderRadius={10}
        titleFontSize={18}
        titleColor="rgb(255,255,255)"
        backgroundColor={Color.brand.colorButton}
        onPress={() => _onPressHandler()}
      />
    </View>
  );
};
