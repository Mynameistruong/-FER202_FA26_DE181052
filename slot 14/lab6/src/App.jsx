
import AxiosDemo from './components/AxiosDemo.jsx';
import PostList from './components/PostList.jsx';
import CreatePost from './components/CreatePost.jsx';
import UpdatePost from './components/UpdatePost.jsx';
import PatchPost from './components/PatchPost.jsx';
import DeletePost from './components/DeletePost.jsx';
import RequestConfig from './components/RequestConfig.jsx';

export default function App() {
  const components = [
    AxiosDemo,
    PostList,
    CreatePost,
    UpdatePost,
    PatchPost,
    DeletePost,
    RequestConfig,
  ];

  return (
    <main className="container">
      <h1>Lab 6 - Axios nâng cao</h1>
      <p>Thực hành async/await với React và Axios</p>

      <div className="grid">
        {components.map((Component, index) => (
          <section className="panel" key={index}>
            <Component />
          </section>
        ))}
      </div>
    </main>
  );
}
