import React from 'react';

const About = () => {
  return(
    <div id='content-body'>
      <div id='pl-container' style={{marginTop: '2rem'}}>

        <div className='create-header' id='about-header'>
          About
        </div>
        
        <div className="about-steps-container">
          <div className="about-inner-container" style={{marginTop: 0}}>
            <div className='info-about-serenade'>
              Serenade is an interactive app that harnesses the power of AI to create tailor-made playlists based on your mood.
            </div>
            <div className='info-about-serenade'>
              Whether you're embarking on a road trip or need the right tunes for your Sunday chores, Serenade enables you to effortlessly curate personalized playlists by simply describing your desired ambiance.
            </div>
          </div>
        </div> 

        <div className='about-how-it-works'>
          <span className='about-how-it-works-title'>
            <i className="fa-solid fa-gears" style={{color: 'gold', marginRight: '.5rem', marginBottom: '1rem'}}></i>
            How It Works
          </span>
        <div>

        <div className="info-inner-container" style={{marginTop: 0}}>
          <div className="feature-header" id='info-header'>
            <div className='step-num-title'>
              <span className='step-number'>
                Step 1
                <span className='step-colon'>:</span>
              </span> 
              <span className='step-title'>
                Click 'Create Playlist' & Enter a Prompt
              </span>
            </div>
          </div>

          <p className="p-landing">
            Start by telling us what kind of music you're in the mood for. Want something to get you pumped for a workout, or maybe a calming playlist for studying? Just let us know!
          </p>
        </div>

        <div className="info-inner-container">
          <div className="feature-header" id='info-header'>
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

        <div className="info-inner-container">
          <div className="feature-header" id='info-header'>
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
    </div>
  </div>
  </div>
  )
}

export default About;