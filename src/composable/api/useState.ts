import requests from "./useRequest";

export async function useState():Promise<any>{
  try{
    return await requests({
      method:'GET',
      url:'/user/state',
    })
  }
  catch(e){
    console.log(e);
  }
}