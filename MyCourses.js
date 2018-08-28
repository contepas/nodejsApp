const https = require('https');
const http = require('http');
const EventEmitter = require('events');

class MyCourses extends EventEmitter{
    constructor(username, skillName){
        super();
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
                            const allCourses = this.badgesList(profile.badges, skillName);
                            if(allCourses){
                                this.emit('end', allCourses, skillName);    
                            } else {
                                const message = `I had no ${skillName} courses on TreeHouse`;
                                this.emit('error', new Error(message));
                            }
                        }catch(error){
                            this.emit('error', error);
                        }
                    });
                } else {
                    const message = `There was an error getting my profile (${http.STATUS_CODES[response.statusCode]})`;
                    this.emit('error', new Error(message));
                }
            });
            myCourses.on('error', error => {
                this.emit('error', error);
            });
        } catch(error){
            this.emit('error', error);
        }
    }

    //===METHODS========

    //return badges and courses names, wich cointain <search>
    badgesList(badges, search){
        const courses = {};
        for (let badge of badges){
            if (badge.name.toLowerCase().includes(search.toLowerCase())){
                let arr = [];
                for (let course of badge.courses){
                    arr.push(course["title"]);
                }
                courses[badge.name] = arr;
            }
        }
        if(Object.keys(courses).length === 0){
            return false;
        }
        return courses;
    }
}

module.exports = MyCourses;