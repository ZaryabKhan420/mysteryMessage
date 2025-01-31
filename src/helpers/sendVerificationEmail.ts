import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
export async function sendVerificationEmail(
  email: string,
  userName: string,
  otp: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystery Message | Verification Code",
      react: VerificationEmail({ userName, otp }),
    });
    return {
      success: true,
      message: "Verification email send successfully",
    };
  } catch (emailError) {
    console.log("Error Sending Verification Email", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
