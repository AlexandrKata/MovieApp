import React, { useContext, useEffect } from 'react';
import { debounce } from 'lodash';

import { Context } from '../../context';

import './searchTab.css';

export const SearchTab = ({
  page,
  setTotalPages,
  ratedList,
  setMovies,
  query,
  setQuery,
  activeKey,
  setLoading,
  setError,
}) => {
  const { tmbdServices } = useContext(Context);

  if (activeKey === 'search') {
    const getMovies = () =>
      tmbdServices.getMovies(query, page).then((response) => {
        if (response instanceof TypeError) {
          setLoading(false);
          setError(response.message);
          setMovies([]);
          return;
        }
        setTotalPages(response.total_pages);
        const movies = response.results.map((movie) => {
          const rated = ratedList.find((rated) => rated.id === movie.id);
          if (rated) {
            movie.rating = rated.rating;
          }
          return movie;
        });
        setLoading(false);
        setMovies(movies);
      });

    const changeQuery = (e) => {
      setQuery(e.target.value);
    };

    useEffect(() => {
      setLoading(true);
      getMovies();
    }, [query, page]);

    return (
      <input
        type="text"
        placeholder="Type to search..."
        className="search-form"
        onChange={debounce(changeQuery, 600)}
      />
    );
  }
};
