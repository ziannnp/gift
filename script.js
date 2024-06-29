//Menyapa
let date = new Date();
let jam = date.getHours();
let sapa ='';

if(jam >= 0){
  sapa = 'malam &#127765'
}

if(jam >= 5){
  sapa = 'pagii &#127780'
}

if(jam >= 10){
  sapa = 'siang &#127774'
}

if(jam >= 15){
  sapa = 'sore &#9925'
}

if(jam >= 18){
  sapa = 'malam &#127765'
}

var audio = document.getElementById("myAudio");
  function playMusic() {
   audio.play();
  }
  
function loader(){
  document.querySelector('.load-content').classList.add('fade-out');
}
function fadeOut(){
  setInterval(loader, 500);
}
window.onload = fadeOut;


const sky = document.querySelector('.sky');

const message = document.createElement('h3'),
      pukul = document.createElement('p'),
      awal = document.createElement('awal');
      
awal.style.height = '100vh';
awal.style.width = '100%';

sky.appendChild(awal);
awal.appendChild(message);
awal.appendChild(pukul);

message.innerHTML = `hallo met ${sapa}`;
setTimeout(() => {
  pukul.innerHTML = 'klik for next';
}, 8000);


//Kembang api
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = 8;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.exploded = false;
        this.particles = [];
    }

    update() {
        if (!this.exploded) {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            if (Math.hypot(this.x - this.targetX, this.y - this.targetY) < this.speed) {
                this.exploded = true;
                this.createParticles();
                setTimeout(() => {
                  changeSky();
                  message.innerHTML = 'happy <br> birthday <br> &#129395';
                  afterDuar();
                }, 300);
            }
        }

        this.particles.forEach(particle => particle.update());
        this.particles = this.particles.filter(particle => !particle.isFaded());
    }

    draw() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }

        this.particles.forEach(particle => particle.draw());
    }

    createParticles() {
        const color = "deepskyblue";
        const numParticles = 100;
        for (let i = 0; i < numParticles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 1;
            this.particles.push(new Particle(this.x, this.y, angle, speed, color));
        }
    }
}

class Particle {
    constructor(x, y, angle, speed, color) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.color = color;
        this.alpha = 1;
        this.gravity = 0.05;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.speed *= 0.98; // Friction
        this.alpha -= 0.01;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    isFaded() {
        return this.alpha <= 0;
    }
}

let fireworks = [];

function createFirework() {
    const x = canvas.width / 2;
    const y = 580;
    const targetX = canvas.width / 2;
    const targetY = canvas.height / 4;
    // const targetX = Math.random() * canvas.width;
    // const targetY = Math.random() * canvas.height / 2;
    fireworks.push(new Firework(x, y, targetX, targetY));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.exploded && firework.particles.length === 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

function changeSky(){
  document.body.classList.toggle('stars');
}


//Bintang jatuh
function bintangMeteor (iStars, duration, mX, mY){
  const bintang = document.querySelector('.bintang');
  this.iStars = iStars;
  let i = 0;
  while(i < iStars){
    let meteor = document.createElement('span');
    this.duration = duration;
    this.mX = mX;
    this.mY = mY;
    meteor.style.right = mX +'px';
    meteor.style.top = mY +'px';
    
    meteor.style.animationDuration = duration+'s';
    
    bintang.appendChild(meteor);
    i++
  }
}


//Bintang-bintang
function stars(){
  let count = 300;
  let i = 0;
  while(i < count){
    let star = document.createElement("i");
    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);
    let duration = Math.random() * 10;
    let size = Math.random() * 2;
    
    star.style.left = x+'px';
    star.style.top = y+'px';
    star.style.width = size+'px';
    star.style.height = size+'px';
    
    star.style.animationDuration = 20 + duration+'s';
    star.style.animationDelay = 3 + duration+'s';
    
    sky.appendChild(star);
    i++
  }
}
stars();


//Teks pesan
let msg = 0;

