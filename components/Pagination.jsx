import { useStory } from "../context/StoriesProvider"
import '../src/index.css'

const Pagination = () => {
  
  const {page, nbPages, getNextPage, getPrevPage} = useStory()
  return (
    <div className="pagination">
      <button onClick={() => getPrevPage()}>PREV</button>
      <p>{page + 1} of {nbPages}</p>
      <button onClick={() => getNextPage()}>NEXT</button>
    </div>
  )
}

export default Pagination