import "./App.css";
import axios from 'axios';
import React, {useState, useEffect} from "react";
import Post from "./components/Post";
import Pagination from "./components/Pagination";

function App() {

const [posts, setPosts] = useState([]);
const [loading, setLoading]= useState(false);
const [currentPage, setCurrentpage] = useState(1);
const [postsPerPage ] = useState(10);

useEffect(() =>{
  const fetchPosts = async() => {
    setLoading(true);
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    setPosts(res.data);
    setLoading(false);
  }

  fetchPosts();
}, [])


//get current post

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

//change page

const paginate = (pageNumber) => setCurrentpage(pageNumber)

  return (
    <div className="container">
      <h1 className="text-primary mb-3">My pagenation</h1>
    <Post posts={currentPosts} loading={loading}/>
    <Pagination 
    paginate={paginate}
    postsPerPage={postsPerPage} totalPosts={posts.length}/>
    </div>
  );
}

export default App;
