const randomButton = document.getElementById("random")
const transcribeButton = document.getElementById("transcribe")
const translateButton = document.getElementById("translate")
const lengthInput = document.getElementById("length")
const chanceInput = document.getElementById("chance")
const holder = document.getElementById("holder");
const holder2 = document.getElementById("holder2");
const holder3 = document.getElementById("holder3");
let length = 0
let chance = 0
let nucleotides = []
let nucleotides2= []
const mappings = ['A','T','C','G']
const mappings2 = ['A','U','C','G']
const proteinMappings = {
"UUU" : "Phe",
"UUC" : "Phe",
"UUA" : "Leu",
"UUG" : "Leu",
"CUU" : "Leu",
"CUC" : "Leu",
"CUA" : "Leu",
"CUG" : "Leu",
"AUU" : "Ile",
"AUC" : "Ile",
"AUA" : "Ile",
"AUG" : "Met",
"GUU" : "Val",
"GUC" : "Val",
"GUA" : "Val",
"GUG" : "Val",

"UCU" : "Ser",
"UCC" : "Ser",
"UCA" : "Ser",
"UCG" : "Ser",
"CCU" : "Pro",
"CCC" : "Pro",
"CCA" : "Pro",
"CCG" : "Pro",
"ACU" : "Thr",
"ACC" : "Thr",
"ACA" : "Thr",
"ACG" : "Thr",
"GCU" : "Ala",
"GCC" : "Ala",
"GCA" : "Ala",
"GCG" : "Ala",

"UAU" : "Tyr",
"UAC" : "Tyr",
"UAA" : "Stop",
"UAG" : "Stop",
"CAU" : "His",
"CAC" : "His",
"CAA" : "Gln",
"CAG" : "Gln",
"AAU" : "Asn",
"AAC" : "Asn",
"AAA" : "Lys",
"AAG" : "Lys",
"GAU" : "Asp",
"GAC" : "Asp",
"GAA" : "Glu",
"GAG" : "Glu",

"UGU" : "Cys",
"UGC" : "Cys",
"UGA" : "Stop",
"UGG" : "Trp",
"CGU" : "Arg",
"CGC" : "Arg",
"CGA" : "Arg",
"CGG" : "Arg",
"AGU" : "Ser",
"AGC" : "Ser",
"AGA" : "Arg",
"AGG" : "Arg",
"GGU" : "Gly",
"GGC" : "Gly",
"GGA" : "Gly",
"GGG" : "Gly"
}


randomButton.addEventListener("click",()=>{
    removeAllChildNodes(holder2)
    removeAllChildNodes(holder3)
    for(let i=3;i<length-3;i++){
        let nucleotide = nucleotides[i]
        nucleotide.setAttribute("index", Math.floor(Math.random() * 3))
        nucleotide.innerHTML = mappings[nucleotide.getAttribute("index")];
    }
})

lengthInput.addEventListener("input",()=>{
    removeAllChildNodes(holder)
    removeAllChildNodes(holder2)
    removeAllChildNodes(holder3)
    length = parseInt(lengthInput.value)
    if(isNaN(length)){
        length = 0
    }
    while(length%3!=0 || length<6){
        lengthInput.value = length +1
        length = parseInt(lengthInput.value)
    }
    
    let newNucleotides = []
    nucleotides2 = []
    setStart(newNucleotides)
    for(let i=3;i<length-3;i++){
        const nucleotide = document.createElement('div')
        nucleotide.setAttribute("num",i)
        nucleotide.setAttribute("index", Math.floor(Math.random() * 3))
        nucleotide.innerHTML = mappings[nucleotide.getAttribute("index")];
        nucleotide.addEventListener("click",()=>{
            change(nucleotide)
        })

        holder.appendChild(nucleotide)
        newNucleotides.push(nucleotide)
    }
    setEnd(newNucleotides)
    nucleotides = newNucleotides
    
    
})

chanceInput.addEventListener("input",()=>{
    chance = parseFloat(chanceInput.value)
})

transcribeButton.addEventListener("click",()=>{
    removeAllChildNodes(holder2)
    removeAllChildNodes(holder3)
    nucleotides2 = []
    for(let i=0;i<length;i++){
        const nucleotide = document.createElement('div')
        nucleotide.setAttribute("num",i)
        nucleotide.innerHTML = transcribe(nucleotides[i])
        holder2.appendChild(nucleotide)
        nucleotides2.push(nucleotide)
    }
})

translateButton.addEventListener("click",()=>{
    if(holder2.firstChild==false){
        return
    }
    removeAllChildNodes(holder3)
    let start = false
    for(let i=0;i<length-2;i++){
        const codon = nucleotides2[i].innerHTML + nucleotides2[i+1].innerHTML + nucleotides2[i+2].innerHTML
        if(proteinMappings[codon]==="Met"){
            start = true
        }
        else if(proteinMappings[codon]==="Stop"){
            start = false
            i+=2
        }
        if(start==true){
            const aminoAcid = document.createElement('div')
            aminoAcid.innerHTML = proteinMappings[codon];
            holder3.appendChild(aminoAcid)
            i+=2
        }
    }
    if(start==true){
        const aminoAcid = document.createElement('p')
            aminoAcid.innerHTML = "No Stop Codon";
            holder3.appendChild(aminoAcid)
    }
})

function setStart(tempNucleotides){
    let nucleotide = document.createElement('div')
        nucleotide.setAttribute("num",0)
        nucleotide.innerHTML = "T";
        holder.appendChild(nucleotide)
        tempNucleotides.push(nucleotide)
        nucleotide = document.createElement('div')
        nucleotide.setAttribute("num",1)
        nucleotide.innerHTML = "A";
        holder.appendChild(nucleotide)
        tempNucleotides.push(nucleotide)
        nucleotide = document.createElement('div')
        nucleotide.setAttribute("num",2)
        nucleotide.innerHTML = "C";
        holder.appendChild(nucleotide)
        tempNucleotides.push(nucleotide)
    
}

function setEnd(tempNucleotides){
    let nucleotide = document.createElement('div')
        nucleotide.setAttribute("num",length-3)
        nucleotide.innerHTML = "A";
        holder.appendChild(nucleotide)
        tempNucleotides.push(nucleotide)
        nucleotide = document.createElement('div')
        nucleotide.setAttribute("num",length-2)
        nucleotide.innerHTML = "T";
        holder.appendChild(nucleotide)
        tempNucleotides.push(nucleotide)
        nucleotide = document.createElement('div')
        nucleotide.setAttribute("num",length-1)
        nucleotide.innerHTML = "T";
        holder.appendChild(nucleotide)
        tempNucleotides.push(nucleotide)
    
}

function change(nucleotide){
    nucleotide.setAttribute("index", (parseInt(nucleotide.getAttribute("index"))+1)%4)
    nucleotide.innerHTML = mappings[nucleotide.getAttribute("index")];
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        
        parent.removeChild(parent.firstChild);
    }
}

function mutation(){
    return mappings2[Math.floor(Math.random()*3)]
}

function transcribe(nucleotide){
    if(Math.random()<chance){
        return mutation()
    }
    if(nucleotide.innerHTML=="T"){
        return "A"
    }
    if(nucleotide.innerHTML=="A"){
        return "U"
    }
    if(nucleotide.innerHTML=="G"){
        return "C"
    }
    if(nucleotide.innerHTML=="C"){
        return "G"
    }
}

