const express = require("express");
const app = express();
const morgan = require("morgan")

// app.use(morgan("tiny"));
// app.use((req,res, next) => {
// 	console.log("HACKED");
// 	return next();
// 	console.log("AFTER CALL")
// })
// app.use((req,res, next) => {
// 	console.log("HACKED TWICE");
// 	next();
// })

// *****************MIDDLEWARE*****************
app.use(morgan("tiny"));
app.use((req,res,next) => {
	// console.log(req.method, req.path);
	req.requestTime = Date.now();
	next();
});
app.use("/dogs",(req,res,next) => {
	console.log("THIS IS THE DOGS ROUTE");
	next()
})

const auth = (req,res,next) => {
	const {password} = req.query;
	// console.log(req.query.password, password)
	if(password === "545867"){
		next();
	}
		res.send("INCORECT PASSWORD")
}

app.get("/", (req,res) => {
	console.log(req.requestTime)
	res.send("HOME PAGE");
})

app.get("/dogs", (req,res) => {
	res.send("WOOF WOOF");
})
app.get("/secret",auth, (req,res) => {
	res.send("THIS IS THE SECRET PAGE");
})

app.use((req,res,next) => {
	res.status(404).send("PAGE NOT FOUDN");
})

app.listen(3000, () => {
	console.log("Server running on port 3000");
})