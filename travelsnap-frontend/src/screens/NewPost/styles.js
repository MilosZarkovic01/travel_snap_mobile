// styles.js

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  iconContainer: {
    marginTop: 200,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  icon: {
    width: 50,
    height: 50,
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
  buttonTitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
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
