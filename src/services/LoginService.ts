import axios, { AxiosResponse, ResponseType } from 'axios'

export class LoginService {
    public static async login(username: string, password: string) : Promise<AxiosResponse> {
      const url = `http://localhost:8080/api/users/login`
      return await axios.post(url, {"username": username, "password": password}, {withCredentials: true}).catch(error => {
        return(error.response.status, error.response.data.message)
      })
    }
}
