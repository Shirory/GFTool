var listNum = 0, listNumH = 0, listNumE = 0, listNumEH = 0
var fiveStarNum = 0, fiveStarNumH = 0, fiveStarNumE = 0, fiveStarNumEH = 0, fairyNum = 0
var mul_smg = 1, mul_ar = 1, mul_rf = 1, mul_mg = 1, mul_sg = 1
var allM = 0, allA = 0, allR = 0, allP = 0, allCon = 0, allCore = 0, allConE = 0
var global_list, global_5list, global_listE, global_5listE, global_fairylist
window.onload = function () {
  var chart = document.getElementById('rankingChart')
  var chartE = document.getElementById('rankingChartE')
  var sumchart = document.getElementById('sumChart')
  var sumchartE = document.getElementById('sumChartE')
  var resochart = document.getElementById('resoChart')
  global_list = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>订单号</th><th>资源</th><th>人形</th></tr></thead><tbody></tbody></table>'
  global_5list = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>订单号</th><th>资源</th><th>人形</th></tr></thead><tbody></tbody></table>'
  global_listE = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>订单号</th><th>资源</th><th>装备</th></tr></thead><tbody></tbody></table>'
  global_5listE = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>订单号</th><th>资源</th><th>装备</th></tr></thead><tbody></tbody></table>'
  global_fairylist = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>订单号</th><th>资源</th><th>装备</th></tr></thead><tbody></tbody></table>'
  var tab2 = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>总建造数</th><th>五星人形获取数</th><th>五星人形获取率</th><th>评价</th></tr></thead><tbody></tbody></table>'
  var tab2E = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>总建造数</th><th>五星装备/妖精获取数</th><th>获取率</th><th>评价</th></tr></thead><tbody></tbody></table>'
  var tab3 = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>人力消耗</th><th>弹药消耗</th><th>口粮消耗</th><th>零件消耗</th><th>人形契约消耗</th><th>装备契约消耗</th><th>核心消耗</th></tr></thead><tbody></tbody></table>'
  chart.innerHTML = global_list
  chartE.innerHTML = global_listE
  sumchart.innerHTML = tab2
  sumchartE.innerHTML = tab2E
  resochart.innerHTML = tab3
}
// function
function swapImage (imageCode) {
  panelSetting = document.getElementById('panelSetting')
  if (imageCode === 1) panelSetting.style = 'background:url(../img/Produce-tdoll-normal.png) no-repeat right 15px bottom 15px'
  else if (imageCode === 2) panelSetting.style = 'background:url(../img/Produce-tdoll-heavy.png) no-repeat right 15px bottom 15px'
  else if (imageCode === 3) panelSetting.style = 'background:url(../img/Produce-equip-normal.png) no-repeat right 15px bottom 15px'
  else if (imageCode === 4) panelSetting.style = 'background:url(../img/Produce-equip-heavy.png) no-repeat right 15px bottom 15px'
  else if (imageCode === 5) panelSetting.style = 'background:url(../img/Produce-contract.png) no-repeat right 15px bottom 15px'
}
function releaseResoLimit () { // unlimit resource
  var MwOwn = document.getElementById('MwOwn')
  MwOwn.disabled = !(MwOwn.disabled)
  var AwOwn = document.getElementById('AwOwn')
  AwOwn.disabled = !(AwOwn.disabled)
  var RwOwn = document.getElementById('RwOwn')
  RwOwn.disabled = !(RwOwn.disabled)
  var PwOwn = document.getElementById('PwOwn')
  PwOwn.disabled = !(PwOwn.disabled)
}
function releaseCoCoLimit () { // unlimit contract&core
  var ConOwn = document.getElementById('ConOwn')
  ConOwn.disabled = !(ConOwn.disabled)
  var ConOwnE = document.getElementById('ConOwnE')
  ConOwnE.disabled = !(ConOwnE.disabled)
  var CoreOwn = document.getElementById('CoreOwn')
  CoreOwn.disabled = !(CoreOwn.disabled)
}
function resetResoLimit () { // reset resource limit
  var MwOwn = document.getElementById('MwOwn')
  var AwOwn = document.getElementById('AwOwn')
  var RwOwn = document.getElementById('RwOwn')
  var PwOwn = document.getElementById('PwOwn')
  var ConOwn = document.getElementById('ConOwn')
  var ConOwnE = document.getElementById('ConOwnE')
  var CoreOwn = document.getElementById('CoreOwn')
  var unLimitReso = document.getElementById('unLimitReso')
  var unLimitCoCo = document.getElementById('unLimitCoCo')
  unLimitReso.checked = true
  unLimitCoCo.checked = true
  ConOwn.disabled = true; ConOwn.value = 100
  ConOwnE.disabled = true; ConOwnE.value = 100
  CoreOwn.disabled = true; CoreOwn.value = 100
  MwOwn.disabled = true; MwOwn.value = 10000
  AwOwn.disabled = true; AwOwn.value = 10000
  RwOwn.disabled = true; RwOwn.value = 10000
  PwOwn.disabled = true; PwOwn.value = 10000
}
function checkValueNormal () { // check input of Normal-product
  var MwId = document.getElementById('Mw')
  var Mw = parseInt(MwId.value)
  var AwId = document.getElementById('Aw')
  var Aw = parseInt(AwId.value)
  var RwId = document.getElementById('Rw')
  var Rw = parseInt(RwId.value)
  var PwId = document.getElementById('Pw')
  var Pw = parseInt(PwId.value)
  if (isNaN(Mw) || Mw.length === 0) MwId.value = 30
  else {
    if (Mw < 30) MwId.value = 30
    else if (Mw > 999) MwId.value = 999
  }
  if (isNaN(Aw) || Aw.length === 0) AwId.value = 30
  else {
    if (Aw < 30) AwId.value = 30
    else if (Aw > 999) AwId.value = 999
  }
  if (isNaN(Rw) || Rw.length === 0) RwId.value = 30
  else {
    if (Rw < 30) RwId.value = 30
    else if (Rw > 999) RwId.value = 999
  }
  if (isNaN(Pw) || Pw.length === 0) PwId.value = 30
  else {
    if (Pw < 30) PwId.value = 30
    else if (Pw > 999) PwId.value = 999
  }
}
function checkValueHeavy () { // check input of Heavy-product
  var MwHId = document.getElementById('MwH')
  var MwH = parseInt(MwHId.value)
  var AwHId = document.getElementById('AwH')
  var AwH = parseInt(AwHId.value)
  var RwHId = document.getElementById('RwH')
  var RwH = parseInt(RwHId.value)
  var PwHId = document.getElementById('PwH')
  var PwH = parseInt(PwHId.value)
  if (isNaN(MwH) || MwH.length === 0) MwHId.value = 1000
  else {
    if (MwH < 1000) MwHId.value = 1000
    else if (MwH > 9999) MwHId.value = 9999
  }
  if (isNaN(AwH) || AwH.length === 0) AwHId.value = 1000
  else {
    if (AwH < 1000) AwHId.value = 1000
    else if (AwH > 9999) AwHId.value = 9999
  }
  if (isNaN(RwH) || RwH.length === 0) RwHId.value = 1000
  else {
    if (RwH < 1000) RwHId.value = 1000
    else if (RwH > 9999) RwHId.value = 9999
  }
  if (isNaN(PwH) || PwH.length === 0) PwHId.value = 1000
  else {
    if (PwH < 1000) PwHId.value = 1000
    else if (PwH > 9999) PwHId.value = 9999
  }
}
function checkValueNormalE () { // check input of Normal-product-equip
  var MwId = document.getElementById('MwE')
  var Mw = parseInt(MwId.value)
  var AwId = document.getElementById('AwE')
  var Aw = parseInt(AwId.value)
  var RwId = document.getElementById('RwE')
  var Rw = parseInt(RwId.value)
  var PwId = document.getElementById('PwE')
  var Pw = parseInt(PwId.value)
  if (isNaN(Mw) || Mw.length === 0) MwId.value = 10
  else {
    if (Mw < 10) MwId.value = 10
    else if (Mw > 300) MwId.value = 300
  }
  if (isNaN(Aw) || Aw.length === 0) AwId.value = 10
  else {
    if (Aw < 10) AwId.value = 10
    else if (Aw > 300) AwId.value = 300
  }
  if (isNaN(Rw) || Rw.length === 0) RwId.value = 10
  else {
    if (Rw < 10) RwId.value = 10
    else if (Rw > 300) RwId.value = 300
  }
  if (isNaN(Pw) || Pw.length === 0) PwId.value = 10
  else {
    if (Pw < 10) PwId.value = 10
    else if (Pw > 300) PwId.value = 300
  }
}
function checkValueHeavyE () { // check input of Heavy-product-equip
  var MwHId = document.getElementById('MwEH')
  var MwH = parseInt(MwHId.value)
  var AwHId = document.getElementById('AwEH')
  var AwH = parseInt(AwHId.value)
  var RwHId = document.getElementById('RwEH')
  var RwH = parseInt(RwHId.value)
  var PwHId = document.getElementById('PwEH')
  var PwH = parseInt(PwHId.value)
  if (isNaN(MwH) || MwH.length === 0) MwHId.value = 500
  else {
    if (MwH < 500) MwHId.value = 500
    else if (MwH > 5000) MwHId.value = 5000
  }
  if (isNaN(AwH) || AwH.length === 0) AwHId.value = 500
  else {
    if (AwH < 500) AwHId.value = 500
    else if (AwH > 5000) AwHId.value = 5000
  }
  if (isNaN(RwH) || RwH.length === 0) RwHId.value = 500
  else {
    if (RwH < 500) RwHId.value = 500
    else if (RwH > 5000) RwHId.value = 5000
  }
  if (isNaN(PwH) || PwH.length === 0) PwHId.value = 500
  else {
    if (PwH < 500) PwHId.value = 500
    else if (PwH > 5000) PwHId.value = 5000
  }
}
function checkResource (typeInfo) { // Alert if resource not enough, 1=normal, 2=heavy, 3=NE, 4=HE
  var Mw = parseInt(document.getElementById('Mw').value)
  var Aw = parseInt(document.getElementById('Aw').value)
  var Rw = parseInt(document.getElementById('Rw').value)
  var Pw = parseInt(document.getElementById('Pw').value)
  var MwH = parseInt(document.getElementById('MwH').value)
  var AwH = parseInt(document.getElementById('AwH').value)
  var RwH = parseInt(document.getElementById('RwH').value)
  var PwH = parseInt(document.getElementById('PwH').value)
  var MwE = parseInt(document.getElementById('MwE').value)
  var AwE = parseInt(document.getElementById('AwE').value)
  var RwE = parseInt(document.getElementById('RwE').value)
  var PwE = parseInt(document.getElementById('PwE').value)
  var MwEH = parseInt(document.getElementById('MwEH').value)
  var AwEH = parseInt(document.getElementById('AwEH').value)
  var RwEH = parseInt(document.getElementById('RwEH').value)
  var PwEH = parseInt(document.getElementById('PwEH').value)
  var MwOwn = parseInt(document.getElementById('MwOwn').value)
  var AwOwn = parseInt(document.getElementById('AwOwn').value)
  var RwOwn = parseInt(document.getElementById('RwOwn').value)
  var PwOwn = parseInt(document.getElementById('PwOwn').value)
  var unLimitReso = document.getElementById('unLimitReso')
  var unLimitCoCo = document.getElementById('unLimitCoCo')
  var ConOwn = document.getElementById('ConOwn')
  var ConOwnE = document.getElementById('ConOwnE')
  var CoreOwn = document.getElementById('CoreOwn')
  var HClassId = document.getElementById('HClass')
  var EHClassId = document.getElementById('EHClass')
  var buttonNormal = document.getElementById('buttonNormal')
  var buttonHeavy = document.getElementById('buttonHeavy')
  var buttonNormalE = document.getElementById('buttonNormalE')
  var buttonHeavyE = document.getElementById('buttonHeavyE')
  var ConNum, CoreNum, ConNumE, CoreNumE
  var nextM, nextA, nextR, nextP
  switch (parseInt(HClassId.value)) {
    case 1:
      ConNum = 1; CoreNum = 3
      break
    case 2:
      ConNum = 20; CoreNum = 5
      break
    case 3:
      ConNum = 50; CoreNum = 10
      break
  }
  switch (parseInt(EHClassId.value)) {
    case 1:
      ConNumE = 1; CoreNumE = 2
      break
    case 2:
      ConNumE = 20; CoreNumE = 4
      break
    case 3:
      ConNumE = 50; CoreNumE = 6
      break
  }
  if (unLimitReso.checked === false) { // if reso not enough
    switch (typeInfo) {
      case 1:
        nextM = Mw + allM; nextA = Aw + allA; nextR = Rw + allR; nextP = Pw + allP
        break
      case 2:
        nextM = MwH + allM; nextA = AwH + allA; nextR = RwH + allR; nextP = PwH + allP
        break
      case 3:
        nextM = MwE + allM; nextA = AwE + allA; nextR = RwE + allR; nextP = PwE + allP
        break
      case 4:
        nextM = MwEH + allM; nextA = AwEH + allA; nextR = RwEH + allR; nextP = PwEH + allP
        break
    }
    if (nextM > MwOwn || nextA > AwOwn || nextR > RwOwn || nextP > PwOwn) { // freeze button
      switch (typeInfo) {
        case 1:
          buttonNormal.disabled = true
          break
        case 2:
          buttonHeavy.disabled = true
          break
        case 3:
          buttonNormalE.disabled = true
          break
        case 4:
          buttonHeavyE.disabled = true
          break
      }
      return false
    }
  }
  if (unLimitCoCo.checked === false) { // if contract&core not enough
    if (typeInfo === 1) {
      if (allCon >= parseInt(ConOwn.value)) {
        buttonNormal.disabled = true
        return false
      }
    } else if (typeInfo === 2) {
      if (allCon + ConNum > parseInt(ConOwn.value) || allCore + CoreNum > parseInt(CoreOwn.value)) {
        buttonHeavy.disabled = true
        return false
      }
    } else if (typeInfo === 3) {
      if (allConE >= parseInt(ConOwnE.value)) {
        buttonNormalE.disabled = true
        return false
      }
    } else if (typeInfo === 4) {
      if (allConE + ConNumE > parseInt(ConOwnE.value) || allCore + CoreNumE > parseInt(CoreOwn.value)) {
        buttonHeavyE.disabled = true
        return false
      }
    }
  }
  return true
}

