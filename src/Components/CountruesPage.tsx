import { NavLink } from "react-router-dom";
import { DarkModeContext } from "../App";
import { useContext } from "react";
import { getCountryNameByCode } from "./countriesCode";
import { elementType } from "../util/types";

function CountriesPage({ props }: { props: elementType }) {
    const theme = useContext<boolean>(DarkModeContext);

    return (
        <main className="w-auto h-auto mx-5 mb-4 overflow-hidden md:mx-8">
            <NavLink to="/" className={`${theme ? "text-white bg-dark-blue-element" : "text-black bg-white"} my-8  px-12 py-2 flex w-32 justify-center content-center rounded-md`}>
                <img src={`${theme ? "public/arrow-darkmode.svg" : "public/arrow-lightmode.svg"} `} className="mr-2" />
                Back
            </NavLink>
            <div className="inset-0 grid w-auto h-auto md:grid-cols-2 md:gap-8">
                <div className="md:h-2/3">
                    <img src={props?.flags.svg} alt={props?.flags.alt} className="object-fill w-auto h-auto ml-auto mr-auto"></img>
                </div>
                <div className="flex flex-col items-start md:h-full">
                    <h1 className="my-4 text-3xl font-extrabold">{props?.name.common}</h1>
                    <div>
                        <p className="mb-2 font-bold">Native Name: <span className="text-dark-grey-input">{Object.values(props?.name.nativeName)[0].common}</span></p>
                        <p className="mb-2 font-bold">Populaton: <span className="text-dark-grey-input">{props?.population.toLocaleString("en-US")}</span></p>
                        <p className="mb-2 font-bold">Region: <span className="text-dark-grey-input">{props?.region}</span></p>
                        <p className="mb-2 font-bold">Sub Region: <span className="text-dark-grey-input">{props?.subRegion}</span></p>
                        <p className="mb-2 font-bold">Capital:<span className="text-dark-grey-input"> {props?.capital}</span></p>
                        <p className="mb-2 font-bold">Top Level Domain: <span className="text-dark-grey-input">{props?.tld[0]}</span></p>
                        <p className="mb-2 font-bold">Currencies: <span className="text-dark-grey-input">{Object.values(props?.currencies).map((currencies: { name: string }) => ` ${currencies.name}`).toLocaleString()}</span></p>
                        <p className="mb-2 font-bold">Languages: <span className="text-dark-grey-input">{Object.values(props?.languages).map((name: string) => ` ${name}`).toLocaleString()}</span></p>
                    </div>
                    <div className={`${props?.borders ? "block" : "hidden"}  grid grid-cols-3 xl:flex flex-wrap  gap-2 h-auto`}>
                        <div className="flex content-center justify-start col-span-3 py-2 font-bold xl:justify-center">Border Countries: </div>
                        {props?.borders ? props?.borders.map((element: string) => {
                            return <NavLink to={`/${getCountryNameByCode(element)?.toLocaleLowerCase().replace(/\s/g, "")}`} key={element} className={`${theme ? "text-white bg-dark-blue-element" : "text-black bg-white"} p-2 flex w-auto justify-center content-center rounded-md`}>{getCountryNameByCode(element)}</NavLink>
                        }) : null}
                    </div>
                </div>
            </div>
        </main >
    )
}

export default CountriesPage