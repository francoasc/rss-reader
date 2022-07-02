import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#555",
  },
  modalContent: {
    padding: 22,
    borderRadius: 4,
    borderColor: "#555",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#555",
    borderRadius: 16,
    padding: 4,
  },
  addModalButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    marginBottom: 8,
  },
  title: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    padding: 12,
    marginBottom: 4,
  },
});
