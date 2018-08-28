const https = require('https');
const EventEmitter = require('events');

class MyCourses extends EventEmitter{
    constructor(username, skillName){
        super();
        this.result = {};
        try{
            //Making the request to the API to get my updated badges
            const myCourses = https.get(`https://teamtreehouse.com/${username}.json`, response => {
                if(response.statusCode === 200){
                    //read and parse the data
                    let body = "";
                    response.on('data', data => {
                        body += data.toString();
                    });
                    response.on('end', () => {
                        try{
                            const profile = JSON.parse(body);
                            this.emit('end', this.badgesList(profile.badges, skillName));
                        }catch(error){
                            this.emit('error', error);
                        }
                    });
                } else {
                    const message = `There was an error getting my profile (${http.STATUS_CODES[response.statusCode]})`;
                    this.emit('error', new Error(message))
                }
            });
            myCourses.on('error', error => {
                this.emit('error', error);
            });
            //console.dir(result);
        } catch(error){
            this.emit('error', error);
        }
    }

    //===METHODS========
    //print out error messages
    // printError(error){
    //     console.error(error.message);
    // }

    //print out list of badges name and courses
    badgesList(badges, search){
        // This are all the courses related to <search>
        const courses = {};
        for (let badge of badges){
            if (badge.name.includes(search)){
                let arr = [];
                for (let course of badge.courses){
                    arr.push(course["title"]);
                }
                courses[badge.name] = arr;
            }
        }
        return courses;
    }
}

module.exports = MyCourses;