import React from "react";
import GetStarted from "./GetStarted";

const LandingPage = () => {

  return (
    <>

      <div className="landing">

        <div className='landing-left-container'>
          <section className="hero-section">
            <div className="landing-header">
              <span className='create-only'>
                Create
              </span>
              <span className='amazing-only'>
                Amazing<span style={{ color: 'white' }}>,</span>
              </span>
              <span className='ai-generated-playlists'>
                <span className='ai-generated-only'>
                  AI-Generated
                </span>
                <span className='playlists-only'>
                  Playlists.
                </span>
              </span>
            </div>
          </section>

          <GetStarted />

        </div>

        <div className='landing-separator-container'>
            <div className='landing-separator'></div>
        </div>

        <div className='landing-right-container'>

          <section className="how-it-works-section">
            <div className="how-it-works"> 
              <i className="fa-solid fa-gears" style={{ color: 'gold', marginRight: '.75rem' }}></i> 
              How It Works
            </div>

            <div className="steps-container">

              <div className="step">
                <div className="feature-header">
                  <div className='step-num-title'>
                    <span className='step-number'>
                      Step 1
                      <span className='step-colon'>:</span>
                    </span> 
                    <span className='step-title'>
                      Enter a Prompt
                    </span>
                  </div>
                </div>
                <p className="p-landing">
                  Start by telling us what kind of music you're in the mood for. Want something to get you pumped for a workout, or maybe a calming playlist for studying? Just let us know!
                </p>
              </div>

              <div className="step">
                <div className="feature-header">
                  <div className='step-num-title'>
                    <span className='step-number'>  
                      Step 2
                      <span className='step-colon'>:</span>
                    </span> 
                    <span className='step-title'>
                      Select the Songs You Like
                    </span>
                  </div>
                </div>
                <p className="p-landing">
                  We'll generate a playlist tailored to your prompt. From this selection, you can personally curate your final playlist, choosing the songs that resonate most with you.
                </p>
              </div>

              <div className="step">
                <div className="feature-header">
                  <div className='step-num-title'>
                    <span className='step-number'>
                      Step 3
                      <span className='step-colon'>:</span>
                    </span> 
                    <span className='step-title'>
                      Launch & Share Playlists
                    </span>
                  </div>
                </div>
                <p className="p-landing">
                  Once you're happy with your playlist, you can save it to your Spotify account with a single click. Share your unique playlists with your friends!
                </p>
              </div>

            </div>
          </section>

        </div>
      </div>

    </>
  );
};

export default LandingPage;