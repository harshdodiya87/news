import { useStory } from '../context/StoriesProvider'

const Stories = () => {

    const {hits, isloading, removePost} = useStory()
    if (isloading) {
        return <h2>Loading.....</h2>
    }

    return (
        <div className="stories-div">
        {   
            hits.map((curr) => {
                const { title, author, objectID, url, num_comments } = curr
                return(
                    <div className="card" key={objectID}>
                        <h2>{title} </h2>
                        <p>
                            
                            By <span> {author} </span> | <span> {num_comments} </span> comments
                        
                        </p>
                        <div className="card-button">
                            <a href={url} rel='noreferrer' target="_blank">
                            Read More
                            </a>
                            <button onClick={() => removePost(objectID) }>
                            Remove
                            </button>
                        </div>
                    </div>
                )
                
            })
        }
        </div>
    )
}

export default Stories