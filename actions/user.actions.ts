"use server";

import { signIn as signInWithPasskey } from "next-auth/webauthn";

import { signIn, signOut } from "@/auth";

import { db } from "@/lib/db";
import { usersTable } from "@/lib/schema";
import { LoginSchema } from "@/schemas/login-schema";
import { RegisterSchema } from "@/schemas/register-schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import bcryptjs from "bcryptjs";
import { revalidatePath } from "next/cache";
export async function getUserFromDb(email: string, password: string) {
  try {
    const existedUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (!existedUser) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    if (!existedUser.password) {
      return {
        success: false,
        message: "Password is required.",
      };
    }

    const isPasswordMatches = await bcryptjs.compare(
      password,
      existedUser.password
    );

    if (!isPasswordMatches) {
      return {
        success: false,
        message: "Password is incorrect.",
      };
    }
    existedUser.password = null;

    return {
      success: true,
      data: existedUser,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    LoginSchema.parse({
      email,
      password,
    });

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    return {
      success: true,
      data: res,
      message: `Welcome Back !!`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Email or password is incorrect.",
    };
  }
}

export async function loginWithDiscord() {
  await signIn("discord", {
    redirect: true,
    redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
  });
}

export async function loginWithGoogle() {
  await signIn("google", {
    redirectTo: "/",
  });
}

export async function loginWithGithub() {
  await signIn("github", { redirectTo: "/" });
}

export async function loginWithFacebook() {
  await signIn("facebook", {
    redirect: true,
    redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
  });
}
export async function loginWithPasskey() {
  await signInWithPasskey("passkey", {
    redirect: true,
    redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
  });
}

export async function register({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    RegisterSchema.parse({
      email,
      password,
      confirmPassword,
    });
    // get user from db
    const existedUser = await getUserFromDb(email, password);
    if (existedUser.success) {
      return {
        success: false,
        message: "User already exists.",
      };
    }
    const hash = await bcryptjs.hash(password, 10);

    const [insertedUser] = await db
      .insert(usersTable)
      .values({
        email,
        password: hash,
      })
      .returning({
        id: usersTable.id,
        email: usersTable.email,
      });

    return {
      success: true,
      data: insertedUser,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function logout() {
  try {
    await signOut({
      redirect: false,
    });
    return {
      success: true,
      message: "Logout successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
