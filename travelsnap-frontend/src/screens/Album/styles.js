import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  albumItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    justifyContent: 'flex-start',
    height: 250,
  },
  photos: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
  numbeOfPosts: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 5,
    width: '100%',
    height: '30%'
  },
  buttonContainer: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    marginBottom: 50
  },
  button: {
    backgroundColor: '#3897f1',
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  iconWrapper: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  iconText: {
    marginTop: 5,
    color: 'gray',
  },
});

export default styles;