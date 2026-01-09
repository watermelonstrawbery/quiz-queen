export async function fetchQuestion(URL){
    const returnValue = fetch(URL);

    const awaited = await (await returnValue).json();
    //console.log("Awaited Results");
    //console.log(awaited.results);
    return awaited.results;
}