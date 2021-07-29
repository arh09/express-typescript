async function button() {
    var user = document.getElementById('user').value
    var pass = document.getElementById('pass').value
    var users = await fetch('http://localhost:3000/users/'+user)
    .then(response => response.json())
    .then(data => {
            if (data[0]!= null){
                if(pass == data[0]['pass']){
                    console.log('LOG IN')
                    localStorage.setItem('token', token());
                    var cat = localStorage.getItem('token');
                    alert('CORRECT LOGGED IN. YOUR TOKEN: '+ cat)
                }else{
                    console.log('ERROR LOGGIN IN')
                    alert('THOSE USER AND PASSWORD DONT MATCH')
                }
            }else{
                console.log('ERROR LOGGIN IN')
                alert('THOSE USER AND PASSWORD DONT MATCH')
            }
    });
}

async function create_user() {
    var user = document.getElementById('new_user').value
    var pass = document.getElementById('new_pass').value
    var c_pass = document.getElementById('confirm_pass').value
    var alberto = false
    if(user==""){
        alert('USERNAME IS EMPTY')
    }else{
        if(pass==""){
            alert('PASSWORD IS EMPTY')
        }else{
            if(c_pass==""){
                alert('PASSWORD CONFIRMATION IS EMPTY')
            }else{
                if(pass == c_pass){
                    var users = await fetch('http://localhost:3000/users/'+user)
                    .then(response => response.json())
                    .then(data => {
                            if(data[0]!=null){
                                console.log('ERROR')
                                alert('THERE IS ALREADY AN USER WITH THAT CREDENTIALS!!!')
                            }else{
                                alberto = true
                            }                          
                    })
                    .then(async function(data)  {   
                        if(alberto){
                            newUser = [{
                                "user": user,
                                "pass": pass
                            }]
                            try{
                                await fetch('https://localhost:3000/', {
                                    method: 'POST',
                                    mode: 'cors',
                                    cache: 'no-cache',
                                    headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                    },
                                    body: newUser, 
                                });
                                alert('CONFIRMED: USER CREATED!!')
                            }catch{
                                alert('ERROR: USER NOT CREATED!!')
                            }

                        }
                      });
                }else{
                    alert('PASSWORD AND ITS CONFIRMATION DONT MATCH!!')
                }
            }
        }
    }
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
                    document.getElementById('json').innerText = 'DATA JSON: \n\n'+ JSON.stringify(data)
                    }
                );
    }else{
        document.getElementById('json').innerText = null
        alert('THIS TOKEN AND LAST PRODUCED ONE DOESNT MATCH')
    }
}
