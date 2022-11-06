// IMPORTS:
   // import { colorModule } from "/modules/colorModule.js";
    // import { elementModule } from "./modules/elementModule.js";
    // import { removeFunction, generate, tableSetUp, createTable, highlight, removeHighlight } from "./modules/functions.js";

    const elementModule = {
        top: document.getElementById("top"),
        bottom: document.getElementById("bot"),
        opener: document.querySelector('.opener'),
        opened: document.querySelector('.opened'),
        title: document.querySelector('.title'),
        about: document.getElementById('about'),
        form: document.querySelector('form'),
        textarea: document.querySelector('textarea'),
        submitButton: document.getElementById('submit-button'),
        caseSensitivitySpan: document.getElementById('case-sensitivity-span'),
        caseSensitivity: document.querySelector('.case-sensitivity'),
        caseSensitivitySlider: document.getElementById('case-sensitivity'),
        restriction: document.getElementById('restriction'),
        note: document.getElementById('note'),
        mainContent: document.querySelector('.main-content'),
        recommendation: document.getElementById('recommendation'),
        formDiv: document.querySelector('.form-div'),
        dynamicPortion: document.querySelector('.dynamic-portion')
    };

    const regEx = /[^A-Za-z0-9']/g;
    const newRegEx = /[A-Za-z0-9']/;
    const puncRegEx = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;

    const removeFunction = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                let value = elementModule.textarea.value;
                elementModule.textarea.remove();
                elementModule.recommendation.remove();
                elementModule.caseSensitivity.remove();
                elementModule.caseSensitivitySpan.remove();
                elementModule.restriction.remove(); 
                elementModule.note.remove();
                resolve(value);
            }, 1000);
        });
    }
    
    let spanArray = [];  
    
    const generate = value => {
        return new Promise(resolve => {
            let spanSeries = document.createElement('div');
            spanSeries.style.width = "90%";
            spanSeries.style.height= "auto";
            spanSeries.style.opacity = "0%";
            spanSeries.style.transition = "opacity 1s ease-in";
            let furtherSplit = [];
    
    
            value.forEach(word => {
                if (!regEx.test(word)) {
                    furtherSplit.push(word);
                    furtherSplit.push(' ');  
                } else {
                    furtherSplit.push((word.split('').slice(0, regEx.lastIndex - 1).join('')));
                    furtherSplit.push((word.split('').slice(regEx.lastIndex - 1)).join(''));
                    furtherSplit.push(' ');
                }
            })
    
            furtherSplit.forEach(element => {
                if (element.length === 0) {
                    furtherSplit.splice(furtherSplit.indexOf(element), 1);
                }
            })
            // if (furtherSplit[furtherSplit.length - 1].length === 0) {
            //     furtherSplit.pop();
            // }
            // furtherSplit.pop(); 
            
            let punc = [];
            furtherSplit.forEach((word, indexOfWord) => {
                if (!regEx.test(word.split('')[0]) && regEx.test(word.split('')[word.split('').length - 1]) && word.trim().length !== 0) {
                    punc.push([]);
                    punc[punc.length - 1].push(word);
                    punc[punc.length - 1].push(indexOfWord);
                }
            })
    
            let refinedCounter = 0;
            punc.forEach(subArray => { 
                furtherSplit.splice(subArray[1] + (2 * refinedCounter), 0, (subArray[0].split('').slice(0, regEx.lastIndex - 2).join('')), (subArray[0].split('').slice(regEx.lastIndex - 2).join('')));
                refinedCounter++;
            })
            refinedCounter = 0;
    
            outer_loop:
                for (let i = 0; i < furtherSplit.length; i++) {
                    inner_loop:
                        for (let o = 0; o < punc.length; o++) {
                            if (furtherSplit[i] === punc[o][0]) {
                                furtherSplit[i] = '';
                            }
                        }
                }    
    
            let finalArray = []; 
            furtherSplit.forEach(element => {
                if (element.length !== 0) {
                    finalArray.push(element);
                }
            })
    
    
            let start = [];
            finalArray.forEach((word, wordIndex) => {
                if (puncRegEx.test(word)) {
                    start.push([]);
                    start[start.length - 1].push(word); 
                    start[start.length - 1].push(wordIndex);
                }
            })
    
            let tracker;
            start.forEach((punc, puncIndex) => {
                tracker = null;
                test_loop:    
                    for (let i = 0; i < punc[0].split('').length - 1; i++) {
                        if (!regEx.test(punc[0].split('')[i])) {
                            tracker = false;
                            punc.push(tracker);
                            break test_loop;
                        } 
                    }
                if (tracker === null) {
                    tracker = true;
                    punc.push(tracker);
                }
            })
    
            let act = [];
            start.forEach(element => {
                if (element[2] === false) {
                    act.push(element);
                } 
            })
    
            let trackerArray = [];
            act.forEach((element, index) => {
                trackerArray.push([]);
    
                some_loop:
                    for (let i = 0; i < element[0].split('').length; i++) {
                        trackerArray[index].push(newRegEx.test(element[0].split('')[i]));
                        if (newRegEx.test(element[0].split('')[i]) === true) {
                            element.push(i);
                            break some_loop;
                        }
                    }
            })
    
            act.forEach((element, index) => {
                finalArray.splice(act[index][1] + (2 * refinedCounter), 0, element[0].split('').slice(0, act[index][3]).join(''), element[0].split('').slice(act[index][3]).join(''));
                finalArray[act[index][1] + (2 * refinedCounter) + 2] = '';
                refinedCounter++;
            })
    
            finalArray.forEach(element => {
                if (element.length === 0) {
                    finalArray.splice(finalArray.indexOf(element), 1);
                }
            })
    
            let furtherRefined = [];
            finalArray.forEach(element => {
                if (element.trim().length !== 0) {
                    furtherRefined.push(element);
                }
            })
    
            let extraEndPuncArray = [];
    
            furtherRefined.forEach((element, index) => {
                another_loop:
                    for (let i = 0; i < element.split('').length; i++) {
                        if (!newRegEx.test(element.split('')[i])) {
                            extraEndPuncArray.push([]);
                            extraEndPuncArray[extraEndPuncArray.length - 1].push(element, finalArray.indexOf(element));
                            break another_loop;
                        } else {
                            continue;
                        }
                    }
            })
    
            let newAct = [];
            extraEndPuncArray.forEach(element => {
                if (newRegEx.test(element[0].split('')[0]) && !newRegEx.test(element[0].split('')[element[0].split('').length - 1])) {
                    newAct.push([]);
                    newAct[newAct.length - 1].push(element[0], element[1]);
                }
            })
    
            refinedCounter = 0;
            newAct.forEach(element => {
                finalArray.splice(element[1] + (2 * refinedCounter), 0, element[0].split('').slice(0, regEx.lastIndex - 2).join(''), element[0].split('').slice(regEx.lastIndex - 2).join(''));
                refinedCounter++;
            })
    
            outer_loop_two:
                for (let i = 0; i < finalArray.length; i++) {
                    inner_loop_two:
                        for (let o = 0; o < newAct.length; o++) {
                            if (finalArray[i] === newAct[o][0]) {
                                finalArray[i] = '';
                            }
                        }
                } 
    
            let finalValueArray = [];
            finalArray.forEach(element => {
                if (element.trim().length !== 0) {
                    finalValueArray.push(element);
                } 
            })
    
            for (let i = 0; i < finalArray.length; i++) {
                spanArray.push(document.createElement('span'));
            }
    
            for (let i = 0; i < spanArray.length; i++) {
                spanArray[i].innerHTML = finalArray[i];
                spanArray[i].style.fontSize = "1rem";
                spanSeries.appendChild(spanArray[i]);
                if (i === spanArray.length - 1) {
                    spanArray.pop();
                }
            }
            elementModule.dynamicPortion.appendChild(spanSeries);
            const exportVal = [spanArray, finalValueArray]; 
            setTimeout(() => {            
                spanSeries.style.opacity = "100%";
                resolve(exportVal); 
            }, 1000);
            
        })
    }
    
    
    const tableSetUp = (value, caseSensitivity) => {
        return new Promise((resolve, reject) => {
            const caseVal = (caseSensitivity !== 0 ? true : false);
            value.forEach(element => {
                if (newRegEx.test(element.innerHTML)) {
                    element.setAttribute('class', `${!caseVal ? (element.innerHTML).toLowerCase() : element.innerHTML}`);
                }
            })
            console.log(value);
    
            let onlyWords = [];
            value.forEach(element => {
                if (element.getAttribute('class') !== null) {
                    onlyWords.push(element);
                }
            })
            console.log(onlyWords);
    
            let onlyWordsClass = [];
            onlyWords.forEach(span => {
                if (span.getAttribute('class') !== null) {
                    onlyWordsClass.push(span.getAttribute('class'));
                }
            })
    
            let sorted = [];    
            let currentWord;
    
            for (let i = 0; i < onlyWordsClass.length; i++) {
                current_word_loop:
                    for (let o = 0; o < onlyWordsClass.length; o++) {
                        if (onlyWordsClass[o] !== ' ') {
                            currentWord = onlyWordsClass[o];
                            break current_word_loop;
                        }
                    }
                // Something
                sorted.push(onlyWordsClass.filter(word => word === currentWord));
    
                for (let e = 0; e < onlyWordsClass.length; e++) {
                    if (onlyWordsClass[e] === sorted[sorted.length - 1][0]) {
                        onlyWordsClass[e] = ' ';  
                    }
                }
            }
    
            let emptySubArrayCounter = 0;
    
            for (let i = sorted.length - 1; i >= 0; i--) {
                if (sorted[i].length === 0) {
                    emptySubArrayCounter++;
                }
            }
    
            for (let i = 0; i < emptySubArrayCounter; i++) {
                sorted.pop();
            }
    
            let elementLength;
            sorted.forEach(element => {
                elementLength = element.length;
                element.push(elementLength);
            })
    
            resolve(sorted);
        })
    }
    
    const createTable = sorted => {
        return new Promise((resolve, reject) => {
            let instructions = document.createElement('span');
            instructions.style.width = "100%";
            instructions.innerHTML = "Hover over the table's rows (Case Sensitivity is " + `${parseInt(elementModule.caseSensitivitySlider.value) === 1 ? "on " : "off "}` + "by the way)";
            instructions.style.height = "auto";
            instructions.style.opacity = "0%";
            instructions.style.transition = "opacity 1s ease-in";
            instructions.style.textAlign = "center";
            instructions.style.fontWeight = "bolder";
            elementModule.dynamicPortion.appendChild(instructions);
    
            let actTableWrapper = document.createElement('div');
            actTableWrapper.style.width = "100%";
            actTableWrapper.style.height = "200px";
            actTableWrapper.style.opacity = "0%";
            actTableWrapper.style.overflowY = "scroll";
            actTableWrapper.style.transition = "opacity 1s ease-in";
            elementModule.dynamicPortion.appendChild(actTableWrapper);
    
            let tableWrapper = document.createElement('table');
            tableWrapper.style.width = "100%";
            tableWrapper.style.height= "100%";
            tableWrapper.style.opacity = "0%";
            tableWrapper.style.transition = "opacity 1s ease-in";
            actTableWrapper.appendChild(tableWrapper);
    
            let rowArray = [];
    
            for (let i = 0; i < sorted.length; i++) {
                rowArray.push(tableWrapper.insertRow(-1));
            }
    
            let cellArray = [];
            rowArray.forEach((row, index) => {
                cellArray.push(row.insertCell(-1));
                cellArray.push(row.insertCell(-1));
            })
    
            let mergedSorted = [];
            sorted.forEach(element => {
                mergedSorted.push(element[0], element[element.length - 1]);
            })        
            console.log(mergedSorted);
    
            cellArray.forEach((cell, index) => {
                cell.innerHTML = mergedSorted[index];
            })
    
            spanArray.forEach(span => {
                span.style.transition = "background-color 0.2s ease-in";
            })
    
            setTimeout((() => {
                instructions.style.opacity = "100%";    
                actTableWrapper.style.opacity = "100%";
                tableWrapper.style.opacity = "100%";
            }), 1000);
            resolve([]);
        })
    }
    
    const highlight = value => {
        spanArray.forEach(span => {
            if (span.getAttribute('class') === value) {
                span.style.backgroundColor = "#F4A261";
            }
        })
    }
    
    const removeHighlight = () => {
        spanArray.forEach(span => {
            if (span.style.backgroundColor !== "white") {
                span.style.backgroundColor = "white";
            }
        })
    }
    












