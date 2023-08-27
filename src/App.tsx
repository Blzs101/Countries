import { useState, createContext, useEffect, } from "react"
import "./App.css"
import { useQuery } from "react-query";
import axios from "axios";
import CountriesPage from "../src/Components/CountruesPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";

export const DarkModeContext = createContext<boolean>(false);
const fetchedDarkMode = JSON.parse(localStorage.getItem("theme") || "false");

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(fetchedDarkMode);

  const fetchData = async () => {
    const data = await axios.get("https://restcountries.com/v3.1/all").then(res => res.data).catch(err => console.error(err))
    return data;
  }
  const fetchedCountries = useQuery({
    queryKey: "Countries",
    queryFn: fetchData,
    enabled: true,
    refetchOnWindowFocus: false
  })
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode))
  }, [darkMode])
  return (
    <div className={`${darkMode ? "text-white bg-very-dark-blue-bg" : "text-black bg-very-light-grey-bg"} inset-0 w-full h-full fixed overflow-auto`}>
      <BrowserRouter >
        <header className={`flex items-center justify-center h-[72px] ${darkMode ? "text-white bg-dark-blue-element" : "text-black bg-very-light-grey-bg"} mb-4`}>
          <a href="/Countries" className="p-6 mr-auto font-extrabold"><h1>Where in the word?</h1></a>
          <div className="flex p-6">
            <img src={darkMode ? "public/moon-darkmode.svg" : "public/moon-lightmode.svg"} className="h-auto"></img>
            <button type="button" onClick={() => setDarkMode(!darkMode)} className="ml-1 font-semibold">Dark mode</button>
          </div>
        </header>
        <Routes>
          <Route path="/Countries" element={
            <DarkModeContext.Provider value={darkMode}>
              <HomePage darkMode={darkMode} fetchedCountries={fetchedCountries} />
            </DarkModeContext.Provider>} />
          {fetchedCountries.status === "success"
            ? fetchedCountries.data.map((element: { flags: { svg: string; alt: string; }; name: { common: string, nativeName: object }; population: number; region: string; capital: string; subregion: string; tld: string[]; languages: string; currencies: string; borders: string[] }) => (
              <Route path={`/Countries/${element.name.common.toLocaleLowerCase().replace(/\s/g, "")}`} key={element.name.common} element={
                <DarkModeContext.Provider value={darkMode}>
                  <CountriesPage img={element.flags.svg} alt={element.flags.alt} name={element.name.common} nativeName={element.name.nativeName} population={element.population} region={element.region} subRegion={element.subregion} capital={element.capital} domain={element.tld?.[0]} currencies={element.currencies} languages={element.languages} borders={element.borders} key={element.name.common} />
                </DarkModeContext.Provider>
              } />
            ))
            : null
          }
        </Routes>
      </BrowserRouter>
      <div>

      </div>
    </ div>
  )
}

export default App

