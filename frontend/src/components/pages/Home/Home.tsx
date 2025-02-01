import { useEffect, useState } from 'react'
import { Accordion, Button, Card, Form, Modal, PanelGroup } from 'rsuite'
import axios from 'axios';
import { NavLink } from 'react-router';

import TrashIcon from '@rsuite/icons/Trash';
import { Icon } from '@rsuite/icons';

export type Post = {
    id: string,
    title: string,
    desc: string,
}

const postInitState = {id: '', title: '', desc: ''}

export type PostArray = Post[]

function Home() {
    const [posts, setPosts] = useState<PostArray>([])
    const [post, setPost] = useState<Post>(postInitState)

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
            desc: post.desc,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    
    useEffect(() => {
        async function fetchPosts(){
            const res = await axios.get('/api/posts')
            const data = res.data
            setPosts(data)
        }
        fetchPosts()
    }, []);

  return (
    <div style={{margin: '20px 20px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3>Posts</h3>
            <Button style={{height: 'min-content'}} as={NavLink} to={'/create'} appearance='primary' color='blue'>Create</Button>
        </div>
        
        <PanelGroup style={{margin: '10px 0'}}>
            {posts.length > 0 ?
                posts.map((post:Post) => (
                    <Card key={post.id} style={{marginTop: '20px'}}>
                        <Card.Header as="h5" style={{margin: '0 0 15px 0'}}>{post.title}</Card.Header>
                        <div style={{margin: '0 15px'}}>
                                {post.desc}
                            <div style={{display: 'flex', justifyContent: 'space-between', margin: '0 15px 15px 15px'}}>
                                <Accordion style={{width: '100%'}}>
                                    <Accordion.Panel header="Comments">
                                        {`No comments found  :(`}
                                    </Accordion.Panel>
                                </Accordion>
                                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                                    <Button style={{height: 'min-content', fontSize: '20px'}} onClick={()=> deletePost(post.id)} appearance='primary' color='red'><Icon as={TrashIcon}></Icon></Button>
                                    <Button style={{height: 'min-content'}} onClick={()=> handleOpenModule(post.id)} appearance='primary' color='blue'> Update</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
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
                <Modal.Title>Modal Title</Modal.Title>
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