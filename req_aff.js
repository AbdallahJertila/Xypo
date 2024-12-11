"use strict";
const nun=require('nunjucks');
const fs=require('fs');
const trait=function(req,res,query){
    let page;
    let marqueurs;
    page=fs.readFileSync('index.html','utf-8');
    marqueurs={};
    marqueurs.reponse="<h2></h2>";
    let body=nun.renderString(page,marqueurs);
    res.writeHead(200,{'content-Type':'text/html'});
    res.write(body);
    res.end();
}
module.exports=trait;