function setWeight (typeInfo) { // set weight of Normal-product
  var Mw = document.getElementById('Mw')
  var Aw = document.getElementById('Aw')
  var Rw = document.getElementById('Rw')
  var Pw = document.getElementById('Pw')
  switch (typeInfo) {
    case 1:
      Mw.value = 430; Aw.value = 430; Rw.value = 430; Pw.value = 230
      break
    case 2:
      Mw.value = 130; Aw.value = 130; Rw.value = 130; Pw.value = 130
      break
    case 3:
      Mw.value = 97; Aw.value = 404; Rw.value = 404; Pw.value = 97
      break
    case 4:
      Mw.value = 430; Aw.value = 130; Rw.value = 430; Pw.value = 230
      break
    case 5:
      Mw.value = 430; Aw.value = 430; Rw.value = 130; Pw.value = 230
      break
    case 6:
      Mw.value = 730; Aw.value = 630; Rw.value = 130; Pw.value = 430
      break
    case 7:
      Mw.value = 730; Aw.value = 630; Rw.value = 430; Pw.value = 430
      break
    default:
      break
  }
}

function setWeightH (typeInfo) { // set weight of Heavy-product
  var Mw = document.getElementById('MwH')
  var Aw = document.getElementById('AwH')
  var Rw = document.getElementById('RwH')
  var Pw = document.getElementById('PwH')
  switch (typeInfo) {
    case 1:
      Mw.value = 4000; Aw.value = 1000; Rw.value = 6000; Pw.value = 3000
      break
    case 2:
      Mw.value = 6000; Aw.value = 2000; Rw.value = 6000; Pw.value = 4000
      break
    case 3:
      Mw.value = 6000; Aw.value = 6000; Rw.value = 6000; Pw.value = 4000
      break
    default:
      break
  }
}

function setWeightE (typeInfo) { // set weight of Normal-product-equip
  var Mw = document.getElementById('MwE')
  var Aw = document.getElementById('AwE')
  var Rw = document.getElementById('RwE')
  var Pw = document.getElementById('PwE')
  switch (typeInfo) {
    case 1:
      Mw.value = 150; Aw.value = 150; Rw.value = 150; Pw.value = 150
      break
    case 2:
      Mw.value = 151; Aw.value = 151; Rw.value = 151; Pw.value = 151
      break
    default:
      break
  }
}

function setWeightEH (typeInfo) { // set weight of Normal-product-equip
  var Mw = document.getElementById('MwEH')
  var Aw = document.getElementById('AwEH')
  var Rw = document.getElementById('RwEH')
  var Pw = document.getElementById('PwEH')
  switch (typeInfo) {
    case 1:
      Mw.value = 500; Aw.value = 500; Rw.value = 500; Pw.value = 500
      break
    case 2:
      Mw.value = 2000; Aw.value = 500; Rw.value = 2000; Pw.value = 1000
      break
    case 3:
      Mw.value = 500; Aw.value = 2000; Rw.value = 2000; Pw.value = 1000
      break
    case 4:
      Mw.value = 2000; Aw.value = 2000; Rw.value = 2000; Pw.value = 2000
      break
    default:
      break
  }
}

function creatTdollInfo_HG (name, possibility) {
  var TdollInfo = { }
  TdollInfo.name = name
  TdollInfo.possibility = parseInt(possibility) * mul_hg
  return TdollInfo
}

function creatTdollInfo_SMG (name, possibility) {
  var TdollInfo = { }
  TdollInfo.name = name
  TdollInfo.possibility = parseInt(possibility) * mul_smg
  return TdollInfo
}

function creatTdollInfo_AR (name, possibility) {
  var TdollInfo = { }
  TdollInfo.name = name
  TdollInfo.possibility = parseInt(possibility) * mul_ar
  return TdollInfo
}

function creatTdollInfo_RF (name, possibility) {
  var TdollInfo = { }
  TdollInfo.name = name
  TdollInfo.possibility = parseInt(possibility) * mul_rf
  return TdollInfo
}

function creatTdollInfo_MG (name, possibility) {
  var TdollInfo = { }
  TdollInfo.name = name
  TdollInfo.possibility = parseInt(possibility) * mul_mg
  return TdollInfo
}

function creatTdollInfo_SG (name, possibility) {
  var TdollInfo = { }
  TdollInfo.name = name
  TdollInfo.possibility = parseInt(possibility) * mul_sg
  return TdollInfo
}

function creatEquipInfo (name, possibility) {
  var EquipInfo = { }
  EquipInfo.name = name
  EquipInfo.possibility = parseInt(possibility)
  return EquipInfo
}

function getMul_HG (allReso) { // HG possibility decline
  if (allReso >= 820 && allReso < 920) {
    mul_hg = 0.37
  } else if (allReso >= 620 && allReso < 820) {
    mul_hg = 0.7
  } else if (allReso >= 420 && allReso < 620) {
    mul_hg = 1
  } else if (allReso >= 220 && allReso < 420) {
    mul_hg = 0.7
  } else {
    mul_hg = 0.37
  }
}

function getMul_SMG (allReso) { // SMG possibility decline
  if (allReso >= 1800) {
    mul_smg = 0.9
  } else if (allReso >= 1000 && allReso < 1800) {
    mul_smg = 1
  } else if (allReso >= 600 && allReso < 1000) {
    mul_smg = 0.6
  } else {
    mul_smg = 0.3
  }
}

function getMul_AR (allReso, Aw, Rw) { // AR possibility decline
  if (allReso >= 1000) { // allReso base
    mul_ar = 1
  } else {
    mul_ar = 0.8
  }
  if (Aw < 400) {
    mul_ar *= 0.9; // ammor<400 decline
  }
  if (Rw < 400) {
    mul_ar *= 0.9; // ration<400 decline
  }
}

function getMul_RF (allReso, Mw, Rw) { // RF possibility decline
  if (allReso >= 1100) { // allReso base
    mul_rf = 1
  } else if (allReso >= 800 && allReso < 1100) {
    mul_rf = 0.7
  } else {
    mul_rf = 0.5
  }
  if (Mw < 400) {
    mul_rf *= 0.8; // manpower<400 decline
  }
  if (Rw < 400) {
    mul_rf *= 0.8; // ration<400 decline
  }
}

function getMul_MG (allReso) { // MG possibility decline
  if (allReso >= 1700) { // allReso base
    mul_mg = 1
  } else {
    mul_mg = 0.8
  }
}

function getMul_SG (allReso, AwH) { // SG possibility decline
  if (allReso >= 18000) {
    mul_sg = 1
  } else if (allReso >= 17000 && allReso < 18000) {
    mul_sg = 0.8
  } else {
    mul_sg = 0.6
  }
  if (AwH <= 3000) {
    mul_sg *= 1
  } else if (AwH > 3000 && AwH <= 5000) {
    mul_sg *= 0.9
  } else {
    mul_sg *= 0.8
  }
}

function getMul_SMG_H (allReso) { // SMG_Heavy possibility decline
  mul_smg = 3
  if (allReso >= 22000) {
    mul_smg *= 0.2
  } else if (allReso >= 18000 && allReso < 22000) {
    mul_smg *= 0.4
  } else if (allReso >= 10000 && allReso < 18000) {
    mul_smg *= 0.6
  } else if (allReso >= 7000 && allReso < 10000) {
    mul_smg *= 0.8
  } else {
    mul_smg *= 1
  }
}

function getMul_AR_H (allReso) { // AR_Heavy possibility decline
  mul_ar = 3
  if (allReso >= 22000) {
    mul_ar *= 0.15
  } else if (allReso >= 18000 && allReso < 22000) {
    mul_ar *= 0.2
  } else if (allReso >= 15000 && allReso < 18000) {
    mul_ar *= 0.3
  } else if (allReso >= 12000 && allReso < 15000) {
    mul_ar *= 0.4
  } else if (allReso >= 10000 && allReso < 12000) {
    mul_ar *= 0.6
  } else if (allReso >= 7000 && allReso < 10000) {
    mul_ar *= 0.8
  } else {
    mul_ar *= 1
  }
}

function getMul_RF_H (allReso) {
  mul_rf = 3
  if (allReso >= 22000) {
    mul_rf *= 0.25
  } else if (allReso >= 18000 && allReso < 22000) {
    mul_rf *= 0.35
  } else if (allReso >= 14000 && allReso < 18000) {
    mul_rf *= 0.5
  } else if (allReso >= 12000 && allReso < 14000) {
    mul_rf *= 0.7
  } else {
    mul_rf *= 1
  }
}

function getMul_MG_H (allReso) {
  mul_mg = 3
  if (allReso >= 22000) {
    mul_mg *= 0.4
  } else if (allReso >= 20000 && allReso < 22000) {
    mul_mg *= 0.6
  } else if (allReso >= 18000 && allReso < 20000) {
    mul_mg *= 0.8
  } else if (allReso >= 17000 && allReso < 18000) {
    mul_mg *= 1
  } else {
    mul_mg *= 0.8
  }
}

