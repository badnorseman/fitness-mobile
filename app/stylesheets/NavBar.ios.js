const React = require('react-native');
const { PixelRatio, StyleSheet } = React;

export default StyleSheet.create({
  button: {
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD'
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500'
  },
  backIcon: {
    width: 26,
    height: 26,
    marginTop: 7,
    marginRight: -1
  },
  navBarText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9
  },
  navBarLeftButton: {
    paddingLeft: 3,
    flexDirection: 'row'
  },
  navBarRightButton: {
    paddingRight: 10
  },
  navBarButtonText: {}
});
