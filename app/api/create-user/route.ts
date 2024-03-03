import { NextResponse } from "next/server";

import useInitDB from "@/hooks/use-init-db";

export const POST = async (req: Request) => {
  console.log("creating user...");

  const { account } = useInitDB();

  try {
    const response = await account.create("yuvi", "yuvi@gmail.com", "00000000");

    console.log(response);

    return NextResponse.json({
      ...response,
      ok: true,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ ...error, ok: false });
  }
};
