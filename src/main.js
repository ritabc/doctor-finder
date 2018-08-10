import {BetterDoctorAPI} from './better-doctor.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {

  let newBetterDoctor = new BetterDoctorAPI();
  let ailmentsFromAPI = newBetterDoctor.getAllAilments();

  ailmentsFromAPI.then(function(response) {
    let ailmentsBody = JSON.parse(response);

    let ailments = [];
    let ailmentsObjects = ailmentsBody.data;
    ailmentsObjects.forEach(function(object){

      ailments.push(object.name);
    });
    console.log(ailments)
    ailments.forEach(function(ailment) {
      $('#ailments-dropdown').append(`<option value="${ailment}">${ailment}</option>`);
    })
  });

});
