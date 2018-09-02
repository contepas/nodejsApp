const MyCourses = require('./MyCourses');
const ren = require('./renderer');
const querystring = require('querystring');

const commonHeades = {'content-type': 'text/html'};

// handle HTTP route / with GET and POST
function home(req, res){   
    if(req.url === '/'){
        // if (url == to "/" and GET)
        if(req.method.toLowerCase() === 'get'){
            // show serch
            res.writeHead(200, commonHeades);
            ren.view('header', {}, res);
            ren.view('search', {}, res);
            ren.view('footer', {}, res);
            res.end();
        }else if (req.method.toLowerCase() === 'post'){
            // if (url == "/" and POST)
            // get POST data from the body
            req.on('data', postBody =>{
                console.log(postBody.toString());
                // extract skillName to search
                var query = querystring.parse(postBody.toString());
                res.writeHead(303, {'location':`/${query.skillname}`});
                // redirect to /<nameInfoToSearch>
                res.end();
            });
        }
    }
}


// handle HTTP route /<nameInfoToSearch> i.e. /javascript
function treeHouseSkills(req, res){
    const info = req.url.replace('/', '');
//  if (url == "/...")
    if(info.length > 0){
        res.writeHead(200, commonHeades);
        ren.view('header', {}, res);
        // get json from Treehouse
        const myCourses = new MyCourses('pasqualeconte', info);
        myCourses.on('end', data => {
            // on "end" show corrispondences
            ulContent = '';
            for (let badge in data){
                ulContent += `<li>${data[badge]}</li>\n`;
                // for (let course in data[badge]){
                //     ulContent += `<li>- ${data[badge][course]}</li>\n`;
                // }
            }
            ren.view('profile', {'ul':ulContent, 'skill': info}, res);
            ren.view('footer', {}, res);
            res.end();
        });
        myCourses.on('error', error => {
            ren.view('search', {}, res);
            ren.view('error', {errorMessage: error.message}, res);
            ren.view('footer', {}, res);
            res.end();
        });
    }    
}


module.exports.home = home;
module.exports.treeHouseSkills = treeHouseSkills;