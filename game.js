// FULL game.js — birleştirilmiş ve düzeltilmiş

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ==========================================
// AYARLAR
// ==========================================
const TILE_SIZE = 64;
const GROUND_Y = 800;

// ==========================================
// LEVEL TANIMLARI (SENİN VERİLERİN)
// ==========================================
const EMBEDDED_LEVELS = {
    1: {
        "width": 4000,
        "playerStart": { "x": 100, "y": GROUND_Y - 200 },
        "finishX": 3800,
        "platforms": [
            { "x": 0,    "y": GROUND_Y, "w": 350,  "h": 80 },
            { "x": 850,  "y": GROUND_Y, "w": 450,  "h": 80 },
            { "x": 2100, "y": GROUND_Y, "w": 800,  "h": 80 },
            { "x": 3300, "y": GROUND_Y, "w": 600,  "h": 80 },
            { "x": 380,  "y": GROUND_Y - 150, "w": 192, "h": 64 },
            { "x": 650,  "y": GROUND_Y - 250, "w": 128, "h": 64 },
            { "x": 1400, "y": GROUND_Y - 150, "w": 128, "h": 64 },
	    { "x": 2300, "y": GROUND_Y - 180, "w": 64, "h": 64 },
	    { "x": 2380, "y": GROUND_Y - 360, "w": 64, "h": 64 },

            { "x": 1650, "y": GROUND_Y - 280, "w": 128, "h": 64 },
            { "x": 2900, "y": GROUND_Y - 150, "w": 128, "h": 64 },
            { "x": 2964, "y": GROUND_Y - 214, "w": 128, "h": 64 },
            { "x": 3028, "y": GROUND_Y - 278, "w": 128, "h": 64 }
        ],
        "checkpoints": [{ "x": 900, "y": GROUND_Y - 64 }, { "x": 2200, "y": GROUND_Y - 64 }],
        "healthPacks": [{ "x": 1550, "y": GROUND_Y - 310 }, { "x": 2412, "y": GROUND_Y - 550 }],
        "spikes": [
            { "x": 300, "y": GROUND_Y - 40 },
            { "x": 1000, "y": GROUND_Y - 40 },
            { "x": 1280,"y": GROUND_Y - 40 },
            { "x": 2750,"y": GROUND_Y - 40 },
            { "x": 2800,"y": GROUND_Y - 40 },
            { "x": 2850,"y": GROUND_Y - 40 },
            { "x": 3350,"y": GROUND_Y - 40 },
            { "x": 3400,"y": GROUND_Y - 40 },
            { "x": 3300,"y": GROUND_Y - 40 }
        ],
        "spiders": [],
        "boss": null
    },
    2: {
        "width": 5000,
        "playerStart": { "x": 100, "y": GROUND_Y - 200 },
        "finishX": 4800,
        "platforms": [
            { "x": 0,    "y": GROUND_Y, "w": 480, "h": 80 },
            { "x": 300,  "y": GROUND_Y - 150, "w": 1280/4, "h": 64 },
            { "x": 556,  "y": GROUND_Y - 214, "w": 1280/5, "h": 64 },
            { "x": 850,  "y": GROUND_Y - 280, "w": 192, "h": 64 },
            { "x": 1200, "y": GROUND_Y, "w": 700, "h": 80 },
            { "x": 2000, "y": GROUND_Y - 150, "w": 128, "h": 64 },
            { "x": 2200, "y": GROUND_Y - 300, "w": 256, "h": 64 },
            { "x": 2700, "y": GROUND_Y, "w": 1000, "h": 80 },
            { "x": 3100, "y": GROUND_Y - 150, "w": 128, "h": 64 },
            { "x": 4000, "y": GROUND_Y - 150, "w": 128, "h": 64 },
            { "x": 3500, "y": GROUND_Y - 300, "w": 128, "h": 64 },
            { "x": 3300, "y": GROUND_Y - 300, "w": 64, "h": 64 },
            { "x": 3700, "y": GROUND_Y - 300, "w": 64, "h": 64 },
            { "x": 4350, "y": GROUND_Y, "w": 700, "h": 80 }
        ],
        "checkpoints": [{ "x": 1600, "y": GROUND_Y - 64 }, { "x": 3164, "y": GROUND_Y - 214 }],
        "healthPacks": [{ "x": 2580, "y": GROUND_Y - 410 }],
        "spikes": [
            { "x": 450, "y": GROUND_Y - 190 },
            { "x": 500, "y": GROUND_Y - 190 },
            { "x": 1300, "y": GROUND_Y - 40 },
            { "x": 2920, "y": GROUND_Y - 40 },
            { "x": 2960, "y": GROUND_Y - 40 },
            { "x": 3000, "y": GROUND_Y - 40 }
        ],
        "spiders": [
            { "x": 700,  "y": GROUND_Y - 150 - 64 },
            { "x": 2800, "y": GROUND_Y - 64 },
            { "x": 2800, "y": GROUND_Y - 364 }
        ],
        "boss": null
    },
    3: {
        "width": 6500,
        "playerStart": { "x": 100, "y": GROUND_Y - 400 },
        "finishX": 6300,
        "platforms": [
            { "x": 0,    "y": GROUND_Y, "w": 320, "h": 80 },
            { "x": 738,  "y": GROUND_Y, "w": 64, "h": 80 },
            { "x": 400,  "y": GROUND_Y - 100, "w": 128, "h": 64 },
            { "x": 600,  "y": GROUND_Y - 200, "w": 128, "h": 64 },
            { "x": 850,  "y": GROUND_Y - 300, "w": 128, "h": 64 },
            { "x": 1200, "y": GROUND_Y - 150, "w": 128, "h": 64 },
            { "x": 1500, "y": GROUND_Y - 150, "w": 128, "h": 64 },
            { "x": 1800, "y": GROUND_Y, "w": 500, "h": 80 },
            { "x": 2500, "y": GROUND_Y, "w": 4000, "h": 80 },
    	    
// 1. Kat (LOW LEVEL)
{ x: 2750, y: GROUND_Y - 160, w: 64,  h: 64 },   // 1 blok
{ x: 3270, y: GROUND_Y - 160, w: 64, h: 64 },   // 2 blok
{ x: 4050, y: GROUND_Y - 160, w: 128,  h: 64 },   // 1 blok
{ x: 4600, y: GROUND_Y - 160, w: 64,  h: 64 },
{ x: 5050, y: GROUND_Y - 160, w: 64,  h: 64 },


// 2. Kat (HIGH LEVEL)
{ x: 2900, y: GROUND_Y - 320, w: 64,  h: 64 },   // 1 blok
{ x: 3500, y: GROUND_Y - 320, w: 128, h: 64 },   
{ x: 3750, y: GROUND_Y - 320, w: 128+64, h: 64 },   
{ x: 4450, y: GROUND_Y - 320, w: 128, h: 64 },   // 2 blok
{ x: 5150, y: GROUND_Y - 320, w: 64,  h: 64 },   // 1 blok


       
 ],
        "checkpoints": [{ "x": 1950, "y": GROUND_Y - 64 }],
        "healthPacks": [
		{ "x": 3050, "y": GROUND_Y - 480 },
		{ "x": 2000, "y": GROUND_Y - 280 },
		{ "x": 4650, "y": GROUND_Y - 480 },
		{ "x": 5082, "y": GROUND_Y - 480 }

	],
        "spikes": [
            { "x": 250, "y": GROUND_Y - 40 },
            { "x": 750, "y": GROUND_Y - 40 },
            { "x": 2800, "y": GROUND_Y - 40 },
            { "x": 2950, "y": GROUND_Y - 40 },
            { "x": 3500, "y": GROUND_Y - 40 },
            { "x": 4600, "y": GROUND_Y - 40 },
            { "x": 4650, "y": GROUND_Y - 40 }
        ],
        "spiders": [
            { "x": 650,  "y": GROUND_Y - 200 - 64 },
            { "x": 2700, "y": GROUND_Y - 64 },
            { "x": 4200, "y": GROUND_Y - 64 }
        ],
        "boss": {
            "x": 5000,
            "y": GROUND_Y - 250,
            "w": 200,
            "h": 250,
            "hp": 20
        }
    }
};

