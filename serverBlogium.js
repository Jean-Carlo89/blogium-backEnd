import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors());
app.use(express.json());


const posts = []
let IdCounter = 0


app.get("/posts" , (req,res)=>{

    res.send(posts)

})


app.post('/posts', (req, res) => {
    console.log(req.body)
    IdCounter++
    const id = IdCounter
    const post = req.body; 
    const comments = []
    const NewPost = {id,comments,...post}
    posts.push(NewPost);
    console.log(posts)
    res.send(NewPost);
  });
   

  app.get('/posts/:postId', (req, res) => {
    console.log(req.params)
    const postId = parseInt(req.params.postId)
    console.log(postId)

    const found = posts.find((item)=>item["id"]===postId)
    console.log(found)
    res.send(found)
  });


  app.post('/posts/:postId/comments', (req, res) => {
    console.log(req.params)
    console.log(req.body)
    
    const postId = parseInt(req.params.postId)
    console.log(postId)
    const found = posts.find((item)=>item["id"]===postId)
    const id = (found.comments.length)+1
    

    const comment = {id,postId,...req.body}
    
   found.comments.push(comment)
    console.log(found)

  });

  app.get('/posts/:postId/comments', (req, res) => {
    
    const postId = parseInt(req.params.postId)
    console.log(postId)

    const found = posts.find((item)=>item["id"]===postId)
    console.log(found)
    res.send(found.comments)

  });


app.listen(4000, ()=>{
    console.log('servidor rodando')
});