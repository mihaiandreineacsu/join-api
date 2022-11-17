async function handleCreateAccount(event){
    event.preventDefault();
    const formData = new FormData(event.target);

    const userCredentials = await createAccount(formData.get('email'), formData.get('password'));
    console.log(userCredentials);
    //has to automatically create a user Document in Firestore
}

async function handleLogIn(event){
    event.preventDefault();
    const formData = new FormData(event.target);

    const userCredentials = await logInWithEmailAndPassword(formData.get('email'), formData.get('password'));
    console.log(userCredentials);
    //has to automatically create a user Document in Firestore
}