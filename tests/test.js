const test = "it had ..it best hello .it had it been something love .........;it";
const testArray = test.split(' ');

const regEx = /[^A-Za-z0-9']/g;
let furtherSplit = [];

testArray.forEach(word => {
    if (!regEx.test(word)) {
        furtherSplit.push(word);
        furtherSplit.push(' ');
    } else {
        furtherSplit.push((word.split('').slice(0, regEx.lastIndex - 1).join('')));
        furtherSplit.push((word.split('').slice(regEx.lastIndex - 1,)).join(''));
        furtherSplit.push(' ');
    }
})

furtherSplit.pop();


let spanArray = [];
let div = document.getElementById('div');

furtherSplit.forEach(element => {
    spanArray.push(document.createElement('span'));
})

spanArray.forEach(span => {
    span.innerHTML = furtherSplit[spanArray.indexOf(span)];
    div.appendChild(span);
})

spanArray.forEach(span => {
    if (!regEx.test(span.innerHTML)) {
        span.setAttribute('class', `${span.innerHTML}`);
    }
})

spanArray.forEach(span => {
    if (span.getAttribute('class') === " ") {
        span.removeAttribute('class');
    }
})

let onlyWordsClass = [];
spanArray.forEach(span => {
    if (span.getAttribute('class') !== null) {
        onlyWordsClass.push(span.getAttribute('class'));
    }
})

console.log(onlyWordsClass);

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

console.log(sorted);

