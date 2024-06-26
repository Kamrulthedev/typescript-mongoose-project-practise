"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const date_fns_1 = require("date-fns");
const movie_model_1 = require("./movie.model");
const slugify_1 = __importDefault(require("slugify"));
const createMovie = (MovieData) => __awaiter(void 0, void 0, void 0, function* () {
    const date = (0, date_fns_1.format)(MovieData.releaseDate, "dd-MM-yyyy");
    const slug = (0, slugify_1.default)(`${MovieData.title}-${date}`, { lower: true });
    console.log(slug);
    const result = yield movie_model_1.Movie.create(Object.assign(Object.assign({}, MovieData), { slug }));
    return result;
});
const gatMovie = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movie_model_1.Movie.find();
    return result;
});
const getSingleMovie = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield movie_model_1.Movie.findById(id);
    return movie;
});
const getMovieBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const slugD = yield movie_model_1.Movie.findOne({ slug: slug });
    return slugD;
});
exports.MovieService = {
    createMovie,
    gatMovie,
    getSingleMovie,
    getMovieBySlug,
};
