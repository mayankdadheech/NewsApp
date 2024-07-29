import React from 'react';
import {FlatList, Text, View, StyleSheet, Pressable} from 'react-native';

import {Headline} from '../../../store/slices/headlinesSlice';

import NewsItemContainer from '../containers/NewsItemContainer';
import Icon from '../../../../assets/icons/icon';
import {moderateScale, scale, verticalScale} from '../../../utils/scalingUtils';

interface NewsListProps {
  pinnedHeadlines: Headline[];
  displayedHeadlines: Headline[];
  onRefresh: () => void;
}

const NewsList: React.FC<NewsListProps> = ({
  pinnedHeadlines,
  displayedHeadlines,
  onRefresh,
}) => {
  const renderItem = ({item}: {item: Headline}) => (
    <NewsItemContainer item={item} pinnedHeadlines={pinnedHeadlines} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.imageWrapper}>
          <Icon name="app-icon" />
        </View>
        <Pressable onPress={onRefresh}>
          <Icon name="refresh" />
        </Pressable>
      </View>
      <FlatList<Headline>
        showsVerticalScrollIndicator={false}
        data={displayedHeadlines}
        renderItem={renderItem}
        keyExtractor={(item: Headline) => item.title}
        refreshing={false}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(66),
    paddingHorizontal: moderateScale(19),
  },
  imageWrapper: {
    justifyContent: 'center',
  },
  logo: {
    width: scale(111),
    height: verticalScale(31),
    resizeMode: 'stretch', // I didn't added the logo of specific height and width, that's why I  have added stretch property, temporarily.
  },
  item: {
    padding: moderateScale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  title: {
    fontSize: 18,
  },
  rightActions: {
    flexDirection: 'row',
  },
  deleteAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(70),
  },
  pinAction: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(70),
  },
  actionText: {
    color: 'white',
  },
});

export default NewsList;
