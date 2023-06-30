import React, { useEffect } from "react";
import { upgradeToPro } from "../store";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

const UnlockPro = () => {
  const navigate = useNavigate();
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();

  const getAllUrlParams = (url) => {
    let queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    let obj = {};

    if (queryString) {
      queryString = queryString.split('#')[0];
      let arr = queryString.split('&');
      
      for (let i = 0; i < arr.length; i++) {
        let a = arr[i].split('=');
        let paramName = a[0];
        let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

        paramName = paramName.toLowerCase();

        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
        if (paramName.match(/\[(\d+)?\]$/)) {
          let key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
          if (paramName.match(/\[\d+\]$/)) {
            let index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            obj[key].push(paramValue);
          }
        } else {
          if (!obj[paramName]) {
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            obj[paramName].push(paramValue);
          }
        }
      }
    }
    return obj;
  }
  
    useEffect(() => {
        const query = getAllUrlParams(window.location.href);
        if (query.success){
          const upgrade = async() =>{
            await dispatch(upgradeToPro(auth.spotifyId));
            navigate(`/users/${ auth.id }`)
          }
          upgrade();
        }
        else {
          console.log('nope');
        }
    }, []);
  
  return (
    <div id='content-body'>

      <div id='pl-container'>
        <div className="playlist-options">

          <div className='options-title-container'>
            <div className="options-title">
              Unlock a <span className='prof-unlock-pro'> Pro <i className="fa-solid fa-circle-check fa-xs" style={{marginLeft: '.15rem'}}></i></span> 
              <span className='subscription-only'>
                Subsrciption
              </span>
            </div>
          </div>

          <div className="pro-option">
            <h3>
              Create Unlimited Playlists
            </h3>
            <span className='pl-type-desc'>
              Free Users are only allowed up to 5 unique playlists.
            </span>
          </div>

          <div className="pro-option">
            <h3>
              Unlock Additional Icons & Themes
            </h3>
            <span className='pl-type-desc'>
              Break out from Dark Mode. 
              <span style={{color: '#777777', fontSize: '.75rem'}}>
                (Future Development)
              </span>
            </span>
          </div>

          <div className="pro-option">
            <h3>
              Access Optimized Prompts
            </h3>
            <span className='pl-type-desc'>
              pecially developed to improve AI model accuracy. 
              <span style={{color: '#777777', fontSize: '.75rem'}}>
                (Future Development)
              </span>
            </span>
          </div>

          <section>
          <form action="/api/stripe/create-checkout-session" method="POST">
            <button className='playlist-button' id='subscribe-now' type="submit">
              Subscribe Now
            </button>
          </form>
          </section>  

        </div>
      </div>
      
    </div>
  );
}

export default UnlockPro;
