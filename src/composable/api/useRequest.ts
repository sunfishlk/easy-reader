import axios from "axios";

const requests=axios.create({
  baseURL:'/api',
  timeout:5000,
})

requests.interceptors.response.use(
  res=>{
    if(res&&res.data){
      if(res.data.success){
        if(res.data.data) return res.data.data
        else return res.data.success
      }
      else{
        return Promise.reject(res.data.error);
      }
    }
    else{
      return Promise.reject("Error response");
    }
  },
  err=>{
    return Promise.reject(err.error)
  }
)

export default requests;