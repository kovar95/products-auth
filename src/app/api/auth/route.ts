import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { uuid } from "uuidv4";
import findPlatform from "@/utils/findPlatform";

export async function GET(
  _request: Request
): Promise<NextResponse<{ token: string | null; error: string | null }>> {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_INSBY_API}/v2/init/app`,
      {
        uuid: uuid(),
        uuidOS: findPlatform(),
      },
      {
        headers: {
          Authorization: `Basic ${btoa(
            `${process.env.NEXT_PUBLIC_INSBY_USERNAME}:${process.env.NEXT_PUBLIC_INSBY_PASSWORD}`
          )}`,
        },
      }
    );

    console.log(res);

    return NextResponse.json({ token: res.data.data.token, error: null });
  } catch (error) {
    return NextResponse.json({
      token: null,
      error: (error as AxiosError).message,
    });
  }
}
