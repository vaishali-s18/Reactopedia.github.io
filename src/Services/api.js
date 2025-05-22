import axios from 'axios'

const api = axios.create({
  baseURL: 'https://your-api-endpoint.com/api',
  timeout: 10000
})

export const getArticles = async () => {
  const response = await api.get('/articles')
  return response.data
}

export const createArticle = async (articleData) => {
  const response = await api.post('/articles', articleData)
  return response.data
}