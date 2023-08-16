import React, { useEffect, useState } from 'react';
import { Tabs, Pagination, Alert } from 'antd';

import tmbd from '../../services/tmbd';
import { Context } from '../../context';
import { MovieList } from '../movieList';
import { SearchTab } from '../searchTab';
import { RatedTab } from '../ratedTab';
import { Spinner } from '../spinner';

import 'antd/dist/reset.css';
import './app.css';

export const App = () => {
  const [tmbdServices] = useState(new tmbd());
  const [movies, setMovies] = useState([]);
  const [ratedList, setRatedList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState('');
  const [activeKey, setActiveKey] = useState('search');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {});

  useEffect(() => {
    const createSession = () => tmbdServices.getGuestSession();
    const getGenres = () =>
      tmbdServices.getGenres().then((response) => {
        setGenres(response);
      });
    createSession();
    getGenres();
  }, []);

  const tabClick = (activeKey) => {
    if (activeKey === 'search') {
      setActiveKey('search');
    }
    if (activeKey === 'rated') {
      setActiveKey('rated');
      setPage(1);
    }
  };

  const items = [
    {
      key: 'search',
      label: 'Search',
      children: (
        <>
          <SearchTab
            page={page}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            setMovies={setMovies}
            ratedList={ratedList}
            query={query}
            setQuery={setQuery}
            activeKey={activeKey}
            setLoading={setLoading}
            setError={setError}
          />
        </>
      ),
    },
    {
      key: 'rated',
      label: 'Rated',
      children: (
        <>
          <RatedTab
            page={page}
            setMovies={setMovies}
            activeKey={activeKey}
            setRatedList={setRatedList}
            setTotalPages={setTotalPages}
            setLoading={setLoading}
            setError={setError}
          />
        </>
      ),
    },
  ];

  return (
    <Context.Provider value={{ tmbdServices, genres }}>
      <div className="app">
        <Tabs defaultActiveKey={items.key} centered items={items} onChange={tabClick}></Tabs>
        {error && <Alert type="error" message={error} />}
        {loading ? (
          <Spinner />
        ) : (
          <>
            <MovieList movies={movies} error={error} query={query} />
            <Pagination
              total={totalPages}
              current={page}
              showSizeChanger={false}
              defaultPageSize="1"
              hideOnSinglePage={true}
              onChange={(page) => {
                setPage(page);
              }}
            />
          </>
        )}
      </div>
    </Context.Provider>
  );
};
