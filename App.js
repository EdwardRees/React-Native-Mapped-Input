import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function App() {
  // Effect to refresh
  useEffect(() => {
    showData();
  }, refresh);
  // Pseudodata
  const arr = [
    { key: 123, title: "name", type: "string" },
    { key: 456, title: "last_name", type: "string" },
  ];

  // State handler for inputs
  const [inputs, setInput] = useState([]);
  const [refresh, setRefresh] = useState(false);

  /**
   * Helper function to update input, called in onChangeText
   * @param {*} key Key to insert at
   * @param {*} value Value to insert
   */
  const updateInput = (key, value) => {
    // check if the value has been found
    let found = false;
    // temp variable to handle updating the inputs
    // Used due to immutability of inputs
    let temp = inputs;
    // Loop through array
    for (let i = 0; i < temp.length; i += 1) {
      // Check if current object includes the key "key"
      if (Object.keys(temp[i]).includes("key")) {
        // if specific key found, proves that the value has already
        // been added, update value instead of adding new one
        if (temp[i]["key"] === key) {
          // check if value is empty
          // if so, remove key value pair
          if (value === "") {
            temp.splice(i, 1);
            found = true;
            return;
          }
          // Update value associated with given key value pair
          // in object in array
          temp[i]["value"] = value;
          // set found flag to true
          found = true;
          // return to break out of loop
          return;
        }
      }
    }
    // Check if key hasn't been found
    if (!found) {
      // push new key value pair to temp array
      temp.push({ key, value });
    }
    // update inputs with temp array
    setInput(temp);
  };
  /**
   * Mapping function
   */
  const mapping = () => {
    // Take array and map individual objects in array
    return arr.map((obj) => {
      // Deconstruct key and title to use
      const { key, title } = obj;
      // return components
      return (
        <View>
          <Text>{title}</Text>
          <TextInput
            // call updateInput with title and value passed in
            onChangeText={(value) => updateInput(title, value)}
          />
        </View>
      );
    });
  };
  /**
   * Function to show data, used in effect and lower
   */
  const showData = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => setRefresh(!refresh)}>
          <Text>Show</Text>
        </TouchableOpacity>
        {/* Map through adding key value pairs */}
        {inputs.map((obj) => {
          const { key, value } = obj;
          return (
            <Text>
              {key}: {value}
            </Text>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* Call mapping to print out mapped components */}
      {mapping()}
      {/* Show data */}
      {showData()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
