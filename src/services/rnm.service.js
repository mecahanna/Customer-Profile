export const retrieveCharacters = async (page = "", name = "", status = "", gender = "",species ="") => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${name}&gender=${gender}&status=${status}&species=${species}`)
    return await response.json();
}