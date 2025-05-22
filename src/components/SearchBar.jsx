import { Form, InputGroup } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'

export default function SearchBar({ onSearch }) {
  return (
    <InputGroup className="mb-4">
      <Form.Control
        placeholder="Search articles..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <InputGroup.Text>
        <FaSearch />
      </InputGroup.Text>
    </InputGroup>
  )
}