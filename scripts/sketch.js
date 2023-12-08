


let chosenWordData = [];
let cookieNum = 0;


console.log('sketch loaded');
function setup(){

    console.log('sketch setup');
    let c = createCanvas(windowWidth,windowHeight);
    c.position(0,0);
    clear();
    
    
    // chrome.runtime.onMessage.addListener(
        // function(request, sender, sendResponse){
            // console.log(sender.tab?
                // 'from a content script:' + sender.tab.url:
                // "from the extension");
            // 
        // }
    // )

    let paragraphList = [];
    
    
    let eligibleTags = document.querySelector('body');

    for(let elem of eligibleTags.getElementsByTagName('*')){
        if(elem.innerHTML.trim()!='' && !['script','a','img', 'span', 'div'].includes(elem.tagName)){
            // console.log(elem.textContent);
            paragraphList.push(elem);
        }
    }
    
    //select a few at random
    
    
    let randomParagraphs = [];
    
    console.log(paragraphList.length);
    if(paragraphList.length>5){
        for(let i=0; i<paragraphList.length/2;i++){
            let randomIndex = Math.floor(Math.random() * paragraphList.length);
            if(randomParagraphs.includes(randomIndex)){
                i--;
            }else{
                randomParagraphs.push(randomIndex);
            }
        }
        
    }
    else if(paragraphList.length>0){
        randomParagraphs = [0];
    }
    
    console.log(randomParagraphs);
    //get seperate the innerhtml into a list of words
    
    for(let paraIndex of randomParagraphs){
        let words = paragraphList[paraIndex].innerHTML.split(' ');
    
        //get random word, change it so that it's wrapped in a span with class 'private-eye'
        let randomWord = Math.floor(Math.random()*words.length);
        words[randomWord] = "<span class='private-eye'>" + words[randomWord] + "</span>"
    
        //put the list back into a single string
        //change the innerhtml to that stringified list
        paragraphList[paraIndex].innerHTML = words.join(' ')
        
    }   
    
    let eyeList = document.querySelectorAll('.private-eye');
    console.log(eyeList);

    
    for(let eyeSpan of eyeList){
        console.log(eyeSpan);
        chosenWordData.push(eyeSpan.getBoundingClientRect());
        
    }
    console.log(chosenWordData);
}

function draw(){
    console.log('sketch looping');
    fill('orange');
    for(let word of chosenWordData){
        rect(word['x'],word['y'],word['width'],word['height']);
    }
}