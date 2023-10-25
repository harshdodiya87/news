import '../src/index.css'
import { useStory } from '../context/StoriesProvider'

const Search = () => {

  const {query, searchPost} = useStory()
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input 
          className='searchbox'
          type="text" 
          placeholder='Search' 
          value={query}
          onChange={(e) =>searchPost(e.target.value)}
          />
      </form>
    </>
  )
}

export default Search