import { renderLinks } from "./render-links.helper.js";

export const renderApp = (user : {
    name: any;
    lastName: any;
    email: any;
    photo: any;
    links: any[];
}, userNameContainer: HTMLElement,userEmailContainer: HTMLElement,userPhotoContainer: HTMLElement,profilePictureContainer: HTMLElement,iphoneLinksContainer: HTMLElement) => {

    if((user.name !== null) && (user.lastName !== null)){
        userNameContainer.innerText = `${user.name} ${user.lastName}`
        userNameContainer.classList.remove('empty-element')
    }
    if(user.email !== null){
        userEmailContainer.innerText = `${user.email}`
        userEmailContainer.classList.remove('empty-element')
    }
    if(user.photo !== null){
        userPhotoContainer.style.backgroundImage = `url(${user.photo})`
        profilePictureContainer.style.backgroundImage = `url(${user.photo})`;
    }

    renderLinks(user.links,iphoneLinksContainer)
}