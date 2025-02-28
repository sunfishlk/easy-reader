import requests from "./useRequest";

export async function useChangeComment(id:number,comment:string):Promise<any> {
  try{
    return await requests({
      method:'PUT',
      url:'/comment',
      data:{
        id:id,
        comment:comment,
      }
    })
  }
  catch(e){
    console.log(e);
  }
}