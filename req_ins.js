"use strict";
const req_style=require('./req_style.js');
const fs=require('fs');
const nun=require('nunjucks');
const trait=function(req,res,query){
    let page;
    let trouve=false;
    let contenu;
    contenu=fs.readFileSync('membres.json','utf-8');
    console.log(contenu);
    let list=JSON.parse(contenu);
    for(let i=0;i<list.length;i++){
        if(list[i].mail==query.mail){
            trouve=true;
        }
    }
    if(trouve==true){
        page=fs.readFileSync('index.html','utf-8');
        let marqueurs={};
        marqueurs.name="";
        marqueurs.mail="";
        marqueurs.password="";
        marqueurs.reponse="<h2>desolé ce compte existe déja </h2>"
        let body=nun.renderString(page,marqueurs);
        res.writeHead(300,{'content-Type':'text/html'});
        res.write(body);
        res.end();
    }
    else{
        page=fs.readFileSync('index.html','utf-8');
        req_style;
        let objet={};
        objet.name=query.name;
        objet.mail=query.mail;
        objet.password=query.password;
        list.push(objet);
        console.log(list);
        let chaine=JSON.stringify(list);
        fs.writeFileSync('membres.json',chaine,'utf-8');
        let marqueurs={};
        marqueurs.name="";
        marqueurs.mail="";
        marqueurs.password="";
        marqueurs.reponse="<h2>vous étes bien enregitrée </h2>"
        let body=nun.renderString(page,marqueurs);
        res.writeHead(200,{'content-Type':'text/html'});
        res.write(body);
        res.end();       

    }
}
module.exports=trait;