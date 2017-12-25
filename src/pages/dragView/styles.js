import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 55,
    paddingRight: 20,
    backgroundColor: '#fff',
    paddingLeft: 15,
    // paddingTop: 9,
    // paddingBottom: 9,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textStyle: {
    fontSize: 15,
    color: '#101010',
    lineHeight: 55,
  }
})

export default styles