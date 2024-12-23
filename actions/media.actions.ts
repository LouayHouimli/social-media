import { Console } from "console";
import ImageKit from "imagekit";

export const authentMedia = async (): Promise<{
  token: string;
  expire: number;
  signature: string;
}> => {
  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
  });

  const authParams = imagekit.getAuthenticationParameters();
  return authParams;
};
