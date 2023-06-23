import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {View, Animated, StyleSheet, Button} from 'react-native';

import InputSearch from './SearchInput';

const useToggleState = initialState => {
  const [state, setState] = useState(initialState);

  const hide = useCallback(() => {
    setState(false);
  }, []);

  const show = useCallback(() => {
    setState(true);
  }, []);

  const toggle = useCallback(() => {
    setState(prev => !prev);
  }, []);

  return [state, hide, show, toggle];
};

const noop = Function.prototype;

const Searchbar = (
  {
    onChange,
    onInputShow = noop,
    onHide,
    onShow,
    iconStyle,
    showOnMount = false,
    showOnQuery,
    placeholder = 'Поиск',
    closeButtonText = 'Отмена',
    keyboardType = null,
    multiline = false,
  },
  ref,
) => {
  const [value, setValue] = useState(null);
  const [isShowInput, hideInput, showInput] = useToggleState(false);
  const [keyboardTypeValue, setKeyboardTypeValue] = useState(keyboardType);
  const [mount, setMount] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;

  const inputRef = useRef(null);

  useEffect(() => {
    showOnMount && showSearchInput();
  }, []);

  useEffect(() => {
    setKeyboardTypeValue(keyboardType);
  }, [keyboardType]);

  useEffect(() => {
    !!showOnQuery && mount && showSearchInputOnQuery();
    if (!mount) {
      setMount(true);
    }
  }, [showOnQuery]);

  useEffect(() => {
    searchOnChange();
  }, [value]);

  const searchOnChange = () => {
    if (value !== null) {
      onChange(value);
    }
  };

  const handleChange = searchValue => setValue(searchValue);

  const runAnimate = (to = 1, start = false) => {
    Animated.timing(scale, {
      toValue: to,
      duration: 200,
      useNativeDriver: true,
    }).start(() => start && inputRef.current?.focus());
  };

  const showSearchInput = () => {
    onInputShow();
    !!onShow && onShow();
    showInput();
    runAnimate(0, true);
  };

  const showSearchInputOnQuery = () => {
    !!onShow && onShow();
    showInput();
    runAnimate(0, false);
  };

  const hideSearchInput = () => {
    inputRef.current?.blur();
    setValue(null);
    !!onHide && onHide();
    Animated.timing(scale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start(hideInput);
  };

  const inputAnimation = scale.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    serachBarShowed: isShowInput,
  }));

  return (
    <>
      {!isShowInput && (
        <Animated.View
          style={[styles.searchIcon, {transform: [{scale}]}, iconStyle]}>
          <Button title="Se" onPress={showSearchInput} />
        </Animated.View>
      )}
      {isShowInput && (
        <Animated.View
          style={[
            styles.searchView,
            {transform: [{scaleY: inputAnimation}]},
            {opacity: inputAnimation},
          ]}>
          <View style={styles.searchContainer}>
            <View style={{flex: 0.8}}>
              <InputSearch
                size="small"
                ref={inputRef}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                keyboardType={keyboardTypeValue}
                multiline={multiline}
              />
            </View>
            <View style={{flex: 0.25, alignItems: 'center'}}>
              <Button title={closeButtonText} onPress={hideSearchInput} />
            </View>
          </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchView: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingTop: 6,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 0,
    zIndex: 3,
  },
  searchIcon: {
    flex: 1,
    position: 'absolute',
    right: 20,
    top: 13,
    overflow: 'hidden',
    zIndex: 3,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default forwardRef(Searchbar);
