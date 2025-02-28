import requests from "./useRequest"

export async function useGetArticleList(page: number, limit: number, type: string = '') :Promise<any>{
  try {
    return await requests({
      method: 'GET',
      url: `/passagelist?page=${page}&type=${type}&limit=${limit}`
    })
  }
  catch (err) {
    console.log(err);
  }
}