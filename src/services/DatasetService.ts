import axios, { AxiosResponse, ResponseType } from 'axios'

export class DatasetService {
    public static async getDatasetInfo(datasetId: string) : Promise<AxiosResponse> {
      const url = `http://localhost:8080/api/datasets/${datasetId}`
      return await axios.get(url, {}).catch(error => {
        return(error.response.status, error.response.data.message)
      })
    }
}
