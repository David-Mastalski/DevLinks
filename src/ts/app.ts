import { Link } from "./interfaces/interfaces.js"
import { renderLinksGenerator } from "./helpers/render-links-generator.helper.js"
import { renderApp } from "./helpers/render-app.helper.js"

const API_URL: string = 'http://localhost:3001/user'
const form: HTMLFormElement = document.querySelector('.form')
const formStepsElement: HTMLElement = document.querySelector('.formSteps')
const linksCreatorContainerElement: HTMLElement = document.querySelector('.linksCreator-container')
const iphoneLinksContainer: HTMLElement = document.querySelector('.iphone-links')

const userPhotoContainer: HTMLElement = document.querySelector('.user-photo-container')
const userNameContainer: HTMLElement = document.querySelector('.user-name-container')
const userEmailContainer: HTMLElement = document.querySelector('.user-email-container')
const profilePictureInput: HTMLInputElement = document.querySelector('#profile-picture')
const profilePictureContainer: HTMLElement = document.querySelector('.profile-picture-container')

//Buttons
const linkOptionBtn: HTMLButtonElement = document.querySelector('#links-btn')
const profileOptionBtn: HTMLButtonElement = document.querySelector('#profile-details-btn')
const addNewLinkBtn: HTMLButtonElement = document.querySelector('#add-new-link-btn')

const user = {
    name: '',
    lastName: '',
    email: '',
    photo: null,
    links: []
}

let links: Link[] = []
const linksPlatform: string[] = ['Facebook','Instagram','SnapChat','GitHub','YouTube']

const downloadData = (user : {
    name: any;
    lastName: any;
    email: any;
    photo: any;
    links: any[];
}) => {
    fetch(API_URL).then(response => {
        if(response.ok){
            response.json().then(data => {
                user = data
                links = data.links

                const nameInput: HTMLInputElement = document.querySelector('#first-name')
                const lastNameInput: HTMLInputElement = document.querySelector('#last-name')
                const emailInput: HTMLInputElement = document.querySelector('#email')

                nameInput.value = user.name
                lastNameInput.value = user.lastName
                emailInput.value = user.email

                renderApp(user,userNameContainer,userEmailContainer,userPhotoContainer,profilePictureContainer,iphoneLinksContainer)
                user.links.forEach(link => createLinkCreator(link))
            })
        }
    }).catch(err => console.error(err))
}

const updateData = (user : {
    name: any;
    lastName: any;
    email: any;
    photo: any;
    links: any[];
}) => {
    fetch(API_URL).then(response => {
        if(response.ok){
            response.json().then(data => {
                data = user

                fetch(API_URL,{
                    method: "PATCH",
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if(response.ok){
                        console.log("Dane zostały pomyślnie dodane do serwera !!");
                    }
                }).catch(err => console.error(err, "Nie udało się dodać danych do serwera"))
            })
        }
    }).catch(err => console.error(err))
}

