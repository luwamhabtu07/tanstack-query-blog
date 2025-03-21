import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const EditPost = ({ route, navigation }) => {
  const { post } = route.params;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const queryClient = useQueryClient();

  const updatePost = useMutation(
    async (updatedPost) => {
      return await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, updatedPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        Alert.alert("Post updated successfully!");
        navigation.goBack();
      },
    }
  );

  return (
    <View>
      <TextInput value={title} onChangeText={setTitle} />
      <TextInput value={body} onChangeText={setBody} multiline />
      <Button title="Update Post" onPress={() => updatePost.mutate({ title, body })} />
    </View>
  );
};

export default EditPost;
