/**
 * This tiny script extracts data from: 
 * https://occultthings.wordpress.com/2012/09/07/%D0%B3%D0%B0%D0%B4%D0%B0%D0%B5%D0%BD%D0%B5-%D1%81-%D0%BA%D0%B0%D1%80%D1%82%D0%B8-%D0%B7%D0%B0-%D0%B8%D0%B3%D1%80%D0%B0-%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-%D0%BA%D0%B0%D1%80/
 * created json array and download it.  
 **/
(function () {
    const cards = document.body.textContent.split("Асо").splice(1)
    const results = [];
    cards.forEach((item) => {
        const toHandle = `Асо${item}`;
        const matches = toHandle.matchAll(/(Асо|[0-9]+|Вале|Дама|Поп)\s+([а-я]{4,6})((?:(?!Асо|[0-9]+|Вале|Дама|Поп)(?:.|\s))+)/gm);
        for (const match of matches) {
            const out = {};
            // This will be mapped later with extracted images from 
            // another place. 
            out['image'] = '';
            out['name'] = match[1].trim() + " " + match[2].trim();
            out['description'] = match[3].trim();
            results.push(out);
        }
    })

    const element = document.createElement('a');
    
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(results, null, ' ')));
    element.setAttribute('download', 'data.txt');
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}())