import { Request, Response } from "express";
import { MovieService } from "./movie.service";

const createMovieDb = async (req: Request, res: Response) => {
  try {
    const Moviedata = req.body;
    const result = await MovieService.createMovie(Moviedata);
    res.status(200).json({
      success: true,
      message: "Movie created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Somting Was wrong Movie",
      error: err,
    });
  }
};

const getMovieDb = async (req: Request, res: Response) => {
  try {
    const result = await MovieService.gatMovie();
    res.status(200).json({
      success: true,
      message: "Movies fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Somting was Worng Data",
      error: err,
    });
  }
};

const getSingleMovieDb = async (req: Request, res: Response) => {
  try {
    const { MovieId } = req.params;
    const result = await MovieService.getSingleMovie(MovieId);
    res.status(200).json({
      success: true,
      message: "Single Movie Get is Successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Somting was Worng Movie",
      error: err,
    });
  }
};

const getMovieBySlugDb = async (req:Request, res:Response) =>{
  try{
    const {slug} = req.params;
    const result = await MovieService.getMovieBySlug(slug);
    res.status(200).json({
      success:true,
      message:"slug created successfully",
      data:result
    })
  }catch(err){
    console.log(err)
  }
};

export const MovieContrllar = {
  createMovieDb,
  getMovieDb,
  getSingleMovieDb,
  getMovieBySlugDb
};
