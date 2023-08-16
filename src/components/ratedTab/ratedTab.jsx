import { useEffect, useContext } from 'react';

import { Context } from '../../context';

export const RatedTab = ({ page, setTotalPages, setMovies, activeKey, setRatedList, setLoading, setError }) => {
  const { tmbdServices } = useContext(Context);

  if (activeKey === 'rated') {
    const getRatedMovies = () => {
      tmbdServices.getRatedMovie(page).then((response) => {
        if (response instanceof TypeError) {
          setLoading(false);
          setError(response.message);
          return;
        }
        setMovies(response.results);
        setRatedList(response.results);
        setTotalPages(response.total_pages);
        setLoading(false);
      });
    };
    useEffect(() => {
      setLoading(true);
      getRatedMovies(page);
    }, [page]);
  }
};
