export function decodeString(string){
    var decodedString = string.replaceAll("&#039;", "'");
    decodedString = decodedString.replaceAll("&amp;", "&");
    decodedString = decodedString.replaceAll("&quot;", "\"");
    return decodedString;
}