function makeStar () { // Star possibility=3,10,27,60
  var Mw = parseInt(document.getElementById('Mw').value)
  var Aw = parseInt(document.getElementById('Aw').value)
  var Rw = parseInt(document.getElementById('Rw').value)
  var Pw = parseInt(document.getElementById('Pw').value)
  var starNum = Math.floor(Math.random() * 100)
  if (Mw + Aw + Rw + Pw >= 420) {
    if (starNum < 3) return 5
    else if (starNum >= 3 && starNum < 13) return 4
    else if (starNum >= 13 && starNum < 40) return 3
    else return 2
  } else if (Mw + Aw + Rw + Pw >= 200 && Mw + Aw + Rw + Pw < 420) { // low resource decline: 2,8,25,65
    if (starNum < 2) return 5
    else if (starNum >= 2 && starNum < 10) return 4
    else if (starNum >= 10 && starNum < 35) return 3
    else return 2
  } else { // low resource decline: 1,7,22,70
    if (starNum < 1) return 5
    else if (starNum >= 1 && starNum < 8) return 4
    else if (starNum >= 8 && starNum < 30) return 3
    else return 2
  }
}

function makeStar_Heavy (HClass) { // Star possibility=15,45,40/20,60,20/25,75,0
  var starNum = Math.floor(Math.random() * 100)
  if (HClass === 1) {
    if (starNum < 15) return 5
    else if (starNum >= 15 && starNum < 60) return 4
    else return 3
  } else if (HClass === 2) {
    if (starNum < 20) return 5
    else if (starNum >= 20 && starNum < 80) return 4
    else return 3
  } else {
    if (starNum < 25) return 5
    else return 4
  }
}

function makeStarE () { // Star possibility=6.5,15,30,48.5
  var Mw = parseInt(document.getElementById('MwE').value)
  var Aw = parseInt(document.getElementById('AwE').value)
  var Rw = parseInt(document.getElementById('RwE').value)
  var Pw = parseInt(document.getElementById('PwE').value)
  var starNum = Math.floor(Math.random() * 200)
  if (Mw + Aw + Rw + Pw >= 580) {
    if (starNum < 13) return 5
    else if (starNum >= 13 && starNum < 43) return 4
    else if (starNum >= 43 && starNum < 103) return 3
    else return 2
  } else if (Mw + Aw + Rw + Pw >= 360 && Mw + Aw + Rw + Pw < 580) { // low resource decline: 5,13,27,55
    if (starNum < 10) return 5
    else if (starNum >= 10 && starNum < 36) return 4
    else if (starNum >= 36 && starNum < 90) return 3
    else return 2
  } else { // low resource decline: 3,10,17,70
    if (starNum < 6) return 5
    else if (starNum >= 6 && starNum < 26) return 4
    else if (starNum >= 26 && starNum < 60) return 3
    else return 2
  }
}

function makeStar_HeavyE (EHClass) { // Star possibility=27,11,22,40/37,18,45,0/47,26,27,0 , STAR=6 means Fairy
  var starNum = Math.floor(Math.random() * 100)
  if (EHClass === 1) {
    if (starNum < 27) return 6
    else if (starNum >= 27 && starNum < 38) return 5
    else if (starNum >= 38 && starNum < 60) return 4
    else return 3
  } else if (EHClass === 2) {
    if (starNum < 37) return 6
    else if (starNum >= 37 && starNum < 55) return 5
    else return 4
  } else {
    if (starNum < 47) return 6
    else if (starNum >= 47 && starNum < 73) return 5
    else return 4
  }
}

function makeTdoll (Mw, Aw, Rw, Pw, starNum) { // Normal-produce T-doll, possibility*100
  if (starNum === 5) fiveStarNum++
  var TdollInfo = '<b>'
  var TdollList = []
  for (var i = 0; i < starNum; i++) {
    TdollInfo += '★'
  }
  // HG-total<=920
  if (Mw + Aw + Rw + Pw <= 920) {
    getMul_HG(Mw + Aw + Rw + Pw)
    if (starNum === 5) {
      TdollList.push(creatTdollInfo_HG('[HG] 灰熊MkV', 200))
      TdollList.push(creatTdollInfo_HG('[HG] NZ75', 110))
      TdollList.push(creatTdollInfo_HG('[HG] 风暴Px4', 30))
      TdollList.push(creatTdollInfo_HG('[HG] PA-15', 30))
      if (Mw >= 130 && Aw >= 130 && Rw >= 130 && Pw >= 30) {
        TdollList.push(creatTdollInfo_HG('[HG] M950a', 80))
        TdollList.push(creatTdollInfo_HG('[HG] 维尔德MkII', 100))
        TdollList.push(creatTdollInfo_HG('[HG] 竞争者', 30))
      }
    } else if (starNum === 4) {
      TdollList.push(creatTdollInfo_HG('[HG] 柯尔特左轮', 367))
      TdollList.push(creatTdollInfo_HG('[HG] MK23', 259))
      TdollList.push(creatTdollInfo_HG('[HG] P7', 263))
      if (Mw >= 130 && Aw >= 130 && Rw >= 130 && Pw >= 30) {
        TdollList.push(creatTdollInfo_HG('[HG] 斯捷奇金', 87))
        TdollList.push(creatTdollInfo_HG('[HG] SpitFire', 147))
        TdollList.push(creatTdollInfo_HG('[HG] K5', 140))
        TdollList.push(creatTdollInfo_HG('[HG] 杰里科', 80))
      }
    } else if (starNum === 3) {
      TdollList.push(creatTdollInfo_HG('[HG] M9', 366))
      TdollList.push(creatTdollInfo_HG('[HG] 托卡列夫', 267))
      TdollList.push(creatTdollInfo_HG('[HG] 马卡洛夫', 186))
      TdollList.push(creatTdollInfo_HG('[HG] P08', 322))
      TdollList.push(creatTdollInfo_HG('[HG] C96', 360))
      TdollList.push(creatTdollInfo_HG('[HG] 92式', 183))
      TdollList.push(creatTdollInfo_HG('[HG] 阿斯特拉左轮', 325))
      TdollList.push(creatTdollInfo_HG('[HG] P99', 152))
    } else {
      TdollList.push(creatTdollInfo_HG('[HG] M1911', 570))
      TdollList.push(creatTdollInfo_HG('[HG] 纳甘左轮', 547))
      TdollList.push(creatTdollInfo_HG('[HG] P38', 572))
      TdollList.push(creatTdollInfo_HG('[HG] PPK', 563))
      TdollList.push(creatTdollInfo_HG('[HG] FNP-9', 500))
      TdollList.push(creatTdollInfo_HG('[HG] MP-446', 544))
      TdollList.push(creatTdollInfo_HG('[HG] Bren Ten', 570))
      TdollList.push(creatTdollInfo_HG('[HG] USP Compact', 556))
    }
  }
  // SMG-always
  if (true) {
    getMul_SMG(Mw + Aw + Rw + Pw)
    if (starNum === 5) {
      TdollList.push(creatTdollInfo_SMG('[SMG] 汤姆森', 160)); // 4442 base:70,x2.4
      if (Mw >= 400 && Aw >= 400) {
        TdollList.push(creatTdollInfo_SMG('[SMG] Vector', 108))
        TdollList.push(creatTdollInfo_SMG('[SMG] G36C', 24))
        TdollList.push(creatTdollInfo_SMG('[SMG] 索米', 48))
        TdollList.push(creatTdollInfo_SMG('[SMG] 79式', 132))
        TdollList.push(creatTdollInfo_SMG('[SMG] SR-3MP', 57))
        TdollList.push(creatTdollInfo_SMG('[SMG] C-MS', 22))
        TdollList.push(creatTdollInfo_SMG('[SMG] P90', 14))
        TdollList.push(creatTdollInfo_SMG('[SMG] 樱花', 108))
      }
    } else if (starNum === 4) {
      TdollList.push(creatTdollInfo_SMG('[SMG] PP-90', 114)); // 4442 base:76,x1.5
      TdollList.push(creatTdollInfo_SMG('[SMG] MP5', 220))
      if (Mw >= 400 && Aw >= 400) {
        TdollList.push(creatTdollInfo_SMG('[SMG] UMP9', 220))
        TdollList.push(creatTdollInfo_SMG('[SMG] UMP45', 155))
        TdollList.push(creatTdollInfo_SMG('[SMG] 希普卡', 120))
      }
    } else if (starNum === 3) {
      TdollList.push(creatTdollInfo_SMG('[SMG] MAC-10', 178))
      TdollList.push(creatTdollInfo_SMG('[SMG] PPS-43', 99))
      TdollList.push(creatTdollInfo_SMG('[SMG] 蝎式', 130))
      TdollList.push(creatTdollInfo_SMG('[SMG] 司登MKII', 298))
      TdollList.push(creatTdollInfo_SMG('[SMG] 微型乌兹', 188))
    } else {
      TdollList.push(creatTdollInfo_SMG('[SMG] IDW', 308)); // 4442 base:154,x2
      TdollList.push(creatTdollInfo_SMG('[SMG] M3', 344))
      TdollList.push(creatTdollInfo_SMG('[SMG] PPSh-41', 308))
      TdollList.push(creatTdollInfo_SMG('[SMG] PP2000', 432))
      TdollList.push(creatTdollInfo_SMG('[SMG] 伯莱塔38型', 342))
      TdollList.push(creatTdollInfo_SMG('[SMG] M45', 376))
      TdollList.push(creatTdollInfo_SMG('[SMG] SpectreM4', 444))
      TdollList.push(creatTdollInfo_SMG('[SMG] 64式', 316))
    }
  }
  // AR-total>=800
  if (Mw + Aw + Rw + Pw >= 800) {
    getMul_AR(Mw + Aw + Rw + Pw, Aw, Rw)
    if (starNum === 5) {
      TdollList.push(creatTdollInfo_AR('[AR] HK416', 180)); // rounding down 20% from 1441
      TdollList.push(creatTdollInfo_AR('[AR] G11', 50))
      if (Aw >= 400 && Rw >= 400) {
        TdollList.push(creatTdollInfo_AR('[AR] G41', 120))
        TdollList.push(creatTdollInfo_AR('[AR] FAL', 100))
        TdollList.push(creatTdollInfo_AR('[AR] 95式', 100))
        TdollList.push(creatTdollInfo_AR('[AR] 97式', 100))
        TdollList.push(creatTdollInfo_AR('[AR] RFB', 80))
        TdollList.push(creatTdollInfo_AR('[AR] T91', 100))
        TdollList.push(creatTdollInfo_AR('[AR] K2', 100))
        TdollList.push(creatTdollInfo_AR('[AR] Zas M21', 190))
        TdollList.push(creatTdollInfo_AR('[AR] AN-94', 50))
        TdollList.push(creatTdollInfo_AR('[AR] AK-12', 50))
        TdollList.push(creatTdollInfo_AR('[AR] MDR', 100))
        TdollList.push(creatTdollInfo_AR('[AR] K11', 180))
        TdollList.push(creatTdollInfo_AR('[AR] 64式自', 100))
      }
    } else if (starNum === 4) {
      TdollList.push(creatTdollInfo_AR('[AR] AS Val', 200)) // avg rounding to 200
      TdollList.push(creatTdollInfo_AR('[AR] 56-1式', 200))
      TdollList.push(creatTdollInfo_AR('[AR] FAMAS', 200))
      TdollList.push(creatTdollInfo_AR('[AR] 9A-91', 200))
      TdollList.push(creatTdollInfo_AR('[AR] XM8', 200))
      TdollList.push(creatTdollInfo_AR('[AR] SAR-21', 200))
      TdollList.push(creatTdollInfo_AR('[AR] EM-2', 200))
      if (Aw >= 400 && Rw >= 400) {
        TdollList.push(creatTdollInfo_AR('[AR] G36', 100))
        TdollList.push(creatTdollInfo_AR('[AR] TAR-21', 200))
        TdollList.push(creatTdollInfo_AR('[AR] 利贝罗勒', 200))
      }
    } else if (starNum === 3) {
      TdollList.push(creatTdollInfo_AR('[AR] AK-47', 290)); // 4442 base:180, 1441 base:400,avg
      TdollList.push(creatTdollInfo_AR('[AR] StG44', 315))
      TdollList.push(creatTdollInfo_AR('[AR] FNC', 290))
      TdollList.push(creatTdollInfo_AR('[AR] OTs-12', 270))
      TdollList.push(creatTdollInfo_AR('[AR] StG44', 315))
    } else {
      TdollList.push(creatTdollInfo_AR('[AR] G3', 350)); // 4442 base:233,1441 base:434,avg
      TdollList.push(creatTdollInfo_AR('[AR] L85A1', 300))
      TdollList.push(creatTdollInfo_AR('[AR] 加利尔', 300))
      TdollList.push(creatTdollInfo_AR('[AR] SIG-510', 300))
      TdollList.push(creatTdollInfo_AR('[AR] F2000', 300))
      TdollList.push(creatTdollInfo_AR('[AR] 63式', 350))
    }
  }
  // RF: Mw>=300 && Rw>=300
  if (Mw >= 300 && Rw >= 300) {
    getMul_RF(Mw + Aw + Rw + Pw, Mw, Rw)
    if (starNum === 5) {
      TdollList.push(creatTdollInfo_RF('[RF] WA2000', 85)) // all same rounding as ar
      TdollList.push(creatTdollInfo_RF('[RF] NTW-20', 90))
      TdollList.push(creatTdollInfo_RF('[RF] 卡尔卡诺M1891', 60))
      if (Mw >= 400 && Rw >= 400) {
        TdollList.push(creatTdollInfo_RF('[RF] Kar98k', 28))
        TdollList.push(creatTdollInfo_RF('[RF] 李·恩菲尔德', 60))
        TdollList.push(creatTdollInfo_RF('[RF] M99', 28))
        TdollList.push(creatTdollInfo_RF('[RF] IWS2000', 16))
        TdollList.push(creatTdollInfo_RF('[RF] 卡尔卡诺M91/38', 14))
        TdollList.push(creatTdollInfo_RF('[RF] M200', 85))
        TdollList.push(creatTdollInfo_RF('[RF] QBU-88', 30))
      }
    } else if (starNum === 4) {
      TdollList.push(creatTdollInfo_RF('[RF] 春田', 300))
      TdollList.push(creatTdollInfo_RF('[RF] 莫辛-纳甘', 260))
      TdollList.push(creatTdollInfo_RF('[RF] PTRD', 160))
      TdollList.push(creatTdollInfo_RF('[RF] SVD', 110))
      TdollList.push(creatTdollInfo_RF('[RF] T-5000', 100))
      TdollList.push(creatTdollInfo_RF('[RF] SPR-A3G', 40))
      TdollList.push(creatTdollInfo_RF('[RF] K31', 100))
    } else if (starNum === 3) {
      TdollList.push(creatTdollInfo_RF('[RF] M1加兰德', 400))
      TdollList.push(creatTdollInfo_RF('[RF] M14', 370))
      TdollList.push(creatTdollInfo_RF('[RF] SV-98', 300))
      if (Mw >= 400 && Aw >= 400) {
        TdollList.push(creatTdollInfo_RF('[RF] 汉阳造88式', 90))
      }
    } else {
      TdollList.push(creatTdollInfo_RF('[RF] SVT-38', 500))
      TdollList.push(creatTdollInfo_RF('[RF] 西蒙诺夫 SKS', 500))
      TdollList.push(creatTdollInfo_RF('[RF] G43', 440))
      TdollList.push(creatTdollInfo_RF('[RF] FN-49', 430))
      TdollList.push(creatTdollInfo_RF('[RF] BM59', 460))
    }
  }
  // MG: Mw>=400 && Aw>=600 && Pw>=300
  if (Mw >= 400 && Aw >= 600 && Pw >= 300) {
    getMul_MG(Mw + Aw + Rw + Pw)
    if (starNum === 5) {
      TdollList.push(creatTdollInfo_MG('[MG] MG5', 90)) // all same rounding as ar
      if (Mw >= 600 && Aw >= 600 && Rw >= 100 && Pw >= 400) {
        TdollList.push(creatTdollInfo_MG('[MG] 内格夫', 40))
        TdollList.push(creatTdollInfo_MG('[MG] MG4', 50))
        TdollList.push(creatTdollInfo_MG('[MG] PKP', 70))
        TdollList.push(creatTdollInfo_MG('[MG] 88式', 70))
        TdollList.push(creatTdollInfo_MG('[MG] MG36', 70))
      }
    } else if (starNum === 4) {
      TdollList.push(creatTdollInfo_MG('[MG] M1918', 230))
      TdollList.push(creatTdollInfo_MG('[MG] M60', 150))
      TdollList.push(creatTdollInfo_MG('[MG] MG3', 200))
      TdollList.push(creatTdollInfo_MG('[MG] 阿梅丽', 55))
      if (Mw >= 600 && Aw >= 600 && Rw >= 100 && Pw >= 400) {
        TdollList.push(creatTdollInfo_MG('[MG] PK', 80))
        TdollList.push(creatTdollInfo_MG('[MG] MK48', 80))
        TdollList.push(creatTdollInfo_MG('[MG] AEK-999', 80))
        TdollList.push(creatTdollInfo_MG('[MG] 80式', 70))
        TdollList.push(creatTdollInfo_MG('[MG] 绍沙', 80))
      }
    } else if (starNum === 3) {
      TdollList.push(creatTdollInfo_MG('[MG] M2HB', 170))
      TdollList.push(creatTdollInfo_MG('[MG] M1919A4', 350))
      TdollList.push(creatTdollInfo_MG('[MG] MG42', 350))
      TdollList.push(creatTdollInfo_MG('[MG] 布伦', 380))
    } else {
      TdollList.push(creatTdollInfo_MG('[MG] LWMMG', 590))
      TdollList.push(creatTdollInfo_MG('[MG] DP28', 790))
      TdollList.push(creatTdollInfo_MG('[MG] MG34', 650))
      TdollList.push(creatTdollInfo_MG('[MG] FG42', 630))
      TdollList.push(creatTdollInfo_MG('[MG] AAT-52', 680))
    }
  }
  var totalPosiNum = 0
  for (var i = 0; i < TdollList.length; i++) {
    totalPosiNum += parseInt(TdollList[i].possibility)
  }
  var selectTdoll = Math.floor(Math.random() * totalPosiNum)
  for (var i = 0; i < TdollList.length; i++) {
    selectTdoll -= parseInt(TdollList[i].possibility)
    if (selectTdoll <= 0) {
      TdollInfo += ' '
      TdollInfo += TdollList[i].name
      break
    }
  }
  TdollInfo += '</b>'
  return TdollInfo
}

