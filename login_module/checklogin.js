module.export=function(req,res,next){
	if(!req.session.uid){
		res.redirect('/fast_login.html');
	}
	else{
		next();
	}
}