// ==========================================
// GLOBAL DEĞİŞKENLER
// ==========================================
let keys = {};
let player = null;
let cameraX = 0;
let currentLevel = 1;

let spikes = [];
let spiders = [];
let platforms = [];
let bossObject = null;
let bossProjectiles = [];

let checkpoints = [];
let healthPacks = [];

let maxHearts = 3;
let hearts = maxHearts;

let isPlayerDead = false;
let gameRunning = false;

let playerImg, nilImg, nil2Img, portalImg, nazImg, heartImg;
let spikeImg, spiderImg, platformImg, groundImg, undergroundImg, flagImg;
let levelData = null;

//
// ==========================================
// RESİM YÜKLEME
// ==========================================
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => { console.error("Image load failed:", src, e); reject(e); };
        img.src = src;
    });
}

async function loadSprites() {
    const promises = [
        loadImage("sprites/player.png").then(i => playerImg = i),
        loadImage("sprites/nil.png").then(i => nilImg = i),
        loadImage("sprites/Nil_2.png").then(i => nil2Img = i),
        loadImage("sprites/portal.png").then(i => portalImg = i),
        loadImage("sprites/naz.png").then(i => nazImg = i),
        loadImage("sprites/heart.png").then(i => heartImg = i),

        loadImage("sprites/spike.png").then(i => spikeImg = i),
        loadImage("sprites/spider.png").then(i => spiderImg = i),

        loadImage("sprites/ground.png").then(i => groundImg = i),
        loadImage("sprites/underground.png").then(i => undergroundImg = i),
        loadImage("sprites/platform.png").then(i => platformImg = i),
        loadImage("sprites/flag.png").then(i => flagImg = i)
    ];
    await Promise.allSettled(promises);
}

