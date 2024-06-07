import axios from 'axios';


async function fetchMovies() {
    try {
        const res = await axios.get("http://localhost:5500/movies");
        return res;
    } catch (error) {
        
    }
}

const http = {
    get : fetchMovies,
}

export default http