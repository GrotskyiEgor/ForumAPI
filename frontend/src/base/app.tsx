import links from "../data/links";

import Main from "./main/main";
import Header from "./header/header";

import { useGetPostsQuery } from "../api/baseApi";


export function App() {
    const {data, isLoading, isError} = useGetPostsQuery()
    console.log(data)

    return (
        <div>
            <Header title="Добрый" links={links} />

            { isLoading && <p>data is loading</p> }
            { isError && <p>error</p> }

            { !isLoading && data ? <Main posts={data}/>: <p>No products</p>}
        </div>
    );
}


