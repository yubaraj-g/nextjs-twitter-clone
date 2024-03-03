import { Account, Client } from "appwrite";

const useInitDB = () => {
  const client = new Client();
  const account = new Account(client);

  client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT || "")
    .setProject(process.env.NEXT_PUBLIC_PROJECT || "");

  return {
    account,
  };
};

export default useInitDB;
