import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type {
  SearchMoviesParams,
  SearchMovieDetailsParams,
} from "../src/store/movies";

const { API_KEY = "", API_ENDPOINT = "" } = process.env;

export default async function (req: VercelRequest, res: VercelResponse) {
  const params = req.body as SearchMoviesParams | SearchMovieDetailsParams;
  const { data } = await axios.get(API_ENDPOINT, {
    params: { apikey: API_KEY, ...params },
  });

  res.status(200).json(data);
}
