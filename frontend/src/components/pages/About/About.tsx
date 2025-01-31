import { Stack } from 'rsuite'

function About() {
  return (
    <div style={{margin: '20px'}}>
        <h3>Sade216</h3>
        <h6>Created with Bun and TypeScript</h6>
        <hr />
        <h3>Stack:</h3>
        <div style={{margin: '20px'}}>
            <h4>Frontend:</h4>
            <Stack style={{fontSize: '1.2em'}} divider='|' spacing={10}>
                <code>Vite</code>
                <code>React</code>
                <code>React Router</code>
                <code>React Suite</code>
            </Stack>
        </div>
        <div style={{margin: '20px'}}>
            <h4>Backend:</h4>
            <Stack style={{fontSize: '1.2em'}} divider='|' spacing={10}>
                <code>Hono</code>    
                <code>PostgresSQL</code>
                <code>DrizzleORM</code>
            </Stack>
        </div>
    </div>
  )
}

export default About