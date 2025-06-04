import { sampleArticles } from "../data/sampleData";
import { Link } from "react-router-dom";

export default function Hooks() {
  const hooksArticles = sampleArticles.filter(article =>
    article.categories?.includes("Hooks")
  );

  return (
    <div className="content-section">
      <h2>React Hooks Articles</h2>
      <ul>
        {hooksArticles.map(article => (
          <li key={article.id}>
            <Link to={`/article/${article.slug}`}>{article.title}</Link>
            <p>{article.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}