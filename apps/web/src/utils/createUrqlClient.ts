import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";

export const createUrqlClient = (ssrExchange: any) => ({
  url: process.env.NEXT_PUBLIC_BACK_END_URL!,
  exchanges: [dedupExchange, cacheExchange({}), ssrExchange, fetchExchange],
});