let counter = 0;
elementModule.opener.addEventListener('click', e => {
    e.preventDefault();
    counter++;
    if (counter % 2 !== 0) {
        elementModule.opened.style.left = '0%';
        elementModule.opener.style.left = '-85%';
        elementModule.top.style.transform = 'rotate(45deg)'; 
        elementModule.bottom.style.transform = 'rotate(45deg)';
        elementModule.title.style.top = "87.5%";
    } else {
        elementModule.opened.style.left = '100%';
        elementModule.opener.style.left = '0%';
        elementModule.top.style.transform = 'rotate(0deg)';
        elementModule.bottom.style.transform = 'rotate(0deg)';
        elementModule.title.style.top = "0%";
    }
})

elementModule.form.addEventListener('submit', e => {
    e.preventDefault();
    let audio = new Audio('./resources/audio/audioSoundEffect.wav');
    audio.play();
    elementModule.recommendation.style.opacity = "0%";
    elementModule.textarea.style.opacity = "0%";
    elementModule.caseSensitivitySpan.style.opacity = "0%";
    elementModule.caseSensitivity.style.opacity = "0%";
    elementModule.restriction.style.opacity = "0%";
    elementModule.note.style.opacity = "0%";
    removeFunction().then(resolveMessage => {
        elementModule.formDiv.style.height = "10rem";
        elementModule.submitButton.disabled = true;
        return generate(resolveMessage.trim().split(' '));
    }).then(resolveMessage => {
        console.log(resolveMessage[0]);
        return tableSetUp(resolveMessage[0], parseInt(elementModule.caseSensitivitySlider.value));
    }).then(resolveMessage => {
        console.log(resolveMessage);
        return createTable(resolveMessage);
    }).then(resolveMessage => {
        console.log(resolveMessage);    
        Array.from(document.querySelectorAll('tr')).forEach((row, index) => {
            row.addEventListener('mouseover', e => {
                e.preventDefault();
                Array.from(row.childNodes).forEach(cell => {
                    cell.style.backgroundColor = "#F4A261";
                })
                highlight(row.firstChild.innerHTML);
            })
            row.addEventListener('mouseleave', e => { 
                e.preventDefault();
                Array.from(row.childNodes).forEach(cell => {
                    cell.style.backgroundColor = `${index % 2 === 0 ? "#264653" : "#2A9D8F"}`;
                })
                removeHighlight(row.firstChild.innerHTML);
            })
        });
    })
})