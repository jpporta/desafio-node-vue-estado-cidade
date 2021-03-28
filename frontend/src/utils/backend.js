import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3333/api',
  headers: {
    'x-api-key': '%7M!$)Y7A(Md25T@y2XXM0$ce$b4(k648mD%j0g%ptp(*UgA12'
  }
})

export { instance }