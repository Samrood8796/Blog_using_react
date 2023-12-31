import React, { useEffect, useState } from 'react';
import EmptyList from '../../components/common/EmptyList/EmptyList';
import BlogList from '../../components/Home/BlogList';
import Header from '../../components/Home/Header/Header';
import SearchBar from '../../components/Home/SearchBar/SearchBar';
import { getBlogs } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs } from '../../state/userReducer';
import axios from '../../utils/axios';

const Home = () => {
  const dispatch = useDispatch()
  const [searchKey, setSearchKey] = useState('');

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const getAllBlogs = () => {
    axios.get(`${getBlogs}/${user._id}`).then((response) => {
      dispatch(setBlogs({data:response.data, searchKey:searchKey}))
    })
  }

  // Clear search and show all blogs
  const handleClearSearch = () => {
    setSearchKey('');
  };

  useEffect(() => { 
    getAllBlogs()
  }, [searchKey])
  return (
    <div>
      {/* Page Header */}
      <Header />
      {/* Search Bar */}
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        handleSearchKey={(e) =>{console.log(e.target.value); setSearchKey(e.target.value)}}
      />
      {/* Blog List & Empty View */}
      {!blogs?.length ? <EmptyList /> : <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;