// ==========================================
// BOSS MERMİ SINIFI
// ==========================================
class BossProjectile {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.w = 30;
        this.h = 30;
        this.speed = 7;

        const angle = Math.atan2(targetY - y, targetX - x);
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
    }
    draw() {
        ctx.fillStyle = "#FF4500";
        ctx.beginPath();
        ctx.arc(this.x - cameraX + this.w / 2, this.y + this.h / 2, this.w / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
}

// ==========================================
// BOSS SINIFI (Üç Aşamalı Döngü + Patrol + Ölüm Animasyonu)
// ==========================================
class BossEnemy {
    constructor(data) {
        this.originX = data.x;
        this.originY = data.y;
        this.x = data.x;
        this.y = data.y;

        this.baseW = data.w;
        this.baseH = data.h;
        this.w = data.w;
        this.h = data.h;

        this.hp = data.hp;

        // death animation system
        this.deathAnimation = false;
        this.deathScale = 1;
        this.deathTimer = 0;
        this.rotation = 0;

        // movement boundaries
        this.minX = 2800;
        this.maxX = 6000;
        this.moveSpeed = 2.2;
        this.direction = 1;

        // states
        this.state = 0;     // 0 = attack, 1 = vulnerable
        this.timer = 0;
        this.lastShotTime = 0;

        this.vulnerableDuration = 4500;     // 4.5s
        this.attackDuration = 10800;         // 10.8s
        this.shootInterval = 1800;

        this.safeUntil = 0;  // damage disabled
    }

    // ==========================================
    // UPDATE
    // ==========================================
    update(delta = 16) {

        // -------- Death Animation Mode --------
        if (this.deathAnimation) {
            this.deathTimer += delta;
            this.deathScale -= 0.02;
            if (this.deathScale < 0) this.deathScale = 0;

            this.rotation += 0.25; // roll effect
            return; // no AI
        }

        // -------- If HP hit zero, start death animation --------
        if (this.hp <= 0) {
            this.deathAnimation = true;
            
        }

        // timer
        this.timer += delta;

        // -------- ATTACK STATE --------
        if (this.state === 0) {

            // patrol movement inside arena
            this.x += this.moveSpeed * this.direction;

            if (this.x < this.minX) {
                this.x = this.minX;
                this.direction = 1;
            }

            if (this.x + this.w > this.maxX) {
                this.x = this.maxX - this.w;
                this.direction = -1;
            }

            // shooting
            if (Date.now() - this.lastShotTime > this.shootInterval) {
                bossProjectiles.push(new BossProjectile(
                    this.x + this.w / 2,
                    this.y + this.h / 2,
                    player.x + player.w / 2,
                    player.y + player.h / 2
                ));
                this.lastShotTime = Date.now();
            }

            // switch to vulnerable
            if (this.timer >= this.attackDuration) {
                this.goVulnerable();
            }
        }

        // -------- VULNERABLE STATE --------
        else if (this.state === 1) {
            if (this.timer >= this.vulnerableDuration) {
                this.recoverFromVulnerable();
            }
        }
    }

    // ==========================================
    // GO VULNERABLE
    // ==========================================
    goVulnerable() {
        this.state = 1;
        this.timer = 0;

        const oldCenterX = this.x + this.w / 2;
        const oldCenterY = this.y + this.h / 2;

        this.w = Math.floor(this.baseW / 2);
        this.h = Math.floor(this.baseH / 2);

        this.x = oldCenterX - this.w / 2;
        this.y = oldCenterY - this.h / 2 + 50;

        this.safeUntil = Date.now() + 6000; // 4s vuln + 1s recovery
    }

    // ==========================================
    // RECOVER FROM VULNERABLE
    // ==========================================
    recoverFromVulnerable() {
        const cX = this.x + this.w / 2;
        const cY = this.y + this.h / 2;

        this.w = this.baseW;
        this.h = this.baseH;

        this.x = cX - this.w / 2;
        this.y = cY - this.h / 2 - 50;

        this.state = 0;
        this.timer = 0;
        this.lastShotTime = Date.now();

        this.safeUntil = Date.now() + 1000; // 1s no damage
    }

    // ==========================================
    // RECEIVE DAMAGE
    // ==========================================
    receiveDamage() {
        if (this.state !== 1) return false;

        this.hp = Math.max(0, this.hp - 1);
        return true;
    }

    // ==========================================
    // DRAW
    // ==========================================
    draw() {

        
        if (this.deathAnimation) {
            if (this.deathScale <= 0) {
		    bossObject = null;
		    return;
		}
            ctx.save();
            ctx.translate(this.x - cameraX + this.w / 2, this.y + this.h / 2);
            ctx.rotate(this.rotation);
            ctx.scale(this.deathScale, this.deathScale);
            ctx.drawImage(nil2Img, -this.w / 2, -this.h / 2, this.w, this.h);
            ctx.restore();
            return;
        }

        // not dead - health bar
        ctx.fillStyle = "black";
        ctx.fillRect(this.x - cameraX, this.y - 22, this.baseW, 18);

        ctx.fillStyle = "red";
        const hpRatio = Math.max(0, Math.min(1, this.hp / 20));
        ctx.fillRect(this.x - cameraX, this.y - 22, this.baseW * hpRatio, 18);

        // sprite
        let img = (this.state === 1 && nil2Img) ? nil2Img : nilImg;

        ctx.drawImage(img, this.x - cameraX, this.y, this.w, this.h);
    }
}
// ==========================================
// PLAYER SINIFI
// ==========================================
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 64;
        this.h = 64;
        this.vx = 0;
        this.vy = 0;
        this.speed = 6;
        this.jumpForce = 18;
        this.gravity = 0.8;
        this.onGround = false;
        this.rotation = 0;
	this.deathAnimation = false;
	this.deathScale = 1;
	this.deathTimer = 0;

    }

    update() {
        if (isPlayerDead) return;

        // input
        if (keys["a"] || keys["ArrowLeft"]) this.vx = -this.speed;
        else if (keys["d"] || keys["ArrowRight"]) this.vx = this.speed;
        else this.vx = 0;

        if ((keys["w"] || keys["ArrowUp"]) && this.onGround) {
            this.vy = -this.jumpForce;
            this.onGround = false;
        }

        // physics
        this.vy += this.gravity;
        this.x += this.vx;
        this.handleHorizontalCollision();
        this.y += this.vy;
        this.handleVerticalCollision();

        // fall death
        if (this.y > canvas.height + 200) damagePlayer();

        // collisions with enemies & boss & projectiles
        this.handleEnemyCollisions();

        // camera
        cameraX = this.x - canvas.width / 2;
    }

    handleHorizontalCollision() {
        for (let p of platforms) {
            if (rectCollision(this, p)) {
                if (this.vx > 0) this.x = p.x - this.w;
                else if (this.vx < 0) this.x = p.x + p.w;
                this.vx = 0;
            }
        }
    }

    handleVerticalCollision() {
        this.onGround = false;
        for (let p of platforms) {
            if (rectCollision(this, p)) {
                if (this.vy >= 0) {
                    this.y = p.y - this.h;
                    this.vy = 0;
                    this.onGround = true;
                } else {
                    this.y = p.y + p.h;
                    this.vy = 0;
                }
            }
        }
    }

    handleEnemyCollisions() {
        // Spikes
        for (let s of spikes) {
            let hitbox = { x: s.x + 15, y: s.y + 10, w: 10, h: 20 };
            if (rectCollision(this, hitbox)) {
                damagePlayer();
                return;
            }
        }

        // Spiders
        for (let i = spiders.length - 1; i >= 0; i--) {
            let sp = spiders[i];
            if (rectCollision(this, sp)) {
                if (this.vy > 0 && (this.y + this.h) < (sp.y + sp.h * 0.7)) {
                    spiders.splice(i, 1);
                    this.vy = -10;
                } else {
                    damagePlayer();
                }
                return;
            }
        }

        // Boss projectiles

	

        for (let i = bossProjectiles.length - 1; i >= 0; i--) {
            if (rectCollision(this, bossProjectiles[i])) {
                bossProjectiles.splice(i, 1);
                damagePlayer();
                return;
            }
        }

        // Boss body collision
        if (bossObject && !bossObject.deathAnimation && bossObject.hp > 0) {

            if (rectCollision(this, bossObject)) {

                // --------- 1) Kafa Hitbox'ı TANIMI ---------
                const bossHead = {
                    x: bossObject.x,
                    y: bossObject.y,
                    w: bossObject.w,
                    h: bossObject.h * 0.4
                };

                const isHeadCollision = rectCollision(this, bossHead);
                const stomped = isHeadCollision && this.vy >= 0;

                // --------- 2) TEST İÇİN KAFAYI ÇİZDİR (ŞEFFAF KUTU, KAMERA DÜZELTME) ---------
                // NOT: test için ekran üzerinde görünür olması açısından kameraX ile düzeltildi
                if (typeof ctx !== "undefined") {
                    ctx.fillStyle = "rgba(255,0,0,0.3)";
                    ctx.fillRect(bossHead.x - cameraX, bossHead.y, bossHead.w, bossHead.h);
                }

                // --------- 3) Eğer vulnerable veya safe ise boss zarar veremez ---------
                if (Date.now() < bossObject.safeUntil) {
                    // ama bu sırada KAFAYA zıpladıysan hasar ver
                    if (bossObject.state === 1 && stomped) {
                        const didDamage = bossObject.receiveDamage();
                        if (didDamage) {
                            this.vy = -25;
                            this.vx = (this.x < bossObject.x) ? -8 : 8;
                        }
                    }
                    return;
                }

                // --------- 4) Vulnerable MODE'DA KAFAYA Zıpladıysan ---------
                if (bossObject.state === 1 && stomped) {
                    const didDamage = bossObject.receiveDamage();
                    if (didDamage) {
                        this.vy = -25;
                        this.vx = (this.x < bossObject.x) ? -8 : 8;
                    }
                    return;
                }

                // --------- 5) Attack modunda hasar verir ---------
                if (bossObject.state === 0) {
                    damagePlayer();
                }

                // --------- 6) Eğer KAFAYA çarpmadıysan o zaman yana it ---------
                if (!isHeadCollision) {
                    if (this.x + this.w / 2 < bossObject.x + bossObject.w / 2) {
                        this.x = bossObject.x - this.w - 2;
                    } else {
                        this.x = bossObject.x + bossObject.w + 2;
                    }
                }
		if (Date.now() < bossObject.safeUntil) {
		    if (bossObject.state === 1 && stomped) {
 	       const didDamage = bossObject.receiveDamage();}}
            } // end rectCollision(bossObject)
        } // end bossObject && hp
    } // end handleEnemyCollisions


    draw() {
        if (!playerImg) return;
        ctx.save();
        if (isPlayerDead) {
            ctx.translate(this.x - cameraX + this.w / 2, this.y + this.h / 2);
            ctx.rotate(this.rotation);
            ctx.drawImage(playerImg, -this.w / 2, -this.h / 2, this.w, this.h);
        } else {
            ctx.drawImage(playerImg, this.x - cameraX, this.y, this.w, this.h);
        }
	

        ctx.restore();
    }
    
} 
// ==========================================
// YARDIMCI FONKSİYONLAR
// ==========================================
function rectCollision(a, b) {
    return (a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y);
}