function makeTdoll_Heavy (MwH, AwH, RwH, PwH, starNum) { // Heavy-produce T-doll, possibility*100
  if (starNum === 5) fiveStarNumH++
  var TdollInfo = '<b>'
  var TdollList = []
  for (var i = 0; i < starNum; i++) {
    TdollInfo += '★'
  }
  // SG: 4163 and 6164
  if (MwH >= 4000 && AwH >= 1000 && RwH >= 6000 && PwH >= 3000) {
    getMul_SG(MwH + AwH + RwH + PwH)
    if (starNum === 5) {
      TdollList.push(creatTdollInfo_SMG('[SG] KSG', 48))
      if (MwH >= 6000 && AwH >= 1000 && RwH >= 6000 && PwH >= 4000) {
        TdollList.push(creatTdollInfo_SMG('[SG] AA-12', 32))
        TdollList.push(creatTdollInfo_SMG('[SG] FP-6', 24))
        TdollList.push(creatTdollInfo_SMG('[SG] Saiga-12', 40))
        TdollList.push(creatTdollInfo_SMG('[SG] S.A.T.8', 24))
      }
    } else if (starNum === 4) {
      TdollList.push(creatTdollInfo_SMG('[SG] M590', 200))
      TdollList.push(creatTdollInfo_SMG('[SG] M1014', 60))
      TdollList.push(creatTdollInfo_SMG('[SG] SPAS-12', 160))
      TdollList.push(creatTdollInfo_SMG('[SG] USAS-12', 80))
      if (MwH >= 6000 && AwH >= 1000 && RwH >= 6000 && PwH >= 4000) {
        TdollList.push(creatTdollInfo_SMG('[SG] M37', 180))
        TdollList.push(creatTdollInfo_SMG('[SG] Super-Shorty', 130))
      }
    } else {
      TdollList.push(creatTdollInfo_SMG('[SG] M1897', 270))
      TdollList.push(creatTdollInfo_SMG('[SG] M400', 290))
      TdollList.push(creatTdollInfo_SMG('[SG] KS-23', 270))
      TdollList.push(creatTdollInfo_SMG('[SG] NS2000', 150))
      if (MwH >= 6000 && AwH >= 1000 && RwH >= 6000 && PwH >= 4000) {
        TdollList.push(creatTdollInfo_SMG('[SG] RMB93', 260))
      }
    }
  }
  // SMG-always
  if (true) {
    getMul_SMG_H(MwH + AwH + RwH + PwH)
    if (starNum === 5) {
      TdollList.push(creatTdollInfo_SMG('[SMG] 汤姆森', 160))
      if (MwH >= 4000 && AwH >= 4000) {
        TdollList.push(creatTdollInfo_SMG('[SMG] Vector', 108))
        TdollList.push(creatTdollInfo_SMG('[SMG] G36C', 24))
        TdollList.push(creatTdollInfo_SMG('[SMG] 索米', 48))
        TdollList.push(creatTdollInfo_SMG('[SMG] 79式', 132))
        TdollList.push(creatTdollInfo_SMG('[SMG] SR-3MP', 57))
        TdollList.push(creatTdollInfo_SMG('[SMG] C-MS', 22))
        TdollList.push(creatTdollInfo_SMG('[SMG] P90', 14))
        TdollList.push(creatTdollInfo_SMG('[SMG] 樱花', 108))
      }
    } else if (starNum === 4) {
      TdollList.push(creatTdollInfo_SMG('[SMG] PP-90', 114))
      TdollList.push(creatTdollInfo_SMG('[SMG] MP5', 220))
      if (MwH >= 4000 && AwH >= 4000) {
        TdollList.push(creatTdollInfo_SMG('[SMG] UMP9', 220))
        TdollList.push(creatTdollInfo_SMG('[SMG] UMP45', 155))
        TdollList.push(creatTdollInfo_SMG('[SMG] 希普卡', 120))
      }
    } else {
      TdollList.push(creatTdollInfo_SMG('[SMG] F1', 200))
      TdollList.push(creatTdollInfo_SMG('[SMG] Z-62', 300))
      TdollList.push(creatTdollInfo_SMG('[SMG] MAC-10', 178))
      TdollList.push(creatTdollInfo_SMG('[SMG] PPS-43', 99))
      TdollList.push(creatTdollInfo_SMG('[SMG] 蝎式', 130))
      TdollList.push(creatTdollInfo_SMG('[SMG] 司登MKII', 298))
      TdollList.push(creatTdollInfo_SMG('[SMG] 微型乌兹', 188))
    }
  }
  // AR-always+1441
  if (true) {
    getMul_AR_H(MwH + AwH + RwH + PwH)
    if (starNum === 5) {
      TdollList.push(creatTdollInfo_AR('[AR] HK416', 180))
      TdollList.push(creatTdollInfo_AR('[AR] G11', 50))
      if (AwH >= 4000 && RwH >= 4000) {
        TdollList.push(creatTdollInfo_AR('[AR] G41', 120))
        TdollList.push(creatTdollInfo_AR('[AR] FAL', 100))
        TdollList.push(creatTdollInfo_AR('[AR] 95式', 100))
        TdollList.push(creatTdollInfo_AR('[AR] 97式', 100))
        TdollList.push(creatTdollInfo_AR('[AR] RFB', 80))
        TdollList.push(creatTdollInfo_AR('[AR] T91', 100))
        TdollList.push(creatTdollInfo_AR('[AR] K2', 100))
        TdollList.push(creatTdollInfo_AR('[AR] Zas M21', 190))
        TdollList.push(creatTdollInfo_AR('[AR] AN-94', 50))
        TdollList.push(creatTdollInfo_AR('[AR] AK-12', 50))
        TdollList.push(creatTdollInfo_AR('[AR] MDR', 100))
        TdollList.push(creatTdollInfo_AR('[AR] K11', 180))
        TdollList.push(creatTdollInfo_AR('[AR] 64式自 ', 100))
      }
    } else if (starNum === 4) {
      TdollList.push(creatTdollInfo_AR('[AR] AS Val', 200))
      TdollList.push(creatTdollInfo_AR('[AR] 56-1式', 200))
      TdollList.push(creatTdollInfo_AR('[AR] FAMAS', 200))
      TdollList.push(creatTdollInfo_AR('[AR] 9A-91', 200))
      TdollList.push(creatTdollInfo_AR('[AR] XM8', 200))
      TdollList.push(creatTdollInfo_AR('[AR] SAR-21', 200))
      TdollList.push(creatTdollInfo_AR('[AR] EM-2', 200))
      if (AwH >= 4000 && RwH >= 4000) {
        TdollList.push(creatTdollInfo_AR('[AR] G36', 100))
        TdollList.push(creatTdollInfo_AR('[AR] TAR-21', 200))
        TdollList.push(creatTdollInfo_AR('[AR] 利贝罗勒', 200))
      }
    } else {
      TdollList.push(creatTdollInfo_AR('[AR] ARX-160', 280))
      TdollList.push(creatTdollInfo_AR('[AR] AK-47', 290))
      TdollList.push(creatTdollInfo_AR('[AR] StG44', 315))
      TdollList.push(creatTdollInfo_AR('[AR] FNC', 290))
      TdollList.push(creatTdollInfo_AR('[AR] OTs-12', 270))
      TdollList.push(creatTdollInfo_AR('[AR] StG44', 315))
    }
  }
  // RF: 4141
  if (MwH >= 4000 && RwH >= 4000) {
    getMul_RF_H(MwH + AwH + RwH + PwH)
    if (starNum === 5) {
      TdollList.push(creatTdollInfo_RF('[RF] WA2000', 85))
      TdollList.push(creatTdollInfo_RF('[RF] NTW-20', 90))
      TdollList.push(creatTdollInfo_RF('[RF] 卡尔卡诺M1891', 60))
      TdollList.push(creatTdollInfo_RF('[RF] Kar98k', 28))
      TdollList.push(creatTdollInfo_RF('[RF] 李·恩菲尔德', 60))
      TdollList.push(creatTdollInfo_RF('[RF] M99', 28))
      TdollList.push(creatTdollInfo_RF('[RF] IWS2000', 16))
      TdollList.push(creatTdollInfo_RF('[RF] 卡尔卡诺M91/38', 14))
      TdollList.push(creatTdollInfo_RF('[RF] M200', 85))
      TdollList.push(creatTdollInfo_RF('[RF] QBU-88', 30))
    } else if (starNum === 4) {
      TdollList.push(creatTdollInfo_RF('[RF] PSG-1', 200))
      TdollList.push(creatTdollInfo_RF('[RF] G28', 170))
      TdollList.push(creatTdollInfo_RF('[RF] PzB-39', 140))
      TdollList.push(creatTdollInfo_RF('[RF] 春田', 300))
      TdollList.push(creatTdollInfo_RF('[RF] 莫辛-纳甘', 260))
      TdollList.push(creatTdollInfo_RF('[RF] PTRD', 160))
      TdollList.push(creatTdollInfo_RF('[RF] SVD', 110))
      TdollList.push(creatTdollInfo_RF('[RF] T-5000', 100))
      TdollList.push(creatTdollInfo_RF('[RF] SPR-A3G', 40))
      TdollList.push(creatTdollInfo_RF('[RF] K31', 100))
    } else {
      TdollList.push(creatTdollInfo_RF('[RF] Ots-44', 230))
      TdollList.push(creatTdollInfo_RF('[RF] M1加兰德', 400))
      TdollList.push(creatTdollInfo_RF('[RF] M14', 370))
      TdollList.push(creatTdollInfo_RF('[RF] SV-98', 300))
      TdollList.push(creatTdollInfo_RF('[RF] 汉阳造88式', 90))
    }
  }
  // MG: 4614 6614
  if (MwH >= 4000 && AwH >= 6000 && PwH >= 4000) {
    getMul_MG_H(MwH + AwH + RwH + PwH)
    if (starNum === 5) {
      TdollList.push(creatTdollInfo_MG('[MG] MG5', 90))
      if (MwH >= 6000 && AwH >= 6000 && PwH >= 4000) {
        TdollList.push(creatTdollInfo_MG('[MG] 内格夫', 40))
        TdollList.push(creatTdollInfo_MG('[MG] MG4', 50))
        TdollList.push(creatTdollInfo_MG('[MG] PKP', 70))
        TdollList.push(creatTdollInfo_MG('[MG] 88式', 70))
        TdollList.push(creatTdollInfo_MG('[MG] MG36', 70))
      }
    } else if (starNum === 4) {
      TdollList.push(creatTdollInfo_MG('[MG] M1918', 230))
      TdollList.push(creatTdollInfo_MG('[MG] M60', 150))
      TdollList.push(creatTdollInfo_MG('[MG] MG3', 200))
      TdollList.push(creatTdollInfo_MG('[MG] 阿梅丽', 55))
      if (MwH >= 6000 && AwH >= 6000 && PwH >= 4000) {
        TdollList.push(creatTdollInfo_MG('[MG] PK', 80))
        TdollList.push(creatTdollInfo_MG('[MG] MK48', 80))
        TdollList.push(creatTdollInfo_MG('[MG] AEK-999', 80))
        TdollList.push(creatTdollInfo_MG('[MG] 80式', 70))
        TdollList.push(creatTdollInfo_MG('[MG] 绍沙', 80))
      }
    } else {
      TdollList.push(creatTdollInfo_MG('[MG] M2HB', 170))
      TdollList.push(creatTdollInfo_MG('[MG] M1919A4', 350))
      TdollList.push(creatTdollInfo_MG('[MG] MG42', 350))
      TdollList.push(creatTdollInfo_MG('[MG] 布伦', 380))
    }
  }
  var totalPosiNum = 0
  for (var i = 0; i < TdollList.length; i++) {
    totalPosiNum += parseInt(TdollList[i].possibility)
  }
  var selectTdoll = Math.floor(Math.random() * totalPosiNum)
  for (var i = 0; i < TdollList.length; i++) {
    selectTdoll -= parseInt(TdollList[i].possibility)
    if (selectTdoll <= 0) {
      TdollInfo += ' '
      TdollInfo += TdollList[i].name
      break
    }
  }
  TdollInfo += '</b>'
  return TdollInfo
}

