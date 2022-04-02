export function fetchPopulateRepos(language) {
    const url = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.items) {
                throw new Error(data.message)
            }

            return data.items
        })
}