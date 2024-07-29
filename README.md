This React Native Sample News app incorporates the Container/Presentational Component Design Pattern, as outlined in the following resources:

- https://sunnyyadav30.medium.com/container-presentational-design-pattern-in-react-js-a-guide-for-clean-and-scalable-ui-development-34684c24cf8d
- https://medium.com/@mr.kashif.samman/design-patterns-for-react-native-applications-630e5eb9e34f

Assumptions:

- NEWS_URL = "https://newsapi.org/v2/everything"
- Some data, such as the News Source image URL, is missing. In these cases, I have used a static SVG image as a placeholder.
- For the API call, I have assumed the keyword to be {q: 'bitcoin'}.
- I have used https://www.fontshare.com/fonts/satoshi url to downloads fonts.
- https://transform.tools/svg-to-react-native Helper url to transform svgs to be compatible for React Native Applications

In the Figma design, I did not have developer access, which prevented me from obtaining the exact padding and margin specifications for the UI Screen component. However, I have managed these elements by visually inspecting the Figma design.

Things that could have been added if more time was given:

- Unit Test cases.
- Shimmer/Skeleton Loaders.

Please note: I have not handled any Fallback UIs due to time constraints except fallbackImage.

- Added absolute imports.
