const MyCourses = require('./MyCourses');


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
//  if (url == "/...")
    if(info.length > 0){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('Header\n');
        // get json from Treehouse
        const myCourses = new MyCourses('pasqualeconte', info);
        myCourses.on('end', data => {
            // on "end" show corrispondences
            res.write(`Courses related to ${info}:\n`);
            for (let badge in data){
                res.write(`${data[badge]}\n`);
                for (let course in data[badge]){
                    res.write(`- ${data[badge][course]}\n`);
                }
            }
            res.end('Footer\n');
        });
        myCourses.on('error', error => {
            res.write(error.message + '\n');
            res.end('Footer\n');
        });
    }    
}


module.exports.home = home;
module.exports.treeHouseSkills = treeHouseSkills;