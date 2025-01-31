import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";

import 'rsuite/dist/rsuite.min.css'
import './index.css'

import { CustomProvider } from 'rsuite';

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CustomProvider theme="dark">
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CustomProvider>
    </StrictMode>,
)
