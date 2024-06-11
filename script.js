let gS = {
    woodCount: 0, foodCount: 0, stoneCount: 0,
    butt4On: false, butt5On: false, butt6On: false, butt7On: false, butt8On: false, butt9On: false, butt10On: false,
    wProduce: 100, fProduce: 100, sProduce: 100,
    woodCutters: 0, farmers: 0, stoneMiners: 0,
    woodCapAm: 200, foodCapAm: 200, stoneCapAm: 200,
    apples: 0, gapples: 0,
    totalPop: 0,
    idleCitizens: 0, 
    get personCost() {
        return 20 + Math.floor(this.totalPop / 50);
    },
}

function startUp() 
{
   if (localStorage.getItem('gS')) {
        gS = JSON.parse(localStorage.getItem('gS'));
    }
    allChecks();
    document.getElementById('gappletxt').style.visibility = 'hidden';
    document.getElementById('gappletxt2').style.visibility = 'hidden';
    butDisable();
    sect1();
    importData();
    timer = setInterval(checkUpgrade, 100);
    timer2 = setInterval(resourceGet, 1000);
}

function resourceGet()
{
    if(gS.woodCutters >= 1 && gS.woodCount < gS.woodCapAm) {
        gS.woodCount += 0.5 * gS.woodCutters;
    }
    allChecks(); saveGame();
}

function sect1()
{
    document.getElementById('box2').style.display = 'none';
    document.getElementById('box3').style.display = 'none';
    document.getElementById('box1').style.display = 'block';
}

function sect2()
{
    document.getElementById('box1').style.display = 'none';
    document.getElementById('box3').style.display = 'none';
    document.getElementById('box2').style.display = 'block';
}

function sect3()
{
    document.getElementById('box1').style.display = 'none';
    document.getElementById('box2').style.display = 'none';
    document.getElementById('box3').style.display = 'block';
}

function exportSave()
{
    const gameData = JSON.parse(localStorage.getItem('gS'));
    const jsonData2 = JSON.stringify(gameData);

    const dataURL = window.URL.createObjectURL(new Blob([jsonData2], {type: 'text/json'}));

    const link = document.createElement('a');
    link.href = dataURL;
    link.setAttribute('download', 'gameData2.json');
    link.click();   
}

function importData() 
{
    const importFileInput = document.getElementById('importFile');

    importFileInput.addEventListener('change', (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const importedData = JSON.parse(e.target.result);
                gS = { ...gS, ...importedData }; // Merge importedData into gS
saveGame(); // Save updated gS to localStorage
};

            reader.readAsText(file);
        }
    });
}


