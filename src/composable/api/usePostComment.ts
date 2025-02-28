import requests from "./useRequest";

export async function usePostComment(passageId:number,paragraph:number,marked:string,comment:string):Promise<any> {
  try{
    return await requests({
      method:'POST',
      url:'/comment',
      data:{
        passageId:passageId,
        paragraph:paragraph,
        marked:marked,
        comment:comment,
      }
    })
  }
  catch(e){
    console.log(e);
  }
}