export const renderLinks = (links, iphoneLinksContainer) => {
    iphoneLinksContainer.innerHTML = '';
    links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.classList.add('link', `${link.title.toLowerCase()}`);
        linkElement.setAttribute('href', link.url);
        const linkInfoContainer = document.createElement('div');
        const icon = document.createElement('i');
        icon.classList.add('fa-brands', 'platform-icon', `fa-${link.title.toLowerCase()}`);
        const linkName = document.createElement('span');
        linkName.classList.add('link-platform-name');
        linkName.innerText = link.title;
        const arrowElement = document.createElement('li');
        arrowElement.classList.add('fa-solid', 'fa-arrow-right');
        linkInfoContainer.append(icon, linkName);
        linkElement.append(linkInfoContainer, arrowElement);
        iphoneLinksContainer.append(linkElement);
    });
};
