import links from "../data/links"

import Main from "./main/main"
import Header from "./header/header"

import { useGetPostsQuery } from "../api/baseApi"

export function App() {
    const { data, isLoading, isError } = useGetPostsQuery()

    return (
        <div>
            <Header title="Добрый" links={links} />

            {isLoading && <p>Загрузка...</p>}
            {isError && <p>Не удалось загрузить посты</p>}
            {data && <Main posts={data} />}
        </div>
    )
}