"use strict";
const http=require('http');
const url=require('url');
const req_ins=require('./req_ins.js');
const req_aff=require('./req_aff.js');
const req_style=require('./req_style.js')
const traiter=function(req,res){
    let urlParsed=url.parse(req.url,true);
    console.log('requéte recu :'+req.url)
    let pathname=urlParsed.pathname;
    let query=urlParsed.query;
    try{
        switch(pathname){
            case('/'):
            case('/req_aff'):
               req_aff(req,res,query);
               break;
            case('/style.css'):
            case('/menu.png'):
            case('/offer.png'):
            case('/pic-1.png'):
            case('/pic-2.png'):
            case('/pic-3.png'):
            case('/about.png'):
            case('/contact.png'):
            case('/course.png'):
            case('/facebook.png'):
            case('/instagram.png'):
            case('/linkedin.png'):
            case('/logo.png'):
            case('/twitter.png'):
               req_style(req,res,query,pathname);
               break;
            case('/req_ins'):
               req_ins(req,res,query);
               break;
            
            default:
               res.writeHead(404, { 'Content-Type': 'text/html' });
               res.end('<h1>404 Not Found</h1><p>The requested URL was not found on this server.</p>');
               break;
        }
    }
     catch (error) {
    console.error('Error handling request:', error);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('<h1>500 Internal Server Error</h1><p>An unexpected error occurred.</p>');
}
};
let serveur=http.createServer(traiter);
serveur.listen(5500);
console.log("exution en cours");