function damagePlayer() {
    if (isPlayerDead) return;
    hearts--;
    if (hearts <= 0) {
        isPlayerDead = true;
        showGameOver();
        return;
    }

    isPlayerDead = true;
    let startTime = Date.now();
    function animate() {
        if (Date.now() - startTime < 500) {
            player.rotation += 0.2;
            requestAnimationFrame(animate);
        } else {
            isPlayerDead = false;
            player.rotation = 0;
            player.x = currentCheckpointX;
            player.y = currentCheckpointY;
            player.vx = 0;
            player.vy = 0;
        }
    }
    animate();
}

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

// ==========================================
// OYUN DÖNGÜSÜ
// ==========================================
let lastFrameTime = Date.now();
function gameLoop() {
    if (!gameRunning) return;

    const now = Date.now();
    const delta = Math.min(40, now - lastFrameTime); // cap delta
    lastFrameTime = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ground fill
    if (levelData && undergroundImg) {
        for (let x = 0; x < levelData.width; x += TILE_SIZE) {
            if (x - cameraX > -100 && x - cameraX < canvas.width + 100) {
                for (let y = GROUND_Y + TILE_SIZE; y < canvas.height; y += TILE_SIZE) {
                    ctx.drawImage(undergroundImg, x - cameraX, y, TILE_SIZE, TILE_SIZE);
                }
            }
        }
    }

    // platforms
    if (platformImg || groundImg) {
        for (let p of platforms) {
            let img = (p.y >= GROUND_Y) ? groundImg : platformImg;
            for (let xOff = 0; xOff < p.w; xOff += TILE_SIZE) {
                if (p.x + xOff - cameraX > -100 && p.x + xOff - cameraX < canvas.width + 100) {
                    ctx.drawImage(img, p.x + xOff - cameraX, p.y, TILE_SIZE, TILE_SIZE);
                }
            }
        }
    }

    // spikes
    if (spikeImg) {
        for (let s of spikes) {
            if (s.x - cameraX > -200 && s.x - cameraX < canvas.width + 200) {
                ctx.drawImage(spikeImg, s.x - cameraX, s.y, 40, 40);
            }
        }
    }

    // spiders
    if (spiderImg) {
        for (let sp of spiders) {
            sp.x += sp.dir * 2;
            if (Math.random() < 0.02) sp.dir *= -1;
            ctx.drawImage(spiderImg, sp.x - cameraX, sp.y, sp.w, sp.h);
        }
    }

    // health packs: draw and pickup
    if (heartImg) {
        for (let i = healthPacks.length - 1; i >= 0; i--) {
            let hp = healthPacks[i];
            if (hp.isCollected) continue;
            ctx.drawImage(heartImg, hp.x - cameraX, hp.y, hp.w, hp.h);

            // pickup check
            if (rectCollision(player, hp)) {
                hp.isCollected = true;
                hearts = maxHearts; // fill to max
                // optional: play sound / show message
            }
        }
    }

if (bossObject && (bossObject.hp > 0 || bossObject.deathAnimation)) {
    bossObject.update(delta);

    // draw boss (death animation will be handled inside draw())
    bossObject.draw();

    // update projectiles
    for (let i = bossProjectiles.length - 1; i >= 0; i--) {
        let p = bossProjectiles[i];
        p.update();

        // remove out-of-bounds
        if (p.x - cameraX < -300 || p.x - cameraX > canvas.width + 300 || p.y > canvas.height + 300 || p.y < -300) {
            bossProjectiles.splice(i, 1);
            continue;
        }
        // draw
        p.draw();
    }
}

    // checkpoints
    if (flagImg) {
        for (let cp of checkpoints) {
            ctx.drawImage(flagImg, cp.x - cameraX, cp.y, cp.w, cp.h);
            if (rectCollision(player, cp)) {
                if (currentCheckpointX !== cp.x) {
                    currentCheckpointX = cp.x;
                    currentCheckpointY = cp.y - player.h;
                    showMessage("checkpointMessage", 2500);
                }
            }
        }
    }

    // player update + draw
    player.update();
    player.draw();

    // draw hearts
    drawHearts();

    // check level complete
    checkLevelComplete();

    // finish drawing portal or naz
    if (currentLevel === 3) {
        if ((!bossObject || bossObject.hp <= 0) && nazImg && levelData) {
            const finishX = levelData.finishX - 64;
            const finishY = GROUND_Y - 80;
            ctx.drawImage(nazImg, finishX - cameraX, finishY, 64, 64);
        }
    } else {
        if (portalImg && levelData) {
            const finishX = levelData.finishX - 64;
            const finishY = GROUND_Y - 80;
            ctx.drawImage(portalImg, finishX - cameraX, finishY, 64, 64);
        }
    }

    requestAnimationFrame(gameLoop);
}

