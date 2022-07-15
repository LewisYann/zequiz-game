import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";

export const createUrqlClient = (ssrExchange: any) => ({
  url: process.env.NEXT_PUBLIC_BACK_END_URL! || "http://localhost:4000/graphql",
  exchanges: [dedupExchange, cacheExchange({}), ssrExchange, fetchExchange],
  fetchOptions: () => {
    console.log('using')
    return {
      headers: {
        credentials: 'include'
      }
    }
  }

});
