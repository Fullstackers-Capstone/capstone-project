import React, { useState, useEffect } from "react";
import axios from 'axios';
import { upgradeToPro } from "../store";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

const UnlockPro = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();


  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );
  

  const getAllUrlParams = (url) => {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var obj = {};
    if (queryString) {
      queryString = queryString.split('#')[0];
      let arr = queryString.split('&');
      for (var i = 0; i < arr.length; i++) {
        var a = arr[i].split('=');
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
        if (paramName.match(/\[(\d+)?\]$/)) {
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
          if (paramName.match(/\[\d+\]$/)) {
            var index = /\[(\d+)\]/.exec(paramName)[1];
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
        // Check to see if this is a redirect back from Checkout
        const query = getAllUrlParams(window.location.href);
        if (query.success){
      
          const upgrade = async() =>{
            await dispatch(upgradeToPro(auth.spotifyId));
            navigate(`/users/${auth.id}`)
          }
          upgrade();
        }
        else{
          console.log('nope');
        }

    }, []);
  
  

  return (

    <div id='content-body'>
    <div id='pl-container'>
    <div className="playlist-options">
      <h2 className="options-title">Unlock a Pro-Level Subsrciption</h2>
      <div className="option">
        <h3>Create Unlimited Playlists</h3>
        <span className='pl-type-desc'>Free Users are allowed up to 5 unique playlists.</span>
      </div>
      <div className="option">
        <h3>Unlock Additional Icons & Themes</h3>
        <span className='pl-type-desc'>Break out from Dark Mode.</span>
      </div>
      <div className="option">
        <h3>Access Optimized AI Prompts</h3>
        <span className='pl-type-desc'>Specially developed to improve AI model accuracy.</span>
      </div>
      {
        auth.proUser ? 
          <div> You are already a Pro User!</div>
         : 
         <section>
         <form action="/api/stripe/create-checkout-session" method="POST">
           <button type="submit">
             Checkout
           </button>
         </form>
       </section>
      }

    </div>
    </div>
    </div>
  );
}

export default UnlockPro;
