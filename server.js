const express=require('express');
const fs=require('fs');
const hbs=require('hbs');
const port=process.env.PORT ||3000;

var app=express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('viewengine','hbs');

app.use((req,res,next)=>{
	var now=new Date().toString();
console.log(`${now}:${req.method} ${req.path}`);
var log=`${now}:${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log+'\n')
	next();
	
});
//app.use((req,res,next)=>{
//	res.render('maintenance.hbs');
//});
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
}
);
hbs.registerHelper('screamit',(text)=>{
	return text.toUpperCase();
});
	
app.get('/',(req,res)=>{
//res.send('<h1>It Is express</h1>');
res.render('home.hbs',{
	pageTitle:'Home Page',
	
	welcome:'Pls welcome'
})

})

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
	pageTitle:'About page',
	
	
	});
})
;
app.listen(port,()=>{
console.log(`server is ${port}`);
	
});