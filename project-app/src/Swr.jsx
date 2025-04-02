import useSWR from "swr";

export default function Swr(dataSource) {

    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    // const link = "localhost:3000/api/" + dataSource;
    const link = "https://restcountries.com/v2/" + dataSource;


    const Swr = () => {
        const {
            data: countries,
            error,
            isValidating,
        } = useSWR(link, fetcher);

        // Handles error and loading state
        if (error) return <div className='failed'>failed to load</div>;
        if (isValidating) return <div className="Loading">Loading...</div>;

        return (
            <div>
                {countries &&
                    countries.map((country, index) => (
                        <img key={index} src={country.flags.png} alt='flag' width={100} />
                    ))}
            </div>
        );
    };
}