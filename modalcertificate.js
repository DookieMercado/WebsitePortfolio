document.addEventListener("DOMContentLoaded",()=>{

const cards=document.querySelectorAll(".certificate-card");
const modal=document.getElementById("certificateModal");
const modalImg=document.getElementById("modalImage");
const close=document.getElementById("closeModal");

cards.forEach(card=>{

card.addEventListener("click",()=>{

const cert=card.dataset.certificate;

let path=`./certificates/${cert}.png`;

if(cert==="NC2"){
path=`./certificates/${cert}.jpg`;
}

modalImg.src=path;

modal.classList.add("active");

document.body.style.overflow="hidden";

});

});

function closeModal(){

modal.classList.remove("active");

document.body.style.overflow="";

setTimeout(()=>{
    modalImg.removeAttribute("src");
},250);

}

close.addEventListener("click",closeModal);

modal.addEventListener("click",(e)=>{

if(e.target===modal){
closeModal();
}

});

document.addEventListener("keydown",(e)=>{

if(
e.key==="Escape" &&
modal.classList.contains("active")
){
closeModal();
}

});

});