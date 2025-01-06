import MovieCard from "@/components/MovieCard";
import { Colors } from "@/constants/Colors";
import { MovieDetails, MovieMinimal } from "@/interfaces/movies.interface";
import MoviesAPI from "@/services/MoviesAPI";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserMovies } from "@/hooks/useUserMovies";
import { useUserTvs } from "@/hooks/useUserTvs";
import { TvDetails } from "@/interfaces/tvs.interface";
import { useIsUserDataLoading } from "@/hooks/useIsUserDataLoading";

const moviesApi = new MoviesAPI();

export default function tVS() {
  const [userTvShows, setUserTvShows] = useUserTvs();
  const [isLoading, setIsLoading] = useIsUserDataLoading();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Series</Text>

      <View style={[styles.moviesContainer]}>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.background,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={Colors.primary} />
          </View>
        ) : (
          <FlatList
            data={userTvShows}
            renderItem={({ item }) => (
              <MovieCard
                key={item.id}
                bannerUrl={item.bannerUrl}
                id={item.id}
                type="tv"
                added
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginVertical: 6,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
  },
  moviesContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: Colors.background,
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
