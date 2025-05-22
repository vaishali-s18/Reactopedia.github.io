import { useParams } from 'react-router-dom';
import { sampleArticles } from '../data/sampleData';

export default function EditPage() {
  const { id } = useParams();
  const article = sampleArticles.find(a => a.id === parseInt(id));

  if (!article) return <div>Article not found</div>;

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Edit: {article.title}</h1>
        <textarea 
          className="w-full h-64 p-4 border rounded-lg" 
          defaultValue={article.content}
        />
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}