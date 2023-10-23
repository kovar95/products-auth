import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function POST(
  request: Request
): Promise<NextResponse<{ data: any | null; error: string | null }>> {
  try {
    const req = await request.json();
    const nextCookies = cookies();

    // take token from cookie
    const token = nextCookies.get("token")?.value;

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_INSBY_API}/session/customer-sign-in`,
      {
        ...req,
        autoRegister: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json({ data: res.data, error: null });
  } catch (error) {
    return NextResponse.json({
      data: null,
      error: (error as AxiosError).message,
    });
  }
}
