import requests from "./useRequest"

export async function useLogout():Promise<any>{
  try{
    return await requests({
      method:'DELETE',
      url:'/user'
    })
  }
  catch(err){
    console.log(err);
  }
}