import { useContext } from "react"
import { DarkModeContext } from "../App"

type propsType = {
    img: string,
    alt: string,
    name: string,
    population: number,
    region: string,
    capital: string[]
}

function CountriesCard({ img, alt, name, population, region, capital }: propsType) {
    const theme = useContext<boolean>(DarkModeContext);
    return (
        <div className={`${theme ? "text-white bg-dark-blue-element" : "text-black bg-white"} rounded-lg h-full`}>
            <div className="w-auto h-1/2">
                <img src={img} alt={alt} className="object-cover w-full h-full rounded-t-lg"></img>
            </div>
            <div className="p-6">
                <h2 className="py-4 text-xl font-extrabold">{name}</h2>
                <p><span className="font-semibold">Population: </span>{population.toLocaleString("en-US")}</p>
                <p><span className="font-semibold">Region:</span> {region}</p>
                <p><span className="font-semibold">Capital: </span>{capital?.map(element => { return `${element}` }).toLocaleString()}</p>
            </div>
        </div>
    )
}

export default CountriesCard