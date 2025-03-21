import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const AddPost = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  const createPost = useMutation(
    async (newPost) => {
      return await axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        Alert.alert("Post created successfully!");
        navigation.goBack();
      },
    }
  );

  return (
    <View>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Body" value={body} onChangeText={setBody} multiline />
      <Button title="Create Post" onPress={() => createPost.mutate({ title, body })} />
    </View>
  );
};

export default AddPost;
