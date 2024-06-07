import { NextFunction, Request, Response } from "express";
import { ReviewServices } from "./review.service";
import { catchAsync } from "../Utils/CatchAsync";



const addReviewDb = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params;
  const reviewData = req.body;
  const result = await ReviewServices.addReview(slug, reviewData);
  res.json({
    success: true,
    message: 'Review is created successfully!',
    data: result,
  });
});


const GetAllReviewsBySlugDb = catchAsync(
  async (req: Request, res: Response) => {
    const {slug} = req.params;
      const result = await ReviewServices.GetAllReviewsBySlug(slug);
      res.json({
        success: true,
        message: "Reviews get by specific Movie successfully!",
        data: result,
      });
  }
);


// const getSingleReviewDb = async (req: Request, res: Response) => {
//   try {
//     const { ReviewId } = req.params;
//     const result = await ReviewService.getSingleReview(ReviewId);
//     res.status(200).json({
//       success: true,
//       message: "Single Review Get is Successfully",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "Somting was Worng Review",
//       error: err,
//     });
//   }
// };

// const getReviewBySlugDb = async (req:Request, res:Response) =>{
//   try{
//     const {slug} = req.params;
//     const result = await ReviewService.getReviewBySlug(slug);
//     res.status(200).json({
//       success:true,
//       message:"get slug by review successfully",
//       data:result
//     })
//   }catch(err){
//     res.status(200).json({
//       success:false,
//       message:"slug create was worng data",
//       data:err
//     })
//   }
// };

export const ReviewControllers = {
    addReviewDb,
    GetAllReviewsBySlugDb
};
