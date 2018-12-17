// Initialize Firebase
var config = {
    apiKey: "AIzaSyAUIjLPDLWtrjs1xRSrzW2OkQsYtIOX3Do",
    authDomain: "phone-f8f60.firebaseapp.com",
    databaseURL: "https://phone-f8f60.firebaseio.com",
    projectId: "phone-f8f60",
    storageBucket: "phone-f8f60.appspot.com",
    messagingSenderId: "897089320653"
};
firebase.initializeApp(config);


var uid = "";

function createUser() {
    var errorQ = "N";
    var email = document.getElementById("username").value
    var password = document.getElementById("password").value
    var promise = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        if (errorCode === "auth/user-not-found") {
            var promise = firebase.auth().createUserWithEmailAndPassword(email, password);
            promise.then(user => {
                setUid(user.user.uid);
                console.log(user.user.uid);
            });
        }
        else {
            errorQ = "Y";
        }

    });
    promise.then(user => {
        if (errorQ === "N") {
            document.getElementById("signIn").classList.add("hide");
            document.getElementById("signOutButton").classList.remove("hide");
            setUid(user.user.uid);
            console.log(user.user.uid);
        }
    })
}

function logoutUser() {
    firebase.auth().signOut().then(function() {
        document.getElementById("signIn").classList.remove("hide");
        document.getElementById("signOutButton").classList.add("hide");
        uid = "";
    });


}

function setUid(uidSI) {
    uid = uidSI;
    console.log(uid);
}
