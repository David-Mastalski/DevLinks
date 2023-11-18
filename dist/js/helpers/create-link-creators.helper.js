export const createLinkCreator = (link, links, deleteLink, linksPlatform, linksCreatorContainerElement) => {
    const linkCreator = document.createElement('div');
    linkCreator.classList.add('linkCreator');
    const header = document.createElement('header');
    header.classList.add('linkCreator__header');
    const linkNumber = document.createElement('p');
    linkNumber.innerText = 'Link';
    const linkID = document.createElement('span');
    linkID.classList.add('link-id');
    linkID.innerText = ` #${link.id + 1}`;
    linkNumber.appendChild(linkID);
    const removeLinkBtn = document.createElement('button');
    removeLinkBtn.classList.add('remove-link-btn');
    removeLinkBtn.innerText = 'Remove';
    removeLinkBtn.addEventListener('click', () => deleteLink(links, link));
    header.append(linkNumber, removeLinkBtn);
    const selectElementContainer = document.createElement('div');
    selectElementContainer.classList.add('linkCreator__innerSection');
    const labelForSelectElement = document.createElement('label');
    labelForSelectElement.setAttribute('for', 'platform');
    labelForSelectElement.innerText = 'Platform:';
    const selectElement = document.createElement('select');
    selectElement.id = 'platform';
    selectElement.classList.add('selectElement');
    selectElement.addEventListener('change', () => {
        links[link.id].title = selectElement.value;
    });
    console.log(linksPlatform);
    linksPlatform.forEach(linkPlatform => {
        const optionElement = document.createElement('option');
        optionElement.value = `${linkPlatform}`;
        if (linkPlatform == link.title) {
            optionElement.selected = true;
        }
        optionElement.innerText = linkPlatform;
        selectElement.appendChild(optionElement);
    });
    selectElementContainer.append(labelForSelectElement, selectElement);
    const linkURLContainer = document.createElement('div');
    linkURLContainer.classList.add('linkCreator__innerSection');
    const labelForLinkElement = document.createElement('label');
    labelForLinkElement.innerText = 'Link:';
    labelForLinkElement.setAttribute('for', 'link');
    const linkInputWrapper = document.createElement('div');
    linkInputWrapper.classList.add('link-input-wrapper');
    const URLInputElement = document.createElement('input');
    URLInputElement.type = 'text';
    URLInputElement.classList.add('link-input', 'required-input');
    URLInputElement.id = 'link';
    URLInputElement.value = link.url;
    URLInputElement.addEventListener('input', () => links[link.id].url = URLInputElement.value);
    const URLIcon = document.createElement('i');
    URLIcon.classList.add('fa-solid', 'fa-link', 'link-icon');
    linkInputWrapper.append(URLInputElement, URLIcon);
    linkURLContainer.append(labelForLinkElement, linkInputWrapper);
    linkCreator.append(header, selectElementContainer, linkURLContainer);
    linksCreatorContainerElement.appendChild(linkCreator);
};
