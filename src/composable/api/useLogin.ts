import { throwError } from "element-plus/es/utils/error.mjs";
import requests from "./useRequest";

export async function useLogin(name:string,password:string) :Promise<any>{
  try{
    return await requests({
      method:'POST',
      url:'/user',
      data:{
        name:name,
        password:password
      }
    })
  }
  catch(e){
    console.log(e);
    //向上级抛出错误
    throw e;
  }
}