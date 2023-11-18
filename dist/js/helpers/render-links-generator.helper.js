export const renderLinksGenerator = (links, linksCreatorContainerElement, createLinkCreator) => {
    linksCreatorContainerElement.innerHTML = '';
    links.forEach((link, index) => {
        link.id = index;
        createLinkCreator(link);
    });
};
