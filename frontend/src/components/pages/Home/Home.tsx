import { useEffect, useState } from 'react'
import { Accordion, Button, Card, Form, Input, Modal, PanelGroup } from 'rsuite'
import axios from 'axios';
import { NavLink } from 'react-router';

import TrashIcon from '@rsuite/icons/Trash';
import { Icon } from '@rsuite/icons';

export type Post = {
    id: string,
    title: string,
    description: string,
    comments: Comment[]
}

export type PostArray = Post[]

type Comment = {
    id: string,
    text: string,
    postId: string
}

const postInitState = {id: '', title: '', description: '', comments: []}

function Home() {
    const [posts, setPosts] = useState<PostArray>([])
    const [post, setPost] = useState<Post>(postInitState)

    const [comment, setComment] = useState('')

    const [openModule, setOpenModule] = useState(false)
    const handleOpenModule = (id: string) => {
        setPost({
            ...post,
            id
        })
        setOpenModule(true)
    }
    const handleCloseModule = () => {
        setPost(postInitState)
        setOpenModule(false)
    }

    async function deletePost(id: string){
        await axios.delete(`/api/posts?id=${id}`)
        window.location.reload()
    }

    async function handleEditPost(){
        await editPost(post).then(()=>{
            handleCloseModule()
            window.location.reload()
        })
        
    }

    async function editPost(post: Post){
        console.log('Отправляется - ',post)
        await axios.put(`/api/posts`, {
            id: post.id,
            title: post.title,
            description: post.description,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    async function handleSubmitComment(id: string) {
        if(comment.length > 3){
            await axios.post(`/api/posts/comment`, {
                post_id: id,
                text: comment,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setComment('')
        }
        else{
            console.log('Мало символов')
        }
    }
    
    useEffect(() => {
        async function fetchPosts(){
            const res = await axios.get('/api/posts')
            const data = res.data
            setPosts(data)
            console.log(data)
        }
        fetchPosts()
    }, []);

  return (
    <div style={{margin: '20px 20px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3>Посты</h3>
            <Button style={{height: 'min-content'}} as={NavLink} to={'/create'} appearance='primary' color='blue'>Create</Button>
        </div>
        
        <PanelGroup style={{margin: '10px 0'}}>
            {posts ?
                posts.map((post:Post, key) => (
                    post && (
                        <Card key={key} style={{marginTop: '20px'}}>
                            <div style={{display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Card.Header as="h5" style={{margin: '0 0 15px 0'}}>{post.title}</Card.Header>
                            <div style={{margin: '0 10px 0 0'}}>
                                <Button style={{height: 'min-content', fontSize: '20px', marginRight: '10px'}} onClick={()=> deletePost(post.id)} appearance='primary' color='red'><Icon as={TrashIcon}></Icon></Button>
                                <Button style={{height: 'min-content'}} onClick={()=> handleOpenModule(post.id)} appearance='primary' color='blue'> Update</Button>
                            </div>
                        </div>
                        <div style={{margin: '0 15px'}}>
                                {post.description}
                            <div style={{display: 'flex', justifyContent: 'space-between', margin: '0 15px 15px 15px'}}>
                                <Accordion style={{width: '100%'}}>
                                    <Accordion.Panel header="Комментарии:">
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <Input type='text' onChange={comm => setComment(comm)} />
                                            <Button style={{margin: '0 0 0 10px'}} onClick={() => handleSubmitComment(post.id)}>Submit</Button>
                                        </div>
                                    {post.comments ? 
                                        post.comments.map((comment)=>(
                                            <Card style={{marginTop: '20px', minHeight: '50px'}}>
                                                {comment.text}
                                            </Card>
                                        ))   
                                    :
                                    <div style={{marginTop: '20px', minHeight: '50px'}}>
                                        Нет комментариев
                                    </div>
                                    }
                                    </Accordion.Panel>
                                </Accordion>
                            </div>
                        </div>
                    </Card>
                    )
                ))
                :
                
                <Card style={{marginTop: '20px'}}>
                    <Card.Header as="h5" style={{margin: '0 0 15px 0'}}>{`No posts found  :(`}</Card.Header>
                    <div style={{margin: '0 15px 20px 15px'}}>
                        Сreate button is located in the upper right corner
                    </div>
                </Card>
            }
        </PanelGroup>
        <Modal backdrop='static' keyboard={false} open={openModule} onClose={handleCloseModule}>
            <Modal.Header>
                <Modal.Title>Update post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    formValue={post}
                    onChange={post => setPost(Object(post))}
                >
                    <Form.Group controlId="input">
                        <Form.ControlLabel>Title:</Form.ControlLabel>
                        <Form.Control name="title" />
                        <Form.HelpText tooltip>Post title.</Form.HelpText>

                        
                        <Form.ControlLabel>Description:</Form.ControlLabel>
                        <Form.Control name="desc" />
                        <Form.HelpText tooltip>Post description.</Form.HelpText>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button color='red' onClick={handleCloseModule} appearance="primary">
                    Cancel
                </Button>
                <Button onClick={handleEditPost} appearance="primary">
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Home