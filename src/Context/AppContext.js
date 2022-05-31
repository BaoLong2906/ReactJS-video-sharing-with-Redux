import {useState, createContext} from 'react';

const AppContext = createContext(
    {
        viewMode: '',
        setViewMode: () => {}
    }
);

export default AppContext;

// function AppProvider() {
//   return (
//     <AppContext.Provider>
      
//     </AppContext.Provider>
//   );
// }