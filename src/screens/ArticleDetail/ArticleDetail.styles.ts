import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 1,
    marginTop: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  title: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    padding: 8,
    alignSelf: "center",
  },
  image: {
    height: 300,
    width: "100%",
  },
  descriptionContainer: {
    padding: 8,
  },
});
