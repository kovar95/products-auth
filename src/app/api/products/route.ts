import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";

export const dynamic = "force-dynamic"

export async function GET(
  _request: Request
): Promise<NextResponse<{ data: any | null; error: string | null }>> {
  try {
    const nextCookies = cookies();
    const token = nextCookies.get("token")?.value;

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_INSBY_API}/v2/session/product`,
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
