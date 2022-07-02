import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 16,
    flex: 1,
    margin: 6,
    padding: 8,
  },
  topContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    flexShrink: 1,
    flex: 0.9,
    fontSize: 16,
    fontWeight: "700",
  },
  dateContainer: {
    flex: 0.1,
    backgroundColor: "red",
    alignItems: "flex-end",
  },
  date: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "700",
  },
  descriptionContainer: {
    flex: 1,
  },
  image: {
    height: 50,
    width: 50,
  },
});
