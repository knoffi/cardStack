import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { button as DrawButton } from './core/draw/draw-button';
import { trpc } from './shared/trpc';
import { HTTPHeaders, httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  const [queryClient] = useState(() => new QueryClient());

  const headers: HTTPHeaders = {};
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
          // You can pass any HTTP headers you wish here
          async headers() {
            return headers;
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
      <div className="App">
        <DrawButton/>
    </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
