/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useRef} from 'react';
import {View} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
interface Type {
  visible: boolean;
  text: string;
  type: string;
}
export default function DownAlertToast({visible, text, type}: Type) {
  let dropDownAlertRef = useRef<any>(null);
  useEffect(() => {
    if (visible) {
      _fetchData();
    }
  }, [visible]);

  const _fetchData = async () => {
    dropDownAlertRef.alertWithType(type, type, text);
  };

  return (
    <>
      <DropdownAlert
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
    </>
  );
}
