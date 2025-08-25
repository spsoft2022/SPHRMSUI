import React from 'react'
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Settings() {
  return (
    <div className="app-container">
             <Header />
             <div className="app-body d-flex">
               <Sidebar />
               <main className="app-content flex-grow-1 p-3">
       <h1>Settings</h1>
                 {/* Add your dashboard content here */}
               </main>
             </div>
             <Footer />
           </div>
  )
}

export default Settings