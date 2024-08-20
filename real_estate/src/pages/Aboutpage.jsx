import React from 'react';

const Aboutpage = () => {
  // Define the container style for the full-page background image
  const containerStyle = {
    position: 'relative',
    backgroundImage: 'url(https://imgs.search.brave.com/AY4HlGuhmWU-F9pLt7GLkv1DQKMl5oNS_3msu56t_Mw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTA5/NjgwMzc4NC9waG90/by90b2t5by1idWls/ZGluZ3MtYXQtZHVz/ay5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9RHk0M2tyYl9x/Nk5NUUwzOGNYMUxM/SnUzNTE5OHVFNkcw/SF91SXZoX3U0bz0)', // Example image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed', // Keeps the background fixed during scroll
    minHeight: '100vh', // Ensures the container takes at least the full viewport height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem', // Adds some padding around the content
  };

  // Define the content container style here
  const contentStyle = {
    backgroundColor: 'white', // White background for the content
    padding: '2rem', // Adds padding inside the content box
    borderRadius: '8px', // Rounded corners for the content box
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for the content box
    maxWidth: '800px', // Maximum width of the content box
    width: '100%', // Full width up to the maxWidth
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 className='text-3xl font-bold mb-6 text-slate-950'>
          About Us
        </h1>
        <p className='text-slate-700 mb-6'>
          Welcome to <span className='font-semibold'>[Your Real Estate Company Name]</span>!
          At <span className='font-semibold'>[Your Real Estate Company Name]</span>, we believe that finding a home is not just 
          about buying property—it's about discovering a place where your heart feels at 
          ease and your dreams come alive. Our mission is to guide you through every step of this 
          exciting journey, making the process as seamless and rewarding as possible.
        </p>
        <p className='text-slate-700 mb-6'>
          Founded on the principles of integrity, transparency, and exceptional service,
          <span className='font-semibold'> [Your Real Estate Company Name]</span> is a team of dedicated real estate professionals
          with a shared passion for helping clients find their perfect homes. With years of 
          experience and a deep understanding of the local market, we are committed to providing
          personalized solutions that cater to your unique needs and preferences.
        </p>
        <p className='text-slate-700 mb-6'>
          Our vision is to redefine the real estate experience by placing the highest value on the 
          relationships we build with our clients. We aim to create a space where every interaction
          is meaningful, every decision is informed, and every step of the journey is handled with
          care and expertise. We understand that buying or selling a home is one of the most significant 
          decisions you will make, and we are here to ensure that the process is smooth, enjoyable, and fulfilling.
        </p>
      </div>
    </div>
  );
}

export default Aboutpage;
