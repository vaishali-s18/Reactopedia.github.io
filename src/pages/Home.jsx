import Search from '../components/Search';
import { sampleArticles } from '../data/sampleData';

export default function Home() {
  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-3xl mx-auto">
        <Search articles={sampleArticles} />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Featured Articles</h2>
          {/* Featured articles list */}
        </div>
      </div>
    </div>
  );
}