function checkUpgrade()
{
    //block for upgrade availability
    document.getElementById('header1').innerHTML = gS.butt4On;
    if(gS.woodCount >= 100) {
        document.getElementById('butt4').removeAttribute('disabled');
    } else if(gS.woodCount <= 99) {
        document.getElementById('butt4').disabled = true;
    }
     if(gS.woodCount >= 200) {
        document.getElementById('butt5').removeAttribute('disabled');
    } else if(gS.woodCount <= 199) {
        document.getElementById('butt5').disabled = true;
    }
     
     if(gS.foodCount >= 200) {
        document.getElementById('butt6').removeAttribute('disabled');
    } else if(gS.foodCount <= 199) {
        document.getElementById('butt6').disabled = true;
    }

     if(gS.stoneCount >= 200) {
        document.getElementById('butt7').removeAttribute('disabled');
    } else if(gS.stoneCount <= 199) {
        document.getElementById('butt7').disabled = true;
    }

     if(gS.woodCount >= 100 && gS.foodCount >= 50 && gS.stoneCount >= 50) {
        document.getElementById('butt8').removeAttribute('disabled');
    } else if (gS.woodCount <= 99 || gS.foodCount <= 49 || gS.stoneCount <= 49) {
        document.getElementById('butt8').disabled = true;
    }

     if(gS.woodCount >= 200 && gS.foodCount >= 200 && gS.stoneCount >= 200) {
        document.getElementById('butt9').removeAttribute('disabled');
    } else if (gS.woodCount <= 199 || gS.foodCount <= 199 || gS.stoneCount <= 199) {
        document.getElementById('butt9').disabled = true;
    }

     if(gS.woodCount >= 400 && gS.foodCount >= 400 && gS.stoneCount >= 400 && gS.apples >= 25 && gS.gapples >= 3) {
        document.getElementById('butt10').removeAttribute('disabled');
    } else if (gS.woodCount <= 399 || gS.foodCount <= 399 || gS.stoneCount <= 399 || gS.apples <= 24 || gS.gapples <= 2) {
        document.getElementById('butt10').disabled = true;
    }
    //strg caps.
    
    if(gS.foodCount >= gS.foodCapAm) {
        gS.foodCount = gS.foodCapAm;
        document.getElementById('butt2').disabled = true;
        allChecks();
    } else {document.getElementById('butt2').removeAttribute('disabled'); }

    if(gS.stoneCount >= gS.stoneCapAm) {
        gS.stoneCount = gS.stoneCapAm;
        document.getElementById('butt3').disabled = true;
        allChecks();
    } else {document.getElementById('butt3').removeAttribute('disabled'); }

    if(gS.woodCount >= gS.woodCapAm) {
        gS.woodCount = gS.woodCapAm;
        document.getElementById('butt1').disabled = true;
        allChecks();
    } else {document.getElementById('butt1').removeAttribute('disabled'); }
}

function saveGame()
{
    localStorage.setItem('gS', JSON.stringify(gS));
}

function storgClear()
{
    if (confirm("Are you sure you want to delete all data?")) {
        localStorage.clear();
        gS.woodCount = 0;
        gS.foodCount = 0;
        gS.stoneCount = 0;
        gS.butt4On = false;
        gS.butt5On = false;
        gS.butt6On = false;
        gS.butt7On = false;
        gS.butt8On = false;
        gS.butt9On = false;
        gS.butt10On = false;
        gS.wProduce = 100;
        gS.fProduce = 100;
        gS.sProduce = 100;
        gS.woodCutters = 0;
        gS.farmers = 0;
        gS.stoneMiners = 0;
        gS.woodCapAm = 200;
        gS.foodCapAm = 200;
        gS.stoneCapAm = 200;
        gS.apples = 0;
        gS.gapples = 0;
        gS.totalPop = 0;
        gS.idleCitizens = 0;        
        location.reload();
      } 
}

function appCheck()
{
    if (Math.ceil(Math.random() * 100) >= 98) {
        gS.apples += 1; document.getElementById('appletxt').innerHTML = gS.apples; }

      if (Math.ceil(Math.random() * 1000) >= 998 && gS.butt9On == true) {
        gS.gapples += 1; document.getElementById('gappletxt2').innerHTML = gS.gapples; }
}

function allChecks() 
{
    document.getElementById('count1').innerHTML = gS.idleCitizens;
    document.getElementById('count').innerHTML = gS.totalPop;
    document.getElementById('count2').innerHTML = gS.woodCutters;
    document.getElementById('para1').innerHTML = Math.floor(gS.woodCount);
    document.getElementById('para2').innerHTML = Math.floor(gS.foodCount);
    document.getElementById('para3').innerHTML = Math.floor(gS.stoneCount);
    document.getElementById('appletxt').innerHTML = gS.apples;
    document.getElementById('gappletxt2').innerHTML = gS.gapples;
    if(gS.butt9On == true) {
        document.getElementById('gappletxt').style.visibility = 'visible';
        document.getElementById('gappletxt2').style.visibility = 'visible'; }
}

function woodGet()
{
    gS.woodCount += gS.wProduce;
    allChecks(); appCheck(); saveGame();
}

