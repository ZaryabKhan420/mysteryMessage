import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { z } from "zod";
import { userNameValidation } from "../../../schemas/signUpSchema";

const UserNameQuerySchema = z.object({
  userName: userNameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      userName: searchParams.get("userName"),
    };
    // validate with ZOD
    const result = UserNameQuerySchema.safeParse(queryParams);
    if (!result.success) {
      const userNameErrors = result.error.format().userName?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            userNameErrors?.length > 0
              ? userNameErrors.join(", ")
              : "Invalid query parameter",
        },
        { status: 400 }
      );
    }

    const { userName } = result.data;
    const existingVerifiedUser = await UserModel.findOne({
      userName,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "UserName is already taken",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "UserName is Unique",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error Checking UserName",
      },
      {
        status: 500,
      }
    );
  }
}
