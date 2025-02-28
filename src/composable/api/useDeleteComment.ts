import requests from "./useRequest";

export async function useDeleteComment(id:number):Promise<any> {
  try{
    return await requests({
      method:'DELETE',
      url:`/comment?id=${id}`,
    })
  }
  catch(e){
    console.log(e);
  }
}