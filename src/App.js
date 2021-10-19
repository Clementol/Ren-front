import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {Staff, Home} from "./Pages";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // refetchOnmount: false,
        // refetchOnReconnect: true,
        retry: 2,
      
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch >
          <Route path="/" strict exact component={Home} />
          <Route path="/all-staffs" strict exact component={Staff} />
        </Switch>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
