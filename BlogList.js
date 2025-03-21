import React from "react";
import { View, Text, FlatList, Button, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return data;
};

const BlogList = ({ navigation }) => {
  const { data, error, isLoading } = useQuery(["posts"], fetchPosts);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error loading posts.</Text>;

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.title}</Text>
            <Button title="Edit" onPress={() => navigation.navigate("Edit", { post: item })} />
          </View>
        )}
      />
    </View>
  );
};

export default BlogList;
