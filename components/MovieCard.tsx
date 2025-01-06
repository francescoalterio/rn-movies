import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, View, Pressable } from "react-native";
import { Link } from "expo-router";
import Icon from "./Icon";
import { Database } from "@/services/Database";
import { useUserMovies } from "@/hooks/useUserMovies";
import { useUserTvs } from "@/hooks/useUserTvs";

interface Props {
  bannerUrl: string;
  id: number;
  type: "movie" | "tv";
  added?: boolean;
}

export default function MovieCard({ bannerUrl, id, type, added }: Props) {
  const [userMovies, setUserMovies] = useUserMovies();
  const [userTvShows, setUserTvShows] = useUserTvs();

  function action() {
    const remove =
      type === "movie" ? Database.deleteMovie : Database.deleteTvShow;
    const add = type === "movie" ? Database.addMovie : Database.addTvShow;
    if (added) {
      if (type === "movie") {
        setUserMovies(userMovies.filter((movie) => movie.id !== id));
      } else {
        setUserTvShows(userTvShows.filter((tv) => tv.id !== id));
      }
      remove(id).catch(() => {
        if (type === "movie") {
          setUserMovies([...userMovies, { id, bannerUrl }]);
        } else {
          setUserTvShows([...userTvShows, { id, bannerUrl }]);
        }
      });
    } else {
      if (type === "movie") {
        setUserMovies([...userMovies, { id, bannerUrl }]);
      } else {
        setUserTvShows([...userTvShows, { id, bannerUrl }]);
      }
      add(id, bannerUrl).catch(() => {
        if (type === "movie") {
          setUserMovies(userMovies.filter((movie) => movie.id !== id));
        } else {
          setUserTvShows(userTvShows.filter((tv) => tv.id !== id));
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      {added ? (
        <Pressable onPress={action} style={styles.addButton}>
          <Icon name="remove" size={30} color={Colors.text} />
        </Pressable>
      ) : (
        <Pressable onPress={action} style={styles.addButton}>
          <Icon name="add" size={30} color={Colors.text} />
        </Pressable>
      )}
      <Link
        href={{
          pathname: type === "movie" ? "/movieDetails" : "/tvDetails",
          params: { id },
        }}
        asChild
      >
        <Pressable style={styles.imageContainer}>
          <Image source={{ uri: bannerUrl }} style={styles.image} />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray,
    borderRadius: 10,
    overflow: "hidden",
    width: "48%",
    aspectRatio: 2 / 3,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 2 / 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  addButton: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
    padding: 8,
    borderRadius: 9999,
  },
});
