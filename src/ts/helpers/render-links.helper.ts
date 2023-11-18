import { Link } from "../interfaces/interfaces.js"

export const renderLinks = (links: Link[], iphoneLinksContainer: HTMLElement) => {
    iphoneLinksContainer.innerHTML = ''
    links.forEach(link => {
        const linkElement: HTMLElement = document.createElement('a')
        linkElement.classList.add('link', `${link.title.toLowerCase()}`)
        linkElement.setAttribute('href', link.url)

        const linkInfoContainer: HTMLElement = document.createElement('div')
        const icon: HTMLElement = document.createElement('i')
        icon.classList.add('fa-brands','platform-icon',`fa-${link.title.toLowerCase()}`)

        const linkName: HTMLSpanElement = document.createElement('span')
        linkName.classList.add('link-platform-name')
        linkName.innerText = link.title

        const arrowElement: HTMLLIElement = document.createElement('li')
        arrowElement.classList.add('fa-solid','fa-arrow-right')

        linkInfoContainer.append(icon,linkName)
        linkElement.append(linkInfoContainer,arrowElement)
        iphoneLinksContainer.append(linkElement)
    })
}