function foodGet()
{
    gS.foodCount += gS.fProduce;
    allChecks(); saveGame();
}

function stoneGet()
{
    gS.stoneCount += gS.sProduce;
    allChecks(); saveGame();
}

function woodUp()
{
    gS.butt4On = true;
    gS.woodCount -= 100;
    gS.wProduce += 2;
    allChecks(); saveGame(); butDisable();
}

function woodMax()
{
    gS.butt5On = true;
    gS.woodCapAm = 400;
    gS.woodCount -= 200;
    allChecks(); saveGame(); butDisable();
}

function foodMax()
{
    gS.butt6On = true;
    gS.foodCapAm = 400;
    gS.foodCount -= 200;
    allChecks(); saveGame(); butDisable();
}

function stoneMax()
{
    gS.butt7On = true;
    gS.stoneCapAm = 400;
    gS.stoneCount -= 200;
    allChecks(); saveGame(); butDisable();
}

function foodStoneUp()
{
    gS.butt8On = true;
    gS.fProduce += 2;
    gS.sProduce += 2;
    gS.woodCount -= 100; gS.stoneCount -= 50; gS.foodCount -=50;
    allChecks(); saveGame(); butDisable();
}

function resDump()
{
    gS.woodCount = 0; gS.foodCount = 0; gS.stoneCount = 0;
    allChecks(); saveGame();
}

function gapUnlock()
{
    gS.butt9On = true;
    gS.woodCount -= 200; gS.foodCount -= 200; gS.stoneCount -= 200;
    allChecks(); saveGame(); butDisable();
}

function winTrophy()
{
    gS.butt10On = true;
    gS.woodCount -= 400; gS.foodCount -= 400; gS.stoneCount -= 400;
    allChecks(); saveGame(); butDisable();
}

function butDisable()
{
    if(gS.butt4On == true) {
            document.getElementById('wrap1').style.display = 'none'; } 
    if(gS.butt5On == true) {
            document.getElementById('wrap2').style.display = 'none'; }
    if(gS.butt6On == true) {
            document.getElementById('wrap3').style.display = 'none'; }
    if(gS.butt7On == true) {
            document.getElementById('wrap4').style.display = 'none'; }
    if(gS.butt8On == true) {
            document.getElementById('wrap5').style.display = 'none'; }
    if(gS.butt9On == true) {
            document.getElementById('wrap6').style.display = 'none'; }
    if(gS.butt10On == true) {
            document.getElementById('wrap7').style.display = 'none'; }
}

function autoWood()
{
    if(gS.idleCitizens >= 1) {
    gS.woodCutters += 1;
    gS.idleCitizens -= 1;
    document.getElementById('count2').innerHTML = gS.woodCutters;
    allChecks(); saveGame(); }
}

function populateUp()
{
    if(gS.foodCount >= gS.personCost) {
        gS.foodCount -= gS.personCost;
        gS.totalPop += 1; gS.idleCitizens += 1;
        allChecks(); saveGame();
    }
}

function popAdd10()
{
    if(gS.foodCount >= gS.personCost*10) {
        gS.foodCount -= gS.personCost*10;
        gS.totalPop += 10; gS.idleCitizens += 10;
        allChecks(); saveGame();
    }
}

function popAdd100()
{
    if(gS.foodCount >= gS.personCost*100) {
        gS.foodCount -= gS.personCost*100;
        gS.totalPop += 100; gS.idleCitizens += 100;
        allChecks(); saveGame();
    }
}

function popAddMax()
{
    if (gS.foodCount >= gS.personCost) {
        const maxPopIncrease = Math.floor(gS.foodCount / gS.personCost);

        gS.foodCount -= gS.personCost * maxPopIncrease;
        gS.totalPop += maxPopIncrease;
        gS.idleCitizens += maxPopIncrease;

        allChecks();
        saveGame();
    }
}
