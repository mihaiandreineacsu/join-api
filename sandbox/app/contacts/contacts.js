//createRandomContact();
//window.getContacts().then((data)=> console.log(data)).catch(error => console.error(error));

async function createRandomContact(){
    const newContact = await createNewContact();
    window.setContact(newContact).then((data)=> console.log(data) ).catch(error => console.error(error));
}

async function createNewContact(){
    const fakeName = await getFakeName();
    const newContact = {
        name: fakeName.name,
        uuid: fakeName.name,
        email: fakeName.email_u,
        phone: fakeName.phone_h
    }
    return newContact;
}

async function getFakeName(){
    const response = await fetch('https://api.namefake.com/');
    const fakeName = await response.json();
    return fakeName;
}

async function getRandomContact(){
    const contacts = await window.getContacts();
    console.log(contacts.map(c => c.uuid));
}