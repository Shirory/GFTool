var globaltime = [0, 0, 0, 0]; // global timer, for test and all result counting
var switch_clear = false, switch_maxall = false
var filter_switch = false
var topologySet = [], solutionSet = [], topologyNum = 0
var topology_noresult = [56041, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var buffer_topo = [], buffer_solu = [], buffer_num = 10 // for buffer result for ranking
var topologyLib_BGM_1 = [], topologyLib_BGM_2 = [], topologyLib_AGS = [], topologyLib_2B14 = []
var topologyLibRefer_BGM_1 = [], topologyLibRefer_BGM_2 = [], topologyLibRefer_AGS = [], topologyLibRefer_2B14 = []
var rules = ['InfinityFrost', 'FatalChapters']
var color = 1, block_dmg = 0, block_dbk = 0, block_acu = 0, block_fil = 0, mul_property = 1
var chipNum = 0
var chipRepo_data = [], chipRepo_chart = []; // Chip data; Repository information that display at repository-table
var chipRepo_shape_5 = [], chipRepo_shape_6 = [] // For make shape only
var analyze_switch = 1, ranking_switch = 1; // show_percentage[1=validProperty,-1=validBlocknum] rank_result_by[1~6]
var deleteSelectHTML = ['<option value=0 selected>选择编号</option>']
function creatChip (chipNum, chipColor, chipClass, chipType, chipLevel, blockAcu, blockFil, blockDmg, blockDbk, Den_Level) {
  var chipData = { }
  chipData.chipNum = chipNum // chip number
  chipData.color = chipColor // color
  chipData.classNum = chipClass // 56 or 551
  chipData.typeNum = chipType // shape
  chipData.levelNum = chipLevel // strengthen level
  chipData.bAcu = blockAcu // acuracy block num
  chipData.bFil = blockFil // filling block num
  chipData.bDmg = blockDmg // damage block num
  chipData.bDbk = blockDbk; // defence-breaking block num
  chipData.weight = Den_Level // density*level
  return chipData
}
function creatRepo (chipNum, chipType, chipLevel, Acu, Fil, Dmg, Dbk) {
  var repoData = { }
  repoData.chipNum = chipNum
  repoData.chipType = chipType
  repoData.chipLevel = chipLevel
  repoData.Acu = Acu
  repoData.Fil = Fil
  repoData.Dmg = Dmg
  repoData.Dbk = Dbk
  return repoData
}
function loadScript (url) {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url
  document.body.appendChild(script)
}
window.onload = function () {
  resetPage()
  loadScript('../js/topology.js')
}
function changeRepo (typeInfo) { // 刷新仓库显示，1=添加，2=删除某个，3=清空
  var ChipRepoChartId = document.getElementById('ChipRepoChart')
  var DeleteSelectId = document.getElementById('DeleteSelect')
  switch (typeInfo) {
    case 1:
      chipNum++
      var ChipClass = document.getElementById('ChipClass').value
      var ChipType = document.getElementById('ChipType').value
      var ChipLevel = document.getElementById('ChipLevel').value
      var newChipData = creatChip(chipNum, color, parseInt(ChipClass), parseInt(ChipType), parseInt(ChipLevel), block_acu, block_fil, block_dmg, block_dbk, 1)
      chipRepo_data.push(newChipData)
      repo_addChart(newChipData)
      break
    case 2:
      var deleteNum = parseInt(document.getElementById('DeleteSelect').value)
      for (var i = 0; i < chipNum; i++) {
        if (i + 1 > deleteNum) {
          chipRepo_data[i].chipNum--
          chipRepo_chart[i].chipNum--
        }
      }
      chipRepo_data.splice(deleteNum - 1, 1)
      chipRepo_chart.splice(deleteNum - 1, 1)
      chipNum--
      ChipRepoChartId.innerHTML = '' // CLEAR chart
      deleteSelectHTML = ['<option value=0 selected>选择编号</option>']
      for (var i = 0; i < chipNum; i++) {
        var ChartAdd = ''
        var colorName
        if (chipRepo_data[i].color === 1) colorName = 'b'
        else colorName = 'o'
        var htmlString = '<img src="../img/chip/' + colorName + '_' + chipRepo_data[i].classNum + '-' + chipRepo_data[i].typeNum + '.png">'
        ChartAdd += '<tr>'
        ChartAdd += '<td>' + chipRepo_chart[i].chipNum + '</td>'
        ChartAdd += '<td>' + htmlString + ' ' + chipRepo_chart[i].chipType + '</td>'
        ChartAdd += '<td>' + chipRepo_chart[i].chipLevel + '</td>'
        ChartAdd += '<td>' + chipRepo_chart[i].Acu + '</td>'
        ChartAdd += '<td>' + chipRepo_chart[i].Fil + '</td>'
        ChartAdd += '<td>' + chipRepo_chart[i].Dmg + '</td>'
        ChartAdd += '<td>' + chipRepo_chart[i].Dbk + '</td>'
        ChartAdd += '</tr>'
        ChipRepoChartId.innerHTML += ChartAdd
        deleteSelectHTML.push(('<option value=' + chipRepo_chart[i].chipNum) + ('>' + chipRepo_chart[i].chipNum) + '</option>')
      }
      var selectText = ''
      for (var i = 0; i < deleteSelectHTML.length; i++) selectText += deleteSelectHTML[i]
      DeleteSelectId.innerHTML = selectText
      document.getElementById('deleteChipButton').disabled = true
      break
    case 3:
      if (switch_clear === false) {
        switch_clear = true
        document.getElementById('alert_clear').innerHTML = ' * 再按一次确认清空芯片仓库'
      } else {
        switch_clear = false
        document.getElementById('alert_clear').innerHTML = ''
        chipRepo_data = []
        chipRepo_chart = []
        chipNum = 0
        ChipRepoChartId.innerHTML = '' // CLEAR chart
        deleteSelectHTML = ['<option value=0 selected>选择编号</option>']
        DeleteSelectId.innerHTML = deleteSelectHTML[0]
        break
      }
  }
  if (chipNum > 0) {
    document.getElementById('SaveButton').disabled = false
    document.getElementById('clearChipButton').disabled = false
    document.getElementById('maxAllButton').disabled = false
  } else {
    document.getElementById('SaveButton').disabled = true
    document.getElementById('deleteChipButton').disabled = true
    document.getElementById('clearChipButton').disabled = true
    document.getElementById('maxAllButton').disabled = true
  }
}
function maxAllChip () {
  if (switch_maxall === false) {
    switch_maxall = true
    document.getElementById('alert_maxall').innerHTML = ' * 再按一次确认全部满强化'
  } else {
    switch_maxall = false
    document.getElementById('alert_maxall').innerHTML = ''
    var ChipRepoChartId = document.getElementById('ChipRepoChart')
    ChipRepoChartId.innerHTML = ''
    for (var c = 0; c < chipNum; c++) {
      if (chipRepo_data[c].levelNum < 20) {
        chipRepo_data[c].levelNum = 20
        chipRepo_chart[c].chipLevel = '+20'
        chipRepo_chart[c].Acu = Math.ceil(2.5 * Math.ceil(chipRepo_data[c].bAcu * 7.1))
        chipRepo_chart[c].Fil = Math.ceil(2.5 * Math.ceil(chipRepo_data[c].bFil * 5.7))
        chipRepo_chart[c].Dmg = Math.ceil(2.5 * Math.ceil(chipRepo_data[c].bDmg * 4.4))
        chipRepo_chart[c].Dbk = Math.ceil(2.5 * Math.ceil(chipRepo_data[c].bDbk * 12.7))
      }
    }
    for (var c = 0; c < chipNum; c++) {
      var colorName
      if (chipRepo_data[c].color === 1) colorName = 'b'
      else colorName = 'o'
      var htmlString = '<img src="../img/chip/' + colorName + '_' + chipRepo_data[c].classNum + '-' + chipRepo_data[c].typeNum + '.png">'
      var ChartAdd = ''
      ChartAdd += '<tr>'
      ChartAdd += '<td>' + chipRepo_chart[c].chipNum + '</td>'
      ChartAdd += '<td>' + htmlString + ' ' + chipRepo_chart[c].chipType + '</td>'
      ChartAdd += '<td>' + chipRepo_chart[c].chipLevel + '</td>'
      ChartAdd += '<td>' + chipRepo_chart[c].Acu + '</td>'
      ChartAdd += '<td>' + chipRepo_chart[c].Fil + '</td>'
      ChartAdd += '<td>' + chipRepo_chart[c].Dmg + '</td>'
      ChartAdd += '<td>' + chipRepo_chart[c].Dbk + '</td>'
      ChartAdd += '</tr>'
      ChipRepoChartId.innerHTML += ChartAdd
    }
  }
}
function getSaveCode () { // 获取存储码
  var SaveAlertId = document.getElementById('SaveAlert')
  var code = '[' + rules[0].substr(chipNum - 13 * parseInt(chipNum / 13), 1) + '!'
  for (var i = 0; i < chipRepo_data.length; i++) {
    code += (chipRepo_data[i].chipNum + ',')
    code += (chipRepo_data[i].color + ',')
    code += (chipRepo_data[i].classNum + ',')
    code += (chipRepo_data[i].typeNum + ',')
    code += (chipRepo_data[i].levelNum + ',')
    code += (chipRepo_data[i].bAcu + ',')
    code += (chipRepo_data[i].bFil + ',')
    code += (chipRepo_data[i].bDmg + ',')
    code += (chipRepo_data[i].bDbk + ',')
    code += (chipRepo_data[i].weight + '&')
  }
  code += '?' + rules[1].substr(chipNum - 13 * parseInt(chipNum / 13), 1) + ']'
  var SaveCodeId = document.getElementById('SaveCode')
  SaveCodeId.value = code
  SaveCodeId.select()
  document.execCommand('Copy')
  SaveAlertId.innerHTML = '<span style="color:#FF0066">&nbsp&nbsp* 存储码已复制到剪贴板</span>'
}
function repo_addChart (chipData) {
  // Add chipRepo_chart
  var stren_parameter = 1
  if (chipData.levelNum <= 10) stren_parameter = 1 + 0.08 * chipData.levelNum
  else stren_parameter = 1.8 + 0.07 * (chipData.levelNum - 10)
  var Repo_Acu = Math.ceil(stren_parameter * Math.ceil(chipData.bAcu * 7.1))
  var Repo_Fil = Math.ceil(stren_parameter * Math.ceil(chipData.bFil * 5.7))
  var Repo_Dmg = Math.ceil(stren_parameter * Math.ceil(chipData.bDmg * 4.4))
  var Repo_Dbk = Math.ceil(stren_parameter * Math.ceil(chipData.bDbk * 12.7))
  var Repo_Type = ''
  if (chipData.classNum === 56) {
    Repo_Type += '六格 '
    if (chipData.typeNum === 1) Repo_Type += '形状1'
    else if (chipData.typeNum === 2) Repo_Type += '形状2'
    else if (chipData.typeNum === 3) Repo_Type += '形状3'
    else if (chipData.typeNum === 41) Repo_Type += '形状4a'
    else if (chipData.typeNum === 42) Repo_Type += '形状4b'
    else if (chipData.typeNum === 5) Repo_Type += '形状5'
    else if (chipData.typeNum === 6) Repo_Type += '形状6'
    else if (chipData.typeNum === 7) Repo_Type += '形状7'
    else if (chipData.typeNum === 8) Repo_Type += '形状8'
    else if (chipData.typeNum === 9) Repo_Type += '形状9'
  }
  else if (chipData.classNum === 551) {
    Repo_Type += '五格 '
    if (chipData.typeNum === 11) Repo_Type += '形状Fa'
    else if (chipData.typeNum === 12) Repo_Type += '形状Fb'
    else if (chipData.typeNum === 21) Repo_Type += '形状Na'
    else if (chipData.typeNum === 22) Repo_Type += '形状Nb'
    else if (chipData.typeNum === 31) Repo_Type += '形状Ya'
    else if (chipData.typeNum === 32) Repo_Type += '形状Yb'
    else if (chipData.typeNum === 4) Repo_Type += '形状T'
    else if (chipData.typeNum === 5) Repo_Type += '形状W'
    else if (chipData.typeNum === 6) Repo_Type += '形状X'
  }
  var newRepo = creatRepo(chipData.chipNum, Repo_Type, '+' + chipData.levelNum, Repo_Acu, Repo_Fil, Repo_Dmg, Repo_Dbk)
  chipRepo_chart.push(newRepo)
  // Add chart entry
  var ChipRepoChartId = document.getElementById('ChipRepoChart')
  var DeleteSelectId = document.getElementById('DeleteSelect')
  var colorName = 'b'
  if (chipData.color === 2) colorName = 'o'
  var htmlString = '<img src="../img/chip/' + colorName + '_' + chipData.classNum + '-' + chipData.typeNum + '.png">'
  var ChartAdd = ''
  ChartAdd += '<tr>'
  ChartAdd += '<td>' + chipData.chipNum + '</td>'
  ChartAdd += '<td>' + htmlString + ' ' + newRepo.chipType + '</td>'
  ChartAdd += '<td>' + newRepo.chipLevel + '</td>'
  ChartAdd += '<td>' + newRepo.Acu + '</td>'
  ChartAdd += '<td>' + newRepo.Fil + '</td>'
  ChartAdd += '<td>' + newRepo.Dmg + '</td>'
  ChartAdd += '<td>' + newRepo.Dbk + '</td>'
  ChartAdd += '</tr>'
  ChipRepoChartId.innerHTML += ChartAdd
  // Add delete-chip-selection
  deleteSelectHTML.push(('<option value=' + chipNum) + ('>' + chipNum) + '</option>')
  var selectText = ''
  for (var i = 0; i < deleteSelectHTML.length; i++) selectText += deleteSelectHTML[i]
  DeleteSelectId.innerHTML = selectText
  if (chipNum > 0) {
    document.getElementById('SaveButton').disabled = false
    document.getElementById('clearChipButton').disabled = false
    document.getElementById('maxAllButton').disabled = false
  } else {
    document.getElementById('SaveButton').disabled = true
    document.getElementById('deleteChipButton').disabled = true
    document.getElementById('clearChipButton').disabled = true
    document.getElementById('maxAllButton').disabled = true
  }
}
function simpleCheck (LoadCode) { // 简单检查存储码
  if (LoadCode[0] != '[' || LoadCode[LoadCode.length - 1] != ']') return false
  var rule1 = LoadCode[1], rule2 = LoadCode[LoadCode.length - 2]
  var posi1 = [], posi2 = []
  for (var i = 0; i < 13; i++) {
    if (rules[0][i] === rule1) posi1.push(i)
    if (rules[1][i] === rule2) posi2.push(i)
  }
  for (var i = 0; i < posi1.length; i++) {
    for (var j = 0; j < posi2.length; j++) {
      if (posi1[i] === posi2[j]) return true
    }
  }
  return false
}
function setValue (elementNum, tempStr) { // get value from savecode
  if (elementNum === 0) return parseInt(tempStr)
  else if (elementNum === 1) return parseInt(tempStr)
  else if (elementNum === 2) return parseInt(tempStr)
  else if (elementNum === 3) return parseInt(tempStr)
  else if (elementNum === 4) return parseInt(tempStr)
  else if (elementNum === 5) return parseInt(tempStr)
  else if (elementNum === 6) return parseInt(tempStr)
  else if (elementNum === 7) return parseInt(tempStr)
  else if (elementNum === 8) return parseInt(tempStr)
}
function loadSaveCode () { // load save
  chipRepo_chart = [], chipRepo_data = [] // reset repository
  var LoadCode = document.getElementById('LoadCode').value
  var LoadAlertId = document.getElementById('LoadAlert')
  if (simpleCheck(LoadCode)) {
    document.getElementById('ChipRepoChart').innerHTML = ''
    chipRepo_chart = []; chipRepo_data = []; deleteSelectHTML = ['<option value=0 selected>选择编号</option>']
    resetPage()
    var scan = 3, elementNum = 0, tempStr = ''
    var chipEntry = []
    while (LoadCode[scan] != '?') { // '?' means end of code
      if (LoadCode[scan] === ',') {
        chipEntry.push(setValue(elementNum, tempStr))
        elementNum++
        tempStr = ''
      } else if (LoadCode[scan] === '&') { // '&' means next
        chipRepo_data.push(creatChip(chipEntry[0], chipEntry[1], chipEntry[2], chipEntry[3], chipEntry[4], chipEntry[5], chipEntry[6], chipEntry[7], chipEntry[8], 1))
        chipNum++
        elementNum = 0
        tempStr = ''
        repo_addChart(chipRepo_data[chipRepo_data.length - 1])
        chipEntry = []
      } else tempStr += LoadCode[scan]
      scan++
    }
    LoadAlertId.innerHTML = ''
    document.getElementById('SaveAlert').innerHTML = ''
    document.getElementById('panelS').className = 'active'
    document.getElementById('panelSL').className = ''
    document.getElementById('ChipSetting').className = 'tab-pane fade in active'
    document.getElementById('SaveLoad').className = 'tab-pane fade'
  } else {
    LoadAlertId.innerHTML = '<span style="color:#FF0066">&nbsp&nbsp* 不正确的存储码</span>'
  }
}
function manageDeleteButton () {
  var DeleteSelectId = document.getElementById('DeleteSelect')
  if (parseInt(DeleteSelectId.value) > 0) document.getElementById('deleteChipButton').disabled = false
  else document.getElementById('deleteChipButton').disabled = true
}
function addBlock (typeInfo) { // 增加格数
  if (typeInfo === 1) block_dmg++
  else if (typeInfo === 2) block_dbk++
  else if (typeInfo === 3) block_acu++
  else if (typeInfo === 4) block_fil++
  refreshPreview()
  manageButton()
}
function subBlock (typeInfo) { // 减少格数
  if (typeInfo === 1) block_dmg--
  else if (typeInfo === 2) block_dbk--
  else if (typeInfo === 3) block_acu--
  else if (typeInfo === 4) block_fil--
  refreshPreview()
  manageButton()
}
function changeProperty (command) { // for change color/chipClass/chipShape
  if (command === 'color_b') { // color=blue
    color = 1
  } else if (command === 'color_o') { // color=orange
    color = 2
  } else if (command === 'class') { // chipClass, 56=block_6, 551=block_5_type1
    var seleId = document.getElementById('ChipType')
    var chipClass = parseInt((document.getElementById('ChipClass')).value)
    if (chipClass === 56) {
      seleId.innerHTML = '<option value=9 selected>9</option><option value=8>8</option><option value=7>7</option><option value=6>6</option><option value=5>5</option><option value=42>4-b</option><option value=41>4-a</option><option value=3>3</option><option value=2>2</option><option value=1>1</option>'
      document.getElementById('SampleImg').innerHTML = '<img src="../img/chipcal_56.png">'
    } else if (chipClass === 551) {
      seleId.innerHTML = '<option value=11 selected>F-a</option><option value=12>F-b</option><option value=21>N-a</option><option value=22>N-b</option><option value=31>Y-a</option><option value=32>Y-b</option><option value=4>T</option><option value=5>W</option><option value=6>X</option>'
      document.getElementById('SampleImg').innerHTML = '<img src="../img/chipcal_551.png">'
    }
    resetBlock()
  } else if (command === 'level') {
    var level = parseInt((document.getElementById('ChipLevel')).value)
    if (level <= 10) mul_property = 1 + 0.08 * level
    else mul_property = 1.8 + 0.07 * (level - 10)
  }
  refreshPreview()
  manageButton()
}
function refreshPreview () {
  var colorName
  if (color === 1) colorName = 'b'
  else colorName = 'o'
  var ChipClass = (document.getElementById('ChipClass')).value
  var ChipType = (document.getElementById('ChipType')).value
  document.getElementById('PreviewImg').src = '../img/chip/' + colorName + '_' + ChipClass + '-' + ChipType + '.png'
  var PreviewLevelId = document.getElementById('PreviewLevel')
  var LevelId = document.getElementById('ChipLevel')
  var LevelIdx = LevelId.selectedIndex
  PreviewLevelId.innerHTML = LevelId[LevelIdx].text
  var PreviewTypeId = document.getElementById('PreviewType')
  var ClassId = document.getElementById('ChipClass')
  var ClassIdx = ClassId.selectedIndex
  var ClassName = ClassId[ClassIdx].text
  var TypeId = document.getElementById('ChipType')
  var TypeIdx = TypeId.selectedIndex
  var TypeName = TypeId[TypeIdx].text
  PreviewTypeId.innerHTML = ClassName + ' - 类型' + TypeName
  document.getElementById('Dmg').innerHTML = '<img src="../img/icon-dmg.png"> ' + Math.ceil(mul_property * Math.ceil(block_dmg * 4.4))
  document.getElementById('Dbk').innerHTML = '<img src="../img/icon-dbk.png"> ' + Math.ceil(mul_property * Math.ceil(block_dbk * 12.7))
  document.getElementById('Acu').innerHTML = '<img src="../img/icon-acu.png"> ' + Math.ceil(mul_property * Math.ceil(block_acu * 7.1))
  document.getElementById('Fil').innerHTML = '<img src="../img/icon-fil.png"> ' + Math.ceil(mul_property * Math.ceil(block_fil * 5.7))
  document.getElementById('AdTx1').innerHTML = block_dmg
  document.getElementById('AdTx2').innerHTML = block_dbk
  document.getElementById('AdTx3').innerHTML = block_acu
  document.getElementById('AdTx4').innerHTML = block_fil
  manageButton()
}
function resetPage () {
  mul_property = 1
  document.getElementById('CSwitch1').checked = true
  document.getElementById('ChipLevel').value = 0
  refreshPreview()
  resetBlock()
}
function resetBlock () {
  block_dmg = 0, block_dbk = 0, block_acu = 0, block_fil = 0
  refreshPreview()
  manageButton()
}
function manageButton () {
  var AdBt1 = document.getElementById('AdBt1')
  var AdBt2 = document.getElementById('AdBt2')
  var AdBt3 = document.getElementById('AdBt3')
  var AdBt4 = document.getElementById('AdBt4')
  var SbBt1 = document.getElementById('SbBt1')
  var SbBt2 = document.getElementById('SbBt2')
  var SbBt3 = document.getElementById('SbBt3')
  var SbBt4 = document.getElementById('SbBt4')
  var AdBl = document.getElementById('AdBl')
  var SbBl = document.getElementById('SbBl')
  var AdSp = document.getElementById('AdSp')
  var SbSp = document.getElementById('SbSp')
  var AdLv = document.getElementById('AdLv')
  var SbLv = document.getElementById('SbLv')
  AdBt1.disabled = false
  AdBt2.disabled = false
  AdBt3.disabled = false
  AdBt4.disabled = false
  SbBt1.disabled = false
  SbBt2.disabled = false
  SbBt3.disabled = false
  SbBt4.disabled = false
  AdBl.disabled = true
  SbBl.disabled = true
  AdSp.disabled = true
  SbSp.disabled = true
  AdLv.disabled = true
  SbLv.disabled = true
  if (parseInt(document.getElementById('ChipClass').value) === 56) {
    AdBl.disabled = false
    SbBl.disabled = true
    if (parseInt(document.getElementById('ChipType').value) === 1) {
      AdSp.disabled = true
      SbSp.disabled = false
    } else if (parseInt(document.getElementById('ChipType').value) === 9) {
      AdSp.disabled = false
      SbSp.disabled = true
    } else {
      AdSp.disabled = false
      SbSp.disabled = false
    }
  } else {
    AdBl.disabled = true
    SbBl.disabled = false
    if (parseInt(document.getElementById('ChipType').value) === 11) {
      AdSp.disabled = false
      SbSp.disabled = true
    } else if (parseInt(document.getElementById('ChipType').value) === 6) {
      AdSp.disabled = true
      SbSp.disabled = false
    } else {
      AdSp.disabled = false
      SbSp.disabled = false
    }
  }
  if (parseInt(document.getElementById('ChipLevel').value) === 0) {
    AdLv.disabled = false
    SbLv.disabled = true
  } else if (parseInt(document.getElementById('ChipLevel').value) === 20) {
    AdLv.disabled = true
    SbLv.disabled = false
  } else {
    AdLv.disabled = false
    SbLv.disabled = false
  }
  var addChipButtonId = document.getElementById('addChipButton')
  addChipButtonId.disabled = true
  var blockNum = parseInt(((document.getElementById('ChipClass').value) + '').substr(1, 1))
  if (block_dmg + block_dbk + block_acu + block_fil >= blockNum) {
    AdBt1.disabled = true; AdBt2.disabled = true; AdBt3.disabled = true; AdBt4.disabled = true
  } else {
    if (blockNum >= 5) {
      if (block_dmg === blockNum - 1) AdBt1.disabled = true
      if (block_dbk === blockNum - 1) AdBt2.disabled = true
      if (block_acu === blockNum - 1) AdBt3.disabled = true
      if (block_fil === blockNum - 1) AdBt4.disabled = true
    } else {
      if (block_dmg === blockNum) AdBt1.disabled = true
      if (block_dbk === blockNum) AdBt2.disabled = true
      if (block_acu === blockNum) AdBt3.disabled = true
      if (block_fil === blockNum) AdBt4.disabled = true
    }
  }
  if (block_dmg === 0) SbBt1.disabled = true
  if (block_dbk === 0) SbBt2.disabled = true
  if (block_acu === 0) SbBt3.disabled = true
  if (block_fil === 0) SbBt4.disabled = true
  if (block_dmg + block_dbk + block_acu + block_fil === blockNum) addChipButtonId.disabled = false
}
function chartBack (typeInfo) {
  var line1 = document.getElementById('solutionLine1')
  var line2 = document.getElementById('solutionLine2')
  var line3 = document.getElementById('solutionLine3')
  var line4 = document.getElementById('solutionLine4')
  var line5 = document.getElementById('solutionLine5')
  var line6 = document.getElementById('solutionLine6')
  var line7 = document.getElementById('solutionLine7')
  var line8 = document.getElementById('solutionLine8')
  switch (typeInfo) {
    case 1:
      Process_Text_Dmg.innerHTML = '0/190'
      Process_Text_Dbk.innerHTML = '0/329'
      Process_Text_Acu.innerHTML = '0/191'
      Process_Text_Fil.innerHTML = '0/49'
      line1.innerHTML = '<td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td>'
      line2.innerHTML = '<td class="td_black"><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_black">'
      line3.innerHTML = '<td class="td_black"><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_black">'
      line4.innerHTML = '<td class="td_black"><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_black">'
      line5.innerHTML = '<td class="td_black"><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_black">'
      line6.innerHTML = '<td class="td_black"><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_black">'
      line7.innerHTML = '<td class="td_black"><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_blueback"></td><td class="td_black">'
      line8.innerHTML = '<td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td>'
      break
    case 2:
      Process_Text_Dmg.innerHTML = '0/106'
      Process_Text_Dbk.innerHTML = '0/130'
      Process_Text_Acu.innerHTML = '0/120'
      Process_Text_Fil.innerHTML = '0/233'
      line1.innerHTML = '<td class="td_black"></td><td class="td_black"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td>'
      line2.innerHTML = '<td class="td_black"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td>'
      line3.innerHTML = '<td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_black"></td><td class="td_black"></td>'
      line4.innerHTML = '<td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_black"></td>'
      line5.innerHTML = '<td class="td_black"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td>'
      line6.innerHTML = '<td class="td_black"></td><td class="td_black"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td>'
      line7.innerHTML = '<td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_black"></td>'
      line8.innerHTML = '<td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_black"></td><td class="td_black"></td>'
      break
    case 3:
      Process_Text_Dmg.innerHTML = '0/227'
      Process_Text_Dbk.innerHTML = '0/58'
      Process_Text_Acu.innerHTML = '0/90'
      Process_Text_Fil.innerHTML = '0/107'
      line1.innerHTML = '<td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td>'
      line2.innerHTML = '<td class="td_black"></td><td class="td_black"></td><td class="td_orangeback"></td><td class="td_black"></td><td class="td_black"></td><td class="td_orangeback"></td><td class="td_black"></td><td class="td_black"></td>'
      line3.innerHTML = '<td class="td_black"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_black"></td>'
      line4.innerHTML = '<td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td>'
      line5.innerHTML = '<td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td>'
      line6.innerHTML = '<td class="td_black"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_orangeback"></td><td class="td_black"></td>'
      line7.innerHTML = '<td class="td_black"></td><td class="td_black"></td><td class="td_orangeback"></td><td class="td_black"></td><td class="td_black"></td><td class="td_orangeback"></td><td class="td_black"></td><td class="td_black"></td>'
      line8.innerHTML = '<td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td><td class="td_black"></td>'
      break
  }
}
function countMS (td1, td2) { return ((60 * td2.getMinutes() + td2.getSeconds()) * 1000 + td2.getMilliseconds()) - ((60 * td1.getMinutes() + td1.getSeconds()) * 1000 + td1.getMilliseconds()); }
function notIn (num, rank) {
  var ranklen = rank.length
  for (var i = 0; i < ranklen; i++) if (rank[i] === num) return false
  return true
}
function getTopology () {
  globaltime[0] = 0
  var td1 = new Date()
  topologySet = [], solutionSet = []
  var HeavyfireType = 1
  if (document.getElementById('HFSwitch1').checked === true) HeavyfireType = 1
  else if (document.getElementById('HFSwitch2').checked === true) HeavyfireType = 2
  else HeavyfireType = 3
  var validSet
  var chipShape_5 = [[11, 0], [12, 0], [21, 0], [22, 0], [31, 0], [32, 0], [4, 0], [5, 0], [6, 0]]
  var chipShape_6 = [[1, 0], [2, 0], [3, 0], [41, 0], [42, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]]
  for (var i = 0; i < chipNum; i++) {
    if (chipRepo_data[i].classNum === 551) {
      if (chipRepo_data[i].typeNum === 11) chipShape_5[0][1]++
      else if (chipRepo_data[i].typeNum === 12) chipShape_5[1][1]++
      else if (chipRepo_data[i].typeNum === 21) chipShape_5[2][1]++
      else if (chipRepo_data[i].typeNum === 22) chipShape_5[3][1]++
      else if (chipRepo_data[i].typeNum === 31) chipShape_5[4][1]++
      else if (chipRepo_data[i].typeNum === 32) chipShape_5[5][1]++
      else if (chipRepo_data[i].typeNum === 4) chipShape_5[6][1]++
      else if (chipRepo_data[i].typeNum === 5) chipShape_5[7][1]++
      else if (chipRepo_data[i].typeNum === 6) chipShape_5[8][1]++
    }
    else if (chipRepo_data[i].classNum === 56) {
      if (chipRepo_data[i].typeNum === 1) chipShape_6[0][1]++
      else if (chipRepo_data[i].typeNum === 2) chipShape_6[1][1]++
      else if (chipRepo_data[i].typeNum === 3) chipShape_6[2][1]++
      else if (chipRepo_data[i].typeNum === 41) chipShape_6[3][1]++
      else if (chipRepo_data[i].typeNum === 42) chipShape_6[4][1]++
      else if (chipRepo_data[i].typeNum === 5) chipShape_6[5][1]++
      else if (chipRepo_data[i].typeNum === 6) chipShape_6[6][1]++
      else if (chipRepo_data[i].typeNum === 7) chipShape_6[7][1]++
      else if (chipRepo_data[i].typeNum === 8) chipShape_6[8][1]++
      else if (chipRepo_data[i].typeNum === 9) chipShape_6[9][1]++
    }
  }
  validSet = searchValid(chipShape_6, chipShape_5, HeavyfireType)
  var allTopoNum = validSet.length
  // get topology
  for (var num_topo = 0; num_topo < allTopoNum; num_topo++) {
    if (HeavyfireType === 1) {
      if (validSet[num_topo] < topologyLibRefer_BGM_1.length) topologySet.push(topologyLib_BGM_1[validSet[num_topo]])
      else topologySet.push(topologyLib_BGM_2[validSet[num_topo] - topologyLibRefer_BGM_1.length])
    } else if (HeavyfireType === 2) topologySet.push(topologyLib_AGS[validSet[num_topo]])
    else if (HeavyfireType === 3) topologySet.push(topologyLib_2B14[validSet[num_topo]])
  }
  if (topologySet.length > 0) {
    if (filter_switch) { // show sort
      buffer_solu = []
      buffer_num = parseInt(document.getElementById('best_num').value)
      document.getElementById('TopologySelect').disabled = true
      document.getElementById('TopologySelect').innerHTML = '<option value=0 selected>下面是最优的数个方案</option>'
      var topoNum = topologySet.length
      for (var t = 0; t < topoNum; t++) {
        solutionSet = getSolution(topologySet[t])
        sortSolution(ranking_switch)
        if (solutionSet.length > 0) {
          buffer_solu.push(solutionSet[0].concat(((t + '') + 't')))
        }
      }
      solutionSet = buffer_solu
      sortSolution(ranking_switch)
      if (solutionSet.length > buffer_num) {
        var buffer_solu_cut = []
        for (var i = 0; i < buffer_num; i++) buffer_solu_cut.push(solutionSet[i])
        solutionSet = buffer_solu_cut
      }
      var bufferlen = solutionSet.length
      for (var i = 0; i < bufferlen; i++) {
        var topoString = solutionSet[i].pop()
        topoString = topoString.substr(0, topoString.length - 1)
        buffer_topo.push(topologySet[parseInt(topoString)])
      }
      var SSText = ''
      if (bufferlen > 0) {
        for (var i = 0; i < bufferlen; i++) {
          SSText += '<option value=' + i + '>编号 '
          var c_num = solutionSet[i].length
          for (var c = 0; c < c_num; c++) SSText += (solutionSet[i][c] + ' ')
          SSText += '</option>'
        }
      } else {
        SSText = '<option value=-1>无合适方案</option>'
      }
      document.getElementById('SortInfo').innerHTML = ''
      SolutionSelect.innerHTML = SSText
      showAnalyze()
      SolutionSelect.disabled = false
    } else { // show all
      var soluNum = topologySet.length
      var TopologySelect = document.getElementById('TopologySelect')
      TopologySelect.disabled = false
      var RTText = '<option value=0 selected>图解 1</option>'
      for (var i = 1; i < soluNum; i++) {
        RTText += '<option value=' + i + '>图解 ' + (i + 1) + '</option>'
      }
      TopologySelect.innerHTML = RTText
      var NoResultTextId = document.getElementById('NoResultText')
      NoResultTextId.innerHTML = ''
      topologyNum = 0
      showSolution()
    }
  } else {
    var NoResultTextId = document.getElementById('NoResultText')
    NoResultTextId.innerHTML = '<span style="color:#FF0066">&nbsp&nbsp* 没有可能的解</span>'
    var TopologySelect = document.getElementById('TopologySelect')
    TopologySelect.disabled = true
    var RTText = '<option value=1 selected>图解编号</option>'
  }
  var td2 = new Date()
  globaltime[0] += countMS(td1, td2)
  document.getElementById('timeText').innerHTML = '总时间' + (globaltime[0] / 1000).toFixed(2) + 's'
}
function isPossible (chipShape_65, chipRefer, border) {
  for (var i = 0; i < border; i++) if (parseInt(chipRefer[i]) > chipShape_65[i][1]) return false
  return true
}
function searchValid (chipShape_6, chipShape_5, HeavyfireType) {
  var chipShape_65 = chipShape_6.concat(chipShape_5)
  var validSet = []
  var searchlen, searchlen_ex
  if (HeavyfireType === 1) {
    searchlen = topologyLibRefer_BGM_1.length
    searchlen_ex = topologyLibRefer_BGM_2.length
  } else if (HeavyfireType === 2) {
    searchlen = topologyLibRefer_AGS.length
  } else if (HeavyfireType === 3) {
    searchlen = topologyLibRefer_2B14.length
  }
  if (HeavyfireType === 1) {
    for (var i = 0; i < searchlen; i++) {
      if (isPossible(chipShape_65, topologyLibRefer_BGM_1[i], 10)) validSet.push(i)
    }
    for (var i = 0; i < searchlen_ex; i++) {
      if (isPossible(chipShape_65, topologyLibRefer_BGM_2[i], 19)) validSet.push(i + searchlen)
    }
  } else if (HeavyfireType === 2) {
    for (var i = 0; i < searchlen; i++) {
      if (isPossible(chipShape_65, topologyLibRefer_AGS[i], 19)) validSet.push(i)
    }
  } else if (HeavyfireType === 3) {
    for (var i = 0; i < searchlen; i++) {
      if (isPossible(chipShape_65, topologyLibRefer_2B14[i], 19)) validSet.push(i)
    }
  }
  return validSet
}
function showTopology (solution, HeavyfireType) {
  var line1 = document.getElementById('solutionLine1')
  var line2 = document.getElementById('solutionLine2')
  var line3 = document.getElementById('solutionLine3')
  var line4 = document.getElementById('solutionLine4')
  var line5 = document.getElementById('solutionLine5')
  var line6 = document.getElementById('solutionLine6')
  var line7 = document.getElementById('solutionLine7')
  var line8 = document.getElementById('solutionLine8')
  var lineSet = [line1, line2, line3, line4, line5, line6, line7, line8]
  var htmlSet = []
  for (var i = 0; i < 8; i++) htmlSet.push(['<td class="td_black"></td>', '<td class="td_black"></td>', '<td class="td_black"></td>', '<td class="td_black"></td>', '<td class="td_black"></td>', '<td class="td_black"></td>', '<td class="td_black"></td>', '<td class="td_black"></td>'])
  switch (HeavyfireType) {
    case 1:
      var soluChipNum = solution.length
      for (var i = 0; i < soluChipNum; i++) {
        putChip(1, 1, 6, i, solution[i], htmlSet)
      }
      break
    case 2:
      var soluChipNum = solution.length
      for (var i = 0; i < soluChipNum; i++) {
        putChip(0, 0, 8, i, solution[i], htmlSet)
      }
      break
    case 3:
      var soluChipNum = solution.length
      for (var i = 0; i < soluChipNum; i++) {
        putChip(0, 1, 8, i, solution[i], htmlSet)
      }
      break
  }
  for (var i = 0; i < 8; i++) {
    var htmlText = ''
    for (var j = 0; j < 8; j++) {
      htmlText += htmlSet[i][j]
    }
    lineSet[i].innerHTML = htmlText
  }
}
function putChip (bios_x, bios_y, border_x, chipOrder, chipRank, htmlSet) {
  var ranklen = chipRank.length
  for (var i = 1; i < ranklen; i++) {
    if (chipRank[i] === 1) htmlSet[parseInt((i - 1) / border_x) + bios_y][i - border_x * parseInt((i - 1) / border_x) - 1 + bios_x] = '<td class="td_b' + (chipOrder - 7 * parseInt(chipOrder / 7) + 1) + '">' + '</td>'
  }
}
function flogy (actionId) {
  if (actionId === 0) topologyNum = parseInt(document.getElementById('TopologySelect').value)
  if (actionId === 1) topologyNum++
  if (actionId === 2) topologyNum--
  document.getElementById('TopologySelect').value = topologyNum
  showSolution()
}
function changeAnalyze (actionId) {
  var SolutionSelect = document.getElementById('SolutionSelect')
  var SSV = parseInt(SolutionSelect.value)
  if (actionId === 1) SSV++
  if (actionId === 2) SSV--
  SolutionSelect.value = SSV
  showAnalyze()
}
function showAnalyze () {
  var HeavyfireType
  if (document.getElementById('HFSwitch1').checked === true) HeavyfireType = 1
  else if (document.getElementById('HFSwitch2').checked === true) HeavyfireType = 2
  else HeavyfireType = 3
  var AdTp = document.getElementById('AdTp')
  var SbTp = document.getElementById('SbTp')
  var AdCo = document.getElementById('AdCo')
  var SbCo = document.getElementById('SbCo')
  var topoV = parseInt(document.getElementById('TopologySelect').value)
  var combV = parseInt(document.getElementById('SolutionSelect').value)
  var Process_Text_Dmg = document.getElementById('Process_Text_Dmg')
  var Process_Text_Dbk = document.getElementById('Process_Text_Dbk')
  var Process_Text_Acu = document.getElementById('Process_Text_Acu')
  var Process_Text_Fil = document.getElementById('Process_Text_Fil')
  var DmgAlert = document.getElementById('DmgAlert')
  var DbkAlert = document.getElementById('DbkAlert')
  var AcuAlert = document.getElementById('AcuAlert')
  var FilAlert = document.getElementById('FilAlert')
  var Process_Bar_Dmg = document.getElementById('Process_Bar_Dmg')
  var Process_Bar_Dbk = document.getElementById('Process_Bar_Dbk')
  var Process_Bar_Acu = document.getElementById('Process_Bar_Acu')
  var Process_Bar_Fil = document.getElementById('Process_Bar_Fil')
  if (solutionSet.length > 0) {
    var SSNum = parseInt(document.getElementById('SolutionSelect').value)
    var c_num = solutionSet[SSNum].length
    document.getElementById('AnalyzeSwitch').disabled = false
    // show topology image
    if (filter_switch) {
      document.getElementById('SortButton_AllPro').disabled = true
      document.getElementById('SortButton_Block').disabled = true
      document.getElementById('SortButton_Dmg').disabled = true
      document.getElementById('SortButton_Dbk').disabled = true
      document.getElementById('SortButton_Acu').disabled = true
      document.getElementById('SortButton_Fil').disabled = true
      showTopology(buffer_topo[SSNum], HeavyfireType)
    }else {
      document.getElementById('SortButton_AllPro').disabled = false
      document.getElementById('SortButton_Block').disabled = false
      document.getElementById('SortButton_Dmg').disabled = false
      document.getElementById('SortButton_Dbk').disabled = false
      document.getElementById('SortButton_Acu').disabled = false
      document.getElementById('SortButton_Fil').disabled = false
      showTopology(topologySet[topologyNum], HeavyfireType)
    }
    // show pick chips in chart
    var ChipComboChart = document.getElementById('ChipComboChart')
    ChipComboChart.innerHTML = ''
    for (var c = 0; c < c_num; c++) {
      var colorName
      if (chipRepo_data[solutionSet[SSNum][c] - 1].color === 1) colorName = 'b'
      else colorName = 'o'
      var htmlString = '<img src="../img/chip/' + colorName + '_' + chipRepo_data[solutionSet[SSNum][c] - 1].classNum + '-' + chipRepo_data[solutionSet[SSNum][c] - 1].typeNum + '.png">'
      var ChartAdd = ''
      ChartAdd += '<tr>'
      ChartAdd += '<td>'
      if (c === 0) ChartAdd += '<span style="color:dodgerblue">▇ </span>'
      else if (c === 1) ChartAdd += '<span style="color:deepskyblue">▇ </span>'
      else if (c === 2) ChartAdd += '<span style="color:greenyellow">▇ </span>'
      else if (c === 3) ChartAdd += '<span style="color:limegreen">▇ </span>'
      else if (c === 4) ChartAdd += '<span style="color:orange">▇ </span>'
      else if (c === 5) ChartAdd += '<span style="color:#FF0066">▇ </span>'
      else if (c === 6) ChartAdd += '<span style="color:fuchsia">▇ </span>'
      ChartAdd += chipRepo_chart[solutionSet[SSNum][c] - 1].chipNum + '</td>'
      ChartAdd += '<td>' + htmlString + ' ' + chipRepo_chart[solutionSet[SSNum][c] - 1].chipType + '</td>'
      ChartAdd += '<td>' + chipRepo_chart[solutionSet[SSNum][c] - 1].chipLevel + '</td>'
      ChartAdd += '<td>' + chipRepo_chart[solutionSet[SSNum][c] - 1].Acu + '</td>'
      ChartAdd += '<td>' + chipRepo_chart[solutionSet[SSNum][c] - 1].Fil + '</td>'
      ChartAdd += '<td>' + chipRepo_chart[solutionSet[SSNum][c] - 1].Dmg + '</td>'
      ChartAdd += '<td>' + chipRepo_chart[solutionSet[SSNum][c] - 1].Dbk + '</td>'
      ChartAdd += '</tr>'
      ChipComboChart.innerHTML += ChartAdd
    }
    // enable and disable topology & solution switch
    if (topoV === 0) SbTp.disabled = true
    else SbTp.disabled = false
    if (topoV === topologySet.length - 1) AdTp.disabled = true
    else AdTp.disabled = false
    if (combV === 0) SbCo.disabled = true
    else SbCo.disabled = false
    if (combV === solutionSet.length - 1) AdCo.disabled = true
    else AdCo.disabled = false
    // show percentage of property or blocknum
    if (analyze_switch === 1) {
      document.getElementById('AnalyzeSwitch').innerHTML = '显示有效格数'
      document.getElementById('AnalyzeSwitch').className = 'btn btn-outline btn-success'
      var dmg = 0, dbk = 0, acu = 0, fil = 0
      var dmg_max = 0, dbk_max = 0, acu_max = 0, fil_max = 0
      if (HeavyfireType === 1) { dmg_max = 190; dbk_max = 329; acu_max = 191; fil_max = 46; }
      else if (HeavyfireType === 2) { dmg_max = 106; dbk_max = 130; acu_max = 120; fil_max = 233; }
      else if (HeavyfireType === 3) { dmg_max = 227; dbk_max = 58; acu_max = 90; fil_max = 107; }
      for (var c = 0; c < c_num; c++) {
        dmg += chipRepo_chart[solutionSet[SSNum][c] - 1].Dmg
        dbk += chipRepo_chart[solutionSet[SSNum][c] - 1].Dbk
        acu += chipRepo_chart[solutionSet[SSNum][c] - 1].Acu
        fil += chipRepo_chart[solutionSet[SSNum][c] - 1].Fil
      }
      if (dmg > dmg_max) {
        Process_Text_Dmg.innerHTML = '<span style="color:red">' + dmg + '</span>' + '/' + dmg_max
        DmgAlert.innerHTML = '* 杀伤溢出'
        Process_Bar_Dmg.style = 'width:100%'
      }else {
        Process_Text_Dmg.innerHTML = dmg + '/' + dmg_max
        DmgAlert.innerHTML = ''
        Process_Bar_Dmg.style = ('width:' + (dmg / dmg_max).toFixed(2) * 100 + '%')
      }
      if (dbk > dbk_max) {
        Process_Text_Dbk.innerHTML = '<span style="color:red">' + dbk + '</span>' + '/' + dbk_max
        DbkAlert.innerHTML = '* 破防溢出'
        Process_Bar_Dbk.style = 'width:100%'
      }else {
        Process_Text_Dbk.innerHTML = dbk + '/' + dbk_max
        DbkAlert.innerHTML = ''
        Process_Bar_Dbk.style = ('width:' + (dbk / dbk_max).toFixed(2) * 100 + '%')
      }
      if (acu > acu_max) {
        Process_Text_Acu.innerHTML = '<span style="color:red">' + acu + '</span>' + '/' + acu_max
        AcuAlert.innerHTML = '* 精度溢出'
        Process_Bar_Acu.style = 'width:100%'
      }else {
        Process_Text_Acu.innerHTML = acu + '/' + acu_max
        AcuAlert.innerHTML = ''
        Process_Bar_Acu.style = ('width:' + (acu / acu_max).toFixed(2) * 100 + '%')
      }
      if (fil > fil_max) {
        Process_Text_Fil.innerHTML = '<span style="color:red">' + fil + '</span>' + '/' + fil_max
        FilAlert.innerHTML = '* 装填溢出'
        Process_Bar_Fil.style = 'width:100%'
      }else {
        Process_Text_Fil.innerHTML = fil + '/' + fil_max
        FilAlert.innerHTML = ''
        Process_Bar_Fil.style = ('width:' + (fil / fil_max).toFixed(2) * 100 + '%')
      }
    } else if (analyze_switch === -1) {
      document.getElementById('AnalyzeSwitch').innerHTML = '显示有效属性'
      document.getElementById('AnalyzeSwitch').className = 'btn btn-outline btn-warning'
      var dmg_blo = 0, dbk_blo = 0, acu_blo = 0, fil_blo = 0
      var dmg_blomax = 0, dbk_blomax = 0, acu_blomax = 0, fil_blomax = 0
      if (HeavyfireType === 1) { dmg_blomax = 18; dbk_blomax = 11; acu_blomax = 11; fil_blomax = 4; }
      else if (HeavyfireType === 2) { dmg_blomax = 10; dbk_blomax = 4; acu_blomax = 7; fil_blomax = 17; }
      else if (HeavyfireType === 3) { dmg_blomax = 21; dbk_blomax = 2; acu_blomax = 6; fil_blomax = 8; }
      for (var c = 0; c < c_num; c++) {
        dmg_blo += chipRepo_data[solutionSet[SSNum][c] - 1].bDmg
        dbk_blo += chipRepo_data[solutionSet[SSNum][c] - 1].bDbk
        acu_blo += chipRepo_data[solutionSet[SSNum][c] - 1].bAcu
        fil_blo += chipRepo_data[solutionSet[SSNum][c] - 1].bFil
      }
      if (dmg_blo > dmg_blomax) {
        Process_Text_Dmg.innerHTML = '<span style="color:red">' + dmg_blo + '</span>' + '/' + dmg_blomax
        DmgAlert.innerHTML = '* 杀伤溢出'
        Process_Bar_Dmg.style = 'width:100%'
      } else {
        Process_Text_Dmg.innerHTML = dmg_blo + '/' + dmg_blomax
        DmgAlert.innerHTML = ''
        Process_Bar_Dmg.style = ('width:' + (dmg_blo / dmg_blomax).toFixed(2) * 100 + '%')
      }
      if (dbk_blo > dbk_blomax) {
        Process_Text_Dbk.innerHTML = '<span style="color:red">' + dbk_blo + '</span>' + '/' + dbk_blomax
        DbkAlert.innerHTML = '* 破防溢出'
        Process_Bar_Dbk.style = 'width:100%'
      } else {
        Process_Text_Dbk.innerHTML = dbk_blo + '/' + dbk_blomax
        DbkAlert.innerHTML = ''
        Process_Bar_Dbk.style = ('width:' + (dbk_blo / dbk_blomax).toFixed(2) * 100 + '%')
      }
      if (acu_blo > acu_blomax) {
        Process_Text_Acu.innerHTML = '<span style="color:red">' + acu_blo + '</span>' + '/' + acu_blomax
        AcuAlert.innerHTML = '* 精度溢出'
        Process_Bar_Acu.style = 'width:100%'
      } else {
        Process_Text_Acu.innerHTML = acu_blo + '/' + acu_blomax
        AcuAlert.innerHTML = ''
        Process_Bar_Acu.style = ('width:' + (acu_blo / acu_blomax).toFixed(2) * 100 + '%')
      }
      if (fil_blo > fil_blomax) {
        Process_Text_Fil.innerHTML = '<span style="color:red">' + fil_blo + '</span>' + '/' + fil_blomax
        FilAlert.innerHTML = '* 装填溢出'
        Process_Bar_Fil.style = 'width:100%'
      } else {
        Process_Text_Fil.innerHTML = fil_blo + '/' + fil_blomax
        FilAlert.innerHTML = ''
        Process_Bar_Fil.style = ('width:' + (fil_blo / fil_blomax).toFixed(2) * 100 + '%')
      }
    }
  } else {
    document.getElementById('SortButton_AllPro').disabled = true
    document.getElementById('SortButton_Block').disabled = true
    document.getElementById('SortButton_Dmg').disabled = true
    document.getElementById('SortButton_Dbk').disabled = true
    document.getElementById('SortButton_Acu').disabled = true
    document.getElementById('SortButton_Fil').disabled = true
    // show topology(no result) image
    showTopology(topology_noresult, HeavyfireType)
    // show pick chips in chart
    var ChipComboChart = document.getElementById('ChipComboChart').innerHTML = ''
    // enable and disable topology & solution switch
    if (topoV === 0) SbTp.disabled = true
    else SbTp.disabled = false
    if (topoV === topologySet.length - 1) AdTp.disabled = true
    else AdTp.disabled = false
    SbCo.disabled = true
    AdCo.disabled = true
    // show percentage of property or blocknum
    if (analyze_switch === 1) {
      document.getElementById('AnalyzeSwitch').innerHTML = '显示有效格数'
      document.getElementById('AnalyzeSwitch').className = 'btn btn-outline btn-success'
      var dmg_max = 0, dbk_max = 0, acu_max = 0, fil_max = 0
      if (HeavyfireType === 1) { dmg_max = 190; dbk_max = 329; acu_max = 191; fil_max = 46; }
      else if (HeavyfireType === 2) { dmg_max = 106; dbk_max = 130; acu_max = 120; fil_max = 233; }
      else if (HeavyfireType === 3) { dmg_max = 227; dbk_max = 58; acu_max = 90; fil_max = 107; }
      Process_Text_Dmg.innerHTML = 0 + '/' + dmg_max
      DmgAlert.innerHTML = ''
      Process_Bar_Dmg.style = ('width:0%')
      Process_Text_Dbk.innerHTML = 0 + '/' + dbk_max
      DbkAlert.innerHTML = ''
      Process_Bar_Dbk.style = ('width:0%')
      Process_Text_Acu.innerHTML = 0 + '/' + acu_max
      AcuAlert.innerHTML = ''
      Process_Bar_Acu.style = ('width:0%')
      Process_Text_Fil.innerHTML = 0 + '/' + fil_max
      FilAlert.innerHTML = ''
      Process_Bar_Fil.style = ('width:0%')
    } else if (analyze_switch === -1) {
      document.getElementById('AnalyzeSwitch').innerHTML = '显示有效属性'
      document.getElementById('AnalyzeSwitch').className = 'btn btn-outline btn-warning'
      var dmg_blomax = 0, dbk_blomax = 0, acu_blomax = 0, fil_blomax = 0
      if (HeavyfireType === 1) { dmg_blomax = 18; dbk_blomax = 11; acu_blomax = 11; fil_blomax = 4; }
      else if (HeavyfireType === 2) { dmg_blomax = 10; dbk_blomax = 4; acu_blomax = 7; fil_blomax = 17; }
      else if (HeavyfireType === 3) { dmg_blomax = 21; dbk_blomax = 2; acu_blomax = 6; fil_blomax = 8; }
      Process_Text_Dmg.innerHTML = 0 + '/' + dmg_blomax
      DmgAlert.innerHTML = ''
      Process_Bar_Dmg.style = ('width:0%')
      Process_Text_Dbk.innerHTML = 0 + '/' + dbk_blomax
      DbkAlert.innerHTML = ''
      Process_Bar_Dbk.style = ('width:0%')
      Process_Text_Acu.innerHTML = 0 + '/' + acu_blomax
      AcuAlert.innerHTML = ''
      Process_Bar_Acu.style = ('width:0%')
      Process_Text_Fil.innerHTML = 0 + '/' + fil_blomax
      FilAlert.innerHTML = ''
      Process_Bar_Fil.style = ('width:0%')
    }
  }
}
function showSolution () {
  solutionSet = getSolution(topologySet[topologyNum])
  SolutionSelect.disabled = false
  sortSolution(ranking_switch)
  showAnalyze()
}
function getSolution (topology) {
  var tempChipRepo = []; // 待选芯片数据的二维数组
  var topolen = topology.length
  var type = [], typeNum = [], totalType = 0
  var pickIdx = []; // 二维数组，存放芯片选取组合的索引
  var changeIdx = 0
  var solution = []; // 二维数组，存放芯片选取组合的编号
  for (var i = 0; i < topolen; i++) { // 记录芯片形状和对应数量
    var chipCode = parseInt(topology[i][0])
    if (notIn(chipCode, type)) {
      totalType++
      type.push(chipCode)
      typeNum.push(1)
    } else {
      for (var c = 0; c < totalType; c++) if (chipCode === type[c]) typeNum[c]++
    }
  }
  for (var t = 0; t < totalType; t++) {
    tempChipRepo.push(searchChipSet(type[t])); // 把对应芯片全备份
    pickIdx.push([])
    for (var n = 0; n < typeNum[t]; n++) pickIdx[t].push(n); // 初始化选取
  }
  var solutionRank_init = []
  for (var t = 0; t < totalType; t++) {
    for (var n = 0; n < typeNum[t]; n++) {
      solutionRank_init.push(tempChipRepo[t][pickIdx[t][n]].chipNum)
    }
  }
  solution.push(solutionRank_init)
  changeIdx = totalType - 1; // 从最后一类开始变
  while (changeIdx > -1) {
    var changeCom = changeCombination(pickIdx[changeIdx], tempChipRepo[changeIdx].length)
    if (changeCom.length > 0) { // 有新的解
      pickIdx[changeIdx] = changeCom
      var solutionRank = []
      for (var t = 0; t < totalType; t++) {
        for (var n = 0; n < typeNum[t]; n++) {
          solutionRank.push(tempChipRepo[t][pickIdx[t][n]].chipNum)
        }
      }
      solution.push(solutionRank)
      changeIdx = totalType - 1
    } else {
      pickIdx[changeIdx] = []
      for (var n = 0; n < typeNum[changeIdx]; n++) pickIdx[changeIdx].push(n); // 初始化选取
      changeIdx--
    }
  }
  return solution
}
function changeCombination (rank, pickLimit) {
  var currentCombination = rank
  var cuComlen = currentCombination.length
  var isCompact = true
  for (var i = cuComlen - 1; i > 0; i--) {
    if (currentCombination[i] - currentCombination[i - 1] != 1) {
      isCompact = false
      break
    }
  }
  if (isCompact && (currentCombination[cuComlen - 1] === pickLimit - 1)) return []; // 紧凑且触底
  else {
    var changeIdx = cuComlen - 1
    while (true) {
      if (currentCombination[changeIdx] < pickLimit - 1) {
        currentCombination[changeIdx]++
        return currentCombination
      } else {
        for (var i = changeIdx; i > 0; i--) {
          if (currentCombination[i] - currentCombination[i - 1] != 1) {
            changeIdx = i - 1
            currentCombination[changeIdx]++
            break
          }
        }
        while (changeIdx < cuComlen - 1) {
          changeIdx++
          currentCombination[changeIdx] = currentCombination[changeIdx - 1] + 1
        }
        return currentCombination
      }
    }
  }
}
function searchChipSet (chipCode) {
  var chipString = chipCode + ''
  var tempChipSet = []
  var class_num, type_num
  if (chipString.substr(0, 3) === '551') class_num = 551
  else class_num = 56
  type_num = parseInt(chipString.substr(3))
  for (var i = 0; i < chipNum; i++) if (chipRepo_data[i].classNum === class_num && chipRepo_data[i].typeNum === type_num) tempChipSet.push(chipRepo_data[i])
  return tempChipSet
}
function changeBlock (actionInfo) {
  var ChipClass = document.getElementById('ChipClass')
  if (actionInfo === 1) ChipClass.value = 551
  else if (actionInfo === 2) ChipClass.value = 56
  changeProperty('class')
  manageButton()
}
function changeShape (actionInfo) {
  var ChipType = document.getElementById('ChipType')
  var ChipIdx = ChipType.selectedIndex
  if (actionInfo === 1) ChipType.value = ChipType[parseInt(ChipIdx) + 1].value
  else ChipType.value = ChipType[parseInt(ChipIdx) - 1].value
  refreshPreview()
  manageButton()
}
function editLevel (actionInfo) {
  var ChipLevel = document.getElementById('ChipLevel')
  if (actionInfo === 1) ChipLevel.value = parseInt(ChipLevel.value) + 1
  else if (actionInfo === 2) ChipLevel.value = parseInt(ChipLevel.value) - 1
  else if (actionInfo === 3) ChipLevel.value = 20
  changeProperty('level')
  manageButton()
}
function compare_sumpro (solu_a, solu_b) {
  var value_a = 0, value_b = 0
  var dmg_a = 0, dmg_b = 0, dbk_a = 0, dbk_b = 0, acu_a = 0, acu_b = 0, fil_a = 0, fil_b = 0
  var dmg_max = 0, dbk_max = 0, acu_max = 0, fil_max = 0
  var HeavyfireType = 1
  if (document.getElementById('HFSwitch1').checked === true) HeavyfireType = 1
  else if (document.getElementById('HFSwitch2').checked === true) HeavyfireType = 2
  else HeavyfireType = 3
  if (HeavyfireType === 1) { dmg_max = 190; dbk_max = 329; acu_max = 191; fil_max = 46; }
  else if (HeavyfireType === 2) { dmg_max = 106; dbk_max = 130; acu_max = 120; fil_max = 233; }
  else if (HeavyfireType === 3) { dmg_max = 227; dbk_max = 58; acu_max = 90; fil_max = 107; }
  var looplen_a = solu_a.length, looplen_b = solu_b.length
  if (isNaN(solu_a[looplen_a - 1])) looplen_a--
  if (isNaN(solu_b[looplen_b - 1])) looplen_b--
  for (var n = 0; n < looplen_a; n++) {
    dmg_a += chipRepo_chart[solu_a[n] - 1].Dmg
    dbk_a += chipRepo_chart[solu_a[n] - 1].Dbk
    acu_a += chipRepo_chart[solu_a[n] - 1].Acu
    fil_a += chipRepo_chart[solu_a[n] - 1].Fil
  }
  for (var n = 0; n < looplen_b; n++) {
    dmg_b += chipRepo_chart[solu_b[n] - 1].Dmg
    dbk_b += chipRepo_chart[solu_b[n] - 1].Dbk
    acu_b += chipRepo_chart[solu_b[n] - 1].Acu
    fil_b += chipRepo_chart[solu_b[n] - 1].Fil
  }
  if (dmg_a > dmg_max) dmg_a = dmg_max; if (dmg_b > dmg_max) dmg_b = dmg_max
  if (dbk_a > dbk_max) dbk_a = dbk_max; if (dbk_b > dbk_max) dbk_b = dbk_max
  if (acu_a > acu_max) acu_a = acu_max; if (acu_b > acu_max) acu_b = acu_max
  if (fil_a > fil_max) fil_a = fil_max; if (fil_b > fil_max) fil_b = fil_max
  value_a = (dmg_a / dmg_max) + (dbk_a / dbk_max) + (acu_a / acu_max) + (fil_a / fil_max)
  value_b = (dmg_b / dmg_max) + (dbk_b / dbk_max) + (acu_b / acu_max) + (fil_b / fil_max)
  return value_b - value_a
}
function compare_sumblo (solu_a, solu_b) {
  var value_a = 0, value_b = 0
  var dmg_a = 0, dmg_b = 0, dbk_a = 0, dbk_b = 0, acu_a = 0, acu_b = 0, fil_a = 0, fil_b = 0
  var dmgblo_max = 0, dbkblo_max = 0, acublo_max = 0, filblo_max = 0
  var HeavyfireType = 1
  if (document.getElementById('HFSwitch1').checked === true) HeavyfireType = 1
  else if (document.getElementById('HFSwitch2').checked === true) HeavyfireType = 2
  else HeavyfireType = 3
  if (HeavyfireType === 1) { dmgblo_max = 18; dbkblo_max = 11; acublo_max = 11; filblo_max = 4; }
  else if (HeavyfireType === 2) { dmgblo_max = 10; dbkblo_max = 4; acublo_max = 7; filblo_max = 17; }
  else if (HeavyfireType === 3) { dmgblo_max = 21; dbkblo_max = 2; acublo_max = 6; filblo_max = 8; }
  var looplen_a = solu_a.length, looplen_b = solu_b.length
  if (isNaN(solu_a[looplen_a - 1])) looplen_a--
  if (isNaN(solu_b[looplen_b - 1])) looplen_b--
  for (var n = 0; n < looplen_a; n++) {
    dmg_a += chipRepo_data[solu_a[n] - 1].bDmg
    dbk_a += chipRepo_data[solu_a[n] - 1].bDbk
    acu_a += chipRepo_data[solu_a[n] - 1].bAcu
    fil_a += chipRepo_data[solu_a[n] - 1].bFil
  }
  for (var n = 0; n < looplen_b; n++) {
    dmg_b += chipRepo_data[solu_b[n] - 1].bDmg
    dbk_b += chipRepo_data[solu_b[n] - 1].bDbk
    acu_b += chipRepo_data[solu_b[n] - 1].bAcu
    fil_b += chipRepo_data[solu_b[n] - 1].bFil
  }
  if (dmg_a > dmgblo_max) dmg_a = dmgblo_max; if (dmg_b > dmgblo_max) dmg_b = dmgblo_max
  if (dbk_a > dbkblo_max) dbk_a = dbkblo_max; if (dbk_b > dbkblo_max) dbk_b = dbkblo_max
  if (acu_a > acublo_max) acu_a = acublo_max; if (acu_b > acublo_max) acu_b = acublo_max
  if (fil_a > filblo_max) fil_a = filblo_max; if (fil_b > filblo_max) fil_b = filblo_max
  value_a = dmg_a + dbk_a + acu_a + fil_a
  value_b = dmg_b + dbk_b + acu_b + fil_b
  return value_b - value_a
}
function compare_dmg (solu_a, solu_b) {
  var dmg_a = 0, dmg_b = 0, dmg_max = 0
  if (document.getElementById('HFSwitch1').checked === true) dmg_max = 190
  else if (document.getElementById('HFSwitch2').checked === true) dmg_max = 106
  else dmg_max = 227
  var looplen_a = solu_a.length, looplen_b = solu_b.length
  if (isNaN(solu_a[looplen_a - 1])) looplen_a--
  if (isNaN(solu_b[looplen_b - 1])) looplen_b--
  for (var n = 0; n < looplen_a; n++) dmg_a += chipRepo_chart[solu_a[n] - 1].Dmg
  for (var n = 0; n < looplen_b; n++) dmg_b += chipRepo_chart[solu_b[n] - 1].Dmg
  if (dmg_a > dmg_max) dmg_a = dmg_max; if (dmg_b > dmg_max) dmg_b = dmg_max
  return dmg_b - dmg_a
}
function compare_dbk (solu_a, solu_b) {
  var dbk_a = 0, dbk_b = 0, dbk_max = 0
  if (document.getElementById('HFSwitch1').checked === true) dbk_max = 329
  else if (document.getElementById('HFSwitch2').checked === true) dbk_max = 130
  else dbk_max = 58
  var looplen_a = solu_a.length, looplen_b = solu_b.length
  if (isNaN(solu_a[looplen_a - 1])) looplen_a--
  if (isNaN(solu_b[looplen_b - 1])) looplen_b--
  for (var n = 0; n < looplen_a; n++) dbk_a += chipRepo_chart[solu_a[n] - 1].Dbk
  for (var n = 0; n < looplen_b; n++) dbk_b += chipRepo_chart[solu_b[n] - 1].Dbk
  if (dbk_a > dbk_max) dbk_a = dbk_max; if (dbk_b > dbk_max) dbk_b = dbk_max
  return dbk_b - dbk_a
}
function compare_acu (solu_a, solu_b) {
  var acu_a = 0, acu_b = 0, acu_max = 0
  if (document.getElementById('HFSwitch1').checked === true) acu_max = 191
  else if (document.getElementById('HFSwitch2').checked === true) acu_max = 120
  else acu_max = 90
  var looplen_a = solu_a.length, looplen_b = solu_b.length
  if (isNaN(solu_a[looplen_a - 1])) looplen_a--
  if (isNaN(solu_b[looplen_b - 1])) looplen_b--
  for (var n = 0; n < looplen_a; n++) acu_a += chipRepo_chart[solu_a[n] - 1].Acu
  for (var n = 0; n < looplen_b; n++) acu_b += chipRepo_chart[solu_b[n] - 1].Acu
  if (acu_a > acu_max) acu_a = acu_max; if (acu_b > acu_max) acu_b = acu_max
  return acu_b - acu_a
}
function compare_fil (solu_a, solu_b) {
  var fil_a = 0, fil_b = 0, fil_max = 0
  if (document.getElementById('HFSwitch1').checked === true) fil_max = 46
  else if (document.getElementById('HFSwitch2').checked === true) fil_max = 233
  else fil_max = 107
  var looplen_a = solu_a.length, looplen_b = solu_b.length
  if (isNaN(solu_a[looplen_a - 1])) looplen_a--
  if (isNaN(solu_b[looplen_b - 1])) looplen_b--
  for (var n = 0; n < looplen_a; n++) fil_a += chipRepo_chart[solu_a[n] - 1].Fil
  for (var n = 0; n < looplen_b; n++) fil_b += chipRepo_chart[solu_b[n] - 1].Fil
  if (fil_a > fil_max) fil_a = fil_max; if (fil_b > fil_max) fil_b = fil_max
  return fil_b - fil_a
}
function ignoreSolution (dmg_max, dbk_max, acu_max, fil_max, dmgblo_max, dbkblo_max, acublo_max, filblo_max) {
  var solution_filtered = []
  var ignore_dmg = parseInt(document.getElementById('ignore_dmgmax').value)
  var ignore_dbk = parseInt(document.getElementById('ignore_dbkmax').value)
  var ignore_acu = parseInt(document.getElementById('ignore_acumax').value)
  var ignore_fil = parseInt(document.getElementById('ignore_filmax').value)
  var ignore_dmgblo = parseInt(document.getElementById('ignore_dmgblomax').value)
  var ignore_dbkblo = parseInt(document.getElementById('ignore_dbkblomax').value)
  var ignore_acublo = parseInt(document.getElementById('ignore_acublomax').value)
  var ignore_filblo = parseInt(document.getElementById('ignore_filblomax').value)
  var solulen = solutionSet.length, combinelen = solutionSet[0].length
  for (var i = 0; i < solulen; i++) {
    if (document.getElementById('ignore_dmg').checked) {
      var dmg = 0
      for (var n = 0; n < combinelen; n++) dmg += chipRepo_chart[solutionSet[i][n] - 1].Dmg
      if (dmg > dmg_max + ignore_dmg) continue
    }
    if (document.getElementById('ignore_dbk').checked) {
      var dbk = 0
      for (var n = 0; n < combinelen; n++) dbk += chipRepo_chart[solutionSet[i][n] - 1].Dbk
      if (dbk > dbk_max + ignore_dbk) continue
    }
    if (document.getElementById('ignore_acu').checked) {
      var acu = 0
      for (var n = 0; n < combinelen; n++) acu += chipRepo_chart[solutionSet[i][n] - 1].Acu
      if (acu > acu_max + ignore_acu) continue
    }
    if (document.getElementById('ignore_fil').checked) {
      var fil = 0
      for (var n = 0; n < combinelen; n++) fil += chipRepo_chart[solutionSet[i][n] - 1].Fil
      if (fil > fil_max + ignore_fil) continue
    }
    if (document.getElementById('ignore_dmgblo').checked) {
      var dmg_blo = 0
      for (var n = 0; n < combinelen; n++) dmg += chipRepo_data[solutionSet[i][n] - 1].bDmg
      if (dmg_blo > dmgblo_max + ignore_dmgblo) continue
    }
    if (document.getElementById('ignore_dbkblo').checked) {
      var dbk_blo = 0
      for (var n = 0; n < combinelen; n++) dbk += chipRepo_data[solutionSet[i][n] - 1].bDbk
      if (dbk_blo > dbkblo_max + ignore_dbkblo) continue
    }
    if (document.getElementById('ignore_acublo').checked) {
      var acu_blo = 0
      for (var n = 0; n < combinelen; n++) acu += chipRepo_data[solutionSet[i][n] - 1].bAcu
      if (acu_blo > acublo_max + ignore_acublo) continue
    }
    if (document.getElementById('ignore_filblo').checked) {
      var fil_blo = 0
      for (var n = 0; n < combinelen; n++) fil += chipRepo_data[solutionSet[i][n] - 1].bFil
      if (fil_blo > filblo_max + ignore_filblo) continue
    }
    solution_filtered.push(solutionSet[i])
  }
  return solution_filtered
}
function sortSolution (sortType) {
  ranking_switch = parseInt(sortType)
  if (sortType === 1) analyze_switch = 1
  else if (sortType === 2) analyze_switch = -1
  if (document.getElementById('HFSwitch1').checked === true) HeavyfireType = 1
  else if (document.getElementById('HFSwitch2').checked === true) HeavyfireType = 2
  else HeavyfireType = 3
  var dmg_max = 0, dbk_max = 0, acu_max = 0, fil_max = 0
  var dmgblo_max = 0, dbkblo_max = 0, acublo_max = 0, filblo_max = 0
  if (HeavyfireType === 1) { dmg_max = 190; dbk_max = 329; acu_max = 191; fil_max = 46; dmgblo_max = 18; dbkblo_max = 11; acublo_max = 11; filblo_max = 4; }
  else if (HeavyfireType === 2) { dmg_max = 106; dbk_max = 130; acu_max = 120; fil_max = 233; dmgblo_max = 10; dbkblo_max = 4; acublo_max = 7; filblo_max = 17; }
  else if (HeavyfireType === 3) { dmg_max = 227; dbk_max = 58; acu_max = 90; fil_max = 107; dmgblo_max = 21; dbkblo_max = 2; acublo_max = 6; filblo_max = 8; }
  var SolutionSelect = document.getElementById('SolutionSelect')
  var SSText = ''
  solutionSet = ignoreSolution(dmg_max, dbk_max, acu_max, fil_max, dmgblo_max, dbkblo_max, acublo_max, filblo_max)
  var solulen = solutionSet.length
  switch (ranking_switch) {
    case 1: // All property
      document.getElementById('SortInfo').innerHTML = '按 <span style="color:red"><b>有效总属性</b></span> 排序' + '，图解 ' + (topologyNum + 1) + ' 有 ' + solutionSet.length + ' 种有效组合'
      solutionSet.sort(compare_sumpro)
      break
    case 2: // All blockNum
      document.getElementById('SortInfo').innerHTML = '按 <span style="color:red"><b>有效格数</b></span> 排序' + '，图解 ' + (topologyNum + 1) + ' 有 ' + solutionSet.length + ' 种有效组合'
      solutionSet.sort(compare_sumblo)
      break
    case 3: // Dmg
      document.getElementById('SortInfo').innerHTML = '按 <span style="color:red"><b>杀伤</b></span> 排序' + '，图解 ' + (topologyNum + 1) + ' 有 ' + solutionSet.length + ' 种有效组合'
      solutionSet.sort(compare_dmg)
      break
    case 4: // Dbk
      document.getElementById('SortInfo').innerHTML = '按 <span style="color:red"><b>破防</b></span> 排序' + '，图解 ' + (topologyNum + 1) + ' 有 ' + solutionSet.length + ' 种有效组合'
      solutionSet.sort(compare_dbk)
      break
    case 5: // Acu
      document.getElementById('SortInfo').innerHTML = '按 <span style="color:red"><b>精度</b></span> 排序' + '，图解 ' + (topologyNum + 1) + ' 有 ' + solutionSet.length + ' 种有效组合'
      solutionSet.sort(compare_acu)
      break
    case 6: // Fil
      document.getElementById('SortInfo').innerHTML = '按 <span style="color:red"><b>装填</b></span> 排序' + '，图解 ' + (topologyNum + 1) + ' 有 ' + solutionSet.length + ' 种有效组合'
      solutionSet.sort(compare_fil)
      break
  }
  SolutionSelect.disabled = false
  if (solulen > 0) {
    for (var i = 0; i < solulen; i++) {
      SSText += '<option value=' + i + '>编号 '
      var c_num = solutionSet[i].length
      for (var c = 0; c < c_num; c++) SSText += (solutionSet[i][c] + ' ')
      SSText += '</option>'
    }
  } else {
    SSText = '<option value=-1>无合适方案</option>'
  }
  SolutionSelect.innerHTML = SSText
}
function switchAnalyze () { analyze_switch *= -1; showAnalyze(); }
function setIgnore (typeInfo) {
  switch (typeInfo) {
    case 1:
      document.getElementById('ignore_dmgmax').disabled = !(document.getElementById('ignore_dmgmax').disabled)
      break
    case 2:
      document.getElementById('ignore_dbkmax').disabled = !(document.getElementById('ignore_dbkmax').disabled)
      break
    case 3:
      document.getElementById('ignore_acumax').disabled = !(document.getElementById('ignore_acumax').disabled)
      break
    case 4:
      document.getElementById('ignore_filmax').disabled = !(document.getElementById('ignore_filmax').disabled)
      break
    case 5:
      document.getElementById('ignore_dmgblomax').disabled = !(document.getElementById('ignore_dmgblomax').disabled)
      break
    case 6:
      document.getElementById('ignore_dbkblomax').disabled = !(document.getElementById('ignore_dbkblomax').disabled)
      break
    case 7:
      document.getElementById('ignore_acublomax').disabled = !(document.getElementById('ignore_acublomax').disabled)
      break
    case 8:
      document.getElementById('ignore_filblomax').disabled = !(document.getElementById('ignore_filblomax').disabled)
      break
  }
}
function allIgnore (typeInfo) {
  switch (typeInfo) {
    case 1:
      document.getElementById('ignore_dmg').checked = true
      document.getElementById('ignore_dbk').checked = true
      document.getElementById('ignore_acu').checked = true
      document.getElementById('ignore_fil').checked = true
      document.getElementById('ignore_dmgblo').checked = true
      document.getElementById('ignore_dbkblo').checked = true
      document.getElementById('ignore_acublo').checked = true
      document.getElementById('ignore_filblo').checked = true
      document.getElementById('ignore_dmgmax').disabled = false
      document.getElementById('ignore_dbkmax').disabled = false
      document.getElementById('ignore_acumax').disabled = false
      document.getElementById('ignore_filmax').disabled = false
      document.getElementById('ignore_dmgblomax').disabled = false
      document.getElementById('ignore_dbkblomax').disabled = false
      document.getElementById('ignore_acublomax').disabled = false
      document.getElementById('ignore_filblomax').disabled = false
      break
    case 2:
      document.getElementById('ignore_dmg').checked = false
      document.getElementById('ignore_dbk').checked = false
      document.getElementById('ignore_acu').checked = false
      document.getElementById('ignore_fil').checked = false
      document.getElementById('ignore_dmgblo').checked = false
      document.getElementById('ignore_dbkblo').checked = false
      document.getElementById('ignore_acublo').checked = false
      document.getElementById('ignore_filblo').checked = false
      document.getElementById('ignore_dmgmax').disabled = true
      document.getElementById('ignore_dbkmax').disabled = true
      document.getElementById('ignore_acumax').disabled = true
      document.getElementById('ignore_filmax').disabled = true
      document.getElementById('ignore_dmgblomax').disabled = true
      document.getElementById('ignore_dbkblomax').disabled = true
      document.getElementById('ignore_acublomax').disabled = true
      document.getElementById('ignore_filblomax').disabled = true
      break
    case 3:
      document.getElementById('ignore_dmg').checked = false
      document.getElementById('ignore_dbk').checked = false
      document.getElementById('ignore_acu').checked = false
      document.getElementById('ignore_fil').checked = false
      document.getElementById('ignore_dmgblo').checked = true
      document.getElementById('ignore_dbkblo').checked = true
      document.getElementById('ignore_acublo').checked = true
      document.getElementById('ignore_filblo').checked = true
      document.getElementById('ignore_dmgmax').disabled = true
      document.getElementById('ignore_dbkmax').disabled = true
      document.getElementById('ignore_acumax').disabled = true
      document.getElementById('ignore_filmax').disabled = true
      document.getElementById('ignore_dmgblomax').disabled = false; document.getElementById('ignore_dmgblomax').value = 1
      document.getElementById('ignore_dbkblomax').disabled = false; document.getElementById('ignore_dbkblomax').value = 1
      document.getElementById('ignore_acublomax').disabled = false; document.getElementById('ignore_acublomax').value = 1
      document.getElementById('ignore_filblomax').disabled = false; document.getElementById('ignore_filblomax').value = 1
      break
    case 4:
      document.getElementById('ignore_dmg').checked = false
      document.getElementById('ignore_dbk').checked = false
      document.getElementById('ignore_acu').checked = false
      document.getElementById('ignore_fil').checked = false
      document.getElementById('ignore_dmgblo').checked = false
      document.getElementById('ignore_dbkblo').checked = false
      document.getElementById('ignore_acublo').checked = false
      document.getElementById('ignore_filblo').checked = false
      document.getElementById('ignore_dmgmax').disabled = true
      document.getElementById('ignore_dbkmax').disabled = true
      document.getElementById('ignore_acumax').disabled = true
      document.getElementById('ignore_filmax').disabled = true
      document.getElementById('ignore_dmgblomax').disabled = true; document.getElementById('ignore_dmgblomax').value = 0
      document.getElementById('ignore_dbkblomax').disabled = true; document.getElementById('ignore_dbkblomax').value = 0
      document.getElementById('ignore_acublomax').disabled = true; document.getElementById('ignore_acublomax').value = 0
      document.getElementById('ignore_filblomax').disabled = true; document.getElementById('ignore_filblomax').value = 0
      break
    case 5:
      document.getElementById('ignore_dmg').checked = false
      document.getElementById('ignore_dbk').checked = false
      document.getElementById('ignore_acu').checked = false
      document.getElementById('ignore_fil').checked = false
      document.getElementById('ignore_dmgblo').checked = true
      document.getElementById('ignore_dbkblo').checked = true
      document.getElementById('ignore_acublo').checked = true
      document.getElementById('ignore_filblo').checked = true
      document.getElementById('ignore_dmgmax').disabled = true
      document.getElementById('ignore_dbkmax').disabled = true
      document.getElementById('ignore_acumax').disabled = true
      document.getElementById('ignore_filmax').disabled = true
      document.getElementById('ignore_dmgblomax').disabled = false; document.getElementById('ignore_dmgblomax').value = 0
      document.getElementById('ignore_dbkblomax').disabled = false; document.getElementById('ignore_dbkblomax').value = 1
      document.getElementById('ignore_acublomax').disabled = false; document.getElementById('ignore_acublomax').value = 1
      document.getElementById('ignore_filblomax').disabled = false; document.getElementById('ignore_filblomax').value = 0
      break
  }
}
function setBest (typeInfo) {
  if (typeInfo === 1) {
    filter_switch = false
    document.getElementById('best_num').disabled = true
    document.getElementById('best_alert').innerHTML = ' *会显示所有可行的图解和组合，约数秒'
  }else {
    filter_switch = true
    document.getElementById('best_num').disabled = false
    document.getElementById('best_alert').innerHTML = ' *算出所有可行解并输出排行前几的方案，约数秒至数分钟'
  }
}
function setBestSort (typeInfo) { ranking_switch = typeInfo; }
function setBestNum () {
  var best_num = document.getElementById('best_num')
  if ((best_num.value).length === 0) best_num.value = 10
  if (isNaN(parseInt(best_num.value))) best_num.value = 10
}
