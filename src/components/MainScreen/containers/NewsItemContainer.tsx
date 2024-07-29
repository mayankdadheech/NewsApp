import {useCallback, useRef} from 'react';
import NewsItem from '@components/MainScreen/presentationalComponents/NewsItem';
import {
  deleteHeadline,
  Headline,
  pinHeadline,
} from '@store/slices/headlinesSlice';
import {useDispatch} from '@store/useDispatch';
import {Swipeable} from 'react-native-gesture-handler';

interface NewsItemProps {
  item: Headline;
  pinnedHeadlines: Headline[];
}
// Shared reference to manage the currently open swipeable item
const currentOpenSwipeable = {
  current: null as React.RefObject<Swipeable> | null,
};

const NewsItemContainer: React.FC<NewsItemProps> = ({
  item,
  pinnedHeadlines,
}) => {
  const dispatch = useDispatch();
  const isPinned = pinnedHeadlines.some(pinned => pinned.title === item.title);
  const swipeableRef = useRef<Swipeable>(null);

  const handleDelete = useCallback(() => {
    dispatch(deleteHeadline(item));
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  }, [dispatch, item]);

  const handlePin = useCallback(() => {
    dispatch(pinHeadline(item));
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  }, [dispatch, item]);

  const handleSwipeableOpen = () => {
    if (
      currentOpenSwipeable.current &&
      currentOpenSwipeable.current !== swipeableRef &&
      currentOpenSwipeable.current.current
    ) {
      (currentOpenSwipeable.current.current as Swipeable).close();
    }
    currentOpenSwipeable.current = swipeableRef;
  };

  return (
    <NewsItem
      item={item}
      onDelete={handleDelete}
      onPin={handlePin}
      isPinned={isPinned}
      swipeableRef={swipeableRef}
      onSwipeableOpen={handleSwipeableOpen}
    />
  );
};

export default NewsItemContainer;
