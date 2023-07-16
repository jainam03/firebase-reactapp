import React from 'react'
import { 
    getDocs, 
    collection, 
    addDoc, 
    deleteDoc, 
    doc, 
    updateDoc 
} from 'firebase/firestore'
import { db, auth } from '../config/firebase'
import { useState, useEffect } from 'react'

export default function Movies() {
    const [movieList, setMovieList] = useState([])

    //New movie states
    const [newMovieTitle, setNewMovietitle] = useState("")
    const [newReleaseDate, setNewReleaseDate] = useState(0)
    const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

    //update title state
    const [updatedTitle, setUpdatedTitle] = useState("")

    const moviesCollectionRef = collection(db, "movies")

    const getMovieList = async () => {
        try {
            const data = await getDocs(moviesCollectionRef)
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setMovieList(filteredData)
        } catch (err) {
            console.log(err);
        }
    };

    const deleteMovie = async (id) => {
        const movieDoc = doc(db, "movies", id)
        await deleteDoc(movieDoc)
    };

    const updateMovieTitle = async (id) => {
        const movieDoc = doc(db, "movies", id)
        await updateDoc(movieDoc, { title: updatedTitle })
    }

    useEffect(() => {
        getMovieList()
    }, [])

    const onSubmitMovie = async () => {
        try {
            await addDoc(moviesCollectionRef, {
                title: newMovieTitle,
                releaweDate: newReleaseDate,
                receivedAnOscar: isNewMovieOscar,
                userId: auth?.currentUser?.uid,
            });

            getMovieList()
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div>
                <h1>Movies collection</h1>
                <input
                    placeholder='Movie title...'
                    onChange={(e) => setNewMovietitle(e.target.value)}
                />

                <input
                    placeholder='Release Date'
                    type='number'
                    onChange={(e) => setNewReleaseDate(Number(e.target.value))}
                />

                <input
                    type='checkbox'
                    checked={isNewMovieOscar}
                    onChange={(e) => { setIsNewMovieOscar(e.target.checked) }}
                />

                <label> Received an Oscar </label>

                <button onClick={onSubmitMovie} >Submit movie</button>
            </div>

            <div>
                {movieList.map((movie) => (
                    <div>
                        <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }} >{movie.title}</h1>
                        <p>Date: {movie.releaseDate}</p>

                        <button onClick={() => deleteMovie(movie.id)} >Delete movie</button>

                        <input
                            placeholder='New title...'
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />

                        <button onClick={() => updateMovieTitle(movie.id)} >Update title</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
