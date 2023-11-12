import { useRef, useState, useContext } from 'react';
import CountriesCard from './CountriesCard';
import { NavLink } from 'react-router-dom';
import { DarkModeContext } from '../App';
import { elementType } from '../util/types';
import { UseQueryResult } from 'react-query/types/react/types';


export default function HomePage({ fetchedCountries }: { fetchedCountries: UseQueryResult<elementType[]> }) {
    const darkMode = useContext(DarkModeContext);
    const [filter, setFilter] = useState<string>('');
    const [continent, setContinent] = useState<string>('');
    const continets: string[] = [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania',
    ];
    const searchBarRef = useRef<any>(null);

    return (
        <>
            <div className="gap-16 pb-4 mx-5 md:mx-16 flex:col md:flex">
                <form
                    className={`${darkMode ? 'text-white bg-dark-blue-element' : 'text-black bg-white'
                        } flex w-auto md:mr-auto md:w-1/3`}
                    onSubmit={(e: React.FormEvent<HTMLElement>) => e.preventDefault()}
                >
                    <img
                        src={
                            darkMode
                                ? 'public/glass-darkmode.svg'
                                : 'public/glass-lightmode.svg'
                        }
                        className="mx-4"
                        onClick={() => searchBarRef.current.focus()}
                    ></img>
                    <input
                        type="text"
                        ref={searchBarRef}
                        className={`${darkMode
                            ? 'text-white bg-dark-blue-element'
                            : 'text-black bg-white'
                            } p-4 w-full`}
                        placeholder="Search for a country..."
                        value={filter}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFilter(e.target.value)
                        }
                    ></input>
                </form>
                <select
                    defaultValue={'DEFAULT'}
                    className={`${darkMode ? 'text-white bg-dark-blue-element' : 'text-black bg-white'
                        } p-4 my-2 md:my-0`}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setContinent(e.target.value)
                    }
                >
                    <option value="DEFAULT" disabled hidden>
                        Filter by Region
                    </option>
                    {continets.map((data: string) => {
                        return (
                            <option key={data} value={data}>
                                {data}
                            </option>
                        );
                    })}
                </select>
            </div>
            <main
                className={`${darkMode
                    ? 'text-white bg-very-dark-blue-bg'
                    : 'text-black bg-very-light-grey-bg'
                    } grid sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8 mx-5 md:mx-16 `}
            >
                {fetchedCountries?.status === 'success'
                    ? filter === '' && continent === ''
                        ? fetchedCountries?.data.map((element: elementType) => {
                            return (
                                <NavLink
                                    to={`/${element.name.common
                                        .toLocaleLowerCase()
                                        .replace(/\s/g, '')}`}
                                    key={element.name.common}
                                >
                                    <CountriesCard
                                        img={element.flags.svg}
                                        alt={element.flags.alt}
                                        name={element.name.common}
                                        population={element.population}
                                        region={element.region}
                                        capital={element.capital}
                                        key={element.name.common}
                                    />
                                </NavLink>
                            );
                        })
                        : fetchedCountries.data
                            .filter((element: { name: { common: string } }) => {
                                return filter !== ''
                                    ? element.name.common
                                        .toLocaleLowerCase()
                                        .includes(filter.toLocaleLowerCase())
                                    : element;
                            })
                            .filter((element: { region: string }) => {
                                return continent !== ''
                                    ? element.region === `${continent}`
                                    : element;
                            })
                            .map(
                                (element: elementType) => {
                                    return (
                                        <NavLink
                                            to={`/${element.name.common
                                                .toLocaleLowerCase()
                                                .replace(/\s/g, '')}`}
                                            key={element.name.common}
                                        >
                                            <CountriesCard
                                                img={element.flags.svg}
                                                alt={element.flags.alt}
                                                name={element.name.common}
                                                population={element.population}
                                                region={element.region}
                                                capital={element.capital}
                                                key={element.name.common}
                                            />
                                        </NavLink>
                                    );
                                }
                            )
                    : null}
            </main>
        </>
    );
}
