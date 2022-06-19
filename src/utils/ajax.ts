import { request as umiRequest } from 'umi';

export const request = async <T>(url: string, options: Record<string, any>) => {
  const prefixUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://ktian-backend-michaelstarboardventures.vercel.app' + url
      : url;

  return await umiRequest(prefixUrl, options);
};
