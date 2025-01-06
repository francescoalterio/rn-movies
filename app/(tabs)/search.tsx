import { useState, useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { useInputDebounce } from "@/hooks/useInputDebounce";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MoviesAPI from "@/services/MoviesAPI";
import MovieCard from "@/components/MovieCard";
import { MovieDetailsSmall } from "@/interfaces/Movies.interface";
import Icon from "@/components/Icon";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { TvDetailsSmall } from "@/interfaces/tvs.interface";
import { useUserMovies } from "@/hooks/useUserMovies";
import { useUserTvs } from "@/hooks/useUserTvs";

const moviesApi = new MoviesAPI();

export default function Search() {
  const [inputValue, setInputValue, debouncedValue] = useInputDebounce(500);
  const [movies, setMovies] = useState<MovieDetailsSmall[]>([]);
  const [tvShows, setTvShows] = useState<TvDetailsSmall[]>([]);

  const [userMovies, setUserMovies] = useUserMovies();
  const [userTvShows, setUserTvShows] = useUserTvs();

  const tabBarHeight = useBottomTabBarHeight();
  const [searchType, setSearchType] = useState<"movie" | "tv">("movie");

  useEffect(() => {
    async function getData() {
      if (searchType === "movie") {
        const movies = await moviesApi.getMoviesByText(debouncedValue);
        setMovies(movies);
      } else {
        const tvShows = await moviesApi.getTvShowsByText(debouncedValue);
        setTvShows(tvShows);
      }
    }
    getData();
  }, [debouncedValue, searchType, userMovies, userTvShows]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Buscar</Text>

      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color={Colors.text} />
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          style={styles.input}
          placeholder="Buscar"
          placeholderTextColor={Colors.textGray}
        />
      </View>

      <View style={styles.searchTypeButtonsContaier}>
        <Pressable
          onPress={() => setSearchType("movie")}
          style={[
            styles.searchTypeButton,
            {
              backgroundColor:
                searchType === "movie" ? Colors.primary : "transparent",
            },
          ]}
        >
          <Text style={styles.searchTypeButtonText}>Peliculas</Text>
        </Pressable>
        <Pressable
          onPress={() => setSearchType("tv")}
          style={[
            styles.searchTypeButton,
            {
              backgroundColor:
                searchType === "tv" ? Colors.primary : "transparent",
            },
          ]}
        >
          <Text style={styles.searchTypeButtonText}>Series</Text>
        </Pressable>
      </View>

      <View
        style={[styles.moviesContainer, { paddingBottom: tabBarHeight + 20 }]}
      >
        {searchType === "movie" ? (
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <MovieCard
                key={item.id}
                bannerUrl={moviesApi.getPoster(item.poster_path)}
                id={item.id}
                type="movie"
                added={userMovies.some((movie) => movie.id === item.id)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginVertical: 6,
            }}
          />
        ) : (
          <FlatList
            data={tvShows}
            renderItem={({ item }) => (
              <MovieCard
                key={item.id}
                bannerUrl={moviesApi.getPoster(item.poster_path)}
                id={item.id}
                type="tv"
                added={userTvShows.some((tv) => tv.id === item.id)}
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
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.gray,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: Colors.text,
    marginLeft: 20,
  },
  searchTypeButtonsContaier: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: Colors.gray,
    width: "100%",
  },
  searchTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
  },
  searchTypeButtonText: {
    color: Colors.text,
  },
  moviesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 20,
  },
});
