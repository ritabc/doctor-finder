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
    ailments.forEach(function(ailment) {
      $('#ailments-dropdown').append(`<option value="${ailment}">${ailment}</option>`);
    })

    $('#ailments-search').click(function(e) {
      e.preventDefault();
      $('.card-columns').empty();
      let ailment = $('#ailments-dropdown option:selected').val();
      let doctorsFromAilment = newBetterDoctor.getDoctorsByAilment(ailment);

      doctorsFromAilment.then(function(response) {
        let doctorsObjectsFromAilmentsBody = JSON.parse(response);
        let doctorObjectsArray = doctorsObjectsFromAilmentsBody.data
        doctorObjectsArray.forEach(function(doctor) {
          let name = doctor.profile.first_name + " " + doctor.profile.last_name + ", " + doctor.profile.title
          let mainPractice = doctor.practices[0]
          let address = ""
          if (doctor.practices[0].visit_address.hasOwnProperty('street2')) {
            address = doctor.practices[0].visit_address.street + " " + mainPractice.visit_address.street2 + ", " + mainPractice.visit_address.city + ", " + mainPractice.visit_address.state + " " + mainPractice.visit_address.zip
          } else {
            address = mainPractice.visit_address.street + ", " +  mainPractice.visit_address.city + ", " + mainPractice.visit_address.state + " " + mainPractice.visit_address.zip
          }
          let phones = mainPractice.phones
          let landlines = phones.filter(function(phone) {
            if (phone.type == "landline") {
              return true;
            } else {
              return false;
            }
          });
          let phoneOrPhones = ""
          landlines.forEach(function(landline) {
            phoneOrPhones = phoneOrPhones + landline.number + "\n"
          })
          let website = ""
          if (mainPractice.hasOwnProperty("website")) {
            website = mainPractice.website
          }
          else {
            website = "None Listed"
          }
          let newPatientsString = ""
          if (mainPractice.accepts_new_patients) {
            newPatientsString = 'Yes'
          } else {
            newPatientsString = 'No'
          }
          $('.doctors-by-ailment > .card-columns').append(`
            <div class="card card-body">
              <h3 class="card-title">Main Practice of ${name}</h3>
              <h4>Address</h4>
              <p>${address}</p>
              <h4>Phone(s)</h4>
              <p>${phoneOrPhones}</p>
              <h4>Website</h4>
              <p>${website}</p>
              <h4>Accepting New Patients?</h4>
              <p>${newPatientsString}</p>
            </div>
            `)
        })
      });
    });

    $('#name-search').click(function(e) {
      e.preventDefault();
      $('.card-columns').empty();
      let nameToSearch = $('#name').val();
      $('#name').val('');
      let doctorsFromName = newBetterDoctor.getDoctorsByName(nameToSearch);
      doctorsFromName.then(function(response) {
        let doctorsObjectsFromNameSearchBody = JSON.parse(response);
        let doctorObjectsArray = doctorsObjectsFromNameSearchBody.data
        doctorObjectsArray.forEach(function(doctor) {
          let name = doctor.profile.first_name + " " + doctor.profile.last_name + ", " + doctor.profile.title
          let mainPractice = doctor.practices[0]
          let address = ""
          if (doctor.practices[0].visit_address.hasOwnProperty('street2')) {
            address = doctor.practices[0].visit_address.street + " " + mainPractice.visit_address.street2 + ", " + mainPractice.visit_address.city + ", " + mainPractice.visit_address.state + " " + mainPractice.visit_address.zip
          } else {
            address = mainPractice.visit_address.street + ", " +  mainPractice.visit_address.city + ", " + mainPractice.visit_address.state + " " + mainPractice.visit_address.zip
          }
          let phones = mainPractice.phones
          let landlines = phones.filter(function(phone) {
            if (phone.type == "landline") {
              return true;
            } else {
              return false;
            }
          });
          let phoneOrPhones = ""
          landlines.forEach(function(landline) {
            phoneOrPhones = phoneOrPhones + landline.number + "\n"
          })
          let website = ""
          if (mainPractice.hasOwnProperty("website")) {
            website = mainPractice.website
          }
          else {
            website = "None Listed"
          }
          let newPatientsString = ""
          if (mainPractice.accepts_new_patients) {
            newPatientsString = 'Yes'
          } else {
            newPatientsString = 'No'
          }
          $('.doctors-by-ailment > .card-columns').append(`
            <div class="card card-body">
              <h3 class="card-title">Main Practice of ${name}</h3>
              <h4>Address</h4>
              <p>${address}</p>
              <h4>Phone(s)</h4>
              <p>${phoneOrPhones}</p>
              <h4>Website</h4>
              <p>${website}</p>
              <h4>Accepting New Patients?</h4>
              <p>${newPatientsString}</p>
            </div>
            `)
        })
      })
    })
  });
});
