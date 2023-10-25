import React, {createContext, useContext, useEffect, useReducer } from "react";

const API = 'http://hn.algolia.com/api/v1/search?query='

const reducer = (state,action) => {
    // console.log(state.query)
    switch(action.type){
        case 'get_stories':
            return {
                ...state,
                hits: action.payload.hits,
                nbPages: action.payload.nbPages,
                isloading: false
            }
        case 'set_loading':
            return {
                ...state,
                isloading: true
            }

        case 'removepost':
            return {
                ...state,
                hits: state.hits.filter((curr) => (
                    curr.objectID !==    action.payload
                ))
                }

        case 'searchpost':
            return{
                ...state,
                query: action.payload
            }

        case 'getnextpage':
            let next = state.page + 1 

            if (next >= state.nbPages) {
                next = 0
                
            }
            return{
                ...state,
                page : next
            }
        case 'getprevpage':
            let currpage = state.page;

            if (currpage <= 0   ) {
                currpage = 0
            }else{
                currpage = currpage - 1
            }
            
            return{
                ...state,
                page: currpage
            }
    }
    
}


const initialState = {
    isloading: true,
    query: 'html',
    nbPages: 0,
    page: 0,
    hits: []
}



const StoryContext = createContext()

const StoryProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

        
    const removePost = (ID) => {
        dispatch({
            type: 'removepost',
            payload: ID
        })
    }  
    
    const searchPost = (val) => {
        dispatch({
            type: 'searchpost',
            payload: val
        })
    }

    const getPrevPage = () => {
        dispatch({
            type: 'getprevpage',
        })
    }

    const getNextPage = () => {
        dispatch({
            type: 'getnextpage'
        })
    }

    const fetchApidata = async (url) => {
        dispatch({type : 'set_loading'})
        const res = await fetch(url)
        const data = await res.json()
        dispatch({
            type: 'get_stories',
            payload: {
                hits: data.hits,
                nbPages: data.nbPages
            }
        })
       
    }

    useEffect(() => {
        fetchApidata(`${API}${state.query}&page=${state.page}`)
    }, [state.query, state.page])

    return(
        <StoryContext.Provider value={{...state, removePost, searchPost, getNextPage, getPrevPage}}>
            {children}
        </StoryContext.Provider>
    )
}

const useStory = () => {
    const context = useContext(StoryContext)

    return context

}

export {StoryProvider, useStory}