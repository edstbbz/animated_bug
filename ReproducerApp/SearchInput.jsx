import React, {forwardRef, useRef, useImperativeHandle} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const noop = () => {};

const getSizes = ({size}) => {
  switch (size) {
    case 'small':
      return {height: 36};
    case 'medium':
      return {height: 52};
    default:
      return {height: 52};
  }
};

const InputSearch = forwardRef(
  (
    {
      clearAccessibilityLabel = 'clear',
      barcodeAccessibilityLabel = 'barcode',
      inputStyle,
      onIconPress,
      placeholder,
      searchAccessibilityLabel = 'search',
      style,
      value,
      onChange,
      size = 'medium',
      isShownBarcode = false,
      onBarcodePress = noop,
      ...rest
    },
    ref,
  ) => {
    const root = useRef(null);

    useImperativeHandle(ref, () => {
      const input = root.current;

      if (input) {
        return {
          focus: () => input.focus(),
          clear: () => input.clear(),
          setNativeProps: args => input.setNativeProps(args),
          isFocused: () => input.isFocused(),
          blur: () => input.blur(),
        };
      }

      const noop = () => {};

      return {
        focus: noop,
        clear: noop,
        setNativeProps: noop,
        isFocused: noop,
        blur: noop,
      };
    });

    const heightSize = getSizes({size});

    return (
      <View
        style={[
          heightSize,
          {backgroundColor: 'lightGrey'},
          styles.container,
          style,
        ]}>
        <TextInput
          style={[
            styles.input,
            size === 'small' && styles.inputSmall,
            {
              color: 'black',
              fontSize: 12,
            },
            inputStyle,
          ]}
          placeholder={placeholder || ''}
          underlineColorAndroid="transparent"
          returnKeyType="search"
          keyboardAppearance="light"
          accessibilityRole="search"
          ref={root}
          value={value}
          multiline
          onChangeText={onChange}
          {...rest}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 8,
    alignSelf: 'stretch',
    textAlign: 'left',
    minWidth: 0,
    letterSpacing: 0.1,
    flexGrow: 1,
    flexShrink: 1,
    paddingVertical: 4,
  },
  inputSmall: {
    paddingLeft: 2,
    flex: 1,
    paddingVertical: 0,
  },
});

export default InputSearch;