function makeEquip (Mw, Aw, Rw, Pw, starNum) { // Normal-produce Equip, possibility*100, refer to 150x4
  if (starNum === 5) fiveStarNumE++
  var EquipInfo = '<b>'
  var EquipList = []
  for (var i = 0; i < starNum; i++) {
    EquipInfo += '★'
  }
  // Scope: Aw<=150 and Pw<=150
  if (Aw <= 150 && Pw <= 150) {
    if (starNum === 5) {
      EquipList.push(creatEquipInfo('[光瞄] VFL 6-24x56', 100))
      EquipList.push(creatEquipInfo('[全息] EOT 518', 100))
      EquipList.push(creatEquipInfo('[红点] ITI Mars', 100))
    } else if (starNum === 4) {
      EquipList.push(creatEquipInfo('[光瞄] PSO-1', 190))
      EquipList.push(creatEquipInfo('[全息] EOT 516', 190))
      EquipList.push(creatEquipInfo('[红点] COG-M150', 190))
    } else if (starNum === 3) {
      EquipList.push(creatEquipInfo('[光瞄] LRA 2-12x50', 235))
      EquipList.push(creatEquipInfo('[全息] EOT 512', 235))
      EquipList.push(creatEquipInfo('[红点] AMP-COMPM4', 235))
    } else {
      EquipList.push(creatEquipInfo('[光瞄] BM 3-12X40', 310))
      EquipList.push(creatEquipInfo('[全息] EOT 506', 310))
      EquipList.push(creatEquipInfo('[红点] AMP-COMPM2', 310))
    }
  }
  // Night & Cape: Mw>=100 and Rw>=100
  if (Mw >= 100 && Rw >= 100) {
    if (starNum === 5) {
      EquipList.push(creatEquipInfo('[披风] 热光学迷彩披风', 50))
      EquipList.push(creatEquipInfo('[夜视仪] PEQ-16A', 100))
    } else if (starNum === 4) {
      EquipList.push(creatEquipInfo('[披风] 城市迷彩披风', 109))
      EquipList.push(creatEquipInfo('[夜视仪] PEQ-15', 167))
    } else if (starNum === 3) {
      EquipList.push(creatEquipInfo('[披风] 伪装披风', 183))
      EquipList.push(creatEquipInfo('[夜视仪] PEQ-5', 160))
    } else {
      EquipList.push(creatEquipInfo('[披风] 破旧披风', 254))
      EquipList.push(creatEquipInfo('[夜视仪] PEQ-2', 198))
    }
  }
  // Exoskeleton: Mw>=50 and Pw>=50
  if (Mw >= 50 && Pw >= 50) {
    if (starNum === 5) {
      EquipList.push(creatEquipInfo('[外骨骼T] IOP T4 外骨骼', 48))
      EquipList.push(creatEquipInfo('[外骨骼X] IOP X4 外骨骼', 48))
    } else if (starNum === 4) {
      EquipList.push(creatEquipInfo('[外骨骼T] IOP T3 外骨骼', 89))
      EquipList.push(creatEquipInfo('[外骨骼X] IOP X3 外骨骼', 89))
    } else if (starNum === 3) {
      EquipList.push(creatEquipInfo('[外骨骼T] IOP T2 外骨骼', 110))
      EquipList.push(creatEquipInfo('[外骨骼X] IOP X2 外骨骼', 110))
    } else {
      EquipList.push(creatEquipInfo('[外骨骼T] IOP T1 外骨骼', 145))
      EquipList.push(creatEquipInfo('[外骨骼X] IOP X1 外骨骼', 145))
    }
  }
  // Suppressor: Mw>=50
  if (Mw >= 50) {
    if (starNum === 5) EquipList.push(creatEquipInfo('[消音器] AC4 消音器', 75))
    else if (starNum === 4) EquipList.push(creatEquipInfo('[消音器] AC3 消音器', 129))
    else if (starNum === 3) EquipList.push(creatEquipInfo('[消音器] AC2 消音器', 177))
    else EquipList.push(creatEquipInfo('[消音器] AC1 消音器', 221))
  }
  // Ammo and box: Aw>=150 and Pw>=50
  if (Aw >= 150 && Pw >= 50) {
    if (starNum === 5) {
      EquipList.push(creatEquipInfo('[弹链] IOP极限弹链箱', 60))
      EquipList.push(creatEquipInfo('[高速弹] APCR高速弹', 60))
      EquipList.push(creatEquipInfo('[穿甲弹] Mk211高爆穿甲弹', 94))
      EquipList.push(creatEquipInfo('[状态弹] ILM空尖弹', 52))
      EquipList.push(creatEquipInfo('[霰弹] #000猎鹿弹', 55))
      EquipList.push(creatEquipInfo('[霰弹] SABOT独头弹', 55))
    } else if (starNum === 4) {
      EquipList.push(creatEquipInfo('[弹链] IOP大容量弹链箱', 125))
      EquipList.push(creatEquipInfo('[高速弹] JHP高速弹', 141))
      EquipList.push(creatEquipInfo('[穿甲弹] Mk169穿甲弹', 191))
      EquipList.push(creatEquipInfo('[状态弹] ILM空尖弹', 140))
      EquipList.push(creatEquipInfo('[霰弹] #00猎鹿弹', 132))
      EquipList.push(creatEquipInfo('[霰弹] WAD独头弹', 139))
    } else if (starNum === 3) {
      EquipList.push(creatEquipInfo('[高速弹] JSP高速弹', 253))
      EquipList.push(creatEquipInfo('[穿甲弹] M993穿甲弹', 338))
      EquipList.push(creatEquipInfo('[状态弹] ILM空尖弹', 284))
      EquipList.push(creatEquipInfo('[霰弹] #0猎鹿弹', 258))
      EquipList.push(creatEquipInfo('[霰弹] FST独头弹', 248))
    } else {
      EquipList.push(creatEquipInfo('[高速弹] FMJ高速弹', 344))
      EquipList.push(creatEquipInfo('[穿甲弹] M61穿甲弹', 430))
      EquipList.push(creatEquipInfo('[状态弹] ILM空尖弹', 377))
      EquipList.push(creatEquipInfo('[霰弹] #1猎鹿弹', 343))
      EquipList.push(creatEquipInfo('[霰弹] BK独头弹', 327))
    }
  }
  // Armor plate and box: Rw>=50 and Pw>=50
  if (Rw >= 50 && Pw >= 50) {
    if (starNum === 5) EquipList.push(creatEquipInfo('[防弹插板] Type3防弹插板', 113))
    else if (starNum === 4) EquipList.push(creatEquipInfo('[防弹插板] Type2防弹插板', 288))
    else EquipList.push(creatEquipInfo('[防弹插板] Type1防弹插板', 149))
  }
  var totalPosiNum = 0
  for (var i = 0; i < EquipList.length; i++) {
    totalPosiNum += parseInt(EquipList[i].possibility)
  }
  var selectEquip = Math.floor(Math.random() * totalPosiNum)
  for (var i = 0; i < EquipList.length; i++) {
    selectEquip -= parseInt(EquipList[i].possibility)
    if (selectEquip <= 0) {
      EquipInfo += ' '
      EquipInfo += EquipList[i].name
      break
    }
  }
  EquipInfo += '</b>'
  return EquipInfo
}

