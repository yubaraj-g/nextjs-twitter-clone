import { NextResponse } from "next/server";
import { Client, Databases, ID } from "appwrite";

export const POST = async (req: Request) => {
  console.log("creating tweet...");
  const client = new Client();

  const databases = new Databases(client);

  client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT || "")
    .setProject(process.env.NEXT_PUBLIC_PROJECT || "");

  try {
    const response = databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE || "",
      process.env.NEXT_PUBLIC_TWEETS_COLLECTION || "",
      ID.unique(),
      {
        text: req.body,
      }
    );

    const res = await response;

    console.log("res : ", res);

    return NextResponse.json({
      ...res,
      ok: true,
    });
  } catch (error: any) {
    console.log("err : ", error);
    return NextResponse.json({
      ...error,
      ok: false,
    });
  }
};
