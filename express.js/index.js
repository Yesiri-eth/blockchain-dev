const express =require("express")

const app = express()

// a route
app.get('', async function(req, res) {
    res.send("welcome to my server get request")
})
app.post('', async function(req, res) {
    res.send(" whrer are you going today")
})
app.get('/profile/:id', async function(req, res) {
    const user = req.params.id;
    if (user==="admin")
        return res.status(500).json({user})
res.json({user, message:"ok"})
    
})
app.delete('', async function(req, res) {
    res.send("you want to delete this???")
})
app.listen(8000, function(){console.log ("server ti bere")})