console.log('Client Side JavaScript File Loaded')



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message_One')
const messageTwo = document.querySelector('#message_Two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value

    messageOne.textContent = 'Loading....'
            messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = 'Error'
            messageTwo.textContent = data.error  
        }
        else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast 
        }
    })
})
})
