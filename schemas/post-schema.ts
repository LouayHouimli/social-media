import { z } from "zod";

// Regex pattern to prevent HTML/Script tags and special characters
const safeStringPattern = /^[^<>{}\\[\]]*$/;

export const PostSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: "Post title must be atleast 4 characters",
    })
    .max(50, {
      message: "Post title cant be more than 50 characters ",
    })
    .regex(safeStringPattern, {
      message:
        "Title contains invalid characters or potentially unsafe content",
    }),
  content: z
    .string()
    .min(8, {
      message: "Post content must be atleast 8 characters",
    })
    .max(150, {
      message: "Post title cant be more than 150 characters",
    })
    .regex(safeStringPattern, {
      message:
        "Content contains invalid characters or potentially unsafe content",
    }),
});
