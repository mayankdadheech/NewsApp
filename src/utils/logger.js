import Config from 'react-native-config';

const logger = {
  log: (...args) => {
    if (Config.ENV_NAME === 'dev') {
      console.log(...args);
    }
  },
  error: (...args) => {
    if (Config.ENV_NAME === 'dev') {
      console.error(...args);
    }
  },
  // Add more custom logging methods if needed
};

export default logger;