const createLinkCreator = (link: Link) => {
    const linkCreator: HTMLElement = document.createElement('div')
    linkCreator.classList.add('linkCreator')

    const header: HTMLElement = document.createElement('header')
    header.classList.add('linkCreator__header')

    const linkNumber: HTMLParagraphElement = document.createElement('p')
    linkNumber.innerText = 'Link'
        const linkID: HTMLSpanElement = document.createElement('span')
        linkID.classList.add('link-id')
        linkID.innerText = ` #${link.id + 1}`
    linkNumber.appendChild(linkID)

    const removeLinkBtn: HTMLButtonElement = document.createElement('button')
    removeLinkBtn.classList.add('remove-link-btn')
    removeLinkBtn.innerText = 'Remove'
    removeLinkBtn.addEventListener('click', () => deleteLink(link))

    header.append(linkNumber,removeLinkBtn)

    const selectElementContainer: HTMLElement = document.createElement('div')
    selectElementContainer.classList.add('linkCreator__innerSection')

    const labelForSelectElement: HTMLLabelElement = document.createElement('label')
    labelForSelectElement.setAttribute('for', 'platform')
    labelForSelectElement.innerText = 'Platform:'

    const selectElement: HTMLSelectElement = document.createElement('select')
    selectElement.id = 'platform'
    selectElement.classList.add('selectElement')
    selectElement.addEventListener('change', () => {
        links[link.id].title = selectElement.value
    })

    linksPlatform.forEach(linkPlatform => {
        const optionElement: HTMLOptionElement = document.createElement('option')
        optionElement.value = `${linkPlatform}`
        if(linkPlatform == link.title){
            optionElement.selected = true
        }
        optionElement.innerText = linkPlatform
        selectElement.appendChild(optionElement)
    })

    selectElementContainer.append(labelForSelectElement,selectElement)
    
    const linkURLContainer: HTMLElement = document.createElement('div')
    linkURLContainer.classList.add('linkCreator__innerSection')

    const labelForLinkElement: HTMLLabelElement = document.createElement('label')
    labelForLinkElement.innerText = 'Link:'
    labelForLinkElement.setAttribute('for','link')

    const linkInputWrapper: HTMLElement = document.createElement('div')
    linkInputWrapper.classList.add('link-input-wrapper')

    const URLInputElement: HTMLInputElement = document.createElement('input')
    URLInputElement.type = 'text'
    URLInputElement.classList.add('link-input','required-input')
    URLInputElement.id = 'link'
    URLInputElement.value = link.url
    URLInputElement.addEventListener('input', () => links[link.id].url = URLInputElement.value)

    const URLIcon: HTMLElement = document.createElement('i')
    URLIcon.classList.add('fa-solid','fa-link','link-icon')

    linkInputWrapper.append(URLInputElement,URLIcon)
    linkURLContainer.append(labelForLinkElement,linkInputWrapper)
    linkCreator.append(header,selectElementContainer,linkURLContainer)
    linksCreatorContainerElement.appendChild(linkCreator)
}   

const deleteLink = (removeLink: Link) => {
    links = links.filter((i) => i != removeLink)
    renderLinksGenerator(links,linksCreatorContainerElement,createLinkCreator)
}

const createLinkObject = (id: number) => {
    const newLink: Link = {
        id: id,
        title: 'Facebook',
        url: null
    }
    links.push(newLink)
    createLinkCreator(newLink)
}

const checkRequireds = (name: HTMLInputElement, lastName: HTMLInputElement) => {
    let error = 0
    const requireds = document.querySelectorAll('.required-input')

    requireds.forEach((required:HTMLInputElement) => {
        if(required.value === ''){
            error++
            required.classList.add('empty')

            if((name.value === '') || (lastName.value === '')) slideNext(true,profileOptionBtn,linkOptionBtn)
        }else{
            required.classList.remove('empty')
        }
    })

    return error
}

const slideNext = (value:Boolean, addClassBtn:HTMLButtonElement, removeClassBtn:HTMLButtonElement) => {
    (value)? formStepsElement.classList.add('next-step') : formStepsElement.classList.remove('next-step')
    addClassBtn.classList.add('active')
    removeClassBtn.classList.remove('active')
}

downloadData(user)
form.addEventListener('submit', (e:Event) => {
    e.preventDefault()
    
    const nameInput: HTMLInputElement = document.querySelector('#first-name')
    const lastNameInput: HTMLInputElement = document.querySelector('#last-name')
    const emailInput: HTMLInputElement = document.querySelector('#email')
    
    if(checkRequireds(nameInput,lastNameInput) === 0){

        user.name = nameInput.value
        user.lastName = lastNameInput.value
        user.email = emailInput.value
        user.links = [...links]

        updateData(user)
        renderApp(user,userNameContainer,userEmailContainer,userPhotoContainer,profilePictureContainer,iphoneLinksContainer)
    }
})

profilePictureInput.addEventListener('change', () => {
    const file = profilePictureInput.files[0]
    if(file){
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgURL = event.target.result;
            user.photo = imgURL
            profilePictureContainer.style.backgroundImage = `url(${imgURL})`;
        };
        reader.readAsDataURL(file)
    }
})
addNewLinkBtn.addEventListener('click', () => createLinkObject(links.length))
linkOptionBtn.addEventListener('click', () => slideNext(false,linkOptionBtn,profileOptionBtn))
profileOptionBtn.addEventListener('click', () => slideNext(true,profileOptionBtn,linkOptionBtn))