function makeEquipH (Mw, Aw, Rw, Pw, starNum) { // Normal-produce Equip, possibility*100, refer to 150x4
  if (starNum === 6) fairyNum++
  else if (starNum === 5) fiveStarNumEH++
  var EquipInfo = '<b>'
  var EquipList = []
  if (starNum <= 5) {
    for (var i = 0; i < starNum; i++) {
      EquipInfo += '★'
    }
  }
  // Fairy
  if (starNum === 6) {
    if (Mw >= 2000 && Rw >= 2000 && Pw >= 1000) {
      EquipList.push(creatEquipInfo('[策略妖精] 增援妖精', 100))
      EquipList.push(creatEquipInfo('[策略妖精] 空降妖精', 100))
      EquipList.push(creatEquipInfo('[策略妖精] 防御妖精', 100))
    }
    if (Aw >= 2000 && Rw >= 2000 && Pw >= 1000) {
      EquipList.push(creatEquipInfo('[策略妖精] 布雷妖精', 100))
      EquipList.push(creatEquipInfo('[策略妖精] 火箭妖精', 100))
      EquipList.push(creatEquipInfo('[策略妖精] 工事妖精', 100))
    }
    EquipList.push(creatEquipInfo('[战斗妖精] 指挥妖精', 100))
    EquipList.push(creatEquipInfo('[战斗妖精] 搜救妖精', 100))
    EquipList.push(creatEquipInfo('[策略妖精] 照明妖精', 100))
    EquipList.push(creatEquipInfo('[战斗妖精] 勇士妖精', 100))
    EquipList.push(creatEquipInfo('[战斗妖精] 暴怒妖精', 100))
    EquipList.push(creatEquipInfo('[战斗妖精] 盾甲妖精', 100))
    EquipList.push(creatEquipInfo('[战斗妖精] 护盾妖精', 100))
    EquipList.push(creatEquipInfo('[战斗妖精] 嘲讽妖精', 100))
    EquipList.push(creatEquipInfo('[战斗妖精] 狙击妖精', 100))
    EquipList.push(creatEquipInfo('[战斗妖精] 炮击妖精', 100))
    EquipList.push(creatEquipInfo('[战斗妖精] 空袭妖精', 100))
  }
  // Scope?
  if (Aw < 1000 && Pw < 1000) {
    if (starNum === 5) {
      EquipList.push(creatEquipInfo('[光瞄] VFL 6-24x56', 100))
      EquipList.push(creatEquipInfo('[全息] EOT 518', 100))
      EquipList.push(creatEquipInfo('[红点] ITI Mars', 100))
    } else if (starNum === 4) {
      EquipList.push(creatEquipInfo('[光瞄] PSO-1', 190))
      EquipList.push(creatEquipInfo('[全息] EOT 516', 190))
      EquipList.push(creatEquipInfo('[红点] COG-M150', 190))
    } else if (starNum === 3) {
      EquipList.push(creatEquipInfo('[光瞄] LRA 2-12x50', 235))
      EquipList.push(creatEquipInfo('[全息] EOT 512', 235))
      EquipList.push(creatEquipInfo('[红点] AMP-COMPM4', 235))
    }
  }
  // Night & Cape?
  if (Mw >= 2000 && Pw >= 1000) {
    if (starNum === 5) {
      EquipList.push(creatEquipInfo('[披风] 热光学迷彩披风', 50))
      EquipList.push(creatEquipInfo('[夜视仪] PEQ-16A', 100))
    } else if (starNum === 4) {
      EquipList.push(creatEquipInfo('[披风] 城市迷彩披风', 109))
      EquipList.push(creatEquipInfo('[夜视仪] PEQ-15', 167))
    } else if (starNum === 3) {
      EquipList.push(creatEquipInfo('[披风] 伪装披风', 183))
      EquipList.push(creatEquipInfo('[夜视仪] PEQ-5', 160))
    }
  }
  // Exoskeleton?
  if (Mw >= 2000 && Pw >= 2000) {
    if (starNum === 5) {
      EquipList.push(creatEquipInfo('[外骨骼T] IOP T4 外骨骼', 48))
      EquipList.push(creatEquipInfo('[外骨骼X] IOP X4 外骨骼', 48))
    } else if (starNum === 4) {
      EquipList.push(creatEquipInfo('[外骨骼T] IOP T3 外骨骼', 89))
      EquipList.push(creatEquipInfo('[外骨骼X] IOP X3 外骨骼', 89))
    } else if (starNum === 3) {
      EquipList.push(creatEquipInfo('[外骨骼T] IOP T2 外骨骼', 110))
      EquipList.push(creatEquipInfo('[外骨骼X] IOP X2 外骨骼', 110))
    }
  }
  // Suppressor: Mw>=50
  if (Mw >= 2000) {
    if (starNum === 5) EquipList.push(creatEquipInfo('[消音器] AC4 消音器', 75))
    else if (starNum === 4) EquipList.push(creatEquipInfo('[消音器] AC3 消音器', 129))
    else if (starNum === 3) EquipList.push(creatEquipInfo('[消音器] AC2 消音器', 177))
  }
  // Ammo and box?
  if (Aw >= 2000 && Pw >= 1000) {
    if (starNum === 5) {
      EquipList.push(creatEquipInfo('[弹链] IOP极限弹链箱', 60))
      EquipList.push(creatEquipInfo('[高速弹] APCR高速弹', 60))
      EquipList.push(creatEquipInfo('[穿甲弹] Mk211高爆穿甲弹', 94))
      EquipList.push(creatEquipInfo('[状态弹] ILM空尖弹', 52))
      EquipList.push(creatEquipInfo('[霰弹] #000猎鹿弹', 55))
      EquipList.push(creatEquipInfo('[霰弹] SABOT独头弹', 55))
    } else if (starNum === 4) {
      EquipList.push(creatEquipInfo('[弹链] IOP大容量弹链箱', 125))
      EquipList.push(creatEquipInfo('[高速弹] JHP高速弹', 141))
      EquipList.push(creatEquipInfo('[穿甲弹] Mk169穿甲弹', 191))
      EquipList.push(creatEquipInfo('[状态弹] ILM空尖弹', 140))
      EquipList.push(creatEquipInfo('[霰弹] #00猎鹿弹', 132))
      EquipList.push(creatEquipInfo('[霰弹] WAD独头弹', 139))
    } else if (starNum === 3) {
      EquipList.push(creatEquipInfo('[高速弹] JSP高速弹', 253))
      EquipList.push(creatEquipInfo('[穿甲弹] M993穿甲弹', 338))
      EquipList.push(creatEquipInfo('[状态弹] ILM空尖弹', 284))
      EquipList.push(creatEquipInfo('[霰弹] #0猎鹿弹', 258))
      EquipList.push(creatEquipInfo('[霰弹] FST独头弹', 248))
    }
  }
  // Armor plate and box?
  if (Rw >= 2000 && Pw >= 1000) {
    if (starNum === 5) EquipList.push(creatEquipInfo('[防弹插板] Type3防弹插板', 113))
    else if (starNum === 4) EquipList.push(creatEquipInfo('[防弹插板] Type2防弹插板', 288))
    else if (starNum === 3) EquipList.push(creatEquipInfo('[防弹插板] Type1防弹插板', 149))
  }
  var totalPosiNum = 0
  for (var i = 0; i < EquipList.length; i++) {
    totalPosiNum += parseInt(EquipList[i].possibility)
  }
  var selectEquip = Math.floor(Math.random() * totalPosiNum)
  for (var i = 0; i < EquipList.length; i++) {
    selectEquip -= parseInt(EquipList[i].possibility)
    if (selectEquip <= 0) {
      EquipInfo += ' '
      EquipInfo += EquipList[i].name
      break
    }
  }
  EquipInfo += '</b>'
  return EquipInfo
}

