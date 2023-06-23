import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Bar from './Bar';

const ScreenHeader = ({
  title,
  right,
  searchProps,
  withSearch,
  selectableTitle = false,
}) => {
  return (
    <>
      <View style={[styles.container, {backgroundColor: 'lightgrey'}]}>
        <View style={styles.leftPart}>
          <View style={styles.titleContainer}>
            <Text
              allowFontScaling={false}
              selectable={selectableTitle}
              style={styles.title}
              numberOfLines={1}
              ellipsizeMode="tail">
              {title}
            </Text>
          </View>
        </View>
        <View style={[styles.rightBlock, withSearch && {paddingRight: 68}]}>
          {typeof right === 'function' ? right() : right}
        </View>
      </View>
      {withSearch && <Bar {...searchProps} />}
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    paddingBottom: 4,
    paddingTop: 4,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  titleContainer: {
    alignSelf: 'center',
    flexShrink: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 14,
    marginTop: 2,
  },
  leftPart: {
    flex: 1,
    flexDirection: 'row',
  },
  leftBlock: {
    marginRight: 14,
    paddingRight: 12,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  rightBlock: {
    paddingLeft: 10,
    paddingRight: 16,
    justifyContent: 'center',
  },
  select: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: 2,
  },
  mark: {
    height: 7,
    width: 7,
    borderRadius: 9,
    borderWidth: 1,
    position: 'absolute',
    top: -5,
    right: -6,
  },
});

ScreenHeader.defaultProps = {
  title: 'Loading...',
};

export default ScreenHeader;
