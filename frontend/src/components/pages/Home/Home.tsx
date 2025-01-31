import { useEffect, useState } from 'react'
import { Accordion, Card, PanelGroup, Placeholder } from 'rsuite'
import axios from 'axios';

export interface Post {
    id: string,
    title: string,
    desc: string,
}

export type PostArray = Post[]

function Home() {
    const [posts, setPosts] = useState<PostArray>([])

    useEffect(() => {
        async function fetchPosts(){
            const res = await axios.get('/api/posts')
            const data = res.data
            setPosts(data)
        }
        fetchPosts()
    }, []);

  return (
    <div>
        
        <PanelGroup style={{marginLeft: '20px', marginRight: '20px'}}>
            {posts ?
                posts.map((post:Post) => (
                    <Card key={post.id} style={{marginTop: '20px'}}>
                        <Card.Header as="h5" style={{margin: '0 0 15px 0'}}>{post.title}</Card.Header>
                        <div style={{margin: '0 15px'}}>
                            {post.desc}
                            <Accordion style={{margin: '15px 0'}}>
                                <Accordion.Panel header="Comments">
                                    <Placeholder.Paragraph />
                                </Accordion.Panel>
                            </Accordion>
                        </div>
                    </Card>
                ))
                :
                <Card style={{marginTop: '20px'}}>
                    <Card.Header as="h5" style={{margin: '0 0 15px 0'}}><Placeholder.Paragraph  active/></Card.Header>
                    <div style={{margin: '0 15px 20px 15px'}}>
                        <Placeholder.Paragraph  active/>
                    </div>
                </Card>
            }
        </PanelGroup>
    </div>
  )
}

export default Home