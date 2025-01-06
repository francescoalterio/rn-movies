import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import MoviesAPI from "@/services/MoviesAPI";
import {
  Department,
  MovieCredits,
  MovieDetails,
} from "@/interfaces/movies.interface";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import ActorCard from "@/components/ActorCard";
import { TvCredits, TvDetails } from "@/interfaces/tvs.interface";

const moviesApi = new MoviesAPI();

export default function Movie() {
  const params = useLocalSearchParams();
  const [tvDetails, setTvDetails] = useState<TvDetails>();
  const [tvCredits, setTvCredits] = useState<TvCredits>();

  useEffect(() => {
    Promise.all([
      moviesApi.getTvShowDetails(Number(params.id)),
      moviesApi.getTvShowCredits(Number(params.id)),
    ]).then(([details, credits]) => {
      setTvDetails(details);
      setTvCredits(credits);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {tvDetails && (
        <>
          <Image
            source={{ uri: moviesApi.getPoster(tvDetails?.poster_path) }}
            style={styles.poster}
          />
          <LinearGradient
            colors={["transparent", Colors.background]}
            style={styles.gradient}
          ></LinearGradient>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{tvDetails.name}</Text>
            <Text
              style={{
                color: Colors.textGray,
                fontWeight: "semibold",
                fontSize: 16,
                width: "100%",
                textAlign: "left",
              }}
            >
              {tvDetails.first_air_date.split("-")[0]} -{" "}
              {tvDetails.genres
                .slice(0, 2)
                .flatMap((gen) => gen.name)
                .join(", ")}{" "}
            </Text>
            <Text
              style={{
                color: Colors.textGray,
                fontWeight: "semibold",
                fontSize: 16,
                width: "100%",
                textAlign: "left",
              }}
            >
              {tvDetails.number_of_episodes} Episodios -{" "}
              {tvDetails.number_of_seasons} Temporadas
            </Text>
            <Text style={styles.overviewTitle}>Sinopsis</Text>
            <Text style={styles.overview}>{tvDetails.overview}</Text>
            <View>
              <Text style={styles.castTitle}>Cast</Text>
              <FlatList
                data={tvCredits?.cast
                  .filter(
                    (persons) =>
                      persons.known_for_department === Department.Acting
                  )
                  .filter((persons) => persons.profile_path)}
                renderItem={({ item }) => (
                  <ActorCard
                    bannerUrl={moviesApi.getPoster(item.profile_path as string)}
                    name={item.name}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={true}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
              />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
  },
  gradient: {
    position: "relative",
    width: "100%",
    height: 200,
    top: -200,
    left: 0,
  },
  infoContainer: {
    width: "100%",
    padding: 20,
    position: "relative",
    top: -200,
    gap: 12,
  },
  title: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    width: "100%",
  },
  overviewTitle: {
    color: Colors.text,
    textAlign: "left",
    width: "100%",
    fontSize: 20,
    fontWeight: "semibold",
    marginBottom: 10,
  },
  overview: { color: Colors.textGray, textAlign: "left", fontSize: 16 },
  castTitle: {
    color: Colors.text,
    textAlign: "left",
    width: "100%",
    fontSize: 30,
    fontWeight: "semibold",
    marginBottom: 20,
  },
});
