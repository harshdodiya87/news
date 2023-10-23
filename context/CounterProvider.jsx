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

    }
    
}

const initialState = {
    isloading: true,
    query: 'html',
    nbPages: 0,
    page: 0,
    hits: []
}

const CounterContext = createContext()

const CounterProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchApidata = async (url) => {
       
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
        fetchApidata(`${API}${state.query}`)
    }, [])

    return(
        <CounterContext.Provider value={{...state}}>
            {children}
        </CounterContext.Provider>
    )
}

const useCounter = () => {
    const context = useContext(CounterContext)

    return context

}

export {CounterProvider, useCounter}