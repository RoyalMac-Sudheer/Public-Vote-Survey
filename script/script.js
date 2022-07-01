var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

const confe = document.getElementById('my-canvas');
const submit = document.getElementById('submit');
const message = document.getElementById('message');
const phone = document.getElementById('phone');
const form = document.querySelector('.form');
const options = document.querySelector('.options');
const congressLogo = document.querySelector('.congress-logo');
const lists = document.querySelectorAll('.lists');
const handFinger = document.querySelectorAll('#handFinger');
const activeMembers = document.querySelector('.active-members');
const activeNumber = document.querySelector('.counting-numbers');
const showGetMemForm = document.querySelector('.get-mem-content');
const getMemBtn = document.getElementById('getMem');
const hideFingerPrint = document.querySelector('.submit-button');
var randomNumbers = +activeNumber.getAttribute('data-number');

var intervals1 = null , intervals2 = null, war=null, msg=null;

function changeNumber() { 
    let randomNum = Math.floor(Math.random() * 2);
    randomNumbers = randomNumbers + randomNum;
    activeNumber.textContent = randomNumbers;
 }

 function changeNumberAnimation(){
    const t2 = gsap.timeline({ repeat : -1 , defaults: { duration: 1 } })
    t2
        .to('.active-members', { opacity : 0,  ease: 'power2.in',})
        .to('.active-members', { opacity : 1,  ease: 'power2.in',  onComplete : changeNumber})
 }

 const updateCounter = () =>{
    const targetCount = randomNumbers;
  const startingCount = Number(activeNumber.textContent);  // convert string to number
  const incr = targetCount / 100;
    
  if(startingCount < targetCount){
    activeNumber.textContent=`${Math.round(startingCount + incr)}`;
      setTimeout(updateCounter , 20)
  }else{
    changeNumberAnimation();
    activeNumber.textContent=targetCount;
  }
}
updateCounter();


function startForm() {
    submit.classList.add('visible');
    setTimeout(() => {
        options.classList.add('active');
        form.classList.add('active');
    },1000)
}
let n1=1, n2=2, n3=3; 
const tl = gsap.timeline({ onComplete : startForm , defaults: { duration: 2 } })
    tl
        .to('.btn-info', { scale : '2',  ease: 'power3.out' }, -1)
        .to(`.btn-info span:nth-child(${n1})`, 1, { 'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',  ease: 'power4.out' })
        .to(`.btn-info span:nth-child(${n2})`, 1, { 'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',  ease: 'power4.out' })
        .to(`.btn-info span:nth-child(${n3})`, 1, { 'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',  ease: 'power4.out' })
        .to('.btn-info', { scale : '1',  ease: 'power3.inOut' })


lists.forEach(list => {
    list.addEventListener('click', function (e) {
        e.preventDefault();
        const activeLists = document.querySelectorAll('.lists.active');
        submit.classList.remove('active');
        if(activeLists.length < 3){
            submit.classList.remove('active');
            list.classList.toggle('active');
        }else if(activeLists.length === 3 && this.classList.value.includes('active')){
            submit.classList.remove('active');
            this.classList.remove('active');
        }else{
            submit.classList.add('active');
            stopFingerAnimation();
            lists.forEach(list => {
                list.classList.add('warning')
            })
            war = setTimeout(() => {
                lists.forEach(list => {
                    list.classList.remove('warning')
                })
            }, 1000);
        }
       if(document.querySelectorAll('.lists.active').length === 3){
        submit.classList.add('active');
        stopFingerAnimation();
       }else{
        submit.classList.remove('active');
       }
    })
})

var startFingerAnimation =  () => {
    function addFinger(elem) {
        elem.classList.add('handFingerActive')
        removeFinger(elem);
    }
    function removeFinger(elem) {
        setTimeout(() => {
            elem.classList.remove('handFingerActive')
        },2000)
    }
    for (let i = 0; i < handFinger.length; i++) {
        intervals1 = setTimeout(() => {
            addFinger(handFinger[i]);
        }, `${i * 2}000`)
    }
}
startFingerAnimation();
intervals2 = setInterval(startFingerAnimation, 20000);

function stopFingerAnimation() {  
    clearInterval(intervals2);
    // clearTimeout(intervals1);
    var killId = setTimeout(function() {
        for (var i = killId; i > 0; i--){
            i == war || i == msg  ? " " : clearTimeout(i);
        }
      }, 000);
      for (let i = 0; i < handFinger.length; i++) {
        handFinger[i].classList.remove('handFingerActive')
    }
}

function getMemberShipForm() {
    setTimeout(() => {
        hideFingerPrint.style.display = 'none';
        confe.classList.remove('active');
        congressLogo.classList.remove('active');
        showGetMemForm.classList.add('active')
    }, 3000);
}


submit.addEventListener('click', function(e)  {
    e.preventDefault();
    const activeLists = document.querySelectorAll('.lists.active');
    if(phone.value == "" || phone.value == null){
        alert('Enter Your  number');
        phone.focus();
        return
    }else if(phone.value.length < 10 || phone.value.length > 10){
        phone.value = "";
        phone.focus();
        alert('Enter Valid  number');
        return
    }
    if(activeLists.length === 3){
            stopFingerAnimation();
            form.classList.remove('active');
            activeMembers.classList.add('deactive')
            submit.classList.remove('active');
            options.classList.remove('active');
            confe.classList.add('active');
            congressLogo.classList.add('active');
            msg = setTimeout(() => {
                message.textContent="Indian National Congress"
                stopFingerAnimation();
                getMemberShipForm();
            },3000);
    }else{
        stopFingerAnimation();
        startFingerAnimation();
        alert("Please Select Any three Options");
    }
})
getMemBtn.addEventListener('click', function () {
const nm = document.getElementById('nm');
const ad = document.getElementById('ad');
console.log('hello');
if(nm.value == null || nm.value == ""){
    alert('Please Fill Your Name');
    nm.focus();
    return
}
if(ad.value == null || ad.value == ""){
    alert('Please Fill Your Adhaar Number');
    ad.focus();
    return
}
    window.location.reload();

})