function addList () { // Add Normal-produce info
  listNum++
  var chart = document.getElementById('rankingChart')
  var sumchart = document.getElementById('sumChart')
  var resochart = document.getElementById('resoChart')
  var tabSum = sumchart.innerHTML
  var tabReso = resochart.innerHTML
  var MwId = document.getElementById('Mw')
  var Mw = parseInt(MwId.value)
  allM += Mw
  var AwId = document.getElementById('Aw')
  var Aw = parseInt(AwId.value)
  allA += Aw
  var RwId = document.getElementById('Rw')
  var Rw = parseInt(RwId.value)
  allR += Rw
  var PwId = document.getElementById('Pw')
  var Pw = parseInt(PwId.value)
  allP += Pw
  allCon++
  var starNum = makeStar()
  var Tdoll = makeTdoll(Mw, Aw, Rw, Pw, starNum)
  // add List
  global_list = global_list.substring(0, global_list.length - 16)
  global_list += '<tr>'
  global_list += '<td>'
  global_list += (listNum + '')
  global_list += '</td>'
  global_list += '<td>'
  global_list += (Mw + ' ')
  global_list += (Aw + ' ')
  global_list += (Rw + ' ')
  global_list += (Pw + ' ')
  global_list += '</td><td>'
  global_5list = global_5list.substring(0, global_5list.length - 16)
  global_5list += '<tr>'
  if (starNum === 5) {
    global_5list += '<td>'
    global_5list += (listNum + '')
    global_5list += '</td><td>'
    global_5list += (Mw + ' ')
    global_5list += (Aw + ' ')
    global_5list += (Rw + ' ')
    global_5list += (Pw + ' ')
    global_5list += '</td><td><span style="color:darkorange">'
    global_5list += Tdoll
    global_5list += '</span></td>'
    global_list += '<span style="color:darkorange">'
    global_list += Tdoll
    global_list += '</span>'
  } else if (starNum === 4) {
    global_list += '<span style="color:chartreuse">'
    global_list += Tdoll
    global_list += '</span>'
  } else if (starNum === 3) {
    global_list += '<span style="color:dodgerblue">'
    global_list += Tdoll
    global_list += '</span>'
  } else {
    global_list += '<span style="color:darkseagreen">'
    global_list += Tdoll
    global_list += '</span>'
  }
  global_list += '</td></tr></tbody></table>'
  global_5list += '</tr></tbody></table>'
  tabSum = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>总建造数</th><th>五星人形获取数</th><th>五星人形获取率</th><th>评价</th></tr></thead><tbody>'
  tabSum += '<tr>'
  var RateNormal
  if (listNum === listNumH) RateNormal = -1; // Not normal-produce
  else RateNormal = Math.ceil(100 * fiveStarNum / (listNum - listNumH))
  var RateHeavy
  if (listNumH === 0) RateHeavy = -1; // Not heavy-produce
  else RateHeavy = Math.ceil(100 * fiveStarNumH / listNumH)
  tabSum += '<td>'
  tabSum += (listNum + '')
  tabSum += '</td><td>'
  tabSum += (fiveStarNum + ' + ')
  tabSum += (fiveStarNumH + '')
  tabSum += '</td><td>'
  if (RateNormal < 0) tabSum += '-'
  else tabSum += (RateNormal + '%')
  tabSum += ' / '
  if (RateHeavy < 0) tabSum += '-'
  else tabSum += (RateHeavy + '%')
  tabSum += '</td><td>'
  if ((RateNormal < 0 || RateNormal > 10) && (RateHeavy < 0 || RateHeavy > 30)) {
    tabSum += '<span style="color:darkorange"><b>欧皇</b></span>'
  } else if ((RateNormal <= 2 && RateNormal >= 0) && (RateHeavy < 0 || (RateHeavy <= 10 && RateHeavy >= 0))) {
    tabSum += '<span style="color:darkseagreen"><b>非酋</b></span>'
  } else {
    tabSum += '<span style="color:dodgerblue"><b>亚洲人</b></span>'
  }
  tabSum += '</td></tr></tbody></table>'
  tabReso = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>人力消耗</th><th>弹药消耗</th><th>口粮消耗</th><th>零件消耗</th><th>人形契约消耗</th><th>装备契约消耗</th><th>核心消耗</th></tr></thead><tbody><tr>'
  tabReso += '<td>'
  tabReso += (allM + '')
  tabReso += '</td><td>'
  tabReso += (allA + '')
  tabReso += '</td><td>'
  tabReso += (allR + '')
  tabReso += '</td><td>'
  tabReso += (allP + '')
  tabReso += '</td><td>'
  tabReso += (allCon + '')
  tabReso += '</td><td>'
  tabReso += (allConE + '')
  tabReso += '</td><td>'
  tabReso += (allCore + '')
  tabReso += '</td></tr></tbody></table>'
  var switchA = document.getElementById('showAllSwitch')
  if (switchA.checked === true) {
    chart.innerHTML = global_list
  } else {
    chart.innerHTML = global_5list
  }
  sumchart.innerHTML = tabSum
  resochart.innerHTML = tabReso
}

function addListH () { // Add Heavy-produce info
  listNum++
  listNumH++
  var chart = document.getElementById('rankingChart')
  var sumchart = document.getElementById('sumChart')
  var resochart = document.getElementById('resoChart')
  var tabSum = sumchart.innerHTML
  var tabReso = resochart.innerHTML
  var HClassId = document.getElementById('HClass')
  var HClass = parseInt(HClassId.value)
  var MwHId = document.getElementById('MwH')
  var MwH = parseInt(MwHId.value)
  allM += MwH
  var AwHId = document.getElementById('AwH')
  var AwH = parseInt(AwHId.value)
  allA += AwH
  var RwHId = document.getElementById('RwH')
  var RwH = parseInt(RwHId.value)
  allR += RwH
  var PwHId = document.getElementById('PwH')
  var PwH = parseInt(PwHId.value)
  allP += PwH
  if (HClass === 1) {
    allCon += 1
    allCore += 3
  } else if (HClass === 2) {
    allCon += 20
    allCore += 5
  } else {
    allCon += 50
    allCore += 10
  }
  var starNum = makeStar_Heavy(HClass)
  var Tdoll = makeTdoll_Heavy(MwH, AwH, RwH, PwH, starNum)
  // Add list
  global_list = global_list.substring(0, global_list.length - 16)
  global_list += '<tr>'
  global_list += '<td><span style="color:darkorange"><b>'
  global_list += (listNum + '')
  global_list += '</b></span></td>'
  global_list += '<td>'
  global_list += (MwH + ' ')
  global_list += (AwH + ' ')
  global_list += (RwH + ' ')
  global_list += (PwH + ' ')
  global_list += ('Rank' + HClass)
  global_list += '</td>'
  global_list += '<td>'
  global_5list = global_5list.substring(0, global_5list.length - 16)
  global_5list += '<tr>'
  if (starNum === 5) {
    global_5list += '<td><span style="color:darkorange"><b>'
    global_5list += (listNum + '')
    global_5list += '</b></span></td>'
    global_5list += '<td>'
    global_5list += (MwH + ' ')
    global_5list += (AwH + ' ')
    global_5list += (RwH + ' ')
    global_5list += (PwH + ' ')
    global_5list += ('Rank' + HClass)
    global_5list += '</td>'
    global_5list += '<td><span style="color:darkorange">'
    global_5list += Tdoll
    global_5list += '</span></td>'
    global_list += '<span style="color:darkorange">'
    global_list += Tdoll
    global_list += '</span>'
  } else if (starNum === 4) {
    global_list += '<span style="color:chartreuse">'
    global_list += Tdoll
    global_list += '</span>'
  } else {
    global_list += '<span style="color:dodgerblue">'
    global_list += Tdoll
    global_list += '</span>'
  }
  global_list += '</td></tr>'
  global_list += '</tbody></table>'
  global_5list += '</tr></tbody></table>'
  tabSum = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>总建造数</th><th>五星人形获取数</th><th>五星人形获取率</th><th>评价</th></tr></thead><tbody>'
  tabSum += '<tr>'
  var RateNormal
  if (listNum === listNumH) RateNormal = -1; // Not normal-produce
  else RateNormal = Math.ceil(100 * fiveStarNum / (listNum - listNumH))
  var RateHeavy
  if (listNumH === 0) RateHeavy = -1; // Not heavy-produce
  else RateHeavy = Math.ceil(100 * fiveStarNumH / listNumH)
  tabSum += '<td>'
  tabSum += (listNum + '')
  tabSum += '</td>'
  tabSum += '<td>'
  tabSum += (fiveStarNum + ' + ')
  tabSum += (fiveStarNumH + '')
  tabSum += '</td>'
  tabSum += '<td>'
  if (RateNormal < 0) tabSum += '-'
  else tabSum += (RateNormal + '%')
  tabSum += ' / '
  if (RateHeavy < 0) tabSum += '-'
  else tabSum += (RateHeavy + '%')
  tabSum += '</td>'
  tabSum += '<td>'
  if ((RateNormal < 0 || RateNormal > 10) && (RateHeavy < 0 || RateHeavy > 30)) {
    tabSum += '<span style="color:darkorange"><b>欧皇</b></span>'
  } else if ((RateNormal <= 2 && RateNormal >= 0) && (RateHeavy < 0 || (RateHeavy <= 10 && RateHeavy >= 0))) {
    tabSum += '<span style="color:darkseagreen"><b>非酋</b></span>'
  } else {
    tabSum += '<span style="color:dodgerblue"><b>亚洲人</b></span>'
  }
  tabSum += '</td></tr>'
  tabSum += '</tbody></table>'
  tabReso = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>人力消耗</th><th>弹药消耗</th><th>口粮消耗</th><th>零件消耗</th><th>人形契约消耗</th><th>装备契约消耗</th><th>核心消耗</th></tr></thead><tbody><tr>'
  tabReso += '<td>'
  tabReso += (allM + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allA + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allR + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allP + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allCon + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allConE + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allCore + '')
  tabReso += '</td>'
  tabReso += '</tr></tbody></table>'
  var switchA = document.getElementById('showAllSwitch')
  if (switchA.checked === true) {
    chart.innerHTML = global_list
  } else {
    chart.innerHTML = global_5list
  }
  sumchart.innerHTML = tabSum
  resochart.innerHTML = tabReso
}

function addListE () { // Add Normal-produce-equip info
  listNumE++
  var chart = document.getElementById('rankingChartE')
  var sumchart = document.getElementById('sumChartE')
  var resochart = document.getElementById('resoChart')
  var tabSum = sumchart.innerHTML
  var tabReso = resochart.innerHTML
  var MwId = document.getElementById('MwE')
  var Mw = parseInt(MwId.value)
  allM += Mw
  var AwId = document.getElementById('AwE')
  var Aw = parseInt(AwId.value)
  allA += Aw
  var RwId = document.getElementById('RwE')
  var Rw = parseInt(RwId.value)
  allR += Rw
  var PwId = document.getElementById('PwE')
  var Pw = parseInt(PwId.value)
  allP += Pw
  allConE++
  var starNum = makeStarE()
  var Equip = makeEquip(Mw, Aw, Rw, Pw, starNum)
  // add List
  global_listE = global_listE.substring(0, global_listE.length - 16)
  global_listE += '<tr>'
  global_listE += '<td>'
  global_listE += (listNumE + '')
  global_listE += '</td>'
  global_listE += '<td>'
  global_listE += (Mw + ' ')
  global_listE += (Aw + ' ')
  global_listE += (Rw + ' ')
  global_listE += (Pw + ' ')
  global_listE += '</td>'
  global_listE += '<td>'
  global_5listE = global_5listE.substring(0, global_5listE.length - 16)
  global_5listE += '<tr>'
  if (starNum === 5) {
    global_5listE += '<td>'
    global_5listE += (listNumE + '')
    global_5listE += '</td>'
    global_5listE += '<td>'
    global_5listE += (Mw + ' ')
    global_5listE += (Aw + ' ')
    global_5listE += (Rw + ' ')
    global_5listE += (Pw + ' ')
    global_5listE += '</td>'
    global_5listE += '<td><span style="color:darkorange">'
    global_5listE += Equip
    global_5listE += '</span></td>'
    global_listE += '<span style="color:darkorange">'
    global_listE += Equip
    global_listE += '</span>'
  } else if (starNum === 4) {
    global_listE += '<span style="color:chartreuse">'
    global_listE += Equip
    global_listE += '</span>'
  } else if (starNum === 3) {
    global_listE += '<span style="color:dodgerblue">'
    global_listE += Equip
    global_listE += '</span>'
  } else {
    global_listE += '<span style="color:darkseagreen">'
    global_listE += Equip
    global_listE += '</span>'
  }
  global_listE += '</td></tr>'
  global_listE += '</tbody></table>'
  global_5listE += '</tr></tbody></table>'
  tabSum = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>总建造数</th><th>五星装备/妖精获取数</th><th>获取率</th><th>评价</th></tr></thead><tbody>'
  tabSum += '<tr>'
  var RateNormal
  if (listNumE === listNumEH) RateNormal = -1; // Not normal-produce
  else RateNormal = Math.ceil(100 * fiveStarNumE / (listNumE - listNumEH))
  var RateHeavy
  if (listNumEH === 0) RateHeavy = -1; // Not heavy-produce
  else RateHeavy = Math.ceil(100 * fiveStarNumEH / listNumEH)
  var RateFairy
  if (listNumEH === 0) RateFairy = -1; // Not heavy-produce
  else RateFairy = Math.ceil(100 * fairyNum / listNumEH)
  tabSum += '<td>'
  tabSum += (listNumE + '')
  tabSum += '</td>'
  tabSum += '<td>'
  tabSum += (fiveStarNumE + ' + ')
  tabSum += (fiveStarNumEH + ' / ')
  tabSum += (fairyNum + ' + ')
  tabSum += '</td>'
  tabSum += '<td>'
  if (RateNormal < 0) tabSum += '-'
  else tabSum += (RateNormal + '%')
  tabSum += ' / '
  if (RateHeavy < 0) tabSum += '-'
  else tabSum += (RateHeavy + '%')
  tabSum += ' / '
  if (RateFairy < 0) tabSum += '-'
  else tabSum += (RateFairy + '%')
  tabSum += '</td>'
  tabSum += '<td>'
  if ((RateNormal < 0 || RateNormal > 10) && (RateHeavy < 0 || RateHeavy > 30) && (RateFairy < 0 || RateFairy > 50)) {
    tabSum += '<span style="color:darkorange"><b>欧皇</b></span>'
  } else if ((RateNormal <= 4 && RateNormal >= 0) && (RateHeavy < 0 || (RateHeavy <= 7 && RateHeavy >= 0)) && (RateFairy < 0 || (RateFairy <= 15 && RateHeavy >= 0))) {
    tabSum += '<span style="color:darkseagreen"><b>非酋</b></span>'
  } else {
    tabSum += '<span style="color:dodgerblue"><b>亚洲人</b></span>'
  }
  tabSum += '</td></tr>'
  tabSum += '</tbody></table>'
  tabReso = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>人力消耗</th><th>弹药消耗</th><th>口粮消耗</th><th>零件消耗</th><th>人形契约消耗</th><th>装备契约消耗</th><th>核心消耗</th></tr></thead><tbody><tr>'
  tabReso += '<td>'
  tabReso += (allM + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allA + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allR + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allP + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allCon + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allConE + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allCore + '')
  tabReso += '</td>'
  tabReso += '</tr></tbody></table>'
  var switchA = document.getElementById('showAllSwitchE')
  var switchF = document.getElementById('showFairy')
  if (switchA.checked === true) {
    chart.innerHTML = global_listE
  } else if (switchF.checked === true) {
    chart.innerHTML = global_fairylist
  } else {
    chart.innerHTML = global_5listE
  }
  sumchart.innerHTML = tabSum
  resochart.innerHTML = tabReso
}

