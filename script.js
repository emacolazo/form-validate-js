const firebaseConfig = {
    apiKey: "AIzaSyAbZl5M2y3YN3WwYIrh5Olbqz7SKWJcxOc",
    authDomain: "datos-de-formulario-7b57d.firebaseapp.com",
    projectId: "datos-de-formulario-7b57d",
    storageBucket: "datos-de-formulario-7b57d.appspot.com",
    messagingSenderId: "199094631512",
    appId: "1:199094631512:web:8359491c6a2d4d446d5e2d",
    measurementId: "G-VKF67DTQRH"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (evento) => {
    evento.preventDefault();

    //Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por favor, introducí tu nombre'
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //validar correo electronico
    let entradaEmail = document.getElementById('email')
    let errorEmail = document.getElementById('emailError')
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //Patron de validacion 

    if (!emailPattern.test(entradaEmail.value)) {
        errorEmail.textContent = 'Por favor, introducí un email valido'
        errorEmail.classList.add('error-message')
    } else {
        errorEmail.textContent = ''
        errorEmail.classList.remove('error-message')
    }
    //validar la contraseña
    let entradaContrasena = document.getElementById('password')
    let errorContrasena = document.getElementById('passwordError')
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    if (!passwordPattern.test(entradaContrasena.value)) {
        errorContrasena.textContent = 'La contraseña debe tener al menos 8 caracteres, mayusculas y minuscular y caracteres especiales'
        errorContrasena.classList.add('error-message')
    } else {
        errorContrasena.textContent = ''
        errorContrasena.classList.remove('error-message')
    }

    //si todos los campos son validos enviar formulario

    if (!errorNombre.textContent && !errorEmail.textContent && !errorContrasena.textContent) {
        // Backend con Firebase
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: entradaEmail.value,
            password: entradaContrasena.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito. ID del documento: ' + docRef.id);
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert('Error al agregar el documento: ' + error);
        });
    }
});







