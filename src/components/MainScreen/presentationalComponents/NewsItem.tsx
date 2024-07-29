import React, {RefObject} from 'react';
import {Headline} from '@store/slices/headlinesSlice';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';

import {formatTime} from '@utils/timeFormatter';
import Icon from '@assets/icons/icon';
import {moderateScale, scale, verticalScale} from '@utils/scalingUtils';

const fallbackImage =
  'https://images.unsplash.com/photo-1719937206168-f4c829152b91?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
interface NewsItemProps {
  item: Headline;
  onDelete: () => void;
  onPin: () => void;
  isPinned: boolean;
  swipeableRef: RefObject<Swipeable>;
  onSwipeableOpen: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({
  item,
  onDelete,
  onPin,
  isPinned,
  swipeableRef,
  onSwipeableOpen,
}) => {
  // Add formattedTime to the item as in the API response the format is different
  const formattedTime = formatTime(item.publishedAt);
  const renderRightActions = (progress: any, dragX: any) => (
    <View style={styles.rightActions}>
      <View style={styles.rightActionChildWrapper}>
        <RectButton style={styles.deleteAction} onPress={onDelete}>
          <Icon name="delete" />
          <Text style={styles.actionText}>Delete</Text>
        </RectButton>
        <RectButton style={styles.pinAction} onPress={onPin}>
          <Icon name="pin" />
          <Text style={styles.actionText}>Pin</Text>
        </RectButton>
      </View>
    </View>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onSwipeableOpen={onSwipeableOpen}>
      <View style={styles.item}>
        {isPinned && (
          <View style={styles.pinnedWrapper}>
            <Icon name="pin-10" />
            <Text style={styles.pinnedText}>Pinned on top</Text>
          </View>
        )}

        <View style={styles.headerWrapper}>
          <View style={styles.titleWrapper}>
            <Icon name="news" />
            <Text style={styles.name}>{item.source.name}</Text>
          </View>
          <Text style={styles.time}>{formattedTime}</Text>
        </View>
        <View style={styles.titleImageWrapper}>
          <View>
            <Text style={styles.title} numberOfLines={3}>
              {item.title}
            </Text>
            <View>
              <Text style={styles.author}>{item.author}</Text>
            </View>
          </View>
          <Image
            source={{
              uri: item.urlToImage || fallbackImage,
            }}
            style={styles.image}
          />
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  pinnedWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: moderateScale(4),
    marginVertical: verticalScale(10),
  },
  pinnedText: {
    fontSize: 12,
    fontFamily: 'Satoshi-Regular',
    color: '#808080',
  },
  item: {
    padding: moderateScale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  name: {
    fontSize: 14,
    fontFamily: 'Satoshi-Regular',
    color: '#808080',
  },
  time: {
    fontSize: 12,
    fontFamily: 'Satoshi-Regular',
    color: '#000000',
  },
  titleImageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Satoshi-Bold',
    height: verticalScale(72),
    width: scale(224),
    marginVertical: verticalScale(10),
  },
  image: {
    height: verticalScale(77),
    width: scale(77),
    borderRadius: 14,
  },
  author: {
    color: '#818181',
    fontSize: 12,
    fontFamily: 'Satoshi-Medium',
  },
  rightActions: {
    flexDirection: 'column',
    width: scale(61),
    height: '100%',
    justifyContent: 'center',
  },
  rightActionChildWrapper: {
    backgroundColor: '#4BBDFC',
    height: verticalScale(128),
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: 'center',
    gap: moderateScale(16),
  },
  deleteAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: moderateScale(6),
  },
  pinAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: moderateScale(6),
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Satoshi-Regular',
  },
});

export default NewsItem;