// ==========================================
// YÖNETİM / LEVEL YÜKLEME
// ==========================================
let currentCheckpointX = 0;
let currentCheckpointY = 0;

async function loadLevel(num) {
    levelData = EMBEDDED_LEVELS[num];
    if (!levelData) return;

    // reset
    isPlayerDead = false;
    platforms = [];
    spikes = [];
    spiders = [];
    checkpoints = [];
    healthPacks = [];
    bossProjectiles = [];
    bossObject = null;
    currentLevel = num;
    cameraX = 0;

    // Hearts: only set max to 5 if this level has a boss
    maxHearts = levelData.boss ? 5 : 3;
    hearts = maxHearts;

    // create player
    player = new Player(levelData.playerStart.x, levelData.playerStart.y);
    currentCheckpointX = levelData.playerStart.x;
    currentCheckpointY = levelData.playerStart.y;

    // fill collections
    for (let p of levelData.platforms) platforms.push({ ...p });
    for (let s of levelData.spikes) spikes.push({ ...s });
    if (levelData.spiders) for (let sp of levelData.spiders) spiders.push({ ...sp, dir: 1, w: 64, h: 64 });
    if (levelData.checkpoints) for (let cp of levelData.checkpoints) checkpoints.push({ ...cp, w: 64, h: 64 });
    if (levelData.healthPacks) for (let hp of levelData.healthPacks) healthPacks.push({ ...hp, w: 32, h: 32, isCollected: false });

    // boss create
    if (levelData.boss) bossObject = new BossEnemy(levelData.boss);

    gameRunning = true;
    lastFrameTime = Date.now();
}

