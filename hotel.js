import React, { Component } from 'react';
import { callApi, errorResponse } from './main';

import './hotel.css';

class Hotel extends Component {
  constructor(props) {
    super(props);
    this.HotelRegister = this.HotelRegister.bind(this);
  }
  HotelRegister(event) {
    event.preventDefault();

    const RT1 = document.getElementById('RT1');
    const RT2 = document.getElementById('RT2');
    const RT3 = document.getElementById('RT3');
    const RT4 = document.getElementById('RT4');
    const RT5 = document.getElementById('RT5');
    const RT6 = document.getElementById('RT6');
    const RT7 = document.getElementById('RT7');
    const RT8 = document.getElementById('RT8');
    const RT9 = document.getElementById('RT9');
    const RT10 = document.getElementById('RT10');
  


    const inputs = [RT1, RT2, RT3, RT4, RT5,RT6,RT7,RT8,RT9,RT10];
    let isEmptyField = false;

    for (let input of inputs) {
      if (input.value === '') {
        isEmptyField = true;
        input.style.border = '1px solid Red';
      } else {
        input.style.border = '1px solid #ccc';
      }
    }

    if (isEmptyField) {
      inputs.find(input => input.value === '').focus();
      return;
    }

    const url = 'http://localhost:5000/room';
    const data = JSON.stringify({
      Pickup: RT1.value,
      Drop: RT2.value,
      Number: RT3.value,
      City: RT4.value,
      Postcode: RT5.value,
      DateofArrival: RT6.value,
      DateofDeparture: RT7.value,
      NumberofPeople: RT8.value,
      Bedding: RT9.value,
      Comments: RT10.value
    });

    callApi('POST', url, data, this.HotelRegisteredSuccess, errorResponse);

    for (let input of inputs) {
      input.value = '';
    }
  }

  HotelRegisteredSuccess(res) {
    // Handle success response here
  }

  render() {
    return (
      <div className="hotel-form">
        <form className="booking-form" action="">
          <div className="form-group">
            <h2 className="form-heading">Booking Details</h2>
     
            <div className="form-control">
              <input type="text" id="RT1" className="floatLabel input-field" name="phone"/>
              <label htmlFor="phone" className="input-label">Pick up location</label>
            </div>
            <div className="form-control">
              <input type="text" id="RT2" className="floatLabel input-field" name="street"/>
              <label htmlFor="street" className="input-label">Drop Location</label>
            </div>
            <div className="form-control">
              <input type="number" id="RT3" className="floatLabel input-field" name="street-number"/>
              <label htmlFor="street-number" className="input-label">Number</label>
            </div>
            <div className="form-control">
              <input type="text" id="RT4" className="floatLabel input-field" name="city"/>
              <label htmlFor="city" className="input-label">City</label>
            </div>
            <div className="form-control">
              <input type="text" id="RT5" className="floatLabel input-field" name="post-code"/>
              <label htmlFor="post-code" className="input-label">Post Code</label>
            </div>
            <div className="form-control">
              <input type="date" id="RT6" className="floatLabel input-field" name="arrive" value={new Date().toISOString().split('T')[0]}/>
              <label htmlFor="arrive" className="input-label">Arrive</label>
            </div>
            <div className="form-control">
              <input type="date" id="RT7" className="floatLabel input-field" name="depart"/>
              <label htmlFor="depart" className="input-label">Depart</label>
            </div>
            <div className="form-control">
              <select id="RT8" className="floatLabel input-field">
                <option value=""></option>
                <option value="1">1</option>
                <option value="2" selected>2</option>
                <option value="3">3</option>
              </select>
              <label htmlFor="fruit" className="input-label">People</label>
            </div>
            
            <div className="form-control">
              <select id="RT9" className="floatLabel input-field">
                <option value=""></option>
                <option value="single-bed">Zweibett</option>
                <option value="double-bed" selected>Doppelbett</option>
              </select>
              <label htmlFor="fruit" className="input-label">Bedding</label>
            </div>
            <div className="form-control">
              <textarea className="floatLabel input-field" name="comments" id="RT10"></textarea>
              <label htmlFor="comments" className="input-label">Comments</label>
            </div>
            <div className="form-control">
              <button type="submit" value="Submit" className="submit-button" onClick={this.HotelRegister}>Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Hotel;
