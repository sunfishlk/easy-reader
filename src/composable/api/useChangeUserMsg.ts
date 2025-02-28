import requests from "./useRequest"

export async function useChangeUserMsg(name:string,password:string):Promise<any>{
  try{
    return await requests({
      method:'PUT',
      url:'/user',
      data:{
        name:name,
        password:password
      }
    })
  }
  catch(err){
    console.log(err);
  }
}