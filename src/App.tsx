import { useState, createContext, useEffect } from 'react';
import './App.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import CountriesPage from '../src/Components/CountruesPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import { elementType } from './util/types';

export const DarkModeContext = createContext<boolean>(false);
const fetchedDarkMode = JSON.parse(localStorage.getItem('theme') || 'false');

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(fetchedDarkMode);

  const fetchData = async () => {
    const data: elementType[] = await axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => res.data)
      .catch((err) => console.error(err));
    return data;
  };
  const fetchedCountries = useQuery({
    queryKey: 'Countries',
    queryFn: fetchData,
    enabled: true,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(darkMode));
  }, [darkMode]);
  fetchedCountries.data
  return (
    <div
      className={`${darkMode
        ? 'text-white bg-very-dark-blue-bg'
        : 'text-black bg-very-light-grey-bg'
        } inset-0 w-full h-full fixed overflow-auto`}
    >
      <BrowserRouter>
        <header
          className={`flex items-center justify-center h-[72px] ${darkMode
            ? 'text-white bg-dark-blue-element'
            : 'text-black bg-very-light-grey-bg'
            } mb-4`}
        >
          <a href="/" className="p-6 mr-auto font-extrabold">
            <h1>Where in the word?</h1>
          </a>
          <div className="flex p-6">
            <img
              src={
                darkMode
                  ? 'public/moon-darkmode.svg'
                  : 'public/moon-lightmode.svg'
              }
              className="h-auto"
            ></img>
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="ml-1 font-semibold"
            >
              Dark mode
            </button>
          </div>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <DarkModeContext.Provider value={darkMode}>
                <HomePage
                  fetchedCountries={fetchedCountries}
                />
              </DarkModeContext.Provider>
            }
          />
          {fetchedCountries.status === 'success'
            ? fetchedCountries.data.map((element: elementType) => (
              <Route
                path={`/${element.name.common
                  .toLocaleLowerCase()
                  .replace(/\s/g, '')}`}
                key={element.name.common}
                element={
                  <DarkModeContext.Provider value={darkMode}>
                    <CountriesPage
                      props={element}
                      key={element.name.common}
                    />
                  </DarkModeContext.Provider>
                }
              />
            ))
            : null}
        </Routes>
      </BrowserRouter>
      <div></div>
    </div>
  );
}

export default App;
