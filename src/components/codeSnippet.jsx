import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FaCopy } from 'react-icons/fa';

export default function CodeSnippet({ language, code }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 p-1 bg-gray-700 rounded text-white hover:bg-gray-600"
        title="Copy code"
      >
        <FaCopy className="text-sm" />
      </button>
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{
          borderRadius: '0.5rem',
          padding: '1.25rem',
          fontSize: '0.9rem'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}