import React from 'react';
import PropTypes from 'prop-types';
import Refresh from './refresh';
import AppIcon from './app-icon';
import News from './news';
import Delete from './delete';
import Pin from './pin';
import Pin10 from './pin-10';

export const icons = {
  refresh: props => <Refresh {...props} />,
  news: props => <News {...props} />,
  'app-icon': props => <AppIcon {...props} />,
  delete: props => <Delete {...props} />,
  pin: props => <Pin {...props} />,
  'pin-10': props => <Pin10 {...props} />,
};

function Icon({name, ...rest}) {
  const CurrentIcon = icons[name];

  if (!CurrentIcon) {
    return null;
  }

  return <CurrentIcon {...rest} />;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;