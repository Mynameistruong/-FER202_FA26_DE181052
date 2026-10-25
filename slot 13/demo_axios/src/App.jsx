import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout.jsx'
import AxiosDemo from './components/AxiosDemo.jsx'
import PostList from './components/PostList.jsx'
import CreatePost from './pages/CreatePost.jsx'
import EditPost from './pages/EditPost.jsx'
import PostDetail from './pages/PostDetail.jsx'
import RequestConfig from './pages/RequestConfig.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/posts" replace />} />
        <Route path="posts" element={<PostList />} />
        <Route path="posts/new" element={<CreatePost />} />
        <Route path="posts/:id" element={<PostDetail />} />
        <Route path="posts/:id/edit" element={<EditPost />} />
        <Route path="axios-demo" element={<AxiosDemo />} />
        <Route path="request-config" element={<RequestConfig />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
