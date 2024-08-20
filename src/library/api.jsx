import axios from 'axios';



export default function createAxiosInstance() {
    const instance=axios.create({baseURL:'https://ecommerce.routemisr.com/api/v1'})
return instance
}
