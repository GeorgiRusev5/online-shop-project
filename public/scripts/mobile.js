const hamburgerButtonElement = document.querySelector('#mobile-menu-btn');
const mobileMenuElement = document.querySelector('#mobile-menu');


function getCurrentUrl(){
  const someArray = window.location.href.split('/');
  const lastitem = someArray[someArray.length-1];
  return lastitem.toString()
}


function toggleMobileMenu(){
  mobileMenuElement.classList.toggle('open');
  
  if(getCurrentUrl() == 'signup' || getCurrentUrl() == 'login'){
  if(mobileMenuElement.classList.contains('open')){
    showPasswordElement.style.display = 'none';
    showConfirmedPasswordElement.style.display = 'none';
  }
  else{
    showPasswordElement.style.display = 'inline-block'
    showConfirmedPasswordElement.style.display = 'inline-block';
  }
}
}

hamburgerButtonElement.addEventListener('click',toggleMobileMenu)