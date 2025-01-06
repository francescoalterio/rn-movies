import { MovieDetailsSmall } from "@/interfaces/movies.interface";
import { TvDetailsSmall } from "@/interfaces/tvs.interface";
import { FlatList } from "react-native";
import MovieCard from "./MovieCard";
import MoviesAPI from "@/services/MoviesAPI";

type Props<T extends "movie" | "tv"> = {
  data: T extends "movie" ? MovieDetailsSmall[] : TvDetailsSmall[];
  type: T;
};

export function CardList<T extends "movie" | "tv">({ data, type }: Props<T>) {
  return (
    <FlatList
      data={data as any}
      renderItem={({ item }) => (
        <MovieCard
          key={item.id}
          bannerUrl={new MoviesAPI().getPoster(item.poster_path)}
          id={item.id}
          type={type}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-between",
        marginVertical: 6,
      }}
    />
  );
}
