console.log('Client side javascript file is loaded!');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
    }
)

// fetch('http://api.weatherstack.com/current?access_key=4a90da2c1aff5c050b833b2e67f4dde7&query=37.8267,-122.423&units=f').then((response) => {
//     response.json().then((data) => {
//         if(!data) {
//             console.log('Unable to connect to weather service!')
//         }
//         console.log(data.current.temperature + ' ' + data.location.name);
//     })
// })

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From JavaScript!'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value;
    messageOne.textContent = 'Loading.........!';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })

    // console.log(location);
})