// ==========================================
// GÖRSEL & DİĞER FONKSİYONLAR
// ==========================================
function drawHearts() {
    if (!heartImg) return;
    for (let i = 0; i < maxHearts; i++) {
        ctx.globalAlpha = (i < hearts) ? 1.0 : 0.3;
        ctx.drawImage(heartImg, 20 + i * 40, 20, 32, 32);
        ctx.globalAlpha = 1.0;
    }
}

function checkLevelComplete() {
    // if boss alive on boss level, no finish
    if (currentLevel === 3 && bossObject && bossObject.hp > 0) return;

    if (player.x > levelData.finishX) {
        if (currentLevel === 3) showFinalScreen();
        else goToNextLevel();
    }
}

async function goToNextLevel() {
    gameRunning = false;
    const ts = document.getElementById("levelTransition");
    if (ts) ts.classList.remove("hidden");
    const nextLvl = currentLevel + 1;
    if (ts) document.getElementById("levelText").innerText = `Level ${nextLvl}`;
    setTimeout(async () => {
        if (ts) ts.classList.add("hidden");
        if (!EMBEDDED_LEVELS[nextLvl]) {
            showFinalScreen();
            return;
        }
        await loadLevel(nextLvl);
        gameLoop();
    }, 1400);
}

function showFinalScreen() {
    gameRunning = false;
    const fs = document.getElementById("finalScreen");
    if (fs) fs.classList.remove("hidden");
    const fm = document.getElementById("finalMessage");
    if (fm) fm.innerText = "Doğum günün kutlu olsun Naz!";
}

function showGameOver() {
    gameRunning = false;
    const gs = document.getElementById("gameOverScreen");
    if (gs) gs.classList.remove("hidden");
}

function showMessage(elementId, duration) {
    const messageElement = document.getElementById(elementId);
    if (!messageElement) return;
    if (messageElement.classList.contains('visible')) clearTimeout(messageElement.timer);
    messageElement.classList.add('visible');
    messageElement.timer = setTimeout(() => messageElement.classList.remove('visible'), duration);
}

// ==========================================
// START / RESTART
// ==========================================
async function startGame() {
    await loadSprites();
    await loadLevel(currentLevel);
    gameLoop();
}

const restartBtn = document.getElementById("restartBtn");
if (restartBtn) {
    restartBtn.onclick = async () => {
        const gos = document.getElementById("gameOverScreen");
        if (gos) gos.classList.add("hidden");
        isPlayerDead = false;
        gameRunning = false;
        keys = {};
        hearts = (levelData && levelData.boss) ? 5 : 3;
        await loadLevel(currentLevel);
        gameLoop();
    };
}




