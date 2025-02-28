import requests from "./useRequest";

export async function useRegister(name:string,password:string):Promise<any>{
  try {
    return await requests({
      method:'POST',
      url:'/user/registry',
      data:{
        name:name,
        password:password
      },
    })
  } catch (error) {
    console.log(error);
  }
}