import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { appConfig } from "../config";
import logger from "../utils/logger";
import { ApiError } from "../types/recipe";

export const rateLimiter = rateLimit({
  windowMs: appConfig.rateLimit.windowMs,
  max: appConfig.rateLimit.max,
  message: "Too many requests, please try again later",
});

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Error:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    error: {
      message,
      status,
      code: err.code,
    },
  });
};

export const validateSearch = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = z.object({
    query: z.string().min(1, "Search query is required"),
    cuisineType: z.string().optional(),
    mealType: z.string().optional(),
    dishType: z.string().optional(),
    diet: z.string().optional(),
    health: z.array(z.string()).optional(),
    excluded: z.array(z.string()).optional(),
  });

  try {
    schema.parse(req.query);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: {
          message: "Invalid request parameters",
          details: error.errors,
        },
      });
    } else {
      next(error);
    }
  }
};
