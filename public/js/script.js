const form = document.querySelector('form');
const inputValue = document.querySelector('input');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = inputValue.value;
    fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
            if(data.err) {
                document.getElementById('result').innerHTML = data.err;
            }
            else {
                document.getElementById('result').innerHTML = data.data;
            }
            
    })
})
})