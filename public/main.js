
console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = 'http://localhost:4000'

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

function getAllChars() {
  clearCharacters();

  axios
    .get(baseURL + '/characters')
    .then(function(res) {
      // console.log(res)

      for(let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i])
      }

    })
    .catch((err) => {
      console.log(err)
    });

}

getAllBtn.addEventListener('click', getAllChars)

function getOneChar(event) {
  // console.log(event.target.id)
  clearCharacters();
  axios
    .get(`${baseURL}/character/${event.target.id}`)
    .then(res => createCharacterCard(res.data))
    .catch(err => {
      console.log(err)
    });
}

for(let i = 0; i < charBtns.length; i++) {
    charBtns[i].addEventListener('click', getOneChar);
}

function createChar(evt) {
  evt.preventDefault();

  clearCharacters();

  const likesArr = newLikesText.value.split(',')

  const reqBody = {
      firstName: newFirstInput.value, 
      lastName: newLastInput.value, 
      gender: newGenderDropDown.value,
      age: newAgeInput.value, 
      likes: likesArr
  }

  axios 
    .post(baseURL + '/character', reqBody)
    .then(res => {
      for(let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i])
      }
    })
    .catch(err => { console.log(err) });

}

createForm.addEventListener('submit', createChar);

getAllChars();