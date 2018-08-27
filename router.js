// handle HTTP route / with GET and POST
function home(req, res){   
//  + if (url == to "/" and GET)
    if(req.url === '/'){
    //  + show serch
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('Header\n');
        res.write('Search\n');
        res.end('Footer\n');
    }
    //  + if (url == "/" and POST)
    //    + redirect to /<nameInfoToSearch>
}
// handle HTTP route /<nameInfoToSearch> i.e. /javascript
function treeHouseSkills(req, res){
    const info = req.url.replace('/', '');
//  + if (url == "/...")
    if(info.length > 0){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('Header\n');
        res.write(info + '\n');
        res.end('Footer\n');
    //  + get json from Treehouse
    //  + on "end" show corrispondences
    //  + on "error" show error
    }    
}

module.exports.home = home;
module.exports.treeHouseSkills = treeHouseSkills;