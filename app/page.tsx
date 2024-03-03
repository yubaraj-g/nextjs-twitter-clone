"use client";
import { FormEvent, useEffect, useState } from "react";
// import Image from "next/image";
import { Client, Databases, ID } from "appwrite";

import useInitDB from "@/hooks/use-init-db";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Home = () => {
  const [allTweets, setAllTweets] = useState([]);
  const [tweetText, setTweetText] = useState<string>("");

  const userLogin = async () => {
    const { account } = useInitDB();

    const response = account.createEmailSession("yuvi@gmail.com", "00000000");

    const resp = response
      .then((res) => {
        return { ...res, ok: true };
      })
      .catch((err) => {
        return { ...err, ok: false };
      });

    return resp;
  };

  useEffect(() => {
    userLogin().then((response: any) => {
      if (!response.ok) {
        console.log(response);
      } else {
        console.log(response);
      }
    });

    getTweets().then((res: any) => {
      console.log(res);
      const { tweets } = res;

      setAllTweets(tweets.documents);
      // return res;
    });
  }, []);

  const writeTweet = (event: any) => {
    setTweetText(event.target.value);
  };

  // const createTweet = async () => {
  //   try {
  //     const res = await fetch("/api/create-tweet", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         text: tweetText,
  //       }),
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const createTweet = async () => {
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
          text: tweetText,
        }
      );

      const res = await response;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-16">
      {allTweets.map((tweet: { text: string }, index) => (
        <span key={"tweet_" + index}>{tweet.text}</span>
      ))}

      <div className="flex flex-col w-full justify-center gap-4">
        <Input value={tweetText} onChange={writeTweet} />
        <Button onClick={createTweet}>Create Tweet</Button>
      </div>
    </main>
  );
};

export default Home;

export const getTweets = async () => {
  const client = new Client();

  client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT || "")
    .setProject(process.env.NEXT_PUBLIC_PROJECT || "");

  const databases = new Databases(client);

  const tweets = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE || "",
    process.env.NEXT_PUBLIC_TWEETS_COLLECTION || ""
  );

  return {
    tweets,
  };
};
