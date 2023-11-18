import { Link } from "../interfaces/interfaces.js"

export const renderLinksGenerator = (links: Link[], linksCreatorContainerElement: HTMLElement, createLinkCreator) => {
    linksCreatorContainerElement.innerHTML = ''
    links.forEach((link,index) => {
        link.id = index
        createLinkCreator(link)
    })
}