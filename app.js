//Problem: I need a simple way to look at my teamtreehouse personal info from a web browser to get
//badge's and course's names who include <nameInfoToSearch>
//Solution: I will use Node.js to perform the profile look ups and serve my template via HTTP

//Plan the solution:
// 1. create a web server
// 2. handle HTTP route / with GET and POST
//    + if (url == to "/" and GET)
//      + show serch
//    + if (url == "/" and POST)
//      + redirect to /<nameInfoToSearch>
// 3. handle HTTP route /<nameInfoToSearch> i.e. /javascript
//    + if (url == "/...")
//      + get json from Treehouse
//        + on "end" show corrispondences
//        + on "error" show error
// 4. function that handle the reading of files and marge in values
//    + read from file and get a string
//    + marges values into string
