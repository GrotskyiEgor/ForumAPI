import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './base/app.tsx'

import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { baseApi } from './api/baseApi.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApiProvider api={baseApi}>
            <App/>
        </ApiProvider>
    </StrictMode>,
);
