import React from "react";

const LandingPage = () => {
  return (
    <div className="landing">
      <section className="hero-section">
        <h1 className="landing-header">Welcome to Seranade</h1>
        <p>Create amazing, AI generated playlists.</p>
      </section>

      <section className="features-section">
        <div className="feature">
         
          <h2>Create</h2>
          <p>Generate playlists that match your current mood and activity.</p>
        </div>
        <div className="feature">
        <h2>Discover</h2>
          <p>Uncover new music tailored to your taste using AI technology.</p>
        </div>
        <div className="feature">
          <h2>Share</h2>
          <p>Share your unique playlists with friends and other music lovers.</p>
        </div>
      </section>

      <section className="about-section">
        <h2>About Seranade</h2>
        <p>At Seranade, our mission is to redefine how you experience music. Our advanced AI technology learns your musical tastes and mood to create playlists that will serenade you in every moment. Dive into an immersive musical experience uniquely curated for you.</p>
      </section>
    </div>
  );
};

export default LandingPage;


