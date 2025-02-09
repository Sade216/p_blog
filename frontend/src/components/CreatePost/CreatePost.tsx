import { Button, Form } from "rsuite"
import { Post } from "../pages/Home/Home"
import { useState } from "react"
import axios from "axios"
import { NavLink } from "react-router"


const postInitState = {title: '', description: ''}

type PostEdit = Omit<Post, 'id' | 'comments'>

function CreatePost() {
    const [post, setPost] = useState<PostEdit>(postInitState)

    async function handleSubmit(){
        console.log(post)
        if(post.title.length > 3 && post.description.length > 3){
            await axios.post(`/api/posts`, {
                title: post.title,
                description: post.description,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setPost(postInitState)
        }
        else{
            console.log('Мало символов')
        }
    }

    function handleClearFrom(){
        setPost(postInitState)
    }
    
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <Form style={{maxWidth: '500px', width: '70vw', margin: '20px 0'}}fluid onChange={post => setPost(Object(post))} formValue={post}>
                <h3 style={{margin: '0 0 15px 0'}}>Create New Post:</h3>
                <Form.Group >
                    <Form.ControlLabel>Title:</Form.ControlLabel>
                    <Form.Control name="title" />
                    <Form.HelpText>The title of the new post. Minimum of 4 characters.</Form.HelpText>
                </Form.Group>
                <Form.Group >
                    <Form.ControlLabel>Description:</Form.ControlLabel>
                    <Form.Control name="description"/>
                    <Form.HelpText>The description of the new post. Minimum of 4 characters.</Form.HelpText>
                </Form.Group>
                <Form.Group style={{display: 'flex',justifyContent: 'space-between'}}>
                    <Button color='blue' as={NavLink} to='/' appearance="ghost">
                        Home page
                    </Button>
                    <Button color='red' onClick={handleClearFrom} appearance="primary">
                        Clear form
                    </Button>
                    <Button onClick={handleSubmit} appearance="primary">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default CreatePost