import { useEffect, useContext } from 'react';
import propTypes from 'prop-types';

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

RatedTab.propTypes = {
  page: propTypes.number,
  setTotalPages: propTypes.func,
  setMovies: propTypes.func,
  activeKey: propTypes.string,
  setRatedList: propTypes.func,
  setLoading: propTypes.func,
  setError: propTypes.func,
};

RatedTab.defaultProps = {
  page: 1,
  setTotalPages: () => {},
  setMovies: () => {},
  activeKey: '',
  setRatedList: () => {},
  setLoading: () => {},
  setError: () => {},
};
