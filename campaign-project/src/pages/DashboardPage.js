import React from 'react';
import NavbarComponent from '../components/NavbarComponent';

const DashboardPage = () => {

 
      

      
    

  return (
    <div className='dashboard' style={{ display: 'flex',
    background: 'rgb(255, 255, 255)',font: 'rgb(0,0,0)',
    fontFamily:'"Ubuntu", sans-serif;',width: '100%' }}>
    
    <div className='row'>
          <div className='col-5' style={{ textAlign:'center' }}>
       <div className='navbar-container' style={{width: '100%', backgroundColor: 'rgb(0,0,0)',color: 'rgb(255, 255, 255)',padding: '0px'}}>
        <NavbarComponent />
      </div>
      </div>
      <div  className='col-7'>
      Dashboard page
      </div>
      </div>
            
            
    </div>
  );
};

export default DashboardPage;