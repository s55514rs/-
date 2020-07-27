let flag = true;
let crear = 0;
let eneSec = document.getElementById("eneSec");
let end = 0;
//プレイヤーデータ
let plyName = prompt("名前を入力してください");
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = [5, 15, 50, 100, 125, 150, 200, 230, 1000];
let plyImg = document.getElementById("plyImg");
let plySti = new Array(7);
for (let i = 0; i < plySti.length; i++) {
  plySti[i] = document.getElementById("plySt" + i);
}
plySti[0].textContent = plyName;
//プレイヤー回復
plyImg.addEventListener("mousedown", () => {
  if (flag) {
    plyImg.src = "img/playerC.png";
  }
});
plyImg.addEventListener("mouseup", () => {
  if (flag) {
    plyImg.src = "img/playerA.png";
    plyHp += plyHeal;
    if (plyHp > plyHpMax) {
      plyHp = plyHpMax;
    }
    plySti[2].textContent = "HP:" + plyHp;
  }
});
//敵データ
let t = 0;
let eneLv = 1;
let eneHp = 10;
let eneHpMax = new Array(10);
let eneAtt = new Array(10);
let eneKill = new Array(10);
let eneExp = new Array(10);
let eneCntMax = new Array(10);
for (let x = 0; x < 10; x++) {
  eneHpMax[x] = 10 + 6 * x;
  eneAtt[x] = 2 + 2 * x;
  eneKill[x] = 0;
  eneExp[x] = 1 + 3 * x;
  eneCntMax[x] = 5 + 1 * x;
}

let eneCnt = 5;
let eneImg = document.getElementById("eneImg");
let eneSti = new Array(5);
let eneImgTypeA = "img/enemyA" + t + ".png";
let eneImgTypeB = "img/enemyB" + t + ".png";
for (let i = 0; i < eneSti.length; i++) {
  let est = "eneSt" + i;
  eneSti[i] = document.getElementById(est);
}
//敵を攻撃
eneImg.addEventListener("mousedown", () => {
  if (flag) {
    eneImg.src = eneImgTypeA;
  }
});
eneImg.addEventListener("mouseup", () => {
  if (flag) {
    eneImg.src = eneImgTypeB;
    if (eneHp > 0) {
      eneHp -= plyAtt;
    } else {
      eneHp = eneHpMax[t];
      eneKill[t]++;
      eneSti[4].textContent = "倒した回数:" + eneKill[t];
      //経験値の処理
      plyExp += eneExp[t];
      plySti[5].textContent = "経験値:" + plyExp;
      plyExpNext -= eneExp[t];
      //レベルアップの処理

      if (plyExpNext <= 0) {
        plyExpNext = plyExpNeed[plyLv];
        plyLv++;
        if (plyLv == 10) {
          flag = false;
          end = 1;
          eneSec.textContent = "ゲームクリア！";
        }
        plySti[1].textContent = "レベル:" + plyLv;
        plyHpMax = plyLv * 3 + 6;
        plyHp = plyHpMax;
        plySti[2].textContent = "HP:" + plyHp;
        plyAtt++;
        plySti[3].textContent = "攻撃力:" + plyAtt;
        plyHeal++;
        plySti[4].textContent = "回復魔法:" + plyHeal;
      }
      plySti[6].textContent =
        "次のレベルまでの経験値" + plyExpNext + "ポイント";
    }
    eneSti[2].textContent = "HP:" + eneHp;
  }
});

//敵が時間ごとに攻撃
let loop = setInterval(() => {
  if (end == 0) {
    if (eneCnt > 0) {
      eneCnt--;
      eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
    } else {
      plyImg.src = "img/playerB.png";
      plyHp -= eneAtt[t];
      if (plyHp > 0) {
        plySti[2].textContent = "HP:" + plyHp;
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
      } else {
        plyHp = 0;
        clearInterval(loop);
        flag = false;
        plySti[2].textContent = "HP:" + plyHp;
        eneSec.textContent = "ゲームオーバー";
      }
      setTimeout(() => {
        if (flag) {
          eneCnt = eneCntMax[t];
          plyImg.src = "img/playerA.png";
          eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
        }
      }, 500);
    }
  }
}, 1000);
let right = document.getElementById("right");
right.addEventListener("click", () => {
  if (plyHp < 0 || t == 9) {
    flag = false;
  } else {
    t++;
    if (t <= 10) {
      eneSti[0].textContent = "モンスター" + (t + 1);
      eneSti[2].textContent = "HP:" + eneHpMax[t];
      eneSti[3].textContent = "攻撃力:" + eneAtt[t];
      eneHp = eneHpMax[t];
      eneLv++;
      eneImgTypeA = "img/enemyA" + t + ".png";
      eneImgTypeB = "img/enemyB" + t + ".png";
      eneImg.src = eneImgTypeA;
    } else {
      t = 10;
    }
  }
});
let left = document.getElementById("left");
left.addEventListener("click", () => {
  if (plyHp < 0) {
    flag = false;
  } else {
    t--;
    if (t >= 0) {
      eneSti[0].textContent = "モンスター" + (t + 1);
      eneSti[2].textContent = "HP:" + eneHpMax[t];
      eneSti[3].textContent = "攻撃力:" + eneAtt[t];
      eneHp = eneHpMax[t];
      eneLv--;
      eneImgTypeA = "img/enemyA" + t + ".png";
      eneImgTypeB = "img/enemyB" + t + ".png";
      eneImg.src = eneImgTypeA;
    } else {
      t = 0;
    }
  }
});
