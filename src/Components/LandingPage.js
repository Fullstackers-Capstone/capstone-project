import React from "react";
import Footer from "./Footer";
import Login from "./Login";
import GetStarted from "./GetStarted";

const LandingPage = () => {
  return (
    <div className="landing">
      <section className="hero-section">
        <h2 className="landing-header">Create Amazing, AI Generated Playlists.</h2>
       
      </section>

      <GetStarted />

      <section className="features-section">
        <div className="feature">
         
          <h2 className="feature-header">Create</h2>
          <p className="p-landing">Generate playlists that match your current mood and activity.</p>
        </div>
        <div className="feature">
        <h2 className="feature-header">Discover</h2>
          <p className="p-landing">Uncover new music tailored to your taste using AI technology.</p>
        </div>
        <div className="feature">
          <h2 className="feature-header">Share</h2>
          <p className="p-landing">Share your unique playlists with friends and other music lovers.</p>
        </div>
      </section>

      <section className="about-section">
        <h2 className="feature-header">About Seranade</h2>
        <p className="p-landing">At Seranade, our mission is to redefine how you experience music. Our advanced AI technology learns your musical tastes and mood to create playlists that will serenade you in every moment. Dive into an immersive musical experience uniquely curated for you.</p>
      </section>
      <section className="how-it-works-section">
  <h2 className="feature-header">How It Works</h2>
  <div className="step">
    <h3 className="feature-header">Step 1: Input a Prompt</h3>
    <p className="p-landing">Start by telling us what kind of music you're in the mood for. Want something to get you pumped for a workout, or maybe a calming playlist for studying? Just let us know!</p>
  </div>
  <div className="step">
    <h3 className="feature-header">Step 2: Select the songs you like</h3>
    <p className="p-landing">We'll generate a playlist tailored to your prompt. From this selection, you can personally curate your final playlist, choosing the songs that resonate most with you.</p>
  </div>
  <div className="step">
    <h3 className="feature-header">Step 3: Launch and share your playlist</h3>
    <p className="p-landing">Once you're happy with your playlist, you can save it to your Spotify account with a single click. Share your unique playlists with your friends!</p>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default LandingPage;