document.addEventListener('click', () => {
  msg++;
  
  if(msg == 1){
    playMusic();
    message.innerHTML = "liat dulu yaa <br> bentarr kok";
    pukul.style.display = "none";
    pukul.innerHTML = "";
  }

  if(msg == 2){
    awal.style.backgroundColor = 'transparent';
    message.innerHTML = "";
    setTimeout(() => {
      message.style.transition = '500ms';
      message.innerHTML = "haiii!! <br> kamu apa kabar";
    }, 500);
    document.body.classList.toggle('go');
  }

  if(msg == 3){
    message.innerHTML = "semoga selalu baik dan sehat selalu";
  }
  
  if(msg == 4){
    message.innerHTML = "aku punya sesuatu buat kamu";
  }
  
  if(msg == 5){
    message.innerHTML = "tapi liat dulu dehh pohonnya, <br> lucu gaa";
  }
  
  if(msg == 6){
    message.innerHTML = "semuanya warna pink";
  }
  
  if(msg == 7){
    message.innerHTML = "aku nemu pohon ini di google, katanya sih pohon sakura";
  }
  
  if(msg == 8){
    message.innerHTML = "tapi ga tau juga, aku belum pernah liat langsung pohon sakura";
  }
  
  if(msg == 9){
    message.innerHTML = "coba klo di depan rumah aku ada pohon kayak gini";
  }
  
  if(msg == 10){
    message.innerHTML = "mau langsung aku pamerin ke orang-orang";
  }
  
  if(msg == 11){
    message.innerHTML = "tapi ngga mungkin sihh";
  }
  
  if(msg == 12){
    message.innerHTML = "ehh iya aku hitung mundur dari 3 yaa";
  }
  
  if(msg == 13){
    let fadeDuration = 2;
    function fadeIn() {
      var volume = 0;
      var fadeInInterval = setInterval(function() {
        if (volume < 1) {
          volume += 0.05;
          if (volume > 1) volume = 1;
          audio.volume = volume;
        } else {
          clearInterval(fadeInInterval);
        }
      }, fadeDuration * 1000 / 20);
    }
  
  audio.pause();
  audio.currentTime = 44;
  audio.volume = 0;
  audio.play();
  fadeIn();
    
    count = 3;
    const countdown = setInterval(() => {
      message.innerHTML = count;
      message.style.fontSize = '35px';
      count--;
      if (count < 0) {  
        message.innerHTML = "";
        message.style.fontSize = '17px';
        clearInterval(countdown);
        createFirework();
        animate();
      }
    }, 1000);
  }
  
});

function afterDuar(){
  let duar = 0;
    document.addEventListener('click', () => {
      duar++;
      
      if(duar == 1){
        message.innerHTML = "selamat ulang tahun <br> deva siti annisa";
      }
      
      if(duar == 2){
        message.innerHTML = "udhh tambah tua aja nihh ><";
      }
      
      if(duar == 3){
        message.innerHTML = "semoga di umur kamu sekarang bisa tambah dewasa lagi, jadi lebih baik lagi dari tahun-tahun sebelumnya, selalu sayang sama papa mama kamu, sama adik-adik kamu juga";
      }
      
      if(duar == 4){
        message.innerHTML = "terus di mudahkan juga rezekinya, sehat selalu, bahagia juga, dan semoga panjang umur";
      }
      
      if(duar == 5){
        message.innerHTML = "aamiin";
      }
      
      if(duar == 6){
        message.innerHTML = "untuk apa yang kamu mau, kamu berdo'a sendiri yaa";
      }
      
      if(duar == 7){
        message.innerHTML = "aku ngga tau, di ulang tahun kamu sekarang kamu lagi pengen apa";
      }
      
      if(duar == 8){
        message.innerHTML = "pokonya do'a yang terbaik buat kamu";
      }
      
      if(duar == 9){
        message.innerHTML = "";
        new bintangMeteor(1, 2, -5, -5);
        setTimeout(() => {
          message.innerHTML = "liat dehh ada bintang jatuh";
        }, 500);
      }
      
      if(duar == 10){
        message.innerHTML = "kecepetan ga sihh";
      }
      
      if(duar == 11){
        message.innerHTML = "cuman ada satu lagi";
      }
      
      if(duar == 12){
        message.innerHTML = "coba klo ada banyak langitnya pasti jadi bagus";
      }
      
      if(duar == 13){
        message.innerHTML = "aku coba tambahin lagi yaa";
      }
      
      if(duar == 14){
        setTimeout(() => {
          message.innerHTML = "udhhh tuhh";
        }, 2000);
        setInterval(() => {
          let durations = Math.random() * 4 + 1;
          let meteorX = Math.floor(Math.random() * -150 + -5);
          let meteorY = Math.floor(Math.random() * 700 + -300);
          new bintangMeteor(1, durations, meteorX, meteorY);
        }, Math.ceil(Math.random()*800+300));
      }
      
      if(duar == 15){
        message.innerHTML = "jadi banyak bangett, <br> ngga bakal habis-habis";
      }
      
      if(duar == 16){
        message.innerHTML = "sekali lagi happy birthday";
      }
      
      if(duar == 17){
        message.innerHTML = "kado nya bintang jatuh sama bintang yang di langit yaa";
      }
      
      if(duar == 18){
        message.innerHTML = "itu bintang nya ada 300 lho";
      }
      
      if(duar == 19){
        message.innerHTML = "klo lagi gabut coba aja dehh hitung";
      }
      
      if(duar == 20){
        message.innerHTML = "buat kamu ambil aja, lumayan klo di simpen dapet banyak";
      }
      
      if(duar == 21){
        message.innerHTML = "hhuuuuu";
      }
      
      if(duar == 22){
        message.innerHTML = "apaa lagi yaa";
      }
      
      if(duar == 23){
        message.innerHTML = "udhh dulu yaa,nanti dibikinin lagi";
      }
      
      if(duar == 24){
        message.innerHTML = "baabaaayyy";
      }
      
      if( duar == 25){
        message.innerHTML = "";
        awal.style.backgroundColor = 'black';
        setInterval(function() {
          audio.volume -= 0.1;
        }, 100);
        if(audio.volume == 0){
          clearInterval();
          audio.pause();
        }
      }
    });
  }