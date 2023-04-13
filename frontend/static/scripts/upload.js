const descriptionEditor = new EditorJS({
    holder: 'description',
    placeholder: 'Let`s write an awesome mod description!',
    tools: {
        header: {
            class: Header,
            inlineToolbar: ['link']
        },
        list: {
            class: List,
            inlineToolbar: true,
            config: {
                defaultStyle: 'unordered'
            }
        },
        image: SimpleImage,
        embed: Embed,
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
    },
    onReady: () => {
        console.log('Editor.js is ready to work!')
    },
});
FilePond.registerPlugin(FilePondPluginImagePreview);
const uploadForm = document.querySelector('#upload-form');
const [imagesPond] = FilePond.parse(document.body);
window.imagesPond = imagesPond;
let loading = false;

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (loading) return;
    loading = true;
    sendForm().finally(() => {
        loading = false;
    });
});

async function sendForm() {
    const formData = new FormData(uploadForm);
    console.log(formData);
    console.log(formData.name);
    console.log(formData.category);
    console.log(await descriptionEditor.save());
    const files = imagesPond.getFiles();
    console.log(files);
    const promises = files.map(file => {
        const formData = new FormData();
        formData.append('image', file);
        return fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            Authorization: 'Client-ID a',
          },
          body: formData,
        })
          .then(response => response.json())
          .then(data => data.data.link)
          .catch(error => console.error(error));
    });
    const responses = await Promise.all(promises);
    console.log(responses);
}