var cols = document.querySelectorAll('.col')

// function genRandomColor() {
//     const hexCodes = '123456789ABCDEF'
//     let color = ''
//     for (let i=0; i<6; i++) {
//         color += hexCodes[Math.floor(Math.random()*hexCodes.length)]
//     }
//     return '#' + color
// }
document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code.toLowerCase() ==='space') {
        setRandomColors()
    }
})
const copyAlert = document.querySelector('.alert')
document.addEventListener('click', event => {
    const type = event.target.dataset.type
    if(type === 'lock') {
        const node = 
            event.target.tagName.toLowerCase() === 'i'
                ? event.target
                : event.target.children[0]
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')

    } else if (type === 'copy') {
        copyToClick(event.target.textContent)
        copyAlert.style.opacity = 1
        setTimeout(function(){
            copyAlert.style.opacity = 0
        }, 2000) 
    }
})

function copyToClick(text) {
    navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial){
    const colors = isInitial ? getColorsFromHash() : []

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        
        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial ? colors[index] ? colors[index] : chroma.random() : chroma.random()
        
        if(!isInitial) {
            colors.push(color)
        }

        text.textContent = color
        col.style.background = color

        
        setTextColor(text,color)
        setTextColor(button,color)
    });

    updateColorsHash(colors)

}

function setTextColor(text,color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'gray' : 'white'
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map((col) => col.toString().substring(1)).join('-')
}
function getColorsFromHash(){
    if(document.location.hash.length>1) {
        return document.location.hash.substring(1).split('-').map((color)=>'#'+color)
    }
    return []
}

setRandomColors(true)



//разворот слов имеющих 5 и более символов


// spinWords('vag yas god')
// spinWords('This is another test')

// function spinWords(string){
//     //TODO Have fun :)
//     var x = string.split(' ')
//     for(i=0; i<x.length; i++){
//         if(x[i].length>4){
//             x[i] = x[i].split('').reverse().join('')
//         }
//         else{

//         }
//     }
//     console.log(x.join(' '))
// }

// 2 способ разворота слов
// function spinWords(string) {
//     x = string.split(' ').map(function(word){
//         return word.length > 4 ? word.split('').reverse().join('') : word    
//     }).join(' ')
//     console.log(x)
// }
