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
    const result = yield movie_model_1.Movie.create(Object.assign(Object.assign({}, MovieData), { slug }));
    return result;
});
//get all movie
const gatMovie = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Search fields
    let searchTerm = "";
    if (payload === null || payload === void 0 ? void 0 : payload.searchTerm) {
        searchTerm = payload.searchTerm;
    }
    const searchableFields = ["title", "genre"];
    const searchQuery = {
        $or: searchableFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
        })),
    };
    //paginattion
    let limit = Number((payload === null || payload === void 0 ? void 0 : payload.limit) || 10);
    let skip = 0;
    if (payload === null || payload === void 0 ? void 0 : payload.page) {
        const page = Number((payload === null || payload === void 0 ? void 0 : payload.page) || 1);
        skip = Number((page - 1) * limit);
    }
    const skipQuiery = searchQuery.skip(skip);
    const limitQuiery = skipQuiery.limit(limit);
    // Copy from payload object
    const queryObj = Object.assign({}, payload);
    const excludeFields = ["searchTerm"];
    excludeFields.forEach((e) => delete queryObj[e]);
    const finalQuery = {
        $and: [searchQuery, queryObj],
    };
    const searchedMovie = yield movie_model_1.Movie.find(finalQuery);
    return searchedMovie;
});
//get single movie
const getSingleMovie = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield movie_model_1.Movie.findById(id);
    return movie;
});
//get by slug movie
const getMovieBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const slugD = yield movie_model_1.Movie.findOne({ slug: slug });
    return slugD;
});
// exports movie
exports.MovieService = {
    createMovie,
    gatMovie,
    getSingleMovie,
    getMovieBySlug,
};
