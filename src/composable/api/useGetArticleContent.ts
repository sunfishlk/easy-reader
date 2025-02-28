import requests from "./useRequest"

export async function useGetArticleContent(id:number):Promise<any>{
  try{
    return await requests({
      method:'GET',
      url:`/passage/${id}`,
      params:{
        id:id
      }
    })
  }
  catch(err){
    console.log(err);
  }
}