function addListEH () { // Add Heavy-produce-equip info
  listNumE++
  listNumEH++
  var chart = document.getElementById('rankingChartE')
  var sumchart = document.getElementById('sumChartE')
  var resochart = document.getElementById('resoChart')
  var tabSum = sumchart.innerHTML
  var tabReso = resochart.innerHTML
  var EHClassId = document.getElementById('EHClass')
  var EHClass = parseInt(EHClassId.value)
  var MwId = document.getElementById('MwEH')
  var Mw = parseInt(MwId.value)
  allM += Mw
  var AwId = document.getElementById('AwEH')
  var Aw = parseInt(AwId.value)
  allA += Aw
  var RwId = document.getElementById('RwEH')
  var Rw = parseInt(RwId.value)
  allR += Rw
  var PwId = document.getElementById('PwEH')
  var Pw = parseInt(PwId.value)
  allP += Pw
  if (EHClass === 1) {
    allConE += 1
    allCore += 2
  } else if (EHClass === 2) {
    allConE += 20
    allCore += 4
  } else {
    allConE += 50
    allCore += 6
  }
  var starNum = makeStar_HeavyE(EHClass)
  var Equip = makeEquipH(Mw, Aw, Rw, Pw, starNum)
  // add List
  global_listE = global_listE.substring(0, global_listE.length - 16)
  global_listE += '<tr>'
  global_listE += '<td>'
  global_listE += (listNumE + '')
  global_listE += '</td>'
  global_listE += '<td>'
  global_listE += (Mw + ' ')
  global_listE += (Aw + ' ')
  global_listE += (Rw + ' ')
  global_listE += (Pw + ' ')
  global_listE += ('Rank' + EHClass)
  global_listE += '</td>'
  global_listE += '<td>'
  global_5listE = global_5listE.substring(0, global_5listE.length - 16)
  global_5listE += '<tr>'
  global_fairylist = global_fairylist.substring(0, global_fairylist.length - 16)
  global_fairylist += '<tr>'
  if (starNum === 6) {
    global_fairylist += '<td>'
    global_fairylist += (listNumE + '')
    global_fairylist += '</td>'
    global_fairylist += '<td>'
    global_fairylist += (Mw + ' ')
    global_fairylist += (Aw + ' ')
    global_fairylist += (Rw + ' ')
    global_fairylist += (Pw + ' ')
    global_fairylist += ('Rank' + EHClass)
    global_fairylist += '</td>'
    var fairyName = Equip.substring(5, 6)
    if (fairyName === '战') {
      global_fairylist += '<td><span style="color:red">'
      global_fairylist += Equip
      global_fairylist += '</span></td>'
      global_listE += '<span style="color:red">'
      global_listE += Equip
      global_listE += '</span>'
    } else {
      global_fairylist += '<td><span style="color:cornflowerblue">'
      global_fairylist += Equip
      global_fairylist += '</span></td>'
      global_listE += '<span style="color:cornflowerblue">'
      global_listE += Equip
      global_listE += '</span>'
    }
  } else if (starNum === 5) {
    global_5listE += '<td>'
    global_5listE += (listNumE + '')
    global_5listE += '</td>'
    global_5listE += '<td>'
    global_5listE += (Mw + ' ')
    global_5listE += (Aw + ' ')
    global_5listE += (Rw + ' ')
    global_5listE += (Pw + ' ')
    global_5listE += ('Rank' + EHClass)
    global_5listE += '</td>'
    global_5listE += '<td><span style="color:darkorange">'
    global_5listE += Equip
    global_5listE += '</span></td>'
    global_listE += '<span style="color:darkorange">'
    global_listE += Equip
    global_listE += '</span>'
  } else if (starNum === 4) {
    global_listE += '<span style="color:chartreuse">'
    global_listE += Equip
    global_listE += '</span>'
  } else if (starNum === 3) {
    global_listE += '<span style="color:dodgerblue">'
    global_listE += Equip
    global_listE += '</span>'
  } else {
    global_listE += '<span style="color:darkseagreen">'
    global_listE += Equip
    global_listE += '</span>'
  }
  global_listE += '</td></tr>'
  global_listE += '</tbody></table>'
  global_5listE += '</tr></tbody></table>'
  global_fairylist += '</tr></tbody></table>'
  tabSum = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>总建造数</th><th>五星装备/妖精获取数</th><th>获取率</th><th>评价</th></tr></thead><tbody>'
  tabSum += '<tr>'
  var RateNormal
  if (listNumE === listNumEH) RateNormal = -1; // Not normal-produce
  else RateNormal = Math.ceil(100 * fiveStarNumE / (listNumE - listNumEH))
  var RateHeavy
  if (listNumEH === 0) RateHeavy = -1; // Not heavy-produce
  else RateHeavy = Math.ceil(100 * fiveStarNumEH / listNumEH)
  var RateFairy
  if (listNumEH === 0) RateFairy = -1; // Not heavy-produce
  else RateFairy = Math.ceil(100 * fairyNum / listNumEH)
  tabSum += '<td>'
  tabSum += (listNumE + '')
  tabSum += '</td>'
  tabSum += '<td>'
  tabSum += (fiveStarNumE + ' + ')
  tabSum += (fiveStarNumEH + ' / ')
  tabSum += (fairyNum + '')
  tabSum += '</td>'
  tabSum += '<td>'
  if (RateNormal < 0) tabSum += '-'
  else tabSum += (RateNormal + '%')
  tabSum += ' / '
  if (RateHeavy < 0) tabSum += '-'
  else tabSum += (RateHeavy + '%')
  tabSum += ' / '
  if (RateFairy < 0) tabSum += '-'
  else tabSum += (RateFairy + '%')
  tabSum += '</td>'
  tabSum += '<td>'
  if ((RateNormal < 0 || RateNormal > 10) && (RateHeavy < 0 || RateHeavy > 30) && (RateFairy < 0 || RateFairy > 50)) {
    tabSum += '<span style="color:darkorange"><b>欧皇</b></span>'
  } else if ((RateNormal <= 4 && RateNormal >= 0) && (RateHeavy < 0 || (RateHeavy <= 7 && RateHeavy >= 0)) && (RateFairy < 0 || (RateFairy <= 15 && RateHeavy >= 0))) {
    tabSum += '<span style="color:darkseagreen"><b>非酋</b></span>'
  } else {
    tabSum += '<span style="color:dodgerblue"><b>亚洲人</b></span>'
  }
  tabSum += '</td></tr>'
  tabSum += '</tbody></table>'
  tabReso = '<table class="table table-striped table-bordered table-hover"><thead><tr><th>人力消耗</th><th>弹药消耗</th><th>口粮消耗</th><th>零件消耗</th><th>人形契约消耗</th><th>装备契约消耗</th><th>核心消耗</th></tr></thead><tbody><tr>'
  tabReso += '<td>'
  tabReso += (allM + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allA + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allR + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allP + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allCon + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allConE + '')
  tabReso += '</td>'
  tabReso += '<td>'
  tabReso += (allCore + '')
  tabReso += '</td>'
  tabReso += '</tr></tbody></table>'
  var switchA = document.getElementById('showAllSwitchE')
  var switchF = document.getElementById('showFairy')
  if (switchA.checked === true) {
    chart.innerHTML = global_listE
  } else if (switchF.checked === true) {
    chart.innerHTML = global_fairylist
  } else {
    chart.innerHTML = global_5listE
  }
  sumchart.innerHTML = tabSum
  resochart.innerHTML = tabReso
}

function showAll () { // Show all results
  var chart = document.getElementById('rankingChart')
  chart.innerHTML = global_list
}

function showFive () { // Show 5-star results
  var chart = document.getElementById('rankingChart')
  chart.innerHTML = global_5list
}

function showAllE () { // Show all-equip results
  var chart = document.getElementById('rankingChartE')
  chart.innerHTML = global_listE
}

function showFiveE () { // Show 5-star-equip results
  var chart = document.getElementById('rankingChartE')
  chart.innerHTML = global_5listE
}

function showFairy () { // Show fairy results
  var chart = document.getElementById('rankingChartE')
  chart.innerHTML = global_fairylist
}

function addListMulti () {
  var panelT = document.getElementById('panelT')
  var panelE = document.getElementById('panelE')
  var resultT = document.getElementById('TdollResult')
  var resultE = document.getElementById('EquipmentResult')
  panelT.className = 'active'
  panelE.className = ''
  resultT.className = 'tab-pane fade in active'
  resultE.className = 'tab-pane fade'
  var NTimes = document.getElementById('NTimes')
  var times = parseInt(NTimes.value)
  for (var i = 0; i < times; i++) {
    if (checkResource(1)) {
      addList()
    }
  }
}

function addListHMulti () {
  var panelT = document.getElementById('panelT')
  var panelE = document.getElementById('panelE')
  var resultT = document.getElementById('TdollResult')
  var resultE = document.getElementById('EquipmentResult')
  panelT.className = 'active'
  panelE.className = ''
  resultT.className = 'tab-pane fade in active'
  resultE.className = 'tab-pane fade'
  var NTimesH = document.getElementById('NTimesH')
  var timesH = parseInt(NTimesH.value)
  for (var i = 0; i < timesH; i++) {
    if (checkResource(2)) {
      addListH()
    }
  }
}

function addListEMulti () {
  var panelT = document.getElementById('panelT')
  var panelE = document.getElementById('panelE')
  var resultT = document.getElementById('TdollResult')
  var resultE = document.getElementById('EquipmentResult')
  panelT.className = ''
  panelE.className = 'active'
  resultT.className = 'tab-pane fade'
  resultE.className = 'tab-pane fade in active'
  var NTimes = document.getElementById('NTimesE')
  var times = parseInt(NTimes.value)
  for (var i = 0; i < times; i++) {
    if (checkResource(3)) {
      addListE()
    }
  }
}

function addListEHMulti () {
  var panelT = document.getElementById('panelT')
  var panelE = document.getElementById('panelE')
  var resultT = document.getElementById('TdollResult')
  var resultE = document.getElementById('EquipmentResult')
  panelT.className = ''
  panelE.className = 'active'
  resultT.className = 'tab-pane fade'
  resultE.className = 'tab-pane fade in active'
  var NTimesH = document.getElementById('NTimesEH')
  var timesH = parseInt(NTimesH.value)
  for (var i = 0; i < timesH; i++) {
    if (checkResource(4)) {
      addListEH()
    }
  }
}
