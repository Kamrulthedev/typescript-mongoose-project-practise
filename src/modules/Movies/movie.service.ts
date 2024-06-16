import { format } from "date-fns";
import { TMovie } from "./movie.intergace";
import { Movie } from "./movie.model";
import slugify from "slugify";

const createMovie = async (MovieData: TMovie) => {
  const date = format(MovieData.releaseDate, "dd-MM-yyyy");
  const slug = slugify(`${MovieData.title}-${date}`, { lower: true });
  const result = await Movie.create({ ...MovieData, slug });
  return result;
};

//get all movie
const gatMovie = async (payload: Record<string, unknown>) => {
  let searchTerm = "";
  
  if (payload?.searchTerm) {
    searchTerm = payload.searchTerm as string;
  }
  
  const searchableFields = ["title", "genre"];
  
  const searchQuery = {
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  };
  
  const searchedMovie = await Movie.find(searchQuery);
  
  return searchedMovie;
};

//get single movie
const getSingleMovie = async (id: string) => {
  const movie = await Movie.findById(id);
  return movie;
};

//get by slug movie
const getMovieBySlug = async (slug: string) => {
  const slugD = await Movie.findOne({ slug: slug });
  return slugD;
};


// exports movie
export const MovieService = {
  createMovie,
  gatMovie,
  getSingleMovie,
  getMovieBySlug,
};
