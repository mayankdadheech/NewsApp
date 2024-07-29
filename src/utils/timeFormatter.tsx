// Function to format the publishedAt timestamp
export const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
};
