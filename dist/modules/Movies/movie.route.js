"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieRouter = void 0;
const express_1 = __importDefault(require("express"));
const movie_contrllar_1 = require("./movie.contrllar");
const review_controllar_1 = require("../Review/review.controllar");
const movie_validation_1 = require("./movie.validation");
const validaedRequest_1 = __importDefault(require("../../Middleware/validaedRequest"));
const router = express_1.default.Router();
router.post("/", (0, validaedRequest_1.default)(movie_validation_1.movieValidation.createmovieSchema), movie_contrllar_1.MovieContrllar.createMovieDb);
router.get("/", movie_contrllar_1.MovieContrllar.getMovieDb);
router.get("/:slug", movie_contrllar_1.MovieContrllar.getMovieBySlugDb);
router.get("/:MovieId", movie_contrllar_1.MovieContrllar.getSingleMovieDb);
router.post("/:slug/review", review_controllar_1.ReviewControllers.addReviewDb);
router.get("/:slug/reviews", review_controllar_1.ReviewControllers.GetAllReviewsBySlugDb);
router.get("/:slug/reviews/:id", review_controllar_1.ReviewControllers.GetByReviewIdDb);
router.delete("/:slug/reviews/:id", review_controllar_1.ReviewControllers.deleteReviewDb);
exports.MovieRouter = router;
