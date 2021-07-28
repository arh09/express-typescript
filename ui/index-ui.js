async function button() {
    var user = document.getElementById('user').value
    var pass = document.getElementById('pass').value
    console.log(user)
    console.log(pass)
    var users = await fetch('http://localhost:3000/users/'+user)
    .then(response => response.json())
    .then(data => {
            console.log(data[0]['pass'])
            if(pass == data[0]['pass']){
                console.log('LOG IN')
                localStorage.setItem('token', token());
                var cat = localStorage.getItem('token');
                console.log(cat)
            }else{
                console.log('ERROR')
            }
          
    });
}

var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};

miStorage = window.localStorage;

async function showJson() {
    var tokentext = document.getElementById('token').value
    console.log(tokentext)
    var cat = localStorage.getItem('token')
    console.log(cat)
    if(tokentext == cat){
        var users = await fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => {
                    console.log(data)
                    }
                );
    }
}
