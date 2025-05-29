import React from 'react';
import SocialMediaForm from './components/SocialMediaForm';
import RatingForm from './components/RatingForm';

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>
        React Forms Exercises
      </h1>
      
      <SocialMediaForm />
      <RatingForm />
    </div>
  );
};

export default App;