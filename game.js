(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const els = {
    fullscreenGate:$('fullscreenGate'), fullscreenGateBtn:$('fullscreenGateBtn'), fullscreenGateText:$('fullscreenGateText'), boot:$('bootScreen'), game:$('gameScreen'), bootCanvas:$('bootCanvas'), canvas:$('gameCanvas'),
    student:$('studentName'), email:$('studentEmail'), count:$('questionCount'), careerChoices:$('careerChoices'), controlMode:$('controlMode'), trafficLevel:$('trafficLevel'),
    deviceProfile:$('deviceProfile'), deviceName:$('deviceName'), deviceControls:$('deviceControls'), deviceBadgeText:$('deviceBadgeText'),
    launch:$('launchBtn'), how:$('howBtn'), help:$('helpOverlay'), bootCar:$('bootCar'), bootMsg:$('bootMessage'),
    pause:$('pauseBtn'), resume:$('resumeBtn'), pauseOverlay:$('pauseOverlay'), progressBtn:$('progressBtn'),
    progressPanel:$('progressPanel'), progressSummary:$('progressSummary'), ladder:$('questionLadder'), report:$('reportBtn'),
    sound:$('soundBtn'), finish:$('finishBtn'), confirm:$('confirmOverlay'), confirmFinish:$('confirmFinishBtn'), cancelFinish:$('cancelFinishBtn'),
    qOverlay:$('questionOverlay'), qTitle:$('questionTitle'), eventTag:$('eventTag'), competency:$('competencyTag'), questionTimer:$('questionTimer'), questionTimeNotice:$('questionTimeNotice'),
    difficulty:$('difficultyTag'), sourceTag:$('sourceTag'), qValue:$('questionValue'), contextTitle:$('contextTitle'), contextVisual:$('contextVisual'),
    contextText:$('contextText'), stem:$('questionStem'), questionPromptGuide:$('questionPromptGuide'), options:$('options'), hint:$('hintBtn'), validate:$('validateBtn'), questionImageLabel:$('questionImageLabel'), contextImageLabel:$('contextImageLabel'),
    continue:$('continueBtn'), hintBox:$('hintBox'), feedback:$('feedbackBox'), outcomePanel:$('outcomePanel'), outcomeTitle:$('outcomeTitle'), outcomeText:$('outcomeText'), control:$('controlText'), phase:$('phaseLabel'),
    mission:$('missionText'), fill:$('missionFill'), health:$('healthText'), healthBars:$('healthBars'), score:$('scoreText'),
    streak:$('streakText'), integrity:$('integrityText'), eventName:$('eventName'), eventDistance:$('eventDistance'),
    compass:$('compass'), compassName:$('compassName'), compassDistance:$('compassDistance'), nitro:$('nitroBanner'),
    hazard:$('hazardBanner'), impact:$('impactBanner'), impactTitle:$('impactTitle'), impactDetail:$('impactDetail'), toast:$('toast'),
    pilotPoints:$('pilotPointsText'), pilotBadge:$('pilotPointsBadge'), speedState:$('speedStateText'), stageTitle:$('stageTitle'), stageCounter:$('stageCounter'), stageDetail:$('stageDetail'), stageTrack:$('stageTrack'), eventReasonOverlay:$('eventReasonOverlay'), eventReasonTitle:$('eventReasonTitle'), eventReasonText:$('eventReasonText'), eventCorrectPreview:$('eventCorrectPreview'), eventWrongPreview:$('eventWrongPreview'), eventStageBadge:$('eventStageBadge'), eventStart:$('eventStartBtn'), eventCountdown:$('eventCountdown'), questionReason:$('questionReason'),
    touchControls:$('touchControls'), touchTurbo:$('touchTurboBtn'), touchTurboFill:$('touchTurboFill'),
    orientationHint:$('orientationHint'), integrityOverlay:$('integrityOverlay'), integrityTitle:$('integrityTitle'),
    integrityDetail:$('integrityDetail'), integrityCounter:$('integrityCounter'), teacherPassword:$('teacherPassword'),
    unlock:$('unlockBtn'), unlockMessage:$('unlockMessage'), finishOverlay:$('finishOverlay'), finishTitle:$('finishTitle'),
    finishFlash:$('finishFlash'), finishBadge:$('finishBadge'), finalScore:$('finalScore'), finishMetrics:$('finishMetrics'), finishMessage:$('finishMessage'),
    download:$('downloadReportBtn'), restart:$('restartBtn'), selectedColorName:$('selectedColorName'), selectionModal:$('selectionModal'), selectionModalTitle:$('selectionModalTitle'), selectionOptions:$('selectionOptions'), selectionModalClose:$('selectionModalClose'), selectionModalCancel:$('selectionModalCancel'), summaryMode:$('summaryMode'), summaryCareer:$('summaryCareer'), summaryControls:$('summaryControls'), summaryCar:$('summaryCar'), summaryCarImage:$('summaryCarImage'), summaryColorDot:$('summaryColorDot')
  };

  const BANK = window.RALLY_BANK;
  const contextMap = Object.fromEntries((BANK.contexts||[]).map(c => [c.id, c]));
  const SPRITE_MANIFEST = window.RALLY_SPRITE_MANIFEST?.sprites || {};
  const spriteImages = Object.create(null);
  const playerVariantImages = Object.create(null);
  const TOLL_STAGE_IMAGES=[
    'assets/peajes/p1.png',
    'assets/peajes/p2.png',
    'assets/peajes/p3.png',
    'assets/peajes/p4.png'
  ];
  const TOLL_STAGE_FALLBACK_IMAGES=[
    'assets/peajes/f1.png',
    'assets/peajes/f2.png',
    'assets/peajes/f3.png',
    'assets/peajes/f4.png'
  ];
  function loadTollImage(src){
    const img=new Image();
    img.decoding='async';
    img.loading='eager';
    try{img.fetchPriority='high';}catch(e){}
    img.src=new URL(src,document.baseURI).href;
    return img;
  }
  const tollStageImages=TOLL_STAGE_IMAGES.map(loadTollImage);
  const tollFallbackImages=TOLL_STAGE_FALLBACK_IMAGES.map(loadTollImage);
  const PLAYER_SPRITES = {vector:'player_vector',pulse:'player_pulse',titan:'player_titan'};
  const COLOR_NAMES={'#15a9ff':'Azul eléctrico','#ff3d6e':'Rojo pulso','#9b5cff':'Violeta neón','#23d18b':'Verde turbo','#ffb020':'Ámbar'};
  const TRAFFIC_SPRITES = {
    sedan:['traffic_sedan_silver','traffic_sedan_green','traffic_hatch_white'],
    coupe:['traffic_coupe_gray'], sports:['traffic_taxi_yellow','traffic_coupe_gray'],
    suv:['player_titan','traffic_hatch_white'], police:['traffic_taxi_yellow'],
    motorcycle:['traffic_moto_black','traffic_moto_red'], bus:['traffic_van_white'],
    truck:['traffic_truck_orange','traffic_truck_blue']
  };
  const OBSTACLE_SPRITES = {
    cones:['obstacle_cone'], barrier:['obstacle_barrier','obstacle_barrier_lights'],
    oil:['obstacle_oil'], pothole:['obstacle_pothole'],
    debris:['obstacle_tires','obstacle_crate','obstacle_roadwork']
  };
  function preloadSprites(){
    for(const [key,spec] of Object.entries(SPRITE_MANIFEST)){
      const img=new Image();img.decoding='async';img.src=spec.src;spriteImages[key]=img;
      if(spec.colorVariants){for(const [color,src] of Object.entries(spec.colorVariants)){const variant=new Image();variant.decoding='async';variant.src=src;variant.onload=refreshVehiclePreviews;variant.onerror=refreshVehiclePreviews;playerVariantImages[`${key}|${normalizeColor(color)}`]=variant;}}
    }
  }
  function normalizeColor(color){return String(color||'#15a9ff').toLowerCase();}
  function playerVariantSrc(key,color){const spec=SPRITE_MANIFEST[key]||{};return spec.colorVariants?.[normalizeColor(color)]||spec.src||'';}
  function tintedSprite(key,color){const variant=playerVariantImages[`${key}|${normalizeColor(color)}`];return variant?.complete&&variant.naturalWidth?variant:(spriteImages[key]||null);}
  function tintedSpriteUrl(key,color){return playerVariantSrc(key,color);}
  function refreshVehiclePreviews(){
    const key=PLAYER_SPRITES[state.car]||PLAYER_SPRITES.vector,colorName=COLOR_NAMES[normalizeColor(state.color)]||'color seleccionado',url=tintedSpriteUrl(key,state.color);
    if(els.summaryCarImage){els.summaryCarImage.src=url;els.summaryCarImage.alt=`${state.car==='pulse'?'Pulse RS':state.car==='titan'?'Titan X':'Vector GT'} en ${colorName}`;}
    if(els.bootCar)els.bootCar.style.backgroundImage=`url('${url}')`;
    document.querySelectorAll('[data-preview-car]').forEach(img=>{const carKey=PLAYER_SPRITES[img.dataset.previewCar]||PLAYER_SPRITES.vector;img.src=tintedSpriteUrl(carKey,state.color);});
  }
  function spriteReady(key){const img=spriteImages[key];return !!(img&&img.complete&&img.naturalWidth>0);}
  function chooseTrafficSprite(kind){const list=TRAFFIC_SPRITES[kind]||TRAFFIC_SPRITES.sedan;return list[Math.floor(Math.random()*list.length)];}
  function chooseObstacleSprite(type){const list=OBSTACLE_SPRITES[type]||OBSTACLE_SPRITES.debris;return list[Math.floor(Math.random()*list.length)];}
  const EVENTS = ['PEAJE 1 · LECTURA E IDENTIFICACIÓN','PEAJE 2 · ANÁLISIS Y RELACIÓN','PEAJE FINAL · DECISIÓN Y RESOLUCIÓN'];
  const COLORS = ['#ef365d','#ffb020','#8d65ff','#23d18b','#e6eef5','#2fb8ff','#ff6d2e','#b8c6d2'];
  const VEHICLE_KINDS = ['sedan','coupe','sports','suv','truck','bus','motorcycle','police'];
  const OBSTACLES = ['cones','barrier','oil','pothole','debris'];
  const LANDSCAPES=[
    {id:'dawn',name:'AMANECER URBANO',skyTop:'#22365f',skyMid:'#f39b84',horizon:'#ffe5b1',city:'#22364d',cityAccent:'#3c5f7b',mountain:'#445168',roadDark:'#111419',roadMid:'#283038',roadLight:'#364148',shoulder:'#6b7986',shoulderAlt:'#9daf98',edgeGlow:'#5dd9ff',lane:'rgba(255,255,255,.84)',windowColor:'rgba(255,232,186,.34)',lampGlow:'rgba(255,238,180,.92)'},
    {id:'rain',name:'LLUVIA URBANA',skyTop:'#1d2c3e',skyMid:'#5a6b78',horizon:'#9aa6b4',city:'#162431',cityAccent:'#243646',mountain:'#293845',roadDark:'#0d1217',roadMid:'#222a31',roadLight:'#39434b',shoulder:'#65727d',shoulderAlt:'#74808b',edgeGlow:'#3ec8f2',lane:'rgba(230,240,248,.74)',windowColor:'rgba(202,225,238,.20)',lampGlow:'rgba(226,245,255,.8)'},
    {id:'sunset',name:'ATARDECER INDUSTRIAL',skyTop:'#2b335b',skyMid:'#da7058',horizon:'#ffc472',city:'#342f45',cityAccent:'#58485b',mountain:'#4f4450',roadDark:'#111216',roadMid:'#2d292a',roadLight:'#4b4140',shoulder:'#7d6254',shoulderAlt:'#9a7a67',edgeGlow:'#ffb95f',lane:'rgba(255,248,228,.82)',windowColor:'rgba(255,214,140,.26)',lampGlow:'rgba(255,219,150,.90)'},
    {id:'night',name:'NOCHE EXTREMA',skyTop:'#020816',skyMid:'#081d39',horizon:'#3d2960',city:'#06111b',cityAccent:'#0c2233',mountain:'#111a2c',roadDark:'#05080d',roadMid:'#161d26',roadLight:'#24303c',shoulder:'#344355',shoulderAlt:'#1d2730',edgeGlow:'#53e0ff',lane:'rgba(245,250,255,.86)',windowColor:'rgba(98,221,255,.34)',lampGlow:'rgba(145,233,255,.92)'},
    {id:'storm',name:'SPRINT FINAL · TORMENTA',skyTop:'#060d19',skyMid:'#243244',horizon:'#556273',city:'#09141f',cityAccent:'#112130',mountain:'#161f2a',roadDark:'#06090d',roadMid:'#1b232b',roadLight:'#2a343d',shoulder:'#4f5d67',shoulderAlt:'#5f6a74',edgeGlow:'#7ae8ff',lane:'rgba(235,245,255,.82)',windowColor:'rgba(218,235,245,.22)',lampGlow:'rgba(205,236,255,.82)'}
  ];
  const CAREERS={
    'Interpretación':{short:'INTERPRETACIÓN',label:'Carrera de Interpretación',color:'#19c9ff',goal:'leer, comparar y transformar información cuantitativa',bankKey:'Interpretación'},
    'Argumentación':{short:'ARGUMENTACIÓN',label:'Carrera de Argumentación',color:'#ffb31a',goal:'analizar relaciones, validar procedimientos y sustentar decisiones',bankKey:'Argumentación'},
    'Formulación y ejecución':{short:'FORMULACIÓN Y EJECUCIÓN',label:'Carrera de Formulación y ejecución',color:'#31e69a',goal:'plantear modelos, ejecutar cálculos y resolver problemas',bankKey:'Formulación y ejecución'}
  };
  function questionsForRace(race){
    const key=(CAREERS[race]||CAREERS['Interpretación']).bankKey;
    return BANK.questions.filter(q=>(q.race_type||q.competency)===key);
  }
  function raceBankSummary(race){
    const qs=questionsForRace(race),families=new Set(qs.map(q=>q.family));
    return `${qs.length} preguntas parametrizadas · ${families.size} familias · niveles inicial, intermedio y avanzado`;
  }
  const STAGES=[
    {short:'LECTURA E IDENTIFICACIÓN',detail:'Primer peaje: comprende el contexto e identifica la información necesaria.'},
    {short:'ANÁLISIS Y RELACIÓN',detail:'Segundo peaje: relaciona datos, tablas, gráficas y procedimientos.'},
    {short:'DECISIÓN Y RESOLUCIÓN',detail:'Tercer y último peaje: resuelve el problema y justifica la decisión cuantitativa.'},
    {short:'SPRINT FINAL',detail:'Las tres preguntas terminaron. Esquiva el último tramo y cruza el FINISH.'}
  ];


  const state = {
    mode:'practice', student:'', email:'', career:'Interpretación', count:3, car:'vector', color:'#15a9ff', seed:0, questions:[], index:0, answers:[],
    earned:0, score:0, startedAt:0, finishedAt:0, started:false, finished:false, disqualified:false, paused:false,
    inQuestion:false, questionAnswered:false, hintUsed:false, selected:null, phase:'drive', distance:0, nextCheckpoint:1200,
    checkpointGap:920, finishDistance:Infinity, speed:82, targetSpeed:96, maxSpeed:148, turboMaxSpeed:178,
    steering:0, lateralVelocity:0, steeringAngle:0, health:5, maxHealth:5, streak:0, bestStreak:0, integrity:0,
    drivingPoints:0, collisions:0, collisionsAtLastQuestion:0, nitroUntil:0, turboCharge:45, shieldUntil:0,
    invulnerableUntil:0, speedLimitUntil:0, rivalPressure:0, sound:true, lastTime:0, traffic:[], obstacles:[], particles:[],
    roadOffset:0, spawnClock:0, obstacleClock:2.2, surpriseClock:11, weather:'clear', weatherUntil:0, shake:0,
    slipUntil:0, lastIntegrityAt:0, securityOpen:false, reportCache:null, device:null, controlMode:'keyboard',
    trafficLevel:'extreme', lanes:4, performance:'high', elapsedDrive:0, eventNoticeStage:0, eventIntro:false,
    eventIntroTimer:null, pendingEmergency:false, pendingPostEvent:null, lastQuestionAt:0, lastCollisionAt:0,
    lastPilotToastAt:0, cleanPasses:0, turboPasses:0, playerYFactor:.79, lastHudAt:0,
    playerCrashVX:0, playerCrashVY:0, playerCrashOffsetY:0, playerRotation:0, playerAngularVelocity:0,
    lastImpulse:null, lastImpulseUntil:0, finishCelebrating:false, fullscreenReady:false, wrongPenaltyUntil:0, laneForceDwell:0, laneForceUntil:0, laneForceCooldownUntil:0, laneForceTarget:null, laneForceDirection:0, laneForceToastAt:0, stageTheme:'day', stageThemeName:'DÍA CLARO', stageThemeChangedAt:0, stageFinishAnnounced:false, tollGateLane:1, tollReached:false, tollQuestionUnlocked:false, tollActive:false, tollRequiredSeconds:60, stageDriveElapsed:0, tollMisses:0, tollAttempts:[], questionTimeLimit:90, questionStartedAt:0, questionDeadline:0, questionTimedOut:false, hintLockedForCurrentQuestion:false, tollEntryCorrect:true
  };

  const held = {left:false, right:false, up:false, down:false, turbo:false};
  let audioCtx = null;
  const AUDIO_MANIFEST={
    music:{
      menu:{src:'assets/audio/menu.mp3',loop:true,volume:.23},
      drive:{src:'assets/audio/drive.mp3',loop:true,volume:.21},
      question:{src:'assets/audio/question.mp3',loop:true,volume:.145},
      toll:{src:'assets/audio/toll.mp3',loop:true,volume:.23},
      finish:{src:'assets/audio/finish.mp3',loop:false,volume:.34}
    },
    layers:{
      engine:{src:'assets/audio/engine.mp3',loop:true,volume:.095},
      ambMenu:{src:'assets/audio/amb_menu.mp3',loop:true,volume:.075},
      ambStage1:{src:'assets/audio/amb_stage1.mp3',loop:true,volume:.085},
      ambStage2:{src:'assets/audio/amb_stage2.mp3',loop:true,volume:.105},
      ambStage3:{src:'assets/audio/amb_stage3.mp3',loop:true,volume:.090},
      ambStage4:{src:'assets/audio/amb_stage4.mp3',loop:true,volume:.092},
      ambQuestion:{src:'assets/audio/amb_question.mp3',loop:true,volume:.060},
      ambToll:{src:'assets/audio/amb_toll.mp3',loop:true,volume:.105},
      ambFinish:{src:'assets/audio/amb_finish.mp3',loop:true,volume:.090},
      tollProximity:{src:'assets/audio/toll_proximity.mp3',loop:true,volume:.16}
    },
    sfx:{
      start:{src:'assets/audio/start.mp3',volume:.72,duck:.52,duckMs:1700},
      tollAlert:{src:'assets/audio/toll_alert.mp3',volume:.70,duck:.58,duckMs:1250},
      tollArrive:{src:'assets/audio/toll_arrive.mp3',volume:.77,duck:.45,duckMs:1800},
      correct:{src:'assets/audio/correct.mp3',volume:.75,duck:.38,duckMs:1450},
      wrong:{src:'assets/audio/wrong.mp3',volume:.72,duck:.36,duckMs:1450},
      crashLight:{src:'assets/audio/crash_light.mp3',volume:.68,duck:.60,duckMs:650},
      crashHeavy:{src:'assets/audio/crash_heavy.mp3',volume:.88,duck:.42,duckMs:1100},
      skid:{src:'assets/audio/tire_skid.mp3',volume:.66,duck:.64,duckMs:850},
      ui:{src:'assets/audio/ui.mp3',volume:.38,duck:.88,duckMs:220}
    }
  };
  const AUDIO_LEVELS={master:.88,music:1,ambience:.82,effects:1};
  const audioBank={music:{},layers:{},sfx:{}},activeSfx=new Set();
  let audioUnlocked=false,currentMusicName='',currentAmbienceName='',audioSceneName='',audioDuckUntil=0,audioDuckFactor=1,audioVisibilityPaused=false,lastImpactSfxAt=0,lastTollPulseAt=0;
  function createAudio(spec){
    const a=new Audio(spec.src);
    a.preload='auto';a.loop=!!spec.loop;a.volume=0;
    /* No se usa crossOrigin: los audios son locales dentro del paquete SCORM y también deben funcionar al abrir el proyecto extraído. */
    return a;
  }
  function initAudio(){
    for(const [name,spec] of Object.entries(AUDIO_MANIFEST.music)){const a=createAudio(spec);audioBank.music[name]=a;a.load?.();}
    for(const [name,spec] of Object.entries(AUDIO_MANIFEST.layers)){const a=createAudio(spec);audioBank.layers[name]=a;a.load?.();}
    for(const [name,spec] of Object.entries(AUDIO_MANIFEST.sfx)){const a=createAudio(spec);audioBank.sfx[name]=a;a.load?.();}
    updateSoundButton();
  }
  function effectiveVolume(value,group='music'){const level=group==='music'?AUDIO_LEVELS.music:group==='ambience'?AUDIO_LEVELS.ambience:AUDIO_LEVELS.effects;return clamp(value*AUDIO_LEVELS.master*level,0,1);}
  function fadeAudio(audio,target,duration=420,pauseAtEnd=false){
    if(!audio)return;const token=(audio._fadeToken||0)+1;audio._fadeToken=token;const start=Number(audio.volume)||0,t0=performance.now();
    const step=now=>{if(audio._fadeToken!==token)return;const t=clamp((now-t0)/Math.max(1,duration),0,1),smooth=t*t*(3-2*t);audio.volume=clamp(start+(target-start)*smooth,0,1);if(t<1)requestAnimationFrame(step);else if(pauseAtEnd&&target<=.001){audio.pause();audio.currentTime=0;}};
    requestAnimationFrame(step);
  }
  function unlockAudio(){
    if(!audioUnlocked)audioUnlocked=true;
    try{audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();audioCtx.resume?.();}catch(e){}
    if(state.sound&&!state.started)updateAudioScene(true);
  }
  function musicTarget(name){
    const spec=AUDIO_MANIFEST.music[name];if(!spec)return 0;
    const pausedFactor=(state.paused&&!state.inQuestion&&!state.eventIntro)?.34:1;
    const duck=Date.now()<audioDuckUntil?audioDuckFactor:1;
    return effectiveVolume(spec.volume*pausedFactor*duck,'music');
  }
  function setMusic(name,force=false){
    if(!audioUnlocked||!state.sound||!AUDIO_MANIFEST.music[name])return;
    const same=currentMusicName===name;
    if(same){
      const a=audioBank.music[name];
      if(a&&a.paused&&!audioVisibilityPaused)a.play().catch(()=>{});
      if(a)fadeAudio(a,musicTarget(name),force?180:280,false);
      audioSceneName=name;return;
    }
    const previous=audioBank.music[currentMusicName];if(previous)fadeAudio(previous,0,420,true);
    currentMusicName=name;audioSceneName=name;
    const next=audioBank.music[name],spec=AUDIO_MANIFEST.music[name];if(!next)return;
    next.loop=!!spec.loop;next.playbackRate=1;next.currentTime=0;next.volume=0;
    if(!audioVisibilityPaused)next.play().then(()=>fadeAudio(next,musicTarget(name),560,false)).catch(()=>{});
  }
  function ambienceTarget(name){
    const spec=AUDIO_MANIFEST.layers[name];if(!spec)return 0;
    const pausedFactor=(state.paused&&!state.inQuestion&&!state.eventIntro)?.28:1;
    const duck=Date.now()<audioDuckUntil?Math.max(.62,audioDuckFactor):1;
    return effectiveVolume(spec.volume*pausedFactor*duck,'ambience');
  }
  function desiredAmbienceScene(){
    if(state.finished||state.finishCelebrating||state.phase==='final')return'ambFinish';
    if(!state.started)return'ambMenu';
    if(state.inQuestion)return'ambQuestion';
    if(state.eventIntro||tollApproaching())return'ambToll';
    const stage=Math.min(Math.max(state.index,0),3)+1;
    return`ambStage${stage}`;
  }
  function setAmbience(name,force=false){
    if(!audioUnlocked||!state.sound||!AUDIO_MANIFEST.layers[name])return;
    if(currentAmbienceName===name){
      const same=audioBank.layers[name];
      if(same&&same.paused&&!audioVisibilityPaused)same.play().catch(()=>{});
      if(same)fadeAudio(same,ambienceTarget(name),force?180:360,false);
      return;
    }
    const previous=audioBank.layers[currentAmbienceName];if(previous)fadeAudio(previous,0,650,true);
    currentAmbienceName=name;
    const next=audioBank.layers[name];if(!next)return;
    next.currentTime=0;next.playbackRate=1;next.volume=0;
    if(!audioVisibilityPaused)next.play().then(()=>fadeAudio(next,ambienceTarget(name),720,false)).catch(()=>{});
  }
  function duckMusic(duration=900,factor=.55){
    audioDuckUntil=Math.max(audioDuckUntil,Date.now()+duration);audioDuckFactor=Math.min(audioDuckFactor,factor);
    const music=audioBank.music[currentMusicName];if(music)fadeAudio(music,musicTarget(currentMusicName),100,false);
    setTimeout(()=>{if(Date.now()>=audioDuckUntil){audioDuckFactor=1;updateAudioScene();}},duration+40);
  }
  function playSfx(name,volumeScale=1){
    if(!audioUnlocked||!state.sound)return;const base=audioBank.sfx[name],spec=AUDIO_MANIFEST.sfx[name];if(!base||!spec)return;
    const a=base.cloneNode();a.volume=effectiveVolume(spec.volume*volumeScale,'effects');activeSfx.add(a);
    const clear=()=>activeSfx.delete(a);a.addEventListener('ended',clear,{once:true});a.addEventListener('error',clear,{once:true});
    if(spec.duckMs)duckMusic(spec.duckMs,spec.duck||.55);
    a.play().catch(clear);
  }

  function playImpactSfx(strong=false,volumeScale=1){
    const now=Date.now(),minGap=strong?330:190;
    if(now-lastImpactSfxAt<minGap)return;
    lastImpactSfxAt=now;
    playSfx(strong?'crashHeavy':'crashLight',volumeScale);
  }
  function playTollPulse(volumeScale=.45){
    const now=Date.now();
    if(now-lastTollPulseAt<650)return;
    lastTollPulseAt=now;
    playSfx('tollAlert',volumeScale);
  }
  function stopAllAudio(reset=true){
    for(const group of [audioBank.music,audioBank.layers])for(const a of Object.values(group)){a.pause();if(reset)a.currentTime=0;a.volume=0;}
    for(const a of activeSfx){a.pause();a.currentTime=0;}activeSfx.clear();
    if(reset){currentMusicName='';currentAmbienceName='';audioSceneName='';audioDuckUntil=0;audioDuckFactor=1;lastImpactSfxAt=0;lastTollPulseAt=0;}
  }
  function updateSoundButton(){
    if(!els.sound)return;els.sound.style.opacity=state.sound?'1':'.48';els.sound.title=state.sound?'Silenciar música y efectos':'Activar música y efectos';
    const icon=els.sound.querySelector('span'),label=els.sound.querySelector('b');if(icon)icon.textContent=state.sound?'◖)))':'◖×';if(label)label.textContent=state.sound?'SONIDO':'SILENCIO';
  }
  function setSoundEnabled(enabled){
    state.sound=!!enabled;updateSoundButton();
    if(!state.sound){stopAllAudio(true);return;}
    unlockAudio();updateAudioScene(true);playSfx('ui',.72);
  }
  function desiredAudioScene(){
    if(state.finished||state.finishCelebrating)return'finish';
    if(!state.started)return'menu';
    if(state.inQuestion)return'question';
    if(state.eventIntro||tollApproaching())return'toll';
    return'drive';
  }
  function updateAudioScene(force=false){
    if(!audioUnlocked||!state.sound||audioVisibilityPaused)return;
    const desired=desiredAudioScene();if(force||desired!==audioSceneName)setMusic(desired,force);
    const desiredAmbience=desiredAmbienceScene();if(force||desiredAmbience!==currentAmbienceName)setAmbience(desiredAmbience,force);
    const music=audioBank.music[currentMusicName];if(music){
      const target=musicTarget(currentMusicName);if(Math.abs(music.volume-target)>.012)music.volume=lerp(music.volume,target,.16);
      music.playbackRate=currentMusicName==='drive'&&state.phase==='final'?1.075:1;
    }
    const ambience=audioBank.layers[currentAmbienceName];if(ambience){
      const target=ambienceTarget(currentAmbienceName);if(Math.abs(ambience.volume-target)>.008)ambience.volume=lerp(ambience.volume,target,.12);
      ambience.playbackRate=currentAmbienceName==='ambStage2'&&state.weather==='storm'?.96:1;
    }
    const engine=audioBank.layers.engine,engineSpec=AUDIO_MANIFEST.layers.engine;
    const engineOn=state.started&&!state.finished&&!state.finishCelebrating&&!state.paused&&!state.inQuestion&&!state.eventIntro;
    if(engineOn){
      if(engine.paused){engine.volume=0;engine.play().catch(()=>{});}
      const targetRate=clamp(.70+state.speed/185*.74,.70,1.47);engine.playbackRate=lerp(engine.playbackRate||1,targetRate,.10);
      const approachFactor=tollApproaching()?.66:1,turboFactor=(Date.now()<state.nitroUntil||held.turbo)?1.12:1;
      const targetVol=effectiveVolume(clamp(engineSpec.volume*(.38+state.speed/170*.72)*approachFactor*turboFactor,.018,.125),'effects');
      engine.volume=lerp(engine.volume,targetVol,.13);
    }else if(engine&&!engine.paused)fadeAudio(engine,0,210,true);

    const proximity=audioBank.layers.tollProximity,proximitySpec=AUDIO_MANIFEST.layers.tollProximity;
    const remaining=tollRemaining(),proximityOn=tollApproaching()&&!state.paused&&!state.eventIntro&&remaining<650;
    if(proximityOn){
      if(proximity.paused){proximity.volume=0;proximity.currentTime=0;proximity.play().catch(()=>{});}
      const intensity=clamp(1-remaining/650,0,1);
      proximity.playbackRate=lerp(.82,1.34,intensity);
      const target=effectiveVolume(proximitySpec.volume*(.16+.84*intensity),'effects');
      proximity.volume=lerp(proximity.volume,target,.16);
    }else if(proximity&&!proximity.paused)fadeAudio(proximity,0,260,true);
  }
  function pauseAudioForVisibility(){
    if(!state.sound||!audioUnlocked)return;audioVisibilityPaused=true;
    for(const group of [audioBank.music,audioBank.layers])for(const a of Object.values(group))a.pause();
  }
  function resumeAudioFromVisibility(){
    if(!state.sound||!audioUnlocked)return;audioVisibilityPaused=false;updateAudioScene(true);
  }
  let raf = 0;
  let toastTimer = 0;
  let playerLanePos = 1;
  let bootTime = 0;

  function mulberry32(a){return () => {let t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
  function shuffle(arr,rng=Math.random){arr=[...arr];for(let i=arr.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
  function lerp(a,b,t){return a+(b-a)*t;}
  function fmt(n,d=2){return Number(n).toLocaleString('es-CO',{minimumFractionDigits:d,maximumFractionDigits:d});}
  function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
  function typesetMath(nodes){const targets=(Array.isArray(nodes)?nodes:[nodes]).filter(Boolean);const run=()=>{if(window.MathJax&&MathJax.typesetPromise){try{MathJax.typesetClear?.(targets);MathJax.typesetPromise(targets).catch(()=>{});}catch(e){}}};if(window.MathJax?.typesetPromise)run();else setTimeout(run,180);} 
  function ensureCardHtml(card,cls){let box=card.querySelector('.'+cls);if(!box){box=document.createElement('div');box.className=cls;card.appendChild(box);}return box;}
  function ensureRelevantInfoBox(container){let box=container?.querySelector('.relevant-info-card');if(!box&&container){box=document.createElement('article');box.className='relevant-info-card';box.innerHTML='<small>INFORMACIÓN RELEVANTE</small><div class="relevant-info-content"></div>';container.prepend(box);}return box;}


  function approach(value,target,delta){return value<target?Math.min(value+delta,target):Math.max(value-delta,target);}
  function carProfile(){
    if(state.car==='pulse')return {max:151,turbo:181,accel:27,brake:39,steer:1.32,health:5};
    if(state.car==='titan')return {max:141,turbo:169,accel:19,brake:32,steer:1.02,health:6};
    return {max:158,turbo:188,accel:24,brake:36,steer:1.15,health:5};
  }
  function eventInfo(){
    const level=Math.min(state.index+1,3),career=CAREERS[state.career]||CAREERS['Interpretación'];
    const info=[
      {reason:`La primera etapa terminó. El peaje libera una pregunta inicial de ${state.career}: primero lee el contexto y luego identifica la información necesaria.`,correct:'La barrera abre de inmediato: recibes escudo y una recarga inicial de turbo.',wrong:'La barrera abre lentamente y el siguiente tramo comienza con velocidad limitada.'},
      {reason:`Has completado el segundo tramo. Este peaje libera una pregunta intermedia de ${state.career}: relaciona los datos, la representación y el procedimiento solicitado.`,correct:'Obtienes turbo adicional y una ventana de adelantamiento limpio.',wrong:'Aparece un vehículo bloqueador y el motor queda temporalmente en potencia reducida.'},
      {reason:`Llegaste al tercer y último peaje. Se libera una pregunta avanzada de ${state.career}: resuelve el problema y toma la decisión final antes del sprint hacia la meta.`,correct:'El peaje final abre y comienzas el sprint con escudo y una ventaja de turbo.',wrong:'El peaje abre, pero el sprint final comienza con obras y velocidad limitada.'}
    ][level-1];
    return {title:EVENTS[level-1],rawTitle:EVENTS[level-1],reason:info.reason,correct:info.correct,wrong:`${info.wrong} Además, una respuesta incorrecta activa potencia 50 % durante 11 segundos.`};
  }
  function stageIndex(){
    if(state.phase==='final'||state.phase==='finished'||state.index>=state.count)return 3;
    return clamp(state.index,0,2);
  }
  function updateStageHUD(){
    const idx=stageIndex(),info=STAGES[idx],career=CAREERS[state.career]||CAREERS['Interpretación'];
    const stageNo=Math.min(state.index+1,state.count);
    if(els.stageTitle)els.stageTitle.textContent=idx===3?`${career.short} · ${info.short}`:`${career.short} · PEAJE ${stageNo} · ${info.short}`;
    if(els.stageCounter)els.stageCounter.textContent=idx===3?'PREGUNTAS 3 / 3 · META ADELANTE':`PREGUNTA ${stageNo} / ${state.count}`;
    if(els.stageDetail)els.stageDetail.textContent=`${info.detail} · Paisaje: ${state.stageThemeName}`;
    if(els.stageTrack)[...els.stageTrack.children].forEach((node,i)=>{node.classList.toggle('done',i<idx);node.classList.toggle('active',i===idx);});
    if(els.eventStageBadge)els.eventStageBadge.textContent=idx===3?'SPRINT FINAL':`PEAJE ${stageNo} / ${state.count}`;
  }
  function speedStateLabel(){
    if(Date.now()<state.wrongPenaltyUntil)return held.turbo&&state.turboCharge>0?'MEDIO TURBO 50%':'POTENCIA 50%';
    if(Date.now()<state.laneForceUntil)return state.laneForceDirection<0?'FUERZA ← CARRIL':'FUERZA CARRIL →';
    if(Date.now()<state.nitroUntil||(held.turbo&&state.turboCharge>0))return 'TURBO';
    if(held.down)return 'FRENANDO';
    if(held.up)return 'ACELERANDO';
    if(state.speed<55)return 'VELOCIDAD BAJA';
    if(state.speed<78)return 'RECUPERACIÓN';
    if(state.speed>130)return 'ALTA VELOCIDAD';
    return 'CRUCERO';
  }

  function landscapeForStage(index){return LANDSCAPES[index%LANDSCAPES.length];}
  function setStageLandscape(index,announce=true){
    const theme=landscapeForStage(index);state.stageTheme=theme.id;state.stageThemeName=theme.name;state.stageThemeChangedAt=Date.now();state.weather='clear';state.weatherUntil=0;
    if(announce){toast(`NUEVA ETAPA · PAISAJE: ${theme.name}`,'good');showImpact(`ETAPA ${Math.min(index+1,state.count)} / ${state.count}`,`El paisaje cambia a ${theme.name}. Al final te espera un peaje cuantitativo.`);}
    if(state.started&&audioUnlocked&&state.sound)updateAudioScene(true);
  }
  function visualWeather(){
    if(state.weather!=='clear')return state.weather;
    if(state.stageTheme==='rain')return 'rain';
    if(state.stageTheme==='storm')return 'storm';
    return 'clear';
  }
  function formatClock(seconds){const s=Math.max(0,Math.ceil(seconds));return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;}
  function formatResponseTime(seconds){const s=Math.max(0,Math.round(Number(seconds)||0));return `${Math.floor(s/60)} min ${String(s%60).padStart(2,'0')} s`;}
  function tollRemaining(){return state.tollActive?Math.max(0,state.nextCheckpoint-state.distance):Infinity;}
  function tollApproaching(){return state.tollActive&&(state.phase==='drive'||state.phase==='finalApproach')&&state.index<state.count&&tollRemaining()<901;}
  function tollPhotoBlend(){
    if(!tollApproaching())return 0;
    return clamp((520-tollRemaining())/105,0,1);
  }
  function tollPhotoTransition(){return tollPhotoBlend()>0;}
  function tollPhotoActive(){return tollPhotoBlend()>=.98;}

  function activateTollGate(){
    if(state.tollActive||state.inQuestion||state.eventIntro||state.phase==='final'||state.index>=state.count)return;
    state.tollActive=true;state.tollQuestionUnlocked=true;playTollPulse(.72);state.stageFinishAnnounced=true;state.eventNoticeStage=0;state.nextCheckpoint=state.distance+900;state.tollGateLane=Math.min(state.index,state.lanes-1);
    updateAudioScene(true);
    toast(`MINUTO DE MANEJO COMPLETADO · PEAJE ${state.index+1} VISIBLE`,'good');
    showImpact('PEAJE CUANTITATIVO LIBERADO',`La cabina verde está a 900 m. Debes entrar obligatoriamente por el carril ${state.tollGateLane+1}.`);
    els.mission.textContent=`PEAJE LIBERADO · ENTRA POR LA CABINA VERDE DEL CARRIL ${state.tollGateLane+1}`;updateStageHUD();
  }
  function handleTollCrossing(){
    if(!state.tollActive||state.eventIntro||state.inQuestion)return;
    const enteredLane=playerLane(),greenLane=state.tollGateLane,centered=Math.abs(playerLanePos-greenLane)<=.52;
    state.tollActive=false;state.nextCheckpoint=Infinity;
    if(enteredLane!==greenLane||!centered){
      state.tollMisses++;state.drivingPoints=Math.max(0,state.drivingPoints-250);state.hintLockedForCurrentQuestion=true;state.tollEntryCorrect=false;
      state.tollAttempts.push({stage:state.index+1,success:false,enteredLane:enteredLane+1,greenLane:greenLane+1,driveSeconds:state.stageDriveElapsed,penalty:-250,hintAccess:false,timestamp:new Date().toISOString()});
      state.speed=Math.min(state.speed,58);
      showImpact('CABINA INCORRECTA · PISTA BLOQUEADA',`Entraste por el carril ${enteredLane+1}, pero la cabina verde estaba en el carril ${greenLane+1}. Pierdes 250 puntos de piloto. La pregunta se habilita, pero no tendrás acceso a la pista matemática.`);
      toast('CABINA INCORRECTA · −250 PUNTOS · SIN PISTA EN ESTA PREGUNTA','bad');playSfx('wrong',.75);playTone(120,.38,'sawtooth');updateHUD();RallyScorm.save(scormState());beginEventIntro();return;
    }
    state.hintLockedForCurrentQuestion=false;state.tollEntryCorrect=true;
    state.tollAttempts.push({stage:state.index+1,success:true,enteredLane:enteredLane+1,greenLane:greenLane+1,driveSeconds:state.stageDriveElapsed,penalty:0,hintAccess:true,timestamp:new Date().toISOString()});
    beginEventIntro();
  }
  function randomizeQuestionOptions(question,rng){
    const originalCorrect=question.correct_letter;
    const shuffled=shuffle((question.options||[]).map(o=>({...o,_isCorrect:o.letter===originalCorrect})),rng);
    const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const options=shuffled.map((o,i)=>{const copy={...o,letter:letters[i]};delete copy._isCorrect;return copy;});
    const correctIndex=shuffled.findIndex(o=>o._isCorrect);
    return {...question,options,correct_letter:letters[Math.max(0,correctIndex)],original_correct_letter:originalCorrect,run_option_order:options.map(o=>o.text)};
  }
  function selectQuestions(career,seed){
    const rng=mulberry32(seed),pool=questionsForRace(career),selected=[],usedFamilies=new Set(),usedIds=new Set();
    const firstSource=rng()<.5?'pro':'tyt';
    for(const rank of [1,2,3]){
      const preferred=rank%2===1?firstSource:(firstSource==='pro'?'tyt':'pro');
      const tier=shuffle(pool.filter(q=>(q.stage_rank||q.difficulty_rank)===rank),rng);
      let q=tier.find(x=>x.source_code===preferred&&!usedFamilies.has(x.family)&&!usedIds.has(x.id));
      if(!q)q=tier.find(x=>!usedFamilies.has(x.family)&&!usedIds.has(x.id));
      if(!q)q=tier.find(x=>!usedIds.has(x.id));
      if(q){
        selected.push(randomizeQuestionOptions(q,rng));
        usedFamilies.add(q.family);
        usedIds.add(q.id);
      }
    }
    if(selected.length<3){
      for(const q of shuffle(pool,rng)){
        if(!usedIds.has(q.id)){
          selected.push(randomizeQuestionOptions(q,rng));usedIds.add(q.id);
          if(selected.length===3)break;
        }
      }
    }
    return selected.sort((a,b)=>(a.stage_rank||a.difficulty_rank)-(b.stage_rank||b.difficulty_rank)).slice(0,3);
  }

  function detectDevice(){
    const ua=navigator.userAgent||'';
    const platform=navigator.platform||'';
    const touchPoints=navigator.maxTouchPoints||0;
    const coarse=matchMedia('(pointer:coarse)').matches;
    const ipad=/iPad/i.test(ua)||(platform==='MacIntel'&&touchPoints>1);
    const iphone=/iPhone|iPod/i.test(ua);
    const android=/Android/i.test(ua);
    const minSide=Math.min(screen.width,screen.height);
    const maxSide=Math.max(screen.width,screen.height);
    let type='desktop';
    if(ipad||(touchPoints>0&&minSide>=600&&maxSide>=900)) type='tablet';
    else if(iphone||android||(touchPoints>0&&minSide<600)) type='mobile';
    const platformName=ipad?'iPad':iphone?'iPhone':android?(type==='tablet'?'Tableta Android':'Celular Android'):/Windows/i.test(ua)?'PC Windows':/Mac/i.test(ua)?'Mac':'Computador';
    const touch=coarse||touchPoints>0;
    return {type,platform:platformName,touch,touchPoints,coarse,width:innerWidth,height:innerHeight,pixelRatio:devicePixelRatio||1};
  }

  function updateViewportVars(){
    const viewport=window.visualViewport;
    const height=viewport?.height||innerHeight;
    document.documentElement.style.setProperty('--vh',`${height*.01}px`);
  }

  function updateDeviceProfile(first=false){
    const oldType=state.device?.type;
    const viewport=window.visualViewport;
    const viewportWidth=Math.max(1,Math.round(viewport?.width||innerWidth));
    const viewportHeight=Math.max(1,Math.round(viewport?.height||innerHeight));
    state.device=detectDevice();
    state.device.width=viewportWidth;
    state.device.height=viewportHeight;

    document.body.classList.remove(
      'device-mobile','device-tablet','device-desktop',
      'boot-compact','boot-short','boot-portrait','boot-landscape'
    );
    document.body.classList.add(`device-${state.device.type}`);

    const ratio=viewportWidth/viewportHeight;
    const compactMenu=(viewportHeight<=760)||(viewportWidth<=1180)||(ratio>=1.65&&viewportHeight<=850);
    const shortMenu=viewportHeight<=650;
    document.body.classList.toggle('boot-compact',compactMenu);
    document.body.classList.toggle('boot-short',shortMenu);
    document.body.classList.toggle('boot-portrait',viewportHeight>viewportWidth);
    document.body.classList.toggle('boot-landscape',viewportWidth>=viewportHeight);

    const requested=els.controlMode?.value||'auto';
    state.controlMode=requested==='auto'?(state.device.touch?'touch':'keyboard'):requested;
    document.body.classList.remove('controls-touch','controls-keyboard','controls-auto');
    document.body.classList.add(`controls-${state.controlMode}`);
    state.lanes=(state.device.type==='mobile'&&viewportWidth<viewportHeight)?3:4;
    playerLanePos=clamp(playerLanePos,0,state.lanes-1);
    const pixels=viewportWidth*viewportHeight*(devicePixelRatio||1);
    state.performance=(state.device.type==='desktop'&&pixels<5500000)?'high':pixels<3500000?'medium':'low';
    const controlLabel=state.controlMode==='touch'?'Flechas táctiles + acelerar, frenar y turbo':'Flechas/WASD + acelerar, frenar y turbo';
    if(els.deviceName)els.deviceName.textContent=`${state.device.platform} · ${viewportWidth} × ${viewportHeight}`;
    if(els.deviceControls)els.deviceControls.textContent=`${compactMenu?'Interfaz compacta · ':''}${controlLabel}`;
    if(els.deviceBadgeText)els.deviceBadgeText.textContent=state.controlMode==='touch'?'TÁCTIL + TURBO':'TECLADO + TURBO';
    if(state.started&&state.device.touch&&viewportHeight>viewportWidth&&state.device.type!=='desktop'){
      els.orientationHint.hidden=false;
      setTimeout(()=>{els.orientationHint.hidden=true;},2600);
    } else if(els.orientationHint){els.orientationHint.hidden=true;}
    if(first||oldType!==state.device.type) resize();
  }

  function resizeCanvas(canvas){
    const rect=canvas.getBoundingClientRect();
    const cap=state.performance==='low'?1.25:state.performance==='medium'?1.6:2;
    const dpr=Math.min(devicePixelRatio||1,cap);
    const w=Math.max(1,Math.round(rect.width*dpr));
    const h=Math.max(1,Math.round(rect.height*dpr));
    if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
    canvas._dpr=dpr;
  }
  function resize(){updateViewportVars();resizeCanvas(els.bootCanvas);resizeCanvas(els.canvas);}
  function ctx2d(canvas){const ctx=canvas.getContext('2d');ctx.setTransform(canvas._dpr||1,0,0,canvas._dpr||1,0,0);return ctx;}

  function playTone(freq=440,dur=.12,type='sine',vol=.06){
    if(!state.sound)return;
    try{
      audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();
      const o=audioCtx.createOscillator(),g=audioCtx.createGain();
      o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(vol,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+dur);
      o.connect(g).connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+dur);
    }catch(e){}
  }
  function toast(msg,type=''){clearTimeout(toastTimer);els.toast.textContent=msg;els.toast.className=`toast show ${type}`;toastTimer=setTimeout(()=>els.toast.className='toast',2300);}
  function carLabel(car){return car==='pulse'?'Pulse RS':car==='titan'?'Titan X':'Vector GT';}
  function updateSelectionSummary(){
    const modeLabel=state.mode==='exam'?'Evaluación':'Entrenamiento';
    const controlLabel=state.controlMode==='touch'?'Botones táctiles':state.controlMode==='keyboard'?'Teclado: flechas/WASD':'Automático según dispositivo';
    if(els.summaryMode)els.summaryMode.textContent=modeLabel;if(els.summaryCareer)els.summaryCareer.textContent=(CAREERS[state.career]||CAREERS['Interpretación']).label;if(els.summaryControls)els.summaryControls.textContent=controlLabel;if(els.summaryCar)els.summaryCar.textContent=carLabel(state.car);
    const colorName=COLOR_NAMES[normalizeColor(state.color)]||'Color seleccionado';if(els.selectedColorName)els.selectedColorName.textContent=colorName;if(els.summaryColorDot){els.summaryColorDot.style.background=state.color;els.summaryColorDot.style.boxShadow=`0 0 0 3px rgba(255,255,255,.15),0 0 18px ${state.color}`;}
    const modeRadio=document.querySelector(`input[name=mode][value="${state.mode}"]`);if(modeRadio)modeRadio.checked=true;
    const careerRadio=document.querySelector(`input[name=career][value="${CSS.escape(state.career)}"]`);if(careerRadio)careerRadio.checked=true;
    if(els.controlMode)els.controlMode.value=state.controlMode;
    refreshVehiclePreviews();
  }
  function setCarPreview(){updateSelectionSummary();const colorName=COLOR_NAMES[normalizeColor(state.color)]||'Color seleccionado';if(els.bootCar)els.bootCar.setAttribute('aria-label',`${carLabel(state.car)} en ${colorName}`);}
  const pickerConfig={
    mode:{title:'Elige la modalidad',items:[{value:'practice',label:'Entrenamiento',detail:'Practica con retroalimentación y sin vigilancia de integridad.'},{value:'exam',label:'Evaluación',detail:'Activa pantalla completa y controles de integridad.'}]},
    career:{title:'Elige el tipo de carrera',items:[
      {value:'Interpretación',label:'Carrera de Interpretación',detail:raceBankSummary('Interpretación')+'. Lectura de figuras, datos y representaciones.'},
      {value:'Argumentación',label:'Carrera de Argumentación',detail:raceBankSummary('Argumentación')+'. Análisis de relaciones y validación de decisiones.'},
      {value:'Formulación y ejecución',label:'Carrera de Formulación y ejecución',detail:raceBankSummary('Formulación y ejecución')+'. Modelación, cálculo y solución de problemas.'}
    ]},
    controls:{title:'Elige los controles',items:[{value:'auto',label:'Automático',detail:'El juego selecciona teclado o controles táctiles.'},{value:'keyboard',label:'Teclado',detail:'Flechas o WASD; espacio para turbo.'},{value:'touch',label:'Táctil',detail:'Botones en pantalla para celular o tableta.'}]},
    car:{title:'Elige el automóvil',items:[{value:'vector',label:'Vector GT',detail:'Velocidad 5 · Control 4 · Resistencia 4'},{value:'pulse',label:'Pulse RS',detail:'Velocidad 4 · Control 5 · Resistencia 4'},{value:'titan',label:'Titan X',detail:'Velocidad 3 · Control 3 · Resistencia 5'}]},
    color:{title:'Elige el color de carrocería',items:Object.entries(COLOR_NAMES).map(([value,label])=>({value,label,detail:'Carrocería, luz inferior y estela de turbo.'}))}
  };
  function selectedValueForPicker(type){return type==='mode'?state.mode:type==='career'?state.career:type==='controls'?state.controlMode:type==='car'?state.car:normalizeColor(state.color);}
  function savePickerValue(type,value){playSfx('ui');if(type==='mode')state.mode=value;else if(type==='career')state.career=value;else if(type==='controls')state.controlMode=value;else if(type==='car')state.car=value;else if(type==='color')state.color=value;updateSelectionSummary();closeSelectionModal();playTone(620,.08);}
  function openSelectionModal(type){const cfg=pickerConfig[type];if(!cfg||!els.selectionModal)return;els.selectionModal.dataset.type=type;els.selectionModalTitle.textContent=cfg.title;els.selectionOptions.innerHTML='';const selected=selectedValueForPicker(type);cfg.items.forEach(item=>{const button=document.createElement('button');button.type='button';button.className=`selection-option${item.value===selected?' selected':''}`;button.dataset.value=item.value;let visual='';if(type==='car'){const key=PLAYER_SPRITES[item.value]||PLAYER_SPRITES.vector;visual=`<img data-preview-car="${item.value}" src="${tintedSpriteUrl(key,state.color)}" alt="${item.label}">`;}else if(type==='color'){visual=`<i class="picker-color" style="background:${item.value}"></i>`;}button.innerHTML=`${visual}<span><strong>${item.label}</strong><small>${item.detail}</small></span><b>${item.value===selected?'GUARDADO':'ELEGIR'}</b>`;button.addEventListener('click',()=>savePickerValue(type,item.value));els.selectionOptions.append(button);});els.selectionModal.hidden=false;els.selectionModal.querySelector('button')?.focus();}
  function closeSelectionModal(){if(els.selectionModal)els.selectionModal.hidden=true;}
  function bindBoot(){
    els.boot?.addEventListener('pointerdown',()=>{unlockAudio();updateAudioScene(true);},{once:true});
    document.querySelectorAll('[data-picker]').forEach(b=>b.addEventListener('click',()=>openSelectionModal(b.dataset.picker)));
    els.selectionModalClose?.addEventListener('click',closeSelectionModal);els.selectionModalCancel?.addEventListener('click',closeSelectionModal);els.selectionModal?.addEventListener('click',e=>{if(e.target===els.selectionModal)closeSelectionModal();});
    els.controlMode?.addEventListener('change',()=>{state.controlMode=els.controlMode.value;updateDeviceProfile();updateSelectionSummary();});
    els.student.addEventListener('input',()=>{els.student.classList.remove('field-error');els.bootMsg.textContent='';});els.email.addEventListener('input',()=>{els.email.classList.remove('field-error');els.bootMsg.textContent='';});
    els.launch.addEventListener('click',()=>launch().catch(err=>{console.error(err);els.boot.hidden=false;els.game.hidden=true;els.bootMsg.textContent='No se pudo iniciar el Rally. Recarga la página e inténtalo nuevamente.';els.launch.disabled=false;els.launch.querySelector('span').textContent='INICIAR RALLY';}));
    els.how.addEventListener('click',()=>els.help.hidden=false);document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).hidden=true));updateSelectionSummary();
  }

  async function launch(){
    unlockAudio();
    if(els.launch.disabled)return;els.launch.disabled=true;els.launch.querySelector('span').textContent='PREPARANDO...';
    const name=els.student.value.trim();
    const email=els.email.value.trim().toLowerCase();
    els.student.classList.remove('field-error');els.email.classList.remove('field-error');
    if(!name){els.bootMsg.textContent='Escribe el nombre del estudiante para iniciar.';els.student.classList.add('field-error');els.student.focus();els.launch.disabled=false;els.launch.querySelector('span').textContent='INICIAR RALLY';return;}
    if(!email||!els.email.checkValidity()){els.bootMsg.textContent='Escribe un correo electrónico válido para iniciar.';els.email.classList.add('field-error');els.email.focus();els.launch.disabled=false;els.launch.querySelector('span').textContent='INICIAR RALLY';return;}
    if(els.controlMode)els.controlMode.value=state.controlMode;updateDeviceProfile();
    state.student=name;state.email=email;state.count=3;state.controlMode=state.controlMode||'auto';
    state.trafficLevel='extreme';state.seed=(Date.now()^(Math.random()*0xffffffff))>>>0;state.questions=selectQuestions(state.career,state.seed);if(state.questions.length!==3){els.bootMsg.textContent='El banco no contiene una pregunta válida para cada una de las tres etapas de la carrera elegida.';els.launch.disabled=false;els.launch.querySelector('span').textContent='INICIAR RALLY';return;}
    state.index=0;state.answers=[];state.earned=0;state.score=0;state.startedAt=Date.now();state.finishedAt=0;state.started=true;state.finished=false;
    state.disqualified=false;state.paused=false;state.inQuestion=false;state.phase='drive';state.distance=0;state.nextCheckpoint=Infinity;state.finishDistance=Infinity;
    const profile=carProfile();state.maxHealth=profile.health;state.health=profile.health;state.maxSpeed=profile.max;state.turboMaxSpeed=profile.turbo;state.speed=82;state.targetSpeed=96;state.steering=0;state.lateralVelocity=0;state.steeringAngle=0;
    state.streak=0;state.bestStreak=0;state.integrity=0;state.drivingPoints=0;state.collisions=0;state.collisionsAtLastQuestion=0;state.traffic=[];state.obstacles=[];
    state.particles=[];state.rivalPressure=0;state.reportCache=null;state.turboCharge=45;state.nitroUntil=0;state.spawnClock=.35;state.obstacleClock=2.4;
    state.surpriseClock=9+Math.random()*7;state.weather='clear';state.weatherUntil=0;state.shake=0;state.slipUntil=0;state.elapsedDrive=0;state.eventNoticeStage=0;state.eventIntro=false;state.pendingEmergency=false;state.pendingPostEvent=null;state.lastQuestionAt=0;state.lastCollisionAt=0;state.cleanPasses=0;state.turboPasses=0;state.playerYFactor=.79;state.playerCrashVX=0;state.playerCrashVY=0;state.playerCrashOffsetY=0;state.playerRotation=0;state.playerAngularVelocity=0;state.lastImpulse=null;state.lastImpulseUntil=0;state.finishCelebrating=false;state.wrongPenaltyUntil=0;state.laneForceDwell=0;state.laneForceUntil=0;state.laneForceCooldownUntil=0;state.laneForceTarget=null;state.laneForceDirection=0;state.laneForceToastAt=0;state.stageFinishAnnounced=false;state.tollReached=false;state.tollQuestionUnlocked=false;state.tollActive=false;state.stageDriveElapsed=0;state.tollMisses=0;state.tollAttempts=[];state.questionStartedAt=0;state.questionDeadline=0;state.questionTimedOut=false;state.hintLockedForCurrentQuestion=false;state.tollEntryCorrect=true;state.tollGateLane=Math.floor(Math.random()*state.lanes);setStageLandscape(0,false);
    playerLanePos=state.lanes%2===0?(Math.random()<.5?state.lanes/2-1:state.lanes/2):Math.floor(state.lanes/2);
    els.boot.hidden=true;els.game.hidden=false;resize();seedInitialTraffic(els.canvas.clientWidth,els.canvas.clientHeight);updateHUD();buildLadder();
    if(!RallyScorm.initialized)RallyScorm.init();RallyScorm.save(scormState());
    try{if(!document.fullscreenElement&&document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();state.fullscreenReady=!!document.fullscreenElement;}catch(e){state.fullscreenReady=false;toast('El navegador no activó pantalla completa; el Rally continúa normalmente.','bad');}
    if(state.device.touch&&innerHeight>innerWidth){els.orientationHint.hidden=false;setTimeout(()=>els.orientationHint.hidden=true,2800);}
    els.launch.disabled=false;els.launch.querySelector('span').textContent='INICIAR RALLY';playSfx('start');setTimeout(()=>{if(state.started&&!state.finished)updateAudioScene(true);},420);els.canvas.focus();state.lastTime=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);
  }

  function scormState(){return {student:state.student,email:state.email,car:state.car,color:state.color,score:state.disqualified?0:state.score,finished:state.finished,index:state.index,distance:Math.round(state.distance),phase:state.phase,seed:state.seed,count:state.count,health:state.health,integrity:state.integrity,mode:state.mode,career:state.career,answers:state.answers,device:state.device?.platform,controls:state.controlMode,wrongPenaltyRemaining:Math.max(0,state.wrongPenaltyUntil-Date.now()),landscape:state.stageTheme,tollGateLane:state.tollGateLane,tollActive:state.tollActive,stageDriveElapsed:Math.round(state.stageDriveElapsed),tollMisses:state.tollMisses,tollAttempts:state.tollAttempts,questionTimeRemaining:Math.max(0,state.questionDeadline-Date.now()),hintLockedForCurrentQuestion:state.hintLockedForCurrentQuestion,tollEntryCorrect:state.tollEntryCorrect};}

  function updateHUD(){
    els.control.textContent=`${Math.min(state.index,state.count)} / ${state.count}`;
    els.score.textContent=fmt(state.disqualified?0:state.score);els.streak.textContent=`RACHA ${state.streak}`;els.integrity.textContent=`${state.integrity} / 5`;
    if(els.pilotPoints)els.pilotPoints.textContent=Math.round(state.drivingPoints).toLocaleString('es-CO');if(els.speedState)els.speedState.textContent=speedStateLabel();
    els.health.textContent=`${state.health} / ${state.maxHealth}`;els.healthBars.innerHTML='';
    for(let i=0;i<state.maxHealth;i++){const b=document.createElement('i');if(i<state.health)b.className='on';els.healthBars.append(b);}
    els.fill.style.width=`${state.index/state.count*100}%`;
    const event=EVENTS[Math.min(state.index,EVENTS.length-1)]||'CONTROL CUANTITATIVO';els.eventName.textContent=`PEAJE · ${event}`;els.compassName.textContent='PEAJE CUANTITATIVO';
    if(state.phase==='final'){els.phase.textContent='SPRINT FINAL';els.mission.textContent=`${state.career.toUpperCase()} COMPLETADA · CRUZA EL FINISH`;}
    else if(state.inQuestion){els.phase.textContent='PEAJE CUANTITATIVO';els.mission.textContent=`PREGUNTA ${state.index+1} / ${state.count} · TIEMPO MÁXIMO 01:30`;}
    else if((state.phase==='drive'||state.phase==='finalApproach')&&!state.tollActive){const left=Math.max(0,state.tollRequiredSeconds-state.stageDriveElapsed);els.phase.textContent=state.phase==='finalApproach'?'ETAPA FINAL':'CONDUCCIÓN';els.mission.textContent=`CONDUCE ${formatClock(left)} PARA LIBERAR EL PEAJE ${state.index+1}`;}
    else if(state.phase==='finalApproach'){els.phase.textContent='PEAJE FINAL';els.mission.textContent=`ENTRA POR LA CABINA VERDE · DECISIÓN FINAL DE ${state.career.toUpperCase()}`;}
    else{els.phase.textContent=tollApproaching()?'PEAJE PRÓXIMO':'CONDUCCIÓN';els.mission.textContent=tollApproaching()?`PEAJE LIBERADO · ENTRA POR EL CARRIL VERDE ${state.tollGateLane+1}`:`NIVEL ${state.index+1} · ESQUIVA EL TRÁFICO`;}
    updateStageHUD();updateTurboUI();
  }

  function updateTurboUI(){
    const pct=clamp(state.turboCharge,0,100),half=Date.now()<state.wrongPenaltyUntil;
    if(els.touchTurboFill)els.touchTurboFill.style.height=`${pct}%`;
    if(els.touchTurbo){
      els.touchTurbo.disabled=pct<5;
      els.touchTurbo.classList.toggle('half-power',half);
      const label=els.touchTurbo.querySelector('b');if(label)label.textContent=half?'MEDIO TURBO':'TURBO';
      els.touchTurbo.setAttribute('aria-label',half?'Activar turbo limitado al cincuenta por ciento':'Activar turbo');
    }
    if(els.pilotBadge)els.pilotBadge.classList.toggle('penalty',half);
  }

  function buildLadder(){
    els.ladder.innerHTML='';
    state.questions.forEach((q,i)=>{
      const c=contextMap[q.context_id],d=document.createElement('div');d.className=`ladder-item${i===state.index?' current':''}`;d.dataset.i=i;
      d.innerHTML=`<span class="num">${i+1}</span><div><strong>${c.title}</strong><small>${q.source} · ${q.difficulty}</small></div><b>${i<state.index?'✓':'○'}</b>`;
      els.ladder.append(d);
    });
    updateProgressPanel();
  }

  function updateProgressPanel(){
    if(!state.started)return;
    const correct=state.answers.filter(a=>a.correct).length;
    const avgTime=state.answers.length?state.answers.reduce((s,a)=>s+(a.responseSeconds||0),0)/state.answers.length:0;els.progressSummary.innerHTML=`<div class="progress-cards"><div class="progress-card"><small>CARRERA</small><strong>${state.career}</strong></div><div class="progress-card"><small>NOTA ACTUAL</small><strong>${fmt(state.score)}</strong></div><div class="progress-card"><small>PRECISIÓN</small><strong>${state.answers.length?Math.round(correct/state.answers.length*100):0}%</strong></div><div class="progress-card"><small>TIEMPO PROMEDIO</small><strong>${state.answers.length?formatResponseTime(avgTime):'—'}</strong></div><div class="progress-card"><small>TIEMPOS AGOTADOS</small><strong>${state.answers.filter(a=>a.timedOut).length}</strong></div><div class="progress-card"><small>PEAJES FALLIDOS</small><strong>${state.tollMisses}</strong></div><div class="progress-card"><small>PUNTOS DE PILOTO</small><strong>${Math.round(state.drivingPoints)}</strong></div><div class="progress-card"><small>TURBO</small><strong>${Math.round(state.turboCharge)}%</strong></div></div>`;
    [...els.ladder.children].forEach((d,i)=>{
      d.classList.remove('current','done','correct','wrong');if(i===state.index&&!state.finished)d.classList.add('current');
      if(i<state.answers.length){d.classList.add('done',state.answers[i].correct?'correct':'wrong');d.lastElementChild.textContent=state.answers[i].correct?'✓':'×';}
    });
  }

  function drawBoot(t){
    const c=els.bootCanvas,x=ctx2d(c),w=c.clientWidth,h=c.clientHeight;bootTime=t*.001;x.clearRect(0,0,w,h);
    const grad=x.createLinearGradient(0,0,0,h);grad.addColorStop(0,'#0d456f');grad.addColorStop(.48,'#051522');grad.addColorStop(1,'#01070d');x.fillStyle=grad;x.fillRect(0,0,w,h);
    x.globalAlpha=.28;for(let i=0;i<110;i++){const px=(i*149.7+t*.018*(1+i%3))%w,py=(i*91.3)%h;x.fillStyle=i%5?'#2acfff':'#fff';x.fillRect(px,py,1+(i%3),1+(i%3));}
    x.globalAlpha=1;
    const horizon=h*.68;x.strokeStyle='rgba(34,204,255,.18)';x.lineWidth=1;
    for(let i=0;i<14;i++){const y=horizon+i*i*2;x.beginPath();x.moveTo(0,y);x.lineTo(w,y);x.stroke();}
    requestAnimationFrame(drawBoot);
  }

  
  function roadHorizonY(w,h){return h*(w<h?.275:.245);}
  function roadBounds(y,w,h){
    const top=roadHorizonY(w,h),t=clamp((y-top)/(h-top),0,1);
    const portrait=w<h;
    const halfTop=w*(portrait?.16:.118),halfBottom=w*(portrait?.49:.39),half=lerp(halfTop,halfBottom,t);
    return [w/2-half,w/2+half];
  }
  function laneX(lane,y,w,h){const [l,r]=roadBounds(y,w,h);return l+(r-l)*(lane+.5)/state.lanes;}
  function playerLane(){return clamp(Math.round(playerLanePos),0,state.lanes-1);}

  function roundedRect(ctx,x,y,w,h,r){
    const rr=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath();
  }

  function drawCloud(ctx,x,y,rx,ry,color,alpha=.35){
    ctx.save();ctx.globalAlpha=alpha;ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x-rx*.32,y+ry*.05,rx*.36,ry*.28,0,0,Math.PI*2);ctx.ellipse(x,y,rx*.46,ry*.34,0,0,Math.PI*2);ctx.ellipse(x+rx*.34,y+ry*.03,rx*.32,ry*.24,0,0,Math.PI*2);ctx.closePath();ctx.fill();ctx.restore();
  }
  function drawSkylineLayer(ctx,w,baseY,config){
    const {count,minW,maxW,minH,maxH,color,windowColor,offset=0,lights=.15,roofChance=.18}=config;const step=w/Math.max(1,count-2);ctx.fillStyle=color;
    for(let i=0;i<count;i++){
      const bw=minW+((i*17)%Math.max(6,(maxW-minW))),bh=minH+((i*31)%Math.max(10,(maxH-minH)));const x=((i*step+offset)%(w+maxW))-maxW*.6,y=baseY-bh;ctx.fillRect(x,y,bw,bh);
      if((i*13)%100<roofChance*100){ctx.beginPath();ctx.moveTo(x+bw*.14,y);ctx.lineTo(x+bw*.5,y-bh*.08);ctx.lineTo(x+bw*.86,y);ctx.closePath();ctx.fill();}
      if(windowColor&&lights>0){ctx.fillStyle=windowColor;ctx.globalAlpha=lights;for(let yy=y+8;yy<baseY-8;yy+=14)for(let xx=x+6;xx<x+bw-4;xx+=11)if(((xx+yy+i*11)>>1)%3!==0)ctx.fillRect(xx,yy,3,5);ctx.globalAlpha=1;ctx.fillStyle=color;}
    }
  }
  function drawIndustrialLayer(ctx,w,baseY,color,accent){
    ctx.fillStyle=color;ctx.fillRect(0,baseY,w,220);
    for(let i=0;i<4;i++){const x=w*(.08+i*.2),size=52+i*16;ctx.fillRect(x,baseY-size,size,size*.86);ctx.fillRect(x+size*.22,baseY-size-62,10,62);ctx.fillRect(x+size*.58,baseY-size-42,8,42);ctx.fillStyle=accent;ctx.fillRect(x+size*.22,baseY-size-68,10,6);ctx.fillRect(x+size*.58,baseY-size-48,8,6);ctx.fillStyle=color;}
    for(let i=0;i<3;i++){const x=w*(.16+i*.30),y=baseY-58-i*5;ctx.strokeStyle=accent;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+54,y-46);ctx.lineTo(x+100,y-46);ctx.stroke();ctx.beginPath();ctx.moveTo(x+54,y-46);ctx.lineTo(x+54,y+30);ctx.stroke();}
  }
  function drawTree(ctx,x,y,s,color){ctx.save();ctx.translate(x,y);ctx.fillStyle=color;ctx.beginPath();ctx.arc(0,-18*s,16*s,0,Math.PI*2);ctx.arc(-10*s,-6*s,13*s,0,Math.PI*2);ctx.arc(12*s,-5*s,12*s,0,Math.PI*2);ctx.fill();ctx.fillStyle='rgba(76,48,24,.8)';ctx.fillRect(-3*s,0,6*s,22*s);ctx.restore();}
  function drawGuardrail(ctx,x1,y1,x2,y2,color){ctx.strokeStyle=color;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();for(let i=0;i<=7;i++){const t=i/7,x=lerp(x1,x2,t),y=lerp(y1,y2,t);ctx.strokeStyle='rgba(208,226,236,.5)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+(x1<x2?-6:6),y+18);ctx.stroke();}}

  function stageLightConfig(){
    const id=state.stageTheme||'dawn';
    if(id==='dawn')return {dx:-10,dy:12,blur:12,alpha:.23};
    if(id==='sunset')return {dx:12,dy:12,blur:14,alpha:.26};
    if(id==='night')return {dx:6,dy:11,blur:16,alpha:.30};
    if(id==='storm')return {dx:8,dy:13,blur:18,alpha:.28};
    return {dx:5,dy:10,blur:14,alpha:.24};
  }
  function drawEntityShadow(ctx,w,h,stretch=1){
    const c=stageLightConfig();
    ctx.save();
    ctx.translate(c.dx,c.dy);
    ctx.fillStyle=`rgba(0,0,0,${c.alpha})`;
    ctx.shadowColor=`rgba(0,0,0,${Math.min(.45,c.alpha+.08)})`;
    ctx.shadowBlur=c.blur;
    ctx.beginPath();
    ctx.ellipse(0,h*.36,w*.32*stretch,h*.09*stretch,0,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
  function drawCloseCitySides(ctx,w,h,theme,horizon){
    ctx.save();
    ctx.globalAlpha=.86;
    for(const side of [-1,1]){
      const base=side<0?18:w-108;
      const drift=(state.roadOffset*(side<0?.028:.024))%138;
      const dir=side<0?1:-1;
      for(let i=0;i<4;i++){
        const bw=78+i*18,bh=116+i*24;
        const x=base+dir*i*72+dir*(side<0?-drift:drift);
        const y=horizon+20-bh+(i%2?8:0);
        const g=ctx.createLinearGradient(x,0,x+bw,0);
        g.addColorStop(0,theme.cityAccent);
        g.addColorStop(1,lighten(theme.cityAccent,.10));
        ctx.fillStyle=g;
        ctx.fillRect(x,y,bw,bh);
        ctx.fillStyle=theme.windowColor;
        ctx.globalAlpha=(theme.id==='night'||theme.id==='storm')?.31:.16;
        for(let yy=y+10;yy<y+bh-10;yy+=14){
          for(let xx=x+8;xx<x+bw-10;xx+=12){
            if(((xx+yy+i)>>1)%3!==0)ctx.fillRect(xx,yy,4,6);
          }
        }
        ctx.globalAlpha=.86;
        if(i===0||i===2){
          ctx.fillStyle=darken(theme.city,.10);
          ctx.fillRect(x+bw*.18,y-18,10,18);
          ctx.fillRect(x+bw*.55,y-30,8,30);
        }
      }
    }
    ctx.restore();
  }

  function drawRoadShoulder(ctx,side,topEdge,bottomEdge,w,h,theme){
    const horizon=roadHorizonY(w,h),innerTop=topEdge,innerBottom=bottomEdge,outerTop=side<0?innerTop-26:innerTop+26,outerBottom=side<0?innerBottom-58:innerBottom+58;
    const grad=ctx.createLinearGradient(0,horizon,0,h);grad.addColorStop(0,lighten(theme.shoulderAlt,4));grad.addColorStop(.55,theme.shoulder);grad.addColorStop(1,darken(theme.shoulder,.16));
    ctx.save();ctx.fillStyle=grad;ctx.beginPath();ctx.moveTo(innerTop,horizon);ctx.lineTo(outerTop,horizon);ctx.lineTo(outerBottom,h);ctx.lineTo(innerBottom,h);ctx.closePath();ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=1.2;for(let i=0;i<8;i++){const t=i/7,x1=lerp(innerTop,innerBottom,t),x2=lerp(outerTop,outerBottom,t),yy=lerp(horizon,h,t);ctx.beginPath();ctx.moveTo(x1,yy);ctx.lineTo(x2,yy+2);ctx.stroke();}
    ctx.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<7;i++){const t=i/6,x=lerp(outerTop,outerBottom,t),yy=lerp(horizon+10,h-12,t);ctx.fillRect(x+(side<0?-8:0),yy,8,3);}
    ctx.restore();
    drawGuardrail(ctx,outerTop,horizon+6,outerBottom,h-10,'rgba(214,226,233,.62)');
    ctx.save();ctx.strokeStyle=theme.edgeGlow;ctx.globalAlpha=.46;ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(innerTop,horizon);ctx.lineTo(innerBottom,h);ctx.stroke();ctx.restore();
  }
  function clipRoad(ctx,lt,rt,lb,rb,w,h){const horizon=roadHorizonY(w,h);ctx.beginPath();ctx.moveTo(lt,horizon);ctx.lineTo(rt,horizon);ctx.lineTo(rb,h);ctx.lineTo(lb,h);ctx.closePath();ctx.clip();}
  function drawRoadTexture(ctx,w,h,lt,rt,lb,rb,theme,weather){
    const horizon=roadHorizonY(w,h);ctx.save();clipRoad(ctx,lt,rt,lb,rb,w,h);
    const center=ctx.createLinearGradient(w*.5,horizon,w*.5,h);center.addColorStop(0,'rgba(255,255,255,.10)');center.addColorStop(.45,weather==='clear'?'rgba(255,255,255,.03)':'rgba(255,255,255,.14)');center.addColorStop(1,'rgba(255,255,255,.02)');ctx.fillStyle=center;ctx.fillRect(lt-10,horizon,(rb-lb)+40,h-horizon);
    ctx.strokeStyle='rgba(255,255,255,.04)';ctx.lineWidth=1;for(let y=horizon+10;y<h;y+=18){ctx.beginPath();ctx.moveTo(lt-30,y);ctx.lineTo(rb+30,y+(weather==='clear'?4:8));ctx.stroke();}
    for(let i=0;i<16;i++){const y=(i*97+state.roadOffset*1.8)%(h-horizon)+horizon,t=y/h,[l,r]=roadBounds(y,w,h);ctx.fillStyle=i%2?'rgba(0,0,0,.10)':'rgba(255,255,255,.025)';ctx.fillRect(lerp(l,r,.10+(i*.15)%0.76),y,18+t*22,2+t*4);}
    if(weather!=='clear'){ctx.fillStyle='rgba(90,150,190,.11)';for(let i=0;i<8;i++){const py=horizon+45+i*.1*h,px=lerp(lt,rt,.14+(i*.11)%0.68);ctx.beginPath();ctx.ellipse(px,py,22+i*5,7+i,0,0,Math.PI*2);ctx.fill();}ctx.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<9;i++){const y=horizon+38+i*.08*h;ctx.fillRect(lt+18,y,(rt-lt)-36,4);}}
    ctx.restore();
  }
  function drawRoadsideDetails(ctx,w,h,theme){
    const weather=visualWeather(),horizon=roadHorizonY(w,h);
    for(let i=0;i<9;i++){
      const y=(i*134+state.roadOffset*.88)%(h-horizon)+horizon;const [l,r]=roadBounds(y,w,h);const t=y/h,size=.20+t*.54;ctx.save();ctx.globalAlpha=.30+.20*t;
      if(theme.id==='sunset'){
        ctx.fillStyle='rgba(116,86,66,.38)';ctx.beginPath();ctx.ellipse(l-42*size,y+4*size,20*size,7*size,0,0,Math.PI*2);ctx.ellipse(r+42*size,y+4*size,20*size,7*size,0,0,Math.PI*2);ctx.fill();
      }else if(theme.id==='dawn'){
        if(i%2===0){drawTree(ctx,l-32*size,y,1.0*size,'rgba(73,108,77,.86)');drawTree(ctx,r+32*size,y,.92*size,'rgba(66,101,72,.84)');}
        else{ctx.fillStyle='rgba(78,108,73,.46)';ctx.beginPath();ctx.ellipse(l-30*size,y,16*size,7*size,0,0,Math.PI*2);ctx.ellipse(r+30*size,y,16*size,7*size,0,0,Math.PI*2);ctx.fill();}
      }else if(theme.id==='night'){
        ctx.fillStyle='rgba(47,191,255,.18)';ctx.fillRect(l-39*size,y-8*size,22*size,9*size);ctx.fillRect(r+17*size,y-8*size,22*size,9*size);
      }else if(weather!=='clear'){
        ctx.fillStyle='rgba(170,210,235,.13)';ctx.beginPath();ctx.ellipse(l-21*size,y,16*size,5*size,0,0,Math.PI*2);ctx.ellipse(r+21*size,y,16*size,5*size,0,0,Math.PI*2);ctx.fill();
      }
      ctx.restore();
    }
  }

  function drawEnvironment(ctx,w,h){
    const theme=landscapeForStage(LANDSCAPES.findIndex(x=>x.id===state.stageTheme)>=0?LANDSCAPES.findIndex(x=>x.id===state.stageTheme):0),weather=visualWeather(),horizon=roadHorizonY(w,h);
    const sky=ctx.createLinearGradient(0,0,0,h*.72);sky.addColorStop(0,theme.skyTop);sky.addColorStop(.52,theme.skyMid);sky.addColorStop(1,theme.horizon);ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
    const horizonGlow=ctx.createLinearGradient(0,horizon-120,0,horizon+90);horizonGlow.addColorStop(0,'rgba(255,255,255,0)');horizonGlow.addColorStop(.70,theme.id==='night'?'rgba(115,90,170,.18)':'rgba(255,236,190,.22)');horizonGlow.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=horizonGlow;ctx.fillRect(0,horizon-130,w,240);
    if(theme.id==='night'||theme.id==='storm'){ctx.globalAlpha=.9;for(let i=0;i<90;i++){ctx.fillStyle=i%7===0?'#75ddff':'#dbe8ff';ctx.fillRect((i*127.3)%w,(i*61.7)%(h*.24),i%5===0?2:1,i%5===0?2:1);}ctx.globalAlpha=1;ctx.fillStyle='rgba(236,246,255,.92)';ctx.beginPath();ctx.arc(w*.79,h*.14,20,0,Math.PI*2);ctx.fill();ctx.fillStyle='rgba(12,18,28,.86)';ctx.beginPath();ctx.arc(w*.785,h*.135,20,0,Math.PI*2);ctx.fill();}
    else{const sunX=w*(theme.id==='sunset'?.18:.78),sunY=h*(theme.id==='sunset'?.21:.16),g=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,96);g.addColorStop(0,'rgba(255,249,217,.98)');g.addColorStop(.22,theme.id==='dawn'?'rgba(255,199,140,.78)':'rgba(255,185,92,.62)');g.addColorStop(1,'rgba(255,185,92,0)');ctx.fillStyle=g;ctx.fillRect(sunX-120,sunY-120,240,240);} 
    const cloudColor=(theme.id==='rain'||theme.id==='storm')?'#dfe8ef':(theme.id==='sunset'?'#ffd2b5':'#f2f5fb');
    drawCloud(ctx,w*.16,h*.15,86,34,cloudColor,theme.id==='rain'||theme.id==='storm'?0.24:0.28);drawCloud(ctx,w*.50,h*.11,72,28,cloudColor,theme.id==='night'?0.08:0.22);drawCloud(ctx,w*.80,h*.18,104,38,cloudColor,theme.id==='storm'?0.14:0.2);
    ctx.fillStyle=theme.mountain;ctx.beginPath();ctx.moveTo(0,horizon+18);for(let i=0;i<=12;i++)ctx.lineTo(i*w/12,horizon-44+h*.035*Math.sin(i*1.22+stageIndex()*.63));ctx.lineTo(w,horizon+26);ctx.lineTo(w,horizon+96);ctx.lineTo(0,horizon+96);ctx.fill();
    drawSkylineLayer(ctx,w,horizon+2,{count:16,minW:28,maxW:72,minH:86,maxH:226,color:lighten(theme.cityAccent,8),windowColor:theme.windowColor,offset:-(state.roadOffset*.025)%140,lights:theme.id==='dawn'?0.05:.12,roofChance:.10});
    drawSkylineLayer(ctx,w,horizon+20,{count:18,minW:36,maxW:82,minH:78,maxH:196,color:theme.cityAccent,windowColor:theme.windowColor,offset:-(state.roadOffset*.055)%120,lights:theme.id==='dawn'?0.08:.18,roofChance:.12});
    drawSkylineLayer(ctx,w,horizon+38,{count:20,minW:28,maxW:62,minH:66,maxH:160,color:theme.city,windowColor:theme.windowColor,offset:-(state.roadOffset*.10)%90,lights:theme.id==='dawn'?0.12:(theme.id==='night'||theme.id==='storm'?0.35:.17),roofChance:.2});
    drawCloseCitySides(ctx,w,h,theme,horizon);
    ctx.fillStyle='rgba(255,255,255,.05)';ctx.fillRect(0,horizon+64,w,16);
    if(theme.id==='sunset')drawIndustrialLayer(ctx,w,horizon+44,'#2a2532','#7f735e');
    if(theme.id==='night'){ctx.fillStyle='rgba(54,210,255,.18)';for(let i=0;i<4;i++)ctx.fillRect(w*(.12+i*.18),horizon-26,48,10);}
    if(theme.id==='rain'||theme.id==='storm'){ctx.fillStyle='rgba(12,29,42,.12)';ctx.fillRect(0,0,w,h);ctx.fillStyle='rgba(220,235,245,.05)';ctx.fillRect(0,horizon-8,w,36);}
  }

  function drawSideTerrain(ctx,side,w,h,theme,horizon,topEdge,bottomEdge){
    const palette=theme.id==='dawn'?['#73836b','#596b55']:
      theme.id==='sunset'?['#856d5b','#5f5045']:
      theme.id==='night'?['#243542','#15232d']:
      (theme.id==='rain'||theme.id==='storm')?['#667781','#465660']:['#6d7c80','#526267'];
    const edgeTop=side<0?topEdge-34:topEdge+34,edgeBottom=side<0?bottomEdge-92:bottomEdge+92;
    const g=ctx.createLinearGradient(0,horizon,0,h);g.addColorStop(0,palette[0]);g.addColorStop(1,palette[1]);
    ctx.save();ctx.fillStyle=g;ctx.beginPath();
    if(side<0){ctx.moveTo(0,horizon);ctx.lineTo(edgeTop,horizon);ctx.lineTo(edgeBottom,h);ctx.lineTo(0,h);}else{ctx.moveTo(edgeTop,horizon);ctx.lineTo(w,horizon);ctx.lineTo(w,h);ctx.lineTo(edgeBottom,h);}ctx.closePath();ctx.fill();
    ctx.globalAlpha=.12;
    for(let i=0;i<18;i++){
      const t=i/17,yy=lerp(horizon+8,h-10,t),nearX=lerp(edgeTop,edgeBottom,t);
      ctx.fillStyle=i%3===0?'#e4dbc2':'#1f2b24';
      const px=nearX+(side<0?-35-(i%4)*21:35+(i%4)*21);
      ctx.beginPath();ctx.ellipse(px,yy,5+t*11,2+t*5,0,0,Math.PI*2);ctx.fill();
    }
    ctx.restore();
  }

  function drawRoad(ctx,w,h){
    drawEnvironment(ctx,w,h);
    const theme=landscapeForStage(LANDSCAPES.findIndex(x=>x.id===state.stageTheme)>=0?LANDSCAPES.findIndex(x=>x.id===state.stageTheme):0),weather=visualWeather(),horizon=roadHorizonY(w,h);
    const [lt,rt]=roadBounds(horizon,w,h),[lb,rb]=roadBounds(h,w,h);
    drawSideTerrain(ctx,-1,w,h,theme,horizon,lt,lb);
    drawSideTerrain(ctx,1,w,h,theme,horizon,rt,rb);
    const asphalt=ctx.createLinearGradient(lt,0,rt,0);asphalt.addColorStop(0,theme.roadDark);asphalt.addColorStop(.18,theme.roadMid);asphalt.addColorStop(.50,theme.roadLight);asphalt.addColorStop(.82,theme.roadMid);asphalt.addColorStop(1,theme.roadDark);ctx.fillStyle=asphalt;
    ctx.beginPath();ctx.moveTo(lt,horizon);ctx.lineTo(rt,horizon);ctx.lineTo(rb,h);ctx.lineTo(lb,h);ctx.closePath();ctx.fill();
    drawRoadShoulder(ctx,-1,lt,lb,w,h,theme);drawRoadShoulder(ctx,1,rt,rb,w,h,theme);
    drawRoadTexture(ctx,w,h,lt,rt,lb,rb,theme,weather);
    ctx.strokeStyle='rgba(255,255,255,.30)';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(lt,horizon);ctx.lineTo(lb,h);ctx.moveTo(rt,horizon);ctx.lineTo(rb,h);ctx.stroke();
    ctx.strokeStyle=theme.edgeGlow;ctx.lineWidth=3.4;ctx.shadowColor=theme.edgeGlow;ctx.shadowBlur=12;ctx.beginPath();ctx.moveTo(lt,horizon);ctx.lineTo(lb,h);ctx.moveTo(rt,horizon);ctx.lineTo(rb,h);ctx.stroke();ctx.shadowBlur=0;
    for(let lane=1;lane<state.lanes;lane++){
      ctx.strokeStyle=theme.lane;ctx.lineWidth=2;ctx.setLineDash([22,34]);ctx.lineDashOffset=-state.roadOffset;const topx=lerp(lt,rt,lane/state.lanes),bottomx=lerp(lb,rb,lane/state.lanes);ctx.beginPath();ctx.moveTo(topx,horizon);ctx.lineTo(bottomx,h);ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<12;i++){const y=(i*84+state.roadOffset*1.35)%(h-horizon)+horizon,[l,r]=roadBounds(y,w,h);const bandW=(r-l)*.72;ctx.fillRect((l+r-bandW)/2,y,bandW,2);}ctx.fillStyle='rgba(0,0,0,.08)';for(let i=0;i<10;i++){const y=(i*113+state.roadOffset*.9)%(h-horizon)+horizon,[l,r]=roadBounds(y,w,h);ctx.fillRect(l+(r-l)*(.07+(i*.09)%0.78),y,18,3);}    
    drawRoadsideDetails(ctx,w,h,theme);
    for(let i=0;i<10;i++){const y=(i*128+state.roadOffset*1.16)%(h-horizon)+horizon,[l,r]=roadBounds(y,w,h),s=.22+y/h*.85;drawStreetLight(ctx,l-48*s,y,s,-1,theme.lampGlow);drawStreetLight(ctx,r+48*s,y,s,1,theme.lampGlow);}    
    if(weather==='rain'||weather==='storm'){
      ctx.strokeStyle=weather==='storm'?'rgba(205,231,255,.5)':'rgba(180,225,255,.34)';ctx.lineWidth=1;const count=state.performance==='low'?70:132;for(let i=0;i<count;i++){const px=(i*97.7+state.elapsedDrive*390)%w,py=(i*53.3+state.elapsedDrive*540)%h;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px-8,py+24);ctx.stroke();}ctx.fillStyle='rgba(50,120,170,.08)';ctx.fillRect(0,horizon-20,w,h-horizon+20);if(weather==='storm'&&Math.floor(Date.now()/650)%7===0){ctx.fillStyle='rgba(220,240,255,.08)';ctx.fillRect(0,0,w,h);} }
  }

  function drawStreetLight(ctx,x,y,s,side,glow='rgba(255,240,170,.75)'){
    ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle='rgba(140,190,210,.52)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,25);ctx.lineTo(0,-40);ctx.lineTo(18*side,-48);ctx.stroke();ctx.fillStyle=glow;ctx.shadowColor=glow;ctx.shadowBlur=12;ctx.fillRect(side>0?12:-24,-52,12,4);ctx.restore();
  }

  function vehicleDimensions(kind){

    if(kind==='truck')return {w:65,h:125};if(kind==='bus')return {w:58,h:104};if(kind==='motorcycle')return {w:27,h:69};if(kind==='suv')return {w:62,h:108};if(kind==='sports')return {w:56,h:98};if(kind==='coupe')return {w:50,h:86};if(kind==='police')return {w:52,h:92};return {w:51,h:91};
  }

  function drawSpriteVehicle(ctx,key,w,h,player=false,entity=null,color='#15a9ff'){
    const spec=SPRITE_MANIFEST[key]||{},img=spriteImages[key];
    let dw=spec.drawW||w,dh=spec.drawH||h;
    const speedRatio=player?clamp(state.speed/180,0,1):clamp((entity?.speed||90)/150,0,1);
    const isCargoTruck=key==='traffic_truck_orange';
    const isHeavy=isCargoTruck||key==='traffic_truck_blue'||key==='traffic_van_white';
    if(isCargoTruck){dw=58;dh=108;}
    const bounce=(player?Math.sin(performance.now()*.020):Math.sin(performance.now()*.013+(entity?.y||0)*.05))*(isHeavy?.22:(.5+speedRatio*.8));
    ctx.save();ctx.translate(0,bounce);
    drawEntityShadow(ctx,dw,dh,isHeavy?1.18:1.12+speedRatio*.08,isHeavy?.35:.36);
    const renderImage=player?tintedSprite(key,color):img;
    if(renderImage&&((renderImage instanceof HTMLCanvasElement)||(renderImage.complete&&renderImage.naturalWidth>0))){
      ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
      if(isCargoTruck){
        // Se recorta parte de la caja posterior para evitar el efecto de bloque vertical o vehículo flotante.
        const sw=renderImage.naturalWidth||renderImage.width,sh=renderImage.naturalHeight||renderImage.height;
        const cropH=Math.round(sh*.86);
        ctx.drawImage(renderImage,0,0,sw,cropH,-dw/2,-dh*.50,dw,dh*.93);
      }else{
        ctx.drawImage(renderImage,-dw/2,-dh/2,dw,dh);
      }
    }
    if(player){ctx.globalCompositeOperation='screen';ctx.fillStyle=color;ctx.globalAlpha=.18;ctx.beginPath();ctx.ellipse(0,dh*.34,dw*.34,dh*.10,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';}
    const braking=player?held.down:(entity?.brake>.28);
    if(braking){ctx.fillStyle='#ff244f';ctx.shadowColor='#ff244f';ctx.shadowBlur=12;ctx.fillRect(-dw*.32,dh*.31,dw*.16,4);ctx.fillRect(dw*.16,dh*.31,dw*.16,4);ctx.shadowBlur=0;}
    if((entity?.kind==='police')&&Math.floor(Date.now()/150)%2===0){ctx.fillStyle='#1da8ff';ctx.fillRect(-dw*.18,-dh*.06,dw*.18,5);ctx.fillStyle='#ff315d';ctx.fillRect(0,-dh*.06,dw*.18,5);}
    if(player&&(Date.now()<state.nitroUntil||held.turbo&&state.turboCharge>0))drawNitro(ctx,dh);
    ctx.restore();return {w:dw,h:dh};
  }

  function drawVehicle(ctx,cx,cy,scale,color,kind='sedan',player=false,spriteKey=null,entity=null){
    const {w,h}=vehicleDimensions(kind);ctx.save();ctx.translate(cx,cy);ctx.scale(scale,scale);
    if(player&&Date.now()<state.invulnerableUntil&&Math.floor(Date.now()/90)%2===0)ctx.globalAlpha=.28;
    const resolvedKey=spriteKey||(player?(PLAYER_SPRITES[state.car]||PLAYER_SPRITES.vector):chooseTrafficSprite(kind));
    if(spriteReady(resolvedKey)){drawSpriteVehicle(ctx,resolvedKey,w,h,player,entity,color);ctx.restore();return;}
    drawEntityShadow(ctx,w,h,1.05);ctx.shadowColor='rgba(0,0,0,.28)';ctx.shadowBlur=4;ctx.shadowOffsetY=1;ctx.fillStyle='rgba(0,0,0,.02)';roundedRect(ctx,-w*.52,-h*.46,w*1.04,h*.98,12);ctx.fill();ctx.shadowBlur=0;ctx.shadowOffsetY=0;
    if(kind==='motorcycle'){drawMotorcycle(ctx,w,h,color);ctx.restore();return;}
    if(kind==='truck'||kind==='bus'){drawHeavyVehicle(ctx,w,h,color,kind);ctx.restore();return;}
    const body=ctx.createLinearGradient(-w/2,0,w/2,0);body.addColorStop(0,'#04090d');body.addColorStop(.16,darken(color,.45));body.addColorStop(.36,color);body.addColorStop(.52,lighten(color,.55));body.addColorStop(.68,color);body.addColorStop(.84,darken(color,.45));body.addColorStop(1,'#04090d');ctx.fillStyle=body;
    ctx.shadowColor=color;ctx.shadowBlur=player?18:5;
    ctx.beginPath();
    const nose=kind==='sports'?-.50:-.46,tail=kind==='suv'?.47:.48;
    ctx.moveTo(-w*.30,h*nose);ctx.quadraticCurveTo(0,-h*.55,w*.30,h*nose);ctx.lineTo(w*.49,-h*.24);ctx.lineTo(w*.47,h*.29);ctx.quadraticCurveTo(w*.42,h*.44,w*.28,h*tail);ctx.lineTo(-w*.28,h*tail);ctx.quadraticCurveTo(-w*.42,h*.44,-w*.47,h*.29);ctx.lineTo(-w*.49,-h*.24);ctx.closePath();ctx.fill();ctx.shadowBlur=0;
    ctx.fillStyle='#03080d';for(const sx of [-1,1]){roundedRect(ctx,sx<0?-w*.58:w*.48,-h*.31,w*.10,h*.22,4);ctx.fill();roundedRect(ctx,sx<0?-w*.59:w*.49,h*.16,w*.10,h*.23,4);ctx.fill();}
    const glass=ctx.createLinearGradient(0,-h*.34,0,h*.16);glass.addColorStop(0,'#a8e6ff');glass.addColorStop(.18,'#173e55');glass.addColorStop(1,'#020910');ctx.fillStyle=glass;ctx.beginPath();ctx.moveTo(-w*.25,-h*.34);ctx.lineTo(w*.25,-h*.34);ctx.lineTo(w*.33,-h*.05);ctx.lineTo(w*.29,h*.13);ctx.lineTo(-w*.29,h*.13);ctx.lineTo(-w*.33,-h*.05);ctx.closePath();ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.34)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-w*.18,-h*.31);ctx.lineTo(w*.09,-h*.31);ctx.stroke();ctx.beginPath();ctx.moveTo(-w*.29,-h*.02);ctx.lineTo(w*.29,-h*.02);ctx.stroke();
    if(kind==='sports'||player){ctx.fillStyle='#071018';ctx.fillRect(-w*.39,h*.37,w*.78,5);ctx.fillRect(-w*.34,h*.34,4,11);ctx.fillRect(w*.30,h*.34,4,11);}
    ctx.fillStyle='#effcff';ctx.shadowColor='#dff9ff';ctx.shadowBlur=8;ctx.fillRect(-w*.38,-h*.41,w*.16,5);ctx.fillRect(w*.22,-h*.41,w*.16,5);ctx.shadowBlur=0;
    ctx.fillStyle='#ff315d';ctx.shadowColor='#ff315d';ctx.shadowBlur=8;ctx.fillRect(-w*.40,h*.35,w*.17,6);ctx.fillRect(w*.23,h*.35,w*.17,6);ctx.shadowBlur=0;
    if(kind==='police'){ctx.fillStyle='#0b1520';ctx.fillRect(-w*.35,-2,w*.70,7);ctx.fillStyle='#179eff';ctx.fillRect(-w*.18,-1,w*.18,5);ctx.fillStyle='#ff315d';ctx.fillRect(0,-1,w*.18,5);}
    if(player&&(Date.now()<state.nitroUntil||held.turbo&&state.turboCharge>0))drawNitro(ctx,h);
    ctx.restore();
  }

  function drawHeavyVehicle(ctx,w,h,color,kind){
    ctx.fillStyle='#05090d';for(const sx of [-1,1]){ctx.fillRect(sx<0?-w*.61:w*.50,-h*.35,w*.11,h*.19);ctx.fillRect(sx<0?-w*.61:w*.50,h*.16,w*.11,h*.22);}
    const body=ctx.createLinearGradient(-w/2,0,w/2,0);body.addColorStop(0,darken(color,.52));body.addColorStop(.25,color);body.addColorStop(.5,lighten(color,.45));body.addColorStop(.75,color);body.addColorStop(1,darken(color,.52));ctx.fillStyle=body;roundedRect(ctx,-w*.49,-h*.48,w*.98,h*.96,kind==='bus'?8:5);ctx.fill();
    ctx.fillStyle='#09141d';roundedRect(ctx,-w*.36,-h*.42,w*.72,h*.20,5);ctx.fill();
    if(kind==='truck'){ctx.fillStyle='rgba(255,255,255,.22)';roundedRect(ctx,-w*.38,-h*.12,w*.76,h*.49,3);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.2)';for(let yy=-h*.06;yy<h*.32;yy+=12){ctx.beginPath();ctx.moveTo(-w*.34,yy);ctx.lineTo(w*.34,yy);ctx.stroke();}}
    else{ctx.fillStyle='#102d40';for(let yy=-h*.12;yy<h*.34;yy+=15){roundedRect(ctx,-w*.36,yy,w*.72,9,2);ctx.fill();}}
    ctx.fillStyle='#f5fdff';ctx.fillRect(-w*.37,-h*.43,w*.14,5);ctx.fillRect(w*.23,-h*.43,w*.14,5);ctx.fillStyle='#ff315d';ctx.fillRect(-w*.40,h*.39,w*.16,6);ctx.fillRect(w*.24,h*.39,w*.16,6);
  }

  function drawMotorcycle(ctx,w,h,color){
    ctx.fillStyle='#05080b';ctx.beginPath();ctx.ellipse(0,-h*.34,w*.22,h*.16,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(0,h*.34,w*.22,h*.16,0,0,Math.PI*2);ctx.fill();ctx.fillStyle=color;roundedRect(ctx,-w*.28,-h*.30,w*.56,h*.58,7);ctx.fill();ctx.fillStyle='#111d26';roundedRect(ctx,-w*.19,-h*.06,w*.38,h*.24,5);ctx.fill();ctx.strokeStyle='#dffaff';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-w*.35,-h*.24);ctx.lineTo(w*.35,-h*.24);ctx.stroke();ctx.fillStyle='#ff315d';ctx.fillRect(-4,h*.30,8,5);
  }

  function drawNitro(ctx,h){ctx.fillStyle='#69edff';ctx.shadowColor='#22dfff';ctx.shadowBlur=20;const len=28+Math.random()*22;ctx.beginPath();ctx.moveTo(-9,h*.49);ctx.lineTo(0,h*.49+len);ctx.lineTo(9,h*.49);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(-4,h*.49);ctx.lineTo(0,h*.49+len*.65);ctx.lineTo(4,h*.49);ctx.fill();ctx.shadowBlur=0;}
  function darken(hex,f=.4){return shade(hex,-Math.round(f*100));}
  function lighten(hex,f=.4){return shade(hex,Math.round(f*100));}
  function shade(hex,percent){const n=parseInt(hex.replace('#',''),16),amt=Math.round(2.55*percent),r=clamp((n>>16)+amt,0,255),g=clamp((n>>8&255)+amt,0,255),b=clamp((n&255)+amt,0,255);return `rgb(${r},${g},${b})`;}

  function trafficSpec(kind){
    const ranges={truck:[65,84],bus:[70,90],motorcycle:[92,126],sports:[108,142],coupe:[96,128],suv:[84,112],police:[100,132],sedan:[80,112]};
    const [a,b]=ranges[kind]||ranges.sedan;return a+Math.random()*(b-a);
  }
  function vehicleMass(kind){
    const masses={motorcycle:.45,coupe:.90,sports:1,sedan:1.10,police:1.18,suv:1.35,bus:2.30,truck:2.70};
    return masses[kind]||1.05;
  }
  function playerMass(){return state.car==='titan'?1.55:state.car==='pulse'?.96:1.08;}
  function laneWidthAt(y,w,h){const [l,r]=roadBounds(y,w,h);return Math.max(45,(r-l)/state.lanes);}
  function collisionBox(kind,y,w,h,player=false){
    const dims=vehicleDimensions(kind),scale=player?(state.device?.type==='mobile'?.88:1):clamp(.30+y/h*.78,.12,1.2);
    return {halfW:dims.w*scale*(player?.40:.38),halfH:dims.h*scale*(player?.40:.38),scale};
  }
  function safeLaneAt(lane,y,exclude=null,extra=0){
    return !state.traffic.some(o=>o!==exclude&&Math.abs(o.laneFloat-lane)<.68&&Math.abs(o.y-y)<145+extra+Math.abs(o.speed-(exclude?.speed||state.speed))*.55);
  }
  function chooseSpawnLane(y){
    const lanes=shuffle([...Array(state.lanes).keys()]);return lanes.find(l=>safeLaneAt(l,y,null,28));
  }
  function trafficCapacity(){
    const deviceBase=state.device?.type==='mobile'?8:state.device?.type==='tablet'?11:15;
    const performancePenalty=state.performance==='low'?2:state.performance==='medium'?1:0;
    return Math.max(7,deviceBase-performancePenalty+Math.min(2,state.rivalPressure));
  }
  function spawnTraffic(w,h,burst=false,forcedKind=null,forcedLane=null,forcedY=null){
    const max=trafficCapacity();if(state.traffic.length>=max)return false;
    const y=forcedY??(-38-Math.random()*Math.min(150,h*.30)),lane=forcedLane??chooseSpawnLane(y);if(lane===undefined||lane===null)return false;
    let kind=forcedKind; if(!kind){const r=Math.random();kind=r<.16?'motorcycle':r<.24?'bus':r<.36?'truck':r<.49?'suv':r<.66?'sports':r<.79?'coupe':r<.87?'police':'sedan';}
    const baseSpeed=trafficSpec(kind),aggressive=Math.random()<.10+state.rivalPressure*.05;
    const fastWeaver=kind==='motorcycle'||kind==='sports'||kind==='coupe';const heavy=kind==='truck'||kind==='bus',blocker=!heavy&&Math.random()<.34;state.traffic.push({lane,laneFloat:lane,targetLane:lane,plannedLane:null,warningUntil:0,y,speed:baseSpeed,baseSpeed,color:pick(COLORS),kind,spriteKey:chooseTrafficSprite(kind),hit:false,changeClock:heavy?2.4+Math.random()*2.8:fastWeaver?.9+Math.random()*1.8:1.4+Math.random()*2.2,aggressive:aggressive||blocker,blocker,blockCooldownUntil:Date.now()+1300+Math.random()*2600,blockHoldUntil:0,brake:0,passed:false,signal:0,mass:vehicleMass(kind),lateralVelocity:0,impactVy:0,rotation:0,angularVelocity:0,collisionCooldownUntil:0});
    return true;
  }
  function spawnFormation(w,h){
    const patterns=[[0,2],[1,3],[0,1,3],[0,2,3]].map(p=>p.filter(l=>l<state.lanes));const lanes=pick(patterns);let y=h*.07-100;
    lanes.forEach((lane,i)=>{spawnTraffic(w,h,false,i===0&&Math.random()<.35?'truck':null,lane,y-i*125);});
  }
  function seedInitialTraffic(w,h){
    state.traffic=[];
    const target=Math.min(trafficCapacity()-2,state.device?.type==='mobile'?6:state.device?.type==='tablet'?9:12);
    const kinds=['sedan','suv','coupe','truck','sports','motorcycle','bus','sedan','police','sports','suv','coupe','truck','sedan'];
    const rows=[.12,.25,.39,.54,.68];
    let created=0;
    for(let r=0;r<rows.length&&created<target;r++){
      const laneOrder=shuffle([...Array(state.lanes).keys()]);
      const countInRow=r%3===0?2:1;
      for(let j=0;j<countInRow&&created<target;j++){
        const lane=laneOrder[j];
        const y=h*rows[r]-j*72;
        if(spawnTraffic(w,h,false,kinds[created%kinds.length],lane,y))created++;
      }
    }
    while(created<target){
      const lane=created%state.lanes;
      const y=-80-(created-target)*105;
      if(spawnTraffic(w,h,false,kinds[created%kinds.length],lane,y))created++; else break;
    }
  }
  function spawnRoadworkPack(w,h){
    const openLane=Math.floor(Math.random()*state.lanes);
    const y=h*.08-85;
    const blocked=shuffle([...Array(state.lanes).keys()].filter(l=>l!==openLane)).slice(0,Math.max(1,state.lanes-2));
    blocked.forEach((lane,i)=>{
      const type=i===0?'barrier':'cones';
      if(!state.obstacles.some(o=>Math.abs(o.laneFloat-lane)<.45&&Math.abs(o.y-(y-i*30))<110)){
        state.obstacles.push({type,lane,laneFloat:lane,y:y-i*30,hit:false,warning:true,spin:Math.random()*6.28,passed:false});
      }
    });
    toast(`OBRA VIAL: carril ${openLane+1} disponible`, 'bad');
  }
  function spawnObstacle(w,h,forcedType=null){
    const max=state.performance==='low'?9:state.performance==='medium'?13:17;if(state.obstacles.length>=max)return;
    const type=forcedType||pick(OBSTACLES),y=h*.08-80-Math.random()*115;
    const candidates=shuffle([...Array(state.lanes).keys()]);
    const lane=candidates.find(l=>!state.obstacles.some(o=>Math.abs(o.laneFloat-l)<.5&&Math.abs(o.y-y)<125)&&!state.traffic.some(c=>Math.abs(c.laneFloat-l)<.5&&Math.abs(c.y-y)<105));
    if(lane===undefined)return;
    state.obstacles.push({type,lane,laneFloat:lane,y,hit:false,warning:false,spin:Math.random()*6.28,passed:false,spriteKey:chooseObstacleSprite(type)});
  }
  function trafficInterval(){return Math.max(.48,.64-state.rivalPressure*.035)+Math.random()*.42;}
  function nearestLead(car){
    let lead=null,best=Infinity;for(const other of state.traffic){if(other===car||Math.abs(other.laneFloat-car.laneFloat)>.55||other.y>=car.y)continue;const gap=car.y-other.y;if(gap<best){best=gap;lead=other;}}
    return lead?{car:lead,gap:best}:null;
  }
  function tryLaneChange(car,preferred=0,urgent=false){
    if(car.plannedLane!==null&&car.plannedLane!==undefined)return false;
    const options=[];
    if(preferred)options.push(clamp(Math.round(car.laneFloat)+preferred,0,state.lanes-1));
    options.push(Math.round(car.laneFloat)-1,Math.round(car.laneFloat)+1);
    for(const lane of [...new Set(options)]){
      if(lane<0||lane>=state.lanes||lane===Math.round(car.laneFloat))continue;
      if(!safeLaneAt(lane,car.y,car,38))continue;
      car.plannedLane=lane;
      car.signal=Math.sign(lane-car.laneFloat);
      const fast=car.kind==='motorcycle'||car.kind==='sports'||car.kind==='coupe';
      car.warningUntil=Date.now()+(urgent?360:fast?430+Math.random()*260:620+Math.random()*360);
      car.changeClock=(car.kind==='truck'||car.kind==='bus')?1.5+Math.random()*2.2:.65+Math.random()*1.4;
      return true;
    }
    car.changeClock=.35+Math.random()*.7;
    return false;
  }
  function separateTraffic(w,h){
    for(let lane=0;lane<state.lanes;lane++){
      const cars=state.traffic.filter(o=>Math.abs(o.laneFloat-lane)<.52).sort((a,b)=>a.y-b.y);
      for(let i=1;i<cars.length;i++){
        const front=cars[i-1],back=cars[i],fb=collisionBox(front.kind,front.y,w,h),bb=collisionBox(back.kind,back.y,w,h);
        const minGap=fb.halfH+bb.halfH+24+Math.max(0,back.speed-front.speed)*.75;
        if(back.y-front.y<minGap){
          const overlap=minGap-(back.y-front.y),sum=front.mass+back.mass;
          front.y-=overlap*(back.mass/sum)*.45;back.y+=overlap*(front.mass/sum)*.55;
          back.speed=Math.min(back.speed,front.speed+1);back.brake=1;
        }
      }
    }
  }
  function resolveTrafficPairs(w,h){
    const cars=state.traffic;
    for(let i=0;i<cars.length;i++)for(let j=i+1;j<cars.length;j++){
      const a=cars[i],b=cars[j];
      if(Math.abs(a.y-b.y)>175||Math.abs(a.laneFloat-b.laneFloat)>1.15)continue;
      const ax=laneX(a.laneFloat,a.y,w,h),bx=laneX(b.laneFloat,b.y,w,h),ab=collisionBox(a.kind,a.y,w,h),bb=collisionBox(b.kind,b.y,w,h);
      const dx=bx-ax,dy=b.y-a.y,overX=ab.halfW+bb.halfW-Math.abs(dx),overY=ab.halfH+bb.halfH-Math.abs(dy);
      if(overX<=0||overY<=0)continue;
      const invA=1/a.mass,invB=1/b.mass,invSum=invA+invB;
      if(overX<overY*.92){
        const nx=dx>=0?1:-1,correction=(overX+2)/laneWidthAt((a.y+b.y)/2,w,h);
        a.laneFloat-=nx*correction*(invA/invSum);b.laneFloat+=nx*correction*(invB/invSum);
        const rel=(b.lateralVelocity-a.lateralVelocity)*nx;
        const impulse=rel<0?-(1.22)*rel/invSum:.18/invSum;
        a.lateralVelocity-=impulse*invA*nx;b.lateralVelocity+=impulse*invB*nx;
        a.angularVelocity-=nx*.28;b.angularVelocity+=nx*.28;
      }else{
        const ny=dy>=0?1:-1,correction=overY+3;
        a.y-=ny*correction*(invA/invSum);b.y+=ny*correction*(invB/invSum);
        const aWorld=-a.speed/3.6+a.impactVy*.018,bWorld=-b.speed/3.6+b.impactVy*.018;
        const rel=(bWorld-aWorld)*ny,jimp=rel<0?-(1.28)*rel/invSum:.12/invSum;
        a.impactVy-=jimp*invA*ny*16;b.impactVy+=jimp*invB*ny*16;
        const newA=aWorld-jimp*invA*ny,newB=bWorld+jimp*invB*ny;
        a.speed=clamp(-newA*3.6,40,150);b.speed=clamp(-newB*3.6,40,150);
        a.angularVelocity-=Math.sign(dx||1)*.18;b.angularVelocity+=Math.sign(dx||1)*.18;
      }
    }
  }
  function resolvePlayerTrafficCollision(car,w,h){
    const now=Date.now();if(now<state.invulnerableUntil||now<car.collisionCooldownUntil)return false;
    const py=h*state.playerYFactor+state.playerCrashOffsetY,px=laneX(playerLanePos,py,w,h),cx=laneX(car.laneFloat,car.y,w,h);
    const pkind=state.car==='titan'?'suv':'sports',pb=collisionBox(pkind,py,w,h,true),cb=collisionBox(car.kind,car.y,w,h);
    const dx=cx-px,dy=car.y-py,overX=pb.halfW+cb.halfW-Math.abs(dx),overY=pb.halfH+cb.halfH-Math.abs(dy);
    if(overX<=0||overY<=0)return false;
    let nx=0,ny=0,penetration=0;
    if(overX<overY*.92){nx=dx>=0?1:-1;penetration=overX;}else{ny=dy>=0?1:-1;penetration=overY;}
    const m1=playerMass(),m2=car.mass||vehicleMass(car.kind),inv1=1/m1,inv2=1/m2,invSum=inv1+inv2;
    const laneScale=laneWidthAt(py,w,h);
    const pVx=(state.lateralVelocity+state.playerCrashVX)*7,pVy=-state.speed/3.6+state.playerCrashVY*.018;
    const cVx=car.lateralVelocity*7,cVy=-car.speed/3.6+car.impactVy*.018;
    const rvx=cVx-pVx,rvy=cVy-pVy,velAlong=rvx*nx+rvy*ny,e=(car.kind==='truck'||car.kind==='bus')?.18:.32;
    const impulse=velAlong<0?-(1+e)*velAlong/invSum:(.35+penetration*.035)/invSum;
    const ix=impulse*nx,iy=impulse*ny;
    state.playerCrashVX-=ix*inv1/7;car.lateralVelocity+=ix*inv2/7;
    state.playerCrashVY-=iy*inv1*18;car.impactVy+=iy*inv2*18;
    if(ny){
      const pNew=pVy-iy*inv1,cNew=cVy+iy*inv2;
      state.speed=clamp(-pNew*3.6,18,state.turboMaxSpeed);car.speed=clamp(-cNew*3.6,35,155);
      state.playerCrashOffsetY-=ny*(penetration+3)*(inv1/invSum);car.y+=ny*(penetration+3)*(inv2/invSum);
    }else{
      const laneCorrection=(penetration+3)/laneScale;
      playerLanePos-=nx*laneCorrection*(inv1/invSum);car.laneFloat+=nx*laneCorrection*(inv2/invSum);
    }
    const contactSide=clamp(dx/(pb.halfW+cb.halfW),-1,1);
    state.playerAngularVelocity-=contactSide*(.55+impulse*.015);car.angularVelocity+=contactSide*(.48+impulse*.012);
    state.playerRotation+=-contactSide*.055;car.rotation+=contactSide*.05;
    state.lastImpulse={px,py,cx,cy:car.y,nx,ny};state.lastImpulseUntil=now+750;
    car.hit=true;car.collisionCooldownUntil=now+1900;
    collisionConsequences(car,cx,py,Math.abs(velAlong),nx,ny);
    return true;
  }
  function updateLaneForce(dt,steerInput){
    const now=Date.now(),activeSteering=Math.abs(steerInput)>.18;
    if(tollApproaching()&&tollRemaining()<560){
      state.laneForceDwell=0;state.laneForceUntil=0;state.laneForceTarget=null;state.laneForceDirection=0;
      return;
    }
    if(state.laneForceTarget!==null&&now<state.laneForceUntil){
      const diff=state.laneForceTarget-playerLanePos;
      const force=clamp(diff*3.8,-1.45,1.45);
      state.lateralVelocity+=force*dt*2.2;
      state.steeringAngle=lerp(state.steeringAngle,Math.sign(diff)*.075,clamp(dt*6,0,1));
      if(Math.abs(diff)<.035){playerLanePos=state.laneForceTarget;state.laneForceTarget=null;state.laneForceUntil=0;state.laneForceDwell=0;}
      return;
    }
    if(state.laneForceTarget!==null&&now>=state.laneForceUntil){state.laneForceTarget=null;state.laneForceDwell=0;}
    if(activeSteering){state.laneForceDwell=0;return;}
    const lower=Math.floor(playerLanePos),fraction=playerLanePos-lower;
    const onDivider=lower>=0&&lower<state.lanes-1&&Math.abs(fraction-.5)<.095;
    if(!onDivider){state.laneForceDwell=Math.max(0,state.laneForceDwell-dt*2.5);return;}
    state.laneForceDwell+=dt;
    if(state.laneForceDwell<.22||now<state.laneForceCooldownUntil)return;
    const direction=Math.random()<.5?-1:1;
    state.laneForceDirection=direction;
    state.laneForceTarget=direction<0?lower:lower+1;
    state.laneForceUntil=now+820;
    state.laneForceCooldownUntil=now+1350;
    state.laneForceDwell=0;
    state.lateralVelocity+=direction*.34;
    if(now-state.laneForceToastAt>1400){toast(direction<0?'FUERZA DE CARRIL: desplazamiento a la izquierda':'FUERZA DE CARRIL: desplazamiento a la derecha','bad');state.laneForceToastAt=now;}
    showImpact('LÍNEA CENTRAL INESTABLE',direction<0?'La fuerza invisible te lleva al carril izquierdo':'La fuerza invisible te lleva al carril derecho');
  }
  function drawLaneForce(ctx,px,py){
    if(Date.now()>=state.laneForceUntil||!state.laneForceDirection)return;
    const dir=state.laneForceDirection,alpha=clamp((state.laneForceUntil-Date.now())/820,0,1);
    ctx.save();ctx.globalAlpha=.35+.65*alpha;ctx.translate(px,py-58);ctx.strokeStyle='#ffcb38';ctx.fillStyle='#ffcb38';ctx.lineWidth=5;ctx.shadowColor='#ff8d20';ctx.shadowBlur=15;
    ctx.beginPath();ctx.moveTo(-dir*12,0);ctx.lineTo(dir*58,0);ctx.stroke();ctx.beginPath();ctx.moveTo(dir*58,0);ctx.lineTo(dir*38,-13);ctx.lineTo(dir*38,13);ctx.closePath();ctx.fill();
    ctx.shadowBlur=0;ctx.textAlign='center';ctx.font='900 11px Arial';ctx.fillStyle='#fff';ctx.fillText('FUERZA DE CARRIL',0,-17);ctx.restore();
  }
  function updateTraffic(dt,w,h){
    if(tollPhotoActive()){state.traffic=[];return;}
    const gateRemaining=tollRemaining(),nearGate=tollApproaching()&&gateRemaining<520;
    state.spawnClock-=dt;if(state.spawnClock<=0){
      if(nearGate){
        const lanes=shuffle([...Array(state.lanes).keys()].filter(l=>l!==state.tollGateLane));
        const spawnY=-45-Math.random()*Math.min(120,h*.22);
        const lane=lanes.find(l=>safeLaneAt(l,spawnY,null,24));
        if(lane!==undefined&&gateRemaining>95)spawnTraffic(w,h,false,null,lane,spawnY);
      }else{
        const formationChance=.22;if(Math.random()<formationChance&&state.traffic.length<trafficCapacity()-3)spawnFormation(w,h);else spawnTraffic(w,h);
      }
      state.spawnClock=trafficInterval();
    }
    const now=Date.now(),turboActive=now<state.nitroUntil||(held.turbo&&state.turboCharge>0),halfPower=now<state.wrongPenaltyUntil;
    const playerY=h*state.playerYFactor,relativeScale=turboActive?(halfPower?3.15:5.35):2.35;
    for(const o of state.traffic){
      o.changeClock-=dt;o.brake=Math.max(0,o.brake-dt*2.5);
      if(o.plannedLane!==null&&o.plannedLane!==undefined&&now>=o.warningUntil){if(safeLaneAt(o.plannedLane,o.y,o,30))o.targetLane=o.plannedLane;o.plannedLane=null;}
      const lead=nearestLead(o);let desired=o.baseSpeed;
      if(lead){const safe=118+Math.max(0,o.speed-lead.car.speed)*1.65;if(lead.gap<safe){desired=Math.min(desired,lead.car.speed-3);o.brake=1;if(lead.gap<safe*.76&&o.changeClock<=0)tryLaneChange(o,Math.random()<.5?-1:1,true);}}
      const aheadOfPlayer=o.y<playerY-45&&o.y>playerY-h*.48;
      if(o.blocker&&aheadOfPlayer&&now>o.blockCooldownUntil){
        const target=playerLane();
        if(Math.abs(o.laneFloat-target)>.35)tryLaneChange(o,Math.sign(target-o.laneFloat),true);
        else{o.blockHoldUntil=now+1500+Math.random()*900;o.signal=0;}
        o.blockCooldownUntil=now+3600+Math.random()*3600;
      }
      if(now<o.blockHoldUntil&&aheadOfPlayer)desired=Math.min(desired,Math.max(56,state.speed-10));
      const closeToPlayer=Math.abs(o.y-playerY)<h*.34;
      if(o.aggressive&&closeToPlayer&&o.changeClock<=0&&!nearGate){const dir=Math.sign(playerLanePos-o.laneFloat)||pick([-1,1]);tryLaneChange(o,dir,true);}
      else if(o.changeClock<=0&&o.plannedLane===null&&!nearGate){
        const heavy=o.kind==='truck'||o.kind==='bus',fast=o.kind==='motorcycle'||o.kind==='sports'||o.kind==='coupe';const chance=heavy?.20:fast?.58:.40;
        if(Math.random()<chance)tryLaneChange(o,Math.random()<.5?-1:1,false);else o.changeClock=1.1+Math.random()*1.9;
      }
      if(nearGate&&o.y<playerY)desired=Math.max(desired,Math.min(150,state.speed+18));
      o.speed=approach(o.speed,clamp(desired,48,150),(o.brake?25:9)*dt);
      const laneChangeRate=(o.kind==='truck'||o.kind==='bus')?.54:o.kind==='motorcycle'?1.25:.92;
      o.laneFloat=approach(o.laneFloat,o.targetLane,dt*laneChangeRate);o.laneFloat+=o.lateralVelocity*dt;o.lateralVelocity*=Math.exp(-4.4*dt);
      if(Math.abs(o.laneFloat-o.targetLane)<.03&&Math.abs(o.lateralVelocity)<.03){o.laneFloat=o.targetLane;if(o.plannedLane===null)o.signal=0;}
      o.impactVy*=Math.exp(-4.0*dt);o.angularVelocity*=Math.exp(-3.2*dt);o.rotation+=o.angularVelocity*dt;o.rotation*=Math.exp(-1.7*dt);
      o.y+=(state.speed-o.speed)*dt*relativeScale*(.72+clamp(o.y/h,0,1)*.42)+o.impactVy*dt;o.laneFloat=clamp(o.laneFloat,-.15,state.lanes-.85);
      resolvePlayerTrafficCollision(o,w,h);
      if(!o.passed&&o.y>playerY+105){o.passed=true;if(!o.hit){const turboPass=turboActive&&!halfPower&&state.speed>145,reward=turboPass?75:40;state.drivingPoints+=reward;state.cleanPasses++;if(turboPass)state.turboPasses++;if(Date.now()-state.lastPilotToastAt>(turboPass?900:3000)){toast(turboPass?`REBASE TURBO · +${reward} puntos`:`ADELANTAMIENTO LIMPIO · +${reward} puntos`,'good');state.lastPilotToastAt=Date.now();}}}
    }
    resolveTrafficPairs(w,h);separateTraffic(w,h);resolveTrafficPairs(w,h);state.traffic=state.traffic.filter(o=>o.y<h+260&&o.y>-380);
  }
  function updateObstacles(dt,w,h){
    if(tollPhotoActive()){state.obstacles=[];if(els.hazard)els.hazard.hidden=true;return;}
    state.obstacleClock-=dt;if(state.obstacleClock<=0){
      if(!(tollApproaching()&&tollRemaining()<230)){const packChance=.52;if(Math.random()<packChance)spawnRoadworkPack(w,h);else spawnObstacle(w,h);}
      state.obstacleClock=.78+Math.random()*.92;
    }
    const playerY=h*state.playerYFactor,px=laneX(playerLanePos,playerY,w,h);let imminent=false;
    for(const o of state.obstacles){o.y+=(state.speed/3.6)*dt*4.0;o.spin+=dt*2;const ox=laneX(o.laneFloat,o.y,w,h),dy=Math.abs(o.y-playerY);if(!o.hit&&dy<230&&Math.abs(ox-px)<62)imminent=true;if(!o.hit&&Date.now()>state.invulnerableUntil&&dy<34&&Math.abs(ox-px)<38){o.hit=true;obstacleCollision(o,ox,playerY);}if(!o.passed&&o.y>playerY+70){o.passed=true;if(!o.hit)state.drivingPoints+=20;}}
    els.hazard.hidden=!imminent;state.obstacles=state.obstacles.filter(o=>o.y<h+120);
  }
  function showImpact(title,detail){if(!els.impact)return;els.impactTitle.textContent=title;els.impactDetail.textContent=detail;els.impact.hidden=false;clearTimeout(showImpact._t);showImpact._t=setTimeout(()=>els.impact.hidden=true,950);}
  function collisionConsequences(car,x,y,relativeSpeed,nx,ny){
    if(Date.now()<state.shieldUntil){toast('ESCUDO: impulso absorbido','good');playTone(800,.12);car.y-=ny*55;car.laneFloat+=nx*.18;return;}
    const heavy=car.kind==='truck'||car.kind==='bus',strong=heavy||relativeSpeed>13,damage=strong?2:1,loss=heavy?30:relativeSpeed>10?22:12;
    state.health=Math.max(0,state.health-damage);state.collisions++;state.streak=0;state.lastCollisionAt=Date.now();state.invulnerableUntil=Date.now()+1850;state.shake=strong?24:15;state.speed=Math.max(18,state.speed-loss);state.drivingPoints=Math.max(0,state.drivingPoints-(strong?75:25));
    emitSparks(x,y,strong?42:26);showImpact(strong?'IMPACTO CON REACCIÓN':'ROCE CON REBOTE',`Acción y reacción: ambos vehículos se separan · −${damage} resistencia · −${strong?75:25} puntos`);playImpactSfx(strong,strong?1:.88);if(Math.abs(nx)>.42)playSfx('skid',.42);playTone(strong?72:108,.38,'sawtooth');
    if(state.health<=1&&state.index<state.count&&!state.pendingEmergency&&Date.now()-state.lastQuestionAt>12000){state.pendingEmergency=true;state.nextCheckpoint=Math.min(state.nextCheckpoint,state.distance+220);state.eventNoticeStage=0;toast('PIT DE EMERGENCIA PROGRAMADO · mantén el control','bad');}
    if(state.health<=0){state.health=1;state.speedLimitUntil=Date.now()+10000;state.pendingEmergency=true;state.nextCheckpoint=Math.min(state.nextCheckpoint,state.distance+150);}
    updateHUD();
  }
  function obstacleCollision(o,x,y){
    state.collisions++;state.streak=0;state.lastCollisionAt=Date.now();state.shake=o.type==='oil'?8:14;state.invulnerableUntil=Date.now()+1200;
    if(o.type==='oil'){state.slipUntil=Date.now()+1900;state.speed=Math.max(45,state.speed-10);state.drivingPoints=Math.max(0,state.drivingPoints-15);showImpact('PÉRDIDA DE ADHERENCIA','Dirección inestable durante 2 segundos');toast('ACEITE: corrige suavemente la trayectoria','bad');playSfx('skid',.95);playTone(180,.25,'sawtooth');}
    else if(o.type==='cones'){state.drivingPoints=Math.max(0,state.drivingPoints-10);state.speed=Math.max(50,state.speed-8);showImpact('ZONA DE OBRAS','−10 puntos de piloto');toast('CONOS DERRIBADOS: mantén la línea segura','bad');playImpactSfx(false,.50);emitSparks(x,y,12);}
    else{state.health=Math.max(1,state.health-1);state.speed=Math.max(40,state.speed-20);state.drivingPoints=Math.max(0,state.drivingPoints-25);showImpact(o.type==='pothole'?'BACHE PROFUNDO':'OBSTÁCULO',`−1 resistencia · −25 puntos`);toast(o.type==='pothole'?'BACHE: suspensión afectada':'OBSTÁCULO: vehículo desacelerado','bad');playImpactSfx(o.type==='pothole',o.type==='pothole'?.65:.72);emitSparks(x,y,18);}
    updateHUD();
  }
  function emitSparks(x,y,count){for(let i=0;i<count;i++)state.particles.push({x,y,vx:(Math.random()-.5)*190,vy:(Math.random()-.5)*190,life:.55+Math.random()*.7,size:2+Math.random()*4,color:Math.random()>.4?'#ffb020':'#fff'});}
  function updateParticles(dt){for(const p of state.particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=70*dt;p.life-=dt;}state.particles=state.particles.filter(p=>p.life>0);}

  function drawObstacle(ctx,o,w,h){
    const x=laneX(o.laneFloat,o.y,w,h),s=clamp(.24+o.y/h*.76,.12,1.15);ctx.save();ctx.translate(x,o.y);ctx.scale(s,s);
    const spriteKey=o.spriteKey||chooseObstacleSprite(o.type),spec=SPRITE_MANIFEST[spriteKey]||{},img=spriteImages[spriteKey];
    if(img&&img.complete&&img.naturalWidth>0){
      const dw=spec.drawW||72,dh=spec.drawH||55;
      drawEntityShadow(ctx,dw,dh,.92);
      ctx.save();if(o.type==='debris')ctx.rotate(Math.sin(o.spin)*.08);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(img,-dw/2,-dh/2,dw,dh);ctx.restore();ctx.restore();return;
    }
    drawEntityShadow(ctx,70,40,.82);
    if(o.type==='oil'){ctx.fillStyle='rgba(3,5,8,.88)';ctx.beginPath();ctx.ellipse(0,0,58,24,Math.sin(o.spin)*.25,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(80,110,130,.35)';ctx.stroke();}
    else if(o.type==='pothole'){ctx.fillStyle='#020406';ctx.beginPath();ctx.ellipse(0,0,45,20,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#52575b';ctx.lineWidth=5;ctx.stroke();}
    else if(o.type==='cones'){for(const dx of [-26,0,26]){ctx.fillStyle='#ff7a18';ctx.beginPath();ctx.moveTo(dx,-26);ctx.lineTo(dx-12,18);ctx.lineTo(dx+12,18);ctx.closePath();ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(dx-8,-1,16,6);ctx.fillStyle='#171a1c';ctx.fillRect(dx-16,17,32,6);}}
    else if(o.type==='barrier'){ctx.fillStyle='#d9e3e7';roundedRect(ctx,-55,-16,110,32,4);ctx.fill();ctx.fillStyle='#ff3d3d';for(let i=-45;i<50;i+=28){ctx.save();ctx.translate(i,0);ctx.rotate(-.55);ctx.fillRect(-6,-17,12,34);ctx.restore();}ctx.fillStyle='#101316';ctx.fillRect(-48,15,12,17);ctx.fillRect(36,15,12,17);}
    else{ctx.fillStyle='#5d4935';ctx.save();ctx.rotate(o.spin);ctx.fillRect(-27,-11,54,22);ctx.fillStyle='#8a7153';ctx.fillRect(-10,-25,20,50);ctx.restore();}
    ctx.restore();
  }

  function drawTrafficSignal(ctx,o,x,y,s){if(!o.signal||Math.floor(Date.now()/220)%2===0)return;ctx.save();ctx.fillStyle='#ffb020';ctx.shadowColor='#ffb020';ctx.shadowBlur=9;ctx.beginPath();ctx.arc(x+o.signal*vehicleDimensions(o.kind).w*s*.43,y+vehicleDimensions(o.kind).h*s*.23,3+2*s,0,Math.PI*2);ctx.fill();ctx.restore();}
  function drawTurboEffects(ctx,w,h){
    const turboActive=Date.now()<state.nitroUntil||(held.turbo&&state.turboCharge>0);
    if(!turboActive)return;
    const half=Date.now()<state.wrongPenaltyUntil;
    ctx.save();
    const strength=half?.38:clamp((state.speed-125)/55,.25,1);
    const grad=ctx.createRadialGradient(w*.5,h*.63,10,w*.5,h*.63,w*.7);
    if(half){grad.addColorStop(0,'rgba(255,151,35,0)');grad.addColorStop(.72,'rgba(255,117,28,.07)');grad.addColorStop(1,'rgba(80,18,4,.30)');}
    else{grad.addColorStop(0,'rgba(44,225,255,0)');grad.addColorStop(.72,`rgba(35,180,255,${.05*strength})`);grad.addColorStop(1,`rgba(5,30,80,${.30*strength})`);}
    ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
    ctx.strokeStyle=half?'rgba(255,174,66,.45)':`rgba(135,235,255,${.22+.34*strength})`;ctx.lineWidth=1.5+strength*2;
    const lines=state.performance==='low'?22:42;
    for(let i=0;i<lines;i++){
      const seed=(i*97.37+state.elapsedDrive*(half?480:900))%1000/1000;
      const x=w*(.06+seed*.88),y=(i*61+state.elapsedDrive*(half?420:720))%h;
      const len=(half?18:35)+strength*(half?45:95)*((i%7+2)/9);
      ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+len);ctx.stroke();
    }
    if(half){ctx.fillStyle='rgba(255,100,30,.9)';ctx.font='950 14px Arial';ctx.textAlign='center';ctx.fillText('MEDIO TURBO · POTENCIA 50%',w*.5,h*.22);}
    ctx.restore();
  }
  function drawImpulseVectors(ctx,w,h,px,py){
    if(Date.now()>state.lastImpulseUntil||!state.lastImpulse)return;
    const p=state.lastImpulse,alpha=clamp((state.lastImpulseUntil-Date.now())/750,0,1),len=44+alpha*42;
    ctx.save();ctx.globalAlpha=alpha;ctx.lineWidth=4;ctx.strokeStyle='#75edff';ctx.fillStyle='#75edff';
    const drawArrow=(x,y,dx,dy)=>{const mag=Math.hypot(dx,dy)||1,ux=dx/mag,uy=dy/mag;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+ux*len,y+uy*len);ctx.stroke();ctx.beginPath();ctx.moveTo(x+ux*len,y+uy*len);ctx.lineTo(x+ux*len-ux*12-uy*7,y+uy*len-uy*12+ux*7);ctx.lineTo(x+ux*len-ux*12+uy*7,y+uy*len-uy*12-ux*7);ctx.closePath();ctx.fill();};
    drawArrow(px,py,-p.nx,-p.ny);drawArrow(p.cx,p.cy,p.nx,p.ny);ctx.restore();
  }
  function drawStageGantry(ctx,w,h){
    if(state.inQuestion||state.phase==='finished'||tollApproaching())return;
    const idx=stageIndex(),info=STAGES[idx],y=h*.155,[l,r]=roadBounds(y,w,h),width=(r-l)*.72,cx=(l+r)/2;
    ctx.save();ctx.globalAlpha=.88;ctx.strokeStyle='rgba(120,226,255,.65)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(l+8,y+34);ctx.lineTo(l+8,y-28);ctx.lineTo(r-8,y-28);ctx.lineTo(r-8,y+34);ctx.stroke();
    const grad=ctx.createLinearGradient(cx-width/2,0,cx+width/2,0);grad.addColorStop(0,'rgba(3,18,30,.92)');grad.addColorStop(.5,'rgba(8,63,91,.94)');grad.addColorStop(1,'rgba(3,18,30,.92)');ctx.fillStyle=grad;roundedRect(ctx,cx-width/2,y-24,width,42,5);ctx.fill();ctx.strokeStyle='rgba(57,211,255,.8)';ctx.stroke();
    ctx.textAlign='center';ctx.fillStyle='#83e5ff';ctx.font='900 9px Arial';ctx.fillText(`ETAPA ${Math.min(state.index+1,state.count)} / ${state.count} · FASE ${idx+1}`,cx,y-9);ctx.fillStyle='#fff';ctx.font='950 14px Arial';ctx.fillText(`${info.short} · ${state.stageThemeName}`,cx,y+10);ctx.restore();
  }
  
  function tollVisualGeometry(w,h,remaining=tollRemaining()){
    const horizon=roadHorizonY(w,h);
    const blend=tollPhotoBlend();
    const near=clamp(1-remaining/420,0,1);
    const idx=Math.min(state.index,TOLL_STAGE_IMAGES.length-1);
    const primary=tollStageImages[idx],fallback=tollFallbackImages[idx];
    const img=primary&&primary.complete&&primary.naturalWidth?primary:(fallback&&fallback.complete&&fallback.naturalWidth?fallback:null);
    const cropRatio=.72;
    const aspect=img&&img.naturalWidth?img.naturalWidth/Math.max(1,img.naturalHeight*cropRatio):1.95;
    const connectY=lerp(h*.72,h*.76,near);
    const [rl,rr]=roadBounds(connectY,w,h);
    const roadW=rr-rl;
    const dw=Math.min(w*.92,roadW*1.12);
    const dh=dw/aspect;
    const dx=(w-dw)/2;
    const dy=connectY-dh;
    return {horizon,blend,near,dw,dh,dx,dy,img,connectY,cropRatio,baseY:connectY};
  }
  function photoLaneCentersAt(geo,y){
    const yn=clamp((y-geo.dy)/Math.max(1,geo.dh),0,1);
    const t=clamp((yn-.18)/.82,0,1);
    /* Centros afinados para que coincidan mejor con las cabinas de la fotografía. */
    const far=[.185,.404,.616,.836];
    const near=[.140,.388,.630,.875];
    return far.map((v,i)=>lerp(v,near[i],t));
  }
  function photoLaneSpan(lane,y,geo){
    const c=photoLaneCentersAt(geo,y);
    const mids=[(c[0]+c[1])*.5,(c[1]+c[2])*.5,(c[2]+c[3])*.5];
    const bounds=[Math.max(0,c[0]-(mids[0]-c[0])),mids[0],mids[1],mids[2],Math.min(1,c[3]+(c[3]-mids[2]))];
    return [geo.dx+geo.dw*bounds[lane],geo.dx+geo.dw*bounds[lane+1]];
  }
  function photoLaneX(lanePos,y,geo){
    const centers=photoLaneCentersAt(geo,y);
    const lo=clamp(Math.floor(lanePos),0,state.lanes-1),hi=clamp(Math.ceil(lanePos),0,state.lanes-1);
    const f=clamp(lanePos-lo,0,1);
    return geo.dx+geo.dw*lerp(centers[lo],centers[hi],f);
  }
  function drawTollLaneGuide(ctx,w,h){
    if(!tollApproaching()||state.inQuestion||state.eventIntro)return;
    const remaining=tollRemaining();
    if(remaining>520)return;
    const geo=tollVisualGeometry(w,h,remaining);
    const lane=state.tollGateLane;
    const yNear=Math.min(h*.95,h*state.playerYFactor+140);
    const yFar=geo.baseY-12;
    if(yFar>=yNear-50)return;
    const [rl,rr]=roadBounds(yNear,w,h),laneW=(rr-rl)/state.lanes;
    const nx1=rl+laneW*lane+.06*laneW,nx2=rl+laneW*(lane+1)-.06*laneW;
    const [fx1,fx2]=photoLaneSpan(lane,yFar-8,geo);
    const strength=clamp(1-remaining/520,0,1);
    ctx.save();
    const fill=ctx.createLinearGradient(0,yNear,0,yFar);
    fill.addColorStop(0,`rgba(44,242,151,${.12+.16*strength})`);
    fill.addColorStop(.55,`rgba(44,242,151,${.16+.20*strength})`);
    fill.addColorStop(1,`rgba(44,242,151,${.20+.18*strength})`);
    ctx.fillStyle=fill;ctx.strokeStyle=`rgba(113,255,198,${.42+.28*strength})`;ctx.lineWidth=2.2;
    ctx.beginPath();ctx.moveTo(nx1,yNear);ctx.lineTo(nx2,yNear);ctx.lineTo(fx2,yFar);ctx.lineTo(fx1,yFar);ctx.closePath();ctx.fill();ctx.stroke();
    ctx.fillStyle=`rgba(118,255,201,${.34+.34*strength})`;
    for(let i=0;i<5;i++){
      const t=(i+1)/6,yy=lerp(yNear,yFar,t),left=lerp(nx1,fx1,t),right=lerp(nx2,fx2,t),cx=(left+right)/2,ww=(right-left)*.44;
      ctx.beginPath();ctx.moveTo(cx-ww*.46,yy+9);ctx.lineTo(cx,yy-8);ctx.lineTo(cx+ww*.46,yy+9);ctx.lineTo(cx+ww*.28,yy+14);ctx.lineTo(cx,yy+1);ctx.lineTo(cx-ww*.28,yy+14);ctx.closePath();ctx.fill();
    }
    ctx.restore();
  }
  function tollPlayerGeometry(w,h){
    const remaining=tollRemaining(),geo=tollVisualGeometry(w,h,remaining),blend=geo.blend;
    const enter=clamp(1-remaining/135,0,1);
    const normalY=h*state.playerYFactor+state.playerCrashOffsetY;
    const photoY=lerp(h*.82,geo.baseY-18,enter)+state.playerCrashOffsetY*(1-enter);
    const normalX=laneX(playerLanePos,normalY,w,h);
    const mappedX=photoLaneX(playerLanePos,photoY,geo);
    const baseScale=state.device?.type==='mobile'?.88:1;
    return {geo,blend,x:lerp(normalX,mappedX,blend),y:lerp(normalY,photoY,blend),scale:lerp(baseScale,lerp(.88,.58,enter),blend)};
  }
  function drawFallbackTollGate(ctx,w,h){
    const remaining=tollRemaining(),geo=tollVisualGeometry(w,h,remaining),width=geo.dw,laneW=width/state.lanes;
    ctx.save();ctx.translate(w/2,geo.dy+geo.dh*.20);ctx.globalAlpha=.98;
    ctx.fillStyle='rgba(14,22,28,.98)';ctx.strokeStyle='rgba(112,220,255,.78)';ctx.lineWidth=3;
    roundedRect(ctx,-width/2,-18,width,Math.max(58,geo.dh*.28),8);ctx.fill();ctx.stroke();
    for(let lane=0;lane<state.lanes;lane++){
      const x=-width/2+laneW*(lane+.5),open=lane===state.tollGateLane;
      ctx.fillStyle='rgba(5,11,16,.94)';roundedRect(ctx,x-laneW*.29,20,laneW*.58,Math.max(70,geo.dh*.34),6);ctx.fill();
      ctx.fillStyle=open?'#38f29b':'#ff4d69';ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=12;roundedRect(ctx,x-23,-7,46,30,5);ctx.fill();ctx.shadowBlur=0;
      ctx.fillStyle=open?'#052516':'#fff';ctx.textAlign='center';ctx.font='900 20px Arial';ctx.fillText(open?'↓':'×',x,15);
    }
    ctx.fillStyle='#fff';ctx.font='950 18px Arial';ctx.textAlign='center';ctx.fillText(`PEAJE ${state.index+1} · CARRIL VERDE ${state.tollGateLane+1}`,0,-28);ctx.restore();
  }
  function drawTollIndicators(ctx,w,h,dx,dy,dw,dh){
    /* Las luces y el número del carril ya están incorporados en la imagen realista. */
  }
  function drawTollGate(ctx,w,h){
    if(!tollApproaching()||state.inQuestion||state.eventIntro)return;
    const geo=tollVisualGeometry(w,h);
    if(geo.blend<=0)return;
    if(!geo.img){drawFallbackTollGate(ctx,w,h);return;}
    ctx.save();
    ctx.globalAlpha=geo.blend;
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
    const sh=geo.img.naturalHeight*geo.cropRatio;
    ctx.drawImage(geo.img,0,0,geo.img.naturalWidth,sh,geo.dx,geo.dy,geo.dw,geo.dh);
    /* Funde la parte inferior de la foto con la carretera para evitar doble perspectiva. */
    ctx.globalCompositeOperation='destination-out';
    const mask=ctx.createLinearGradient(0,geo.baseY-74,0,geo.baseY+10);
    mask.addColorStop(0,'rgba(0,0,0,0)');
    mask.addColorStop(.65,'rgba(0,0,0,.55)');
    mask.addColorStop(1,'rgba(0,0,0,1)');
    ctx.fillStyle=mask;ctx.fillRect(geo.dx-4,geo.baseY-74,geo.dw+8,92);
    ctx.restore();
  }
  function clearTollEntryZone(w,h){

    if(!tollApproaching())return;
    const remaining=tollRemaining();
    /* El tráfico se desvanece detrás de la fotografía y solo se elimina cuando la escena ya la cubre. */
    if(remaining<=420){
      state.traffic=[];state.obstacles=[];state.particles=[];
      if(els.hazard)els.hazard.hidden=true;
    }
  }
  function drawFinishGate(ctx,w,h){
    if(!['finalApproach','final'].includes(state.phase))return;
    const remaining=state.phase==='final'?Math.max(0,state.finishDistance-state.distance):Math.max(0,state.nextCheckpoint-state.distance+420);
    if(remaining>1100)return;
    const t=clamp(1-remaining/1100,0,1),y=lerp(h*.12,h*.58,t),scale=lerp(.28,1.35,t),locked=state.phase==='finalApproach';
    const [l,r]=roadBounds(y,w,h),cx=(l+r)/2,width=(r-l)*.82;
    ctx.save();ctx.translate(cx,y);ctx.scale(scale,scale);ctx.lineWidth=8/scale;ctx.strokeStyle=locked?'#ff416c':'#eafaff';ctx.shadowColor=locked?'#ff234f':'#44dcff';ctx.shadowBlur=24;
    ctx.beginPath();ctx.moveTo(-width/(2*scale),55);ctx.lineTo(-width/(2*scale),-70);ctx.lineTo(width/(2*scale),-70);ctx.lineTo(width/(2*scale),55);ctx.stroke();ctx.shadowBlur=0;
    const cells=10,cw=width/(cells*scale);for(let i=0;i<cells;i++)for(let j=0;j<2;j++){ctx.fillStyle=(i+j)%2?'#05080c':'#fff';ctx.fillRect(-width/(2*scale)+i*cw,-70+j*20,cw,20);}
    ctx.fillStyle=locked?'#ff416c':'#ffffff';ctx.font='950 34px Arial';ctx.textAlign='center';ctx.fillText(locked?'META BLOQUEADA':'FINISH',0,-18);ctx.font='900 12px Arial';ctx.fillStyle=locked?'#ffd0da':'#7cecff';ctx.fillText(locked?'SUPERA EL CONTROL FINAL':'BANDERA A CUADROS',0,4);ctx.restore();
  }
  function triggerFinishSequence(){
    if(state.finishCelebrating||state.finished)return;state.finishCelebrating=true;state.paused=true;updateAudioScene(true);held.turbo=false;els.finishFlash.hidden=false;playTone(880,.18);setTimeout(()=>playTone(1180,.22),180);setTimeout(()=>playTone(1480,.28),380);setTimeout(()=>{els.finishFlash.hidden=true;completeMission(false);},1500);
  }
  function drawGame(){
    const c=els.canvas,ctx=ctx2d(c),w=c.clientWidth,h=c.clientHeight;
    ctx.clearRect(0,0,w,h);
    const shake=state.shake>0?(Math.random()-.5)*state.shake:0;
    const photoBlend=tollPhotoBlend(),photoFull=photoBlend>=.98;
    ctx.save();ctx.translate(shake,shake*.45);
    drawRoad(ctx,w,h);
    drawStageGantry(ctx,w,h);

    /* Tráfico normal durante el tramo. En la transición queda detrás de la fotografía y desaparece gradualmente. */
    if(!photoFull){
      for(const o of state.obstacles)drawObstacle(ctx,o,w,h);
      const sorted=[...state.traffic].sort((a,b)=>a.y-b.y);
      for(const o of sorted){
        const s=clamp(.30+o.y/h*.78,.12,1.2),x=laneX(o.laneFloat,o.y,w,h),angle=(o.targetLane-o.laneFloat)*.16+o.rotation;
        ctx.save();ctx.translate(x,o.y);ctx.rotate(angle);drawVehicle(ctx,0,0,s,o.color,o.kind,false,o.spriteKey,o);ctx.restore();
        drawTrafficSignal(ctx,o,x,o.y,s);
      }
      for(const p of state.particles){ctx.globalAlpha=clamp(p.life,0,1);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,p.size,p.size);}
      ctx.globalAlpha=1;
    }

    /* La fotografía se dibuja después del tráfico: durante el fundido lo oculta en lugar de dejarlo flotando. */
    drawTollGate(ctx,w,h);
    drawTollLaneGuide(ctx,w,h);

    const pg=tollPhotoTransition()?tollPlayerGeometry(w,h):null;
    const playerY=pg?pg.y:h*state.playerYFactor+state.playerCrashOffsetY;
    const px=pg?pg.x:laneX(playerLanePos,playerY,w,h);
    const playerScale=pg?pg.scale:(state.device?.type==='mobile'?.88:1);
    ctx.save();ctx.translate(px,playerY);ctx.rotate(state.steeringAngle+state.playerRotation);
    drawVehicle(ctx,0,0,playerScale,state.color,state.car==='titan'?'suv':'sports',true,PLAYER_SPRITES[state.car]||PLAYER_SPRITES.vector,state);
    ctx.restore();
    if(!tollPhotoTransition()){drawImpulseVectors(ctx,w,h,px,playerY);drawLaneForce(ctx,px,playerY);drawTurboEffects(ctx,w,h);}
    drawFinishGate(ctx,w,h);
    drawSpeedometer(ctx,w,h);
    ctx.restore();
    state.shake=Math.max(0,state.shake-1.1);
  }
  function drawSpeedometer(ctx,w,h){
    const mobile=state.device?.type==='mobile',r=mobile?42:58,x=w-r-18,y=h-r-(state.controlMode==='touch'?105:18);ctx.save();ctx.translate(x,y);ctx.fillStyle='rgba(2,12,20,.82)';ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(75,215,255,.65)';ctx.lineWidth=3;ctx.stroke();
    const turboActive=Date.now()<state.nitroUntil||(held.turbo&&state.turboCharge>0),half=Date.now()<state.wrongPenaltyUntil,km=Math.round(state.speed);ctx.fillStyle='#fff';ctx.font=`900 ${mobile?19:27}px Arial`;ctx.textAlign='center';ctx.fillText(String(km),0,6);ctx.font=`700 ${mobile?7:9}px Arial`;ctx.fillStyle='#8bdfff';ctx.fillText('KM/H',0,18);const gaugeMax=half?108:state.turboMaxSpeed,a=-Math.PI*.72+clamp(km/gaugeMax,0,1)*Math.PI*1.44;ctx.strokeStyle=half?'#ff8c2a':turboActive?'#ffcf30':'#ff4766';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*r*.68,Math.sin(a)*r*.68);ctx.stroke();ctx.restore();
  }
  function updateSurprises(dt,w,h){
    if(tollPhotoActive())return;
    state.surpriseClock-=dt;
    if(state.weather!=='clear'&&Date.now()>state.weatherUntil)state.weather='clear';
    if(state.surpriseClock>0)return;
    state.surpriseClock=12+Math.random()*14;
    const r=Math.random();
    if(r<.28){state.weather=Math.random()<.35?'storm':'rain';state.weatherUntil=Date.now()+9000;toast(state.weather==='storm'?'TORMENTA REPENTINA: visibilidad reducida':'LLUVIA: pista deslizante','bad');}
    else if(r<.56){spawnRoadworkPack(w,h);}
    else if(r<.72){spawnTraffic(w,h,false,Math.random()<.45?'sports':'motorcycle');toast('VEHÍCULO BLOQUEADOR: anticipa su cambio de carril','bad');}
    else{state.turboCharge=Math.min(100,state.turboCharge+28);toast('ZONA DE ENERGÍA: turbo recargado','good');playTone(940,.14);}
  }

  function loop(t){
    updateAudioScene();
    if(!state.started||state.finished)return;const dt=Math.min(.04,(t-state.lastTime)/1000||0);state.lastTime=t;
    if(!state.paused&&!state.inQuestion&&!state.securityOpen&&!state.eventIntro){
      state.elapsedDrive+=dt;if((state.phase==='drive'||state.phase==='finalApproach')&&!state.tollActive){state.stageDriveElapsed+=dt;if(state.stageDriveElapsed>=state.tollRequiredSeconds)activateTollGate();}const profile=carProfile(),now=Date.now(),halfPower=now<state.wrongPenaltyUntil,manualTurbo=held.turbo&&state.turboCharge>0;let steerInput=(held.left?-1:0)+(held.right?1:0);if(now<state.slipUntil)steerInput+=Math.sin(now*.016)*.62;
      state.steering=lerp(state.steering,clamp(steerInput,-1,1),clamp(dt*(steerInput?5.2:3.4),0,1));const speedFactor=clamp((state.speed-25)/125,.22,1),desiredLateral=state.steering*profile.steer*(.52+.48*speedFactor);state.lateralVelocity=lerp(state.lateralVelocity,desiredLateral,clamp(dt*4.0,0,1));if(!steerInput)state.lateralVelocity=lerp(state.lateralVelocity,0,clamp(dt*2.2,0,1));
      updateLaneForce(dt,steerInput);
      state.playerCrashVX*=Math.exp(-3.6*dt);state.playerCrashVY*=Math.exp(-4.0*dt);state.playerAngularVelocity*=Math.exp(-3.0*dt);state.playerRotation+=state.playerAngularVelocity*dt;state.playerRotation*=Math.exp(-2.1*dt);state.playerCrashOffsetY+=state.playerCrashVY*dt;state.playerCrashOffsetY=lerp(state.playerCrashOffsetY,0,clamp(dt*1.45,0,1));
      playerLanePos+=(state.lateralVelocity+state.playerCrashVX)*dt;
      if(playerLanePos<0){playerLanePos=0;state.lateralVelocity=Math.max(0,state.lateralVelocity)*.25;state.playerCrashVX=Math.max(0,state.playerCrashVX)*.3;}if(playerLanePos>state.lanes-1){playerLanePos=state.lanes-1;state.lateralVelocity=Math.min(0,state.lateralVelocity)*.25;state.playerCrashVX=Math.min(0,state.playerCrashVX)*.3;}state.steeringAngle=lerp(state.steeringAngle,state.steering*.10,clamp(dt*5,0,1));
      if(manualTurbo)state.turboCharge=Math.max(0,state.turboCharge-dt*(halfPower?18:26));else state.turboCharge=Math.min(100,state.turboCharge+dt*.72);
      const turboActive=manualTurbo||now<state.nitroUntil;let target=held.down?20:held.up?profile.max:78;
      if(turboActive)target=halfPower?Math.min(106,profile.turbo*.59):profile.turbo;
      if(halfPower&&!turboActive)target=Math.min(target,72);
      if(now<state.speedLimitUntil)target=Math.min(target,92);if(visualWeather()==='rain')target=Math.min(target,132);if(visualWeather()==='storm')target=Math.min(target,118);
      let rate=target>state.speed?(turboActive?profile.accel*(halfPower?.78:2.15):held.up?profile.accel:profile.accel*.55):(held.down?profile.brake:halfPower?12:7.5);if(halfPower)rate*=.72;state.speed=approach(state.speed,target,rate*dt);
      state.playerYFactor=lerp(state.playerYFactor,turboActive?(halfPower?.755:.715):.79,clamp(dt*(turboActive?3.6:2.1),0,1));
      const ms=state.speed/3.6;state.roadOffset=(state.roadOffset+ms*dt*(turboActive?(halfPower?8.1:11.8):8.5))%228;state.distance+=ms*dt;state.drivingPoints+=dt*(1.5+state.speed/95);updateTraffic(dt,els.canvas.clientWidth,els.canvas.clientHeight);updateObstacles(dt,els.canvas.clientWidth,els.canvas.clientHeight);clearTollEntryZone(els.canvas.clientWidth,els.canvas.clientHeight);updateParticles(dt);updateSurprises(dt,els.canvas.clientWidth,els.canvas.clientHeight);
      if((state.phase==='drive'||state.phase==='finalApproach')&&state.tollActive&&state.distance>=state.nextCheckpoint)handleTollCrossing();if(state.phase==='final'&&state.distance>=state.finishDistance)triggerFinishSequence();updateTurboUI();
    }
    if(state.inQuestion)updateQuestionTimer();drawGame();updateDistanceHUD();if(t-state.lastHudAt>180){state.lastHudAt=t;updateHUD();}raf=requestAnimationFrame(loop);
  }
  function updateDistanceHUD(){
    if(state.phase==='final'){const remaining=Math.max(0,state.finishDistance-state.distance);els.eventDistance.textContent=`${Math.ceil(remaining)} m A FINISH`;els.compassDistance.textContent=remaining<180?'META INMEDIATA':remaining<500?'FINISH MUY CERCA':'SPRINT FINAL';els.eventName.textContent='FINISH';els.compassName.textContent='BANDERA A CUADROS';return;}
    const info=eventInfo();
    if((state.phase==='drive'||state.phase==='finalApproach')&&!state.tollActive){const left=Math.max(0,state.tollRequiredSeconds-state.stageDriveElapsed);els.eventDistance.textContent=`PEAJE EN ${formatClock(left)}`;els.compassDistance.textContent=`MANEJO ${formatClock(state.stageDriveElapsed)} / 01:00`;els.eventName.textContent=`ETAPA ${state.index+1} · EN CURSO`;els.compassName.textContent='PEAJE AÚN BLOQUEADO';return;}
    const remaining=tollRemaining();els.eventDistance.textContent=state.phase==='finalApproach'?`${Math.ceil(remaining)} m AL PEAJE FINAL`:`${Math.ceil(remaining)} m AL PEAJE`;els.compassDistance.textContent=remaining<180?'CABINA VERDE INMEDIATA':remaining<500?'PEAJE MUY CERCA':'PEAJE VISIBLE';els.eventName.textContent=info.title;els.compassName.textContent=`CABINA VERDE · CARRIL ${state.tollGateLane+1}`;
    const arrow=els.compass.querySelector('.dial i');if(arrow)arrow.style.transform=`rotate(${Math.sin(state.distance*.01)*8}deg)`;
    if((state.phase==='drive'||state.phase==='finalApproach')&&!state.eventIntro&&state.tollActive){
      if(remaining<820&&state.eventNoticeStage<1){state.eventNoticeStage=1;playTollPulse(.34);toast(`PEAJE ${state.index+1} ADELANTE · CARRIL VERDE ${state.tollGateLane+1}`,'good');}
      if(remaining<480&&state.eventNoticeStage<2){state.eventNoticeStage=2;playTollPulse(.54);toast(`CABINA VERDE · CARRIL ${state.tollGateLane+1}`,'');els.hazard.hidden=false;setTimeout(()=>{if(!state.eventIntro)els.hazard.hidden=true;},2200);}
      if(remaining<180&&state.eventNoticeStage<3){state.eventNoticeStage=3;playTollPulse(.84);toast(`ALÍNEATE CON EL CARRIL VERDE ${state.tollGateLane+1}`,'good');}
    }
  }
  function currentEvent(){return EVENTS[Math.min(state.index,state.count-1)];}
  function beginEventIntro(){
    if(state.eventIntro||state.inQuestion||state.index>=state.count)return;
    state.tollReached=true;state.eventIntro=true;state.paused=true;held.turbo=false;state.speed=Math.min(state.speed,34);
    const info=eventInfo();els.eventReasonTitle.textContent=state.index===state.count-1?'PEAJE FINAL ALCANZADO':`PEAJE DE ETAPA ${state.index+1} ALCANZADO`;els.eventReasonText.textContent=state.tollEntryCorrect?`Ingresaste correctamente por la cabina verde del carril ${state.tollGateLane+1}. Tendrás acceso a la pista matemática. ${info.reason}`:`Ingresaste por una cabina distinta a la verde. La pregunta se habilita sin repetir la etapa, pero la pista matemática queda bloqueada para este intento. ${info.reason}`;
    if(els.eventCorrectPreview)els.eventCorrectPreview.textContent=info.correct;if(els.eventWrongPreview)els.eventWrongPreview.textContent=info.wrong;
    updateStageHUD();els.eventReasonOverlay.hidden=false;updateAudioScene(true);playSfx('tollArrive');playTone(state.index===state.count-1?190:260,.22,'square');
  }
  function startEventQuestion(){
    if(!state.eventIntro)return;playSfx('ui',.72);els.eventReasonOverlay.hidden=true;state.eventIntro=false;openQuestion();
  }
  function startQuestionTimer(){state.questionStartedAt=Date.now();state.questionDeadline=state.questionStartedAt+state.questionTimeLimit*1000;state.questionTimedOut=false;if(els.questionTimer){els.questionTimer.className='question-timer';els.questionTimer.textContent='01:30';}}
  function updateQuestionTimer(){
    if(!els.questionTimer||!state.inQuestion)return;
    const remaining=state.questionAnswered?Math.max(0,state.questionTimeLimit-((state.answers.at(-1)?.responseSeconds)||0)):Math.max(0,(state.questionDeadline-Date.now())/1000);
    if(!state.questionAnswered){els.questionTimer.textContent=formatClock(remaining);els.questionTimer.classList.toggle('warning',remaining<=30&&remaining>10);els.questionTimer.classList.toggle('danger',remaining<=10);if(remaining<=0)timeoutQuestion();}
  }
  function timeoutQuestion(){
    if(!state.inQuestion||state.questionAnswered)return;
    const q=state.questions[state.index],event=currentEvent(),responseSeconds=state.questionTimeLimit;state.questionAnswered=true;state.questionTimedOut=true;state.selected=null;state.streak=0;state.drivingPoints=Math.max(0,state.drivingPoints-15);state.wrongPenaltyUntil=Date.now()+11000;state.speed=Math.min(state.speed,72);state.turboCharge=Math.min(state.turboCharge,50);const outcome=applyAcademicOutcome(false,event);outcome.message+=` Tiempo agotado: la pregunta vale 0 puntos y el motor queda en potencia 50 % durante 11 segundos.`;
    if(els.questionTimer){els.questionTimer.textContent='00:00';els.questionTimer.className='question-timer danger';}
    els.feedback.classList.add('bad');els.feedback.innerHTML=`<strong>TIEMPO AGOTADO · 0 PUNTOS ACADÉMICOS</strong><p>No se registró una respuesta dentro de 1 minuto y 30 segundos.</p><p>La respuesta correcta es <b>${q.correct_letter}</b>.</p><div class="math-feedback">${q.feedback_html||`<p>${q.feedback}</p>`}</div><p><b>Tiempo empleado:</b> 1 min 30 s · límite alcanzado.</p><p><b>Consecuencia en la carrera:</b> ${outcome.message}</p>`;
    state.pendingPostEvent=outcome.post;if(els.outcomePanel){els.outcomePanel.hidden=false;els.outcomePanel.className='outcome-panel bad';els.outcomeTitle.textContent='TIEMPO AGOTADO';els.outcomeText.textContent=outcome.message;}[...els.options.children].forEach(b=>{b.disabled=true;if(b.dataset.letter===q.correct_letter)b.classList.add('correct');});els.validate.disabled=true;els.hint.disabled=true;els.feedback.hidden=false;els.continue.hidden=false;typesetMath(els.feedback);
    state.answers.push({id:q.id,contextId:q.context_id,source:q.source,correct:false,selected:'SIN RESPUESTA',correctLetter:q.correct_letter,points:0,hint:state.hintUsed,competency:q.competency,difficulty:q.difficulty,event,stem:q.stem,stemHtml:q.question_task_html||q.stem_html||q.stem_tex_html,contextHtml:q.supporting_data_html||'',dataVisualHtml:q.data_visual_html||'',feedback:q.feedback,feedbackHtml:q.feedback_html,contextRendered:q.context_tex_html||q.context_html||q.supporting_data_html||'',options:q.options,visuals:q.visuals||[],responseSeconds,timedOut:true,timeLimitSeconds:state.questionTimeLimit,hintAvailable:!state.hintLockedForCurrentQuestion,tollEntryCorrect:state.tollEntryCorrect,timestamp:new Date().toISOString()});updateHUD();updateProgressPanel();RallyScorm.save(scormState());playSfx('wrong');playTone(120,.5,'sawtooth');
  }

  function openQuestion(){
    if(state.index>=state.count)return;state.inQuestion=true;state.paused=true;state.phase='question';state.questionAnswered=false;state.hintUsed=false;state.selected=null;held.turbo=false;state.lastQuestionAt=Date.now();updateAudioScene(true);
    if(state.collisions===state.collisionsAtLastQuestion){state.drivingPoints+=100;toast('TRAMO LIMPIO · +100 puntos de piloto','good');}state.collisionsAtLastQuestion=state.collisions;
    const q=state.questions[state.index],c=contextMap[q.context_id],info=eventInfo();applyQuestionLayout(q);
    els.eventTag.textContent=state.index===state.count-1?'PEAJE FINAL · PREGUNTA AVANZADA':`PEAJE CUANTITATIVO ${state.index+1}`;
    els.qTitle.textContent=`Pregunta ${state.index+1} de ${state.count} · Carrera de ${state.career}`;
    if(els.questionReason)els.questionReason.textContent=state.hintLockedForCurrentQuestion?`Pregunta liberada al llegar al peaje. Como no ingresaste por la cabina verde, esta pregunta no permite usar pista. ${info.reason}`:`Pregunta liberada por terminar el nivel ${state.index+1} y entrar por la cabina verde del peaje. ${info.reason}`;
    els.competency.textContent=q.competency.toUpperCase();if(els.sourceTag)els.sourceTag.textContent=q.source.toUpperCase();els.difficulty.textContent=q.difficulty.toUpperCase();els.qValue.textContent='VALOR 1,00';
    els.contextTitle.textContent=`${q.family||q.source} · contexto y datos de apoyo`;
    const contextMain=q.context_tex_html||q.context_html||q.supporting_data_html||'';
    const variantInfo=q.supporting_data_html?`<details class="variant-details"><summary>Ver datos técnicos de la variante</summary>${q.supporting_data_html}</details>`:'';
    els.contextText.innerHTML=`<div class="context-main">${contextMain}</div>${variantInfo}`;
    els.contextText.hidden=!els.contextText.innerHTML.trim();
    els.contextVisual.innerHTML=q.data_visual_html||'<section class="data-visual relevant-card"><h4>Información relevante</h4><div class="relevant-content">No se requieren datos adicionales.</div></section>';
    if(els.questionPromptGuide)els.questionPromptGuide.textContent='Lee primero el contexto de la izquierda y responde exactamente lo solicitado.';
    // La franja superior contiene solo la tarea; el contexto no se repite.
    els.stem.innerHTML=q.question_task_html||q.stem_tex_html||q.stem_html||`<p>${q.stem}</p>`;
    els.options.innerHTML='';q.options.forEach(o=>{const b=document.createElement('button');b.className='option-btn';b.type='button';b.dataset.letter=o.letter;b.innerHTML=`<span class="letter">${o.letter}</span><span class="option-content"><span class="option-copy">${o.tex_html||o.html||o.text}</span>${o.option_visual_html||''}</span>`;b.addEventListener('click',()=>selectOption(o.letter));els.options.append(b);});
    typesetMath([els.contextText,els.contextVisual,els.stem,els.options]);
    els.hint.disabled=state.hintLockedForCurrentQuestion;els.hint.innerHTML=state.hintLockedForCurrentQuestion?'🔒 PISTA BLOQUEADA <small>cabina incorrecta</small>':'💡 VER PISTA MATEMÁTICA <small>máximo 0,80</small>';els.validate.disabled=false;els.validate.textContent='VALIDAR RESPUESTA';els.continue.hidden=true;els.hintBox.hidden=true;els.hintBox.innerHTML='';els.feedback.hidden=true;els.feedback.innerHTML='';els.feedback.className='feedback-box';if(els.outcomePanel){els.outcomePanel.hidden=true;els.outcomePanel.className='outcome-panel';}els.qOverlay.hidden=false;startQuestionTimer();updateHUD();playTone(state.index===state.count-1?180:330,.28,'square');
  }
  function plainTextLength(html){const t=document.createElement('div');t.innerHTML=html||'';return (t.textContent||'').replace(/\s+/g,' ').trim().length;}
  function applyQuestionLayout(q){
    const shell=els.qOverlay?.querySelector('.question-shell');if(!shell)return;
    shell.classList.remove('compact-options','dense-question','very-dense-question','long-options','has-data-table','visual-options');
    const stemLen=plainTextLength(q.question_task_html||q.stem_html||q.stem||'');
    const optionLens=(q.options||[]).map(o=>plainTextLength(o.html||o.text||''));
    const maxOption=Math.max(0,...optionLens),total=stemLen+optionLens.reduce((a,b)=>a+b,0);
    const hasTable=/<table\b/i.test(q.data_visual_html||'');
    const hasVisualOptions=(q.options||[]).some(o=>!!o.option_visual_html);
    if(hasTable)shell.classList.add('has-data-table');if(hasVisualOptions)shell.classList.add('visual-options');
    if(maxOption>100||total>700)shell.classList.add('long-options');
    if(total>950||stemLen>430||maxOption>190)shell.classList.add('very-dense-question');
    else if(total>620||stemLen>290||maxOption>120)shell.classList.add('dense-question');
    if(maxOption<=72&&total<=520&&!hasVisualOptions)shell.classList.add('compact-options');
  }

  function selectOption(letter){if(state.questionAnswered)return;state.selected=letter;[...els.options.children].forEach(b=>b.classList.toggle('selected',b.dataset.letter===letter));playSfx('ui',.46);playTone(480,.07);}
  function useHint(){if(state.questionAnswered||state.hintUsed)return;if(state.hintLockedForCurrentQuestion){toast('PISTA BLOQUEADA: debías ingresar por la cabina verde del peaje','bad');return;}state.hintUsed=true;const q=state.questions[state.index];els.hintBox.innerHTML=q.hint_html||`<p>${q.hint}</p>`;els.hintBox.hidden=false;els.hint.disabled=true;els.qValue.textContent='VALOR MÁX. 0,80';typesetMath(els.hintBox);playSfx('ui',.58);playTone(620,.12);}

  function applyAcademicOutcome(correct,event){
    const result={message:'',post:null},level=state.index;
    if(level===0){if(correct){state.shieldUntil=Date.now()+9000;state.turboCharge=Math.min(100,state.turboCharge+35);result.message='Primer peaje superado: escudo y energía inicial activados.';}else{state.speedLimitUntil=Date.now()+7500;result.message='Salida lenta del peaje: velocidad limitada durante el inicio del segundo tramo.';}}
    else if(level===1){if(correct){state.drivingPoints+=200;state.turboCharge=Math.min(100,state.turboCharge+45);result.message='Segundo peaje superado: +200 puntos de piloto y turbo recargado.';}else{state.rivalPressure=Math.min(4,state.rivalPressure+1);result.post='rival';result.message='Un vehículo bloqueador entra en la ruta del tercer nivel.';}}
    else if(level===2){if(correct){state.shieldUntil=Date.now()+10000;state.drivingPoints+=300;state.turboCharge=100;state.nitroUntil=Date.now()+3200;result.message='Tercer peaje superado: la meta queda abierta con escudo y turbo completo.';}else{result.post='obstacles';state.speedLimitUntil=Date.now()+6500;result.message='El peaje final abre, pero el sprint hacia la meta comienza con obras y velocidad limitada.';}}
    return result;
  }
  function validate(){
    if(state.questionAnswered)return;if(!state.selected){toast('Selecciona una opción antes de validar','bad');playSfx('wrong',.35);return;}
    const q=state.questions[state.index],event=currentEvent(),correct=state.selected===q.correct_letter,responseSeconds=Math.min(state.questionTimeLimit,Math.max(0,(Date.now()-state.questionStartedAt)/1000));state.questionAnswered=true;if(els.questionTimer){els.questionTimer.textContent=formatClock(Math.max(0,state.questionTimeLimit-responseSeconds));els.questionTimer.className='question-timer done';}const points=correct?(state.hintUsed?.8:1):0;state.earned+=points;state.score=state.earned/state.count*5;let outcome;
    if(correct){state.streak++;state.bestStreak=Math.max(state.bestStreak,state.streak);state.nitroUntil=Date.now()+2400;state.turboCharge=Math.min(100,state.turboCharge+30);state.drivingPoints+=100+state.streak*20;outcome=applyAcademicOutcome(true,event);els.feedback.classList.add('good');els.feedback.innerHTML=`<strong>RESPUESTA CORRECTA · +${points.toFixed(2)} puntos académicos</strong><div class="math-feedback">${q.feedback_html||`<p>${q.feedback}</p>`}</div><p><b>Tiempo de respuesta:</b> ${formatResponseTime(responseSeconds)} de 1 min 30 s.</p><p><b>Consecuencia en la carrera:</b> ${outcome.message}</p>`;els.nitro.hidden=false;setTimeout(()=>els.nitro.hidden=true,2300);playSfx('correct');playTone(880,.12);setTimeout(()=>playTone(1175,.15),110);}
    else{state.streak=0;state.drivingPoints=Math.max(0,state.drivingPoints-15);state.wrongPenaltyUntil=Date.now()+11000;state.speed=Math.min(state.speed,72);state.turboCharge=Math.min(state.turboCharge,50);outcome=applyAcademicOutcome(false,event);outcome.message+=` Motor en potencia 50 % durante 11 segundos: incluso con turbo la velocidad queda limitada.`;els.feedback.classList.add('bad');playSfx('wrong');els.feedback.innerHTML=`<strong>RESPUESTA INCORRECTA · 0 puntos académicos</strong><p>La respuesta correcta es <b>${q.correct_letter}</b>.</p><div class="math-feedback">${q.feedback_html||`<p>${q.feedback}</p>`}</div><p><b>Tiempo de respuesta:</b> ${formatResponseTime(responseSeconds)} de 1 min 30 s.</p><p><b>Consecuencia en la carrera:</b> ${outcome.message}</p>`;playTone(150,.35,'sawtooth');}
    state.pendingPostEvent=outcome.post;if(els.outcomePanel){els.outcomePanel.hidden=false;els.outcomePanel.className=`outcome-panel ${correct?'good':'bad'}`;els.outcomeTitle.textContent=correct?'VENTAJA ACTIVADA':'CONSECUENCIA ACTIVADA';els.outcomeText.textContent=outcome.message;}[...els.options.children].forEach(b=>{b.disabled=true;if(b.dataset.letter===q.correct_letter)b.classList.add('correct');if(b.dataset.letter===state.selected&&!correct)b.classList.add('wrong');});els.validate.disabled=true;els.hint.disabled=true;els.feedback.hidden=false;els.continue.hidden=false;typesetMath(els.feedback);
    state.answers.push({id:q.id,contextId:q.context_id,source:q.source,correct,selected:state.selected,correctLetter:q.correct_letter,points,hint:state.hintUsed,competency:q.competency,difficulty:q.difficulty,event,stem:q.stem,stemHtml:q.question_task_html||q.stem_html||q.stem_tex_html,contextHtml:q.supporting_data_html||'',dataVisualHtml:q.data_visual_html||'',feedback:q.feedback,feedbackHtml:q.feedback_html,contextRendered:q.context_tex_html||q.context_html||q.supporting_data_html||'',options:q.options,visuals:q.visuals||[],responseSeconds,timedOut:false,timeLimitSeconds:state.questionTimeLimit,hintAvailable:!state.hintLockedForCurrentQuestion,tollEntryCorrect:state.tollEntryCorrect,timestamp:new Date().toISOString()});updateHUD();updateProgressPanel();RallyScorm.save(scormState());
  }
  function applyPostEvent(){const w=els.canvas.clientWidth,h=els.canvas.clientHeight,p=state.pendingPostEvent;state.pendingPostEvent=null;if(p==='truck')spawnTraffic(w,h,false,'truck',Math.floor(Math.random()*state.lanes),h*.15);else if(p==='rival'){const lane=clamp(playerLane()+ (playerLane()<state.lanes-1?1:-1),0,state.lanes-1);spawnTraffic(w,h,false,'sports',lane,h*.24);const o=state.traffic.at(-1);if(o){o.aggressive=true;o.color='#ff315d';o.speed=Math.min(state.turboMaxSpeed,state.speed+12);}}else if(p==='obstacles'){spawnObstacle(w,h,'barrier');spawnObstacle(w,h,'cones');}else if(p==='storm'){state.weather='storm';state.weatherUntil=Date.now()+10000;}else if(p==='finalRush'){state.trafficLevel='extreme';spawnFormation(w,h);}return p;}
  function continueRally(){
    if(!state.questionAnswered)return;playSfx('ui',.62);
    els.qOverlay.hidden=true;state.index++;state.inQuestion=false;state.paused=false;state.questionStartedAt=0;state.questionDeadline=0;state.questionTimedOut=false;state.hintLockedForCurrentQuestion=false;state.tollEntryCorrect=true;state.invulnerableUntil=Date.now()+2800;const post=applyPostEvent();state.tollReached=false;state.tollQuestionUnlocked=false;state.stageFinishAnnounced=false;state.tollActive=false;state.stageDriveElapsed=0;state.nextCheckpoint=Infinity;state.eventNoticeStage=0;state.tollGateLane=Math.floor(Math.random()*state.lanes);
    if(state.index>=state.count){state.phase='final';state.finishDistance=state.distance+980;els.eventName.textContent='FINISH';els.compassName.textContent='BANDERA A CUADROS';setStageLandscape(state.index,true);toast(`3 PREGUNTAS COMPLETADAS · SPRINT FINAL DE ${state.career.toUpperCase()}`,'good');state.trafficLevel='extreme';spawnFormation(els.canvas.clientWidth,els.canvas.clientHeight);}
    else if(state.index===state.count-1){state.phase='finalApproach';setStageLandscape(state.index,true);toast(`ETAPA FINAL · CONDUCE 1:00 PARA LIBERAR EL TERCER Y ÚLTIMO PEAJE`,'good');spawnRoadworkPack(els.canvas.clientWidth,els.canvas.clientHeight);}
    else{state.phase='drive';setStageLandscape(state.index,true);toast(state.answers.at(-1).correct?'NUEVA ETAPA · CONDUCE 1:00 PARA LIBERAR EL SIGUIENTE PEAJE':'NUEVA ETAPA · CONDUCE 1:00 CON LA CONSECUENCIA ACTIVADA',state.answers.at(-1).correct?'good':'bad');}
    updateHUD();buildLadder();state.lastTime=performance.now();updateAudioScene(true);els.canvas.focus();
  }
  function togglePause(force){if(state.inQuestion||state.securityOpen||state.finished)return;state.paused=typeof force==='boolean'?force:!state.paused;els.pauseOverlay.hidden=!state.paused;els.pause.querySelector('span').textContent=state.paused?'▶':'Ⅱ';if(!state.paused){state.lastTime=performance.now();els.canvas.focus();}updateAudioScene(true);}
  function finishConfirm(){if(state.finished)return;state.paused=true;els.confirm.hidden=false;}

  function completeMission(manual=false,disqualified=false){
    if(state.finished)return;state.finished=true;state.phase='finished';state.paused=true;state.finishedAt=Date.now();state.disqualified=disqualified;updateAudioScene(true);if(!disqualified)playSfx('tollArrive',.38);const score=disqualified?0:state.score;
    RallyScorm.finish(score,disqualified?'failed':score>=3?'passed':'failed',disqualified?'integrity-disqualified':'completed');els.finishOverlay.hidden=false;els.confirm.hidden=true;
    els.finishTitle.textContent=disqualified?'Intento anulado por integridad':manual?'Misión finalizada por el estudiante':'¡Meta conquistada!';els.finishBadge.textContent=disqualified?'⛔':'🏁';els.finalScore.textContent=fmt(score);
    const correct=state.answers.filter(a=>a.correct).length,acc=state.answers.length?Math.round(correct/state.answers.length*100):0,dur=Math.round((state.finishedAt-state.startedAt)/60000);
    els.finishMetrics.innerHTML=`<div><small>ACIERTOS</small><strong>${correct}/${state.count}</strong></div><div><small>PRECISIÓN</small><strong>${acc}%</strong></div><div><small>PILOTO</small><strong>${Math.round(state.drivingPoints)}</strong></div><div><small>DURACIÓN</small><strong>${dur} min</strong></div>`;
    els.finishMessage.textContent=disqualified?'La quinta incidencia de integridad anuló la evaluación. La nota enviada es 0,00.':score>=4.5?`Dominio sobresaliente en la carrera de ${state.career}.`:score>=3?'Misión aprobada. El informe identifica los contextos que conviene reforzar.':'La misión terminó, pero conviene revisar la retroalimentación y realizar una nueva ruta.';updateHUD();buildLadder();
  }

  function evaluationActive(){return state.started&&!state.finished&&state.mode==='exam'&&!els.game.hidden;}
  function teacherCode(){const d=new Date();return String(d.getHours()).padStart(2,'0')+String(d.getMinutes()).padStart(2,'0');}
  function integrityStrike(title,detail){
    if(!evaluationActive()||state.securityOpen)return;const now=Date.now();if(now-state.lastIntegrityAt<1400)return;state.lastIntegrityAt=now;state.integrity++;state.paused=true;state.securityOpen=true;state.streak=0;els.integrity.textContent=`${state.integrity} / 5`;
    if(state.integrity>=5){completeMission(false,true);els.integrityOverlay.hidden=true;return;}
    els.integrityTitle.textContent=title;els.integrityDetail.textContent=detail;els.integrityCounter.textContent=`INCIDENCIA ${state.integrity} DE 5`;els.teacherPassword.value='';els.unlockMessage.textContent='';els.integrityOverlay.hidden=false;RallyScorm.save(scormState());playTone(90,.6,'sawtooth');
  }
  async function unlockIntegrity(){if(els.teacherPassword.value!==teacherCode()){els.unlockMessage.textContent='Contraseña incorrecta.';return;}try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen?.();}catch(e){}els.integrityOverlay.hidden=true;state.securityOpen=false;state.paused=false;state.invulnerableUntil=Date.now()+3000;state.lastTime=performance.now();els.canvas.focus();}
  function showFullscreenGate(message){
    if(message&&els.fullscreenGateText)els.fullscreenGateText.textContent=message;
    els.fullscreenGate.hidden=false;
    if(state.started&&!state.finished)state.paused=true;
  }
  async function enterFullscreen(){
    unlockAudio();playSfx('ui');
    try{if(!document.fullscreenElement&&document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();state.fullscreenReady=!!document.fullscreenElement;if(!state.fullscreenReady){showFullscreenGate('El navegador no activó la pantalla completa. Permite este modo y pulsa nuevamente.');return;}els.fullscreenGate.hidden=true;if(!state.started)setMusic('menu',true);if(state.started&&!state.finished&&!state.inQuestion&&!state.securityOpen){state.paused=false;state.lastTime=performance.now();els.canvas.focus();}}
    catch(e){showFullscreenGate('El navegador bloqueó la pantalla completa. Pulsa nuevamente el botón o permite este modo en la barra del navegador.');}
  }
  function bindSecurity(){
    document.addEventListener('contextmenu',e=>{if(evaluationActive()){e.preventDefault();integrityStrike('Intento de clic derecho','El menú contextual está bloqueado durante la evaluación.');}});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)integrityStrike('Cambio de pestaña o minimización','La evaluación perdió visibilidad.');});
    window.addEventListener('blur',()=>setTimeout(()=>{if(evaluationActive()&&!document.hidden&&!document.hasFocus())integrityStrike('Cambio de foco','La ventana de evaluación perdió el foco.');},250));
    ['copy','cut','paste'].forEach(type=>document.addEventListener(type,e=>{if(evaluationActive()){e.preventDefault();integrityStrike('Acción de portapapeles bloqueada',`Se detectó un intento de ${type}.`);}}));
    document.addEventListener('fullscreenchange',()=>{state.fullscreenReady=!!document.fullscreenElement;if(state.started&&!state.finished&&!document.fullscreenElement&&!state.securityOpen){if(evaluationActive())integrityStrike('Salida de pantalla completa','La evaluación debe permanecer en pantalla completa.');else showFullscreenGate('El Rally se pausó porque salió de pantalla completa. Reingresa para continuar.');}});
    window.addEventListener('beforeprint',()=>integrityStrike('Intento de impresión','Se abrió el flujo de impresión o guardado.'));
  }

  function setHeld(key,value){held[key]=value;const btn=document.querySelector(`[data-dir="${key}"],[data-action="${key}"]`);if(btn)btn.classList.toggle('pressed',value);}
  function onKeyDown(e){
    if(evaluationActive()){
      const k=e.key.toLowerCase(),restricted=e.key==='Escape'||e.key==='F12'||e.key==='PrintScreen'||((e.ctrlKey||e.metaKey)&&['c','x','v','p','s','u','a','r'].includes(k))||(e.ctrlKey&&e.shiftKey&&['i','j','c'].includes(k));
      if(restricted){e.preventDefault();e.stopPropagation();integrityStrike(e.key==='Escape'?'Intento de salir con Escape':'Atajo restringido',`Se detectó la tecla o atajo ${e.key}.`);return;}
    }
    if(['INPUT','TEXTAREA','SELECT'].includes(e.target?.tagName))return;const k=e.key.toLowerCase();
    if(['arrowleft','a'].includes(k)){e.preventDefault();held.left=true;}if(['arrowright','d'].includes(k)){e.preventDefault();held.right=true;}if(['arrowup','w'].includes(k)){e.preventDefault();held.up=true;}if(['arrowdown','s'].includes(k)){e.preventDefault();held.down=true;}if(k===' '||k==='shift'){e.preventDefault();held.turbo=true;}if(k==='p')togglePause();
  }
  function onKeyUp(e){const k=e.key.toLowerCase();if(['arrowleft','a'].includes(k))held.left=false;if(['arrowright','d'].includes(k))held.right=false;if(['arrowup','w'].includes(k))held.up=false;if(['arrowdown','s'].includes(k))held.down=false;if(k===' '||k==='shift')held.turbo=false;}

  async function imageDataUrl(src){return new Promise(resolve=>{const img=new Image();img.onload=()=>{try{const c=document.createElement('canvas'),max=900,s=Math.min(1,max/img.width);c.width=img.width*s;c.height=img.height*s;c.getContext('2d').drawImage(img,0,0,c.width,c.height);resolve(c.toDataURL('image/jpeg',.82));}catch(e){resolve(src);}};img.onerror=()=>resolve(src);img.src=src;});}
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}

  async function reportHTML(){
    const imgs={};
    for(const a of state.answers){
      const visuals=Array.isArray(a.visuals)?a.visuals:[];
      for(const v of visuals){ if(v?.src && !imgs[v.src]) imgs[v.src]=await imageDataUrl(v.src); }
      const fallback=contextMap[a.contextId]?.graphic; if(fallback && !imgs[fallback]) imgs[fallback]=await imageDataUrl(fallback);
    }
    const correct=state.answers.filter(a=>a.correct).length,byComp={};for(const comp of ['Interpretación','Formulación y ejecución','Argumentación']){const ar=state.answers.filter(a=>a.competency===comp);byComp[comp]={total:ar.length,correct:ar.filter(a=>a.correct).length};}
    const totalResponseSeconds=state.answers.reduce((s,a)=>s+(a.responseSeconds||0),0),avgResponseSeconds=state.answers.length?totalResponseSeconds/state.answers.length:0,timedOutCount=state.answers.filter(a=>a.timedOut).length,onTimeCount=state.answers.length-timedOutCount;
    const timeRows=state.answers.map((a,i)=>`<tr><td>${i+1}</td><td>${escapeHtml(a.id)}</td><td>${formatResponseTime(a.responseSeconds||0)}</td><td>${a.timedOut?'<span class="time-out">Tiempo agotado</span>':'<span class="time-ok">Respondida a tiempo</span>'}</td><td>${a.hintAvailable===false?'<span class="time-out">Bloqueada por cabina incorrecta</span>':'<span class="time-ok">Disponible</span>'}</td><td>${a.points.toFixed(2)}</td></tr>`).join('');
    const detail=state.answers.map((a,i)=>{const c=contextMap[a.contextId]||{};const htmlVisual=a.dataVisualHtml?`<div class="report-data-visual">${a.dataVisualHtml}</div>`:'';const contextHtml=a.contextHtml?`<div class="report-context-html">${a.contextHtml}</div>`:'';const visuals=(Array.isArray(a.visuals)?a.visuals:[]).map(v=>`<figure><img class="report-visual" src="${imgs[v.src]||v.src}" alt="${escapeHtml(v.alt||c.alt||'Visual de la pregunta')}">${v.caption?`<figcaption class="report-caption">${escapeHtml(v.caption)}</figcaption>`:''}</figure>`).join('');return `<section class="item"><h3>${i+1}. ${(c.title||a.id)} — ${a.event}</h3><p class="meta">${a.competency} · ${a.difficulty} · ${a.correct?'Correcta':'Incorrecta'} · ${a.points.toFixed(2)} puntos${a.hint?' · Usó pista':''} · Tiempo: ${formatResponseTime(a.responseSeconds||0)}${a.timedOut?' · Tiempo agotado':''}${a.hintAvailable===false?' · Pista bloqueada por cabina incorrecta':''}</p>${htmlVisual}${visuals}${contextHtml}<div class="stem report-stem">${a.stemHtml||escapeHtml(a.stem)}</div><ol type="A">${a.options.map(o=>`<li class="${o.letter===a.correctLetter?'correct':''} ${o.letter===a.selected&&!a.correct?'wrong':''}">${o.html||escapeHtml(o.text)}${o.option_visual_html||''}</li>`).join('')}</ol><p><b>Respuesta:</b> ${a.selected}. <b>Correcta:</b> ${a.correctLetter}. <b>Tiempo:</b> ${formatResponseTime(a.responseSeconds||0)} de 1 min 30 s.</p><div class="report-feedback"><b>Retroalimentación:</b> ${a.feedbackHtml||escapeHtml(a.feedback)}</div></section>`;}).join('');
    return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Informe Rally Cuantitativo - ${escapeHtml(state.student)}</title><style>body{font-family:Arial,sans-serif;max-width:1000px;margin:auto;padding:25px;color:#102030}h1{color:#075a85}.hero{background:#06263c;color:white;padding:22px}.metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin:15px 0}.metrics div{border:1px solid #ccd8df;padding:12px}.metrics strong{font-size:25px;display:block}.comp{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.comp div{background:#eaf4f8;padding:12px}.item{page-break-inside:avoid;border-top:3px solid #0b9bcc;margin-top:25px;padding-top:15px}.item img{display:block;max-width:760px;width:100%;margin:12px auto;border:1px solid #ccd8df}.meta{color:#526575}.stem{font-size:17px;line-height:1.45}.stem p{margin:.45em 0}.stem strong{font-size:18px}.correct{background:#d9f8e8}.wrong{background:#ffe0e7}.report-feedback{background:#eef6fa;border-left:4px solid #0b9bcc;padding:12px}.report-feedback p{margin:.45em 0}.report-caption{font-size:12px;color:#5a6b74;text-align:center;margin-top:-6px;margin-bottom:10px}.report-data-visual,.report-context-html{margin:12px 0;padding:10px;border:1px solid #ccd8df;background:#fff;overflow:auto}.report-data-visual table{border-collapse:collapse;width:100%}.report-data-visual th,.report-data-visual td{border:1px solid #cbd8df;padding:6px 8px}.time-performance{width:100%;border-collapse:collapse;margin:14px 0}.time-performance th,.time-performance td{border:1px solid #cbd8df;padding:8px;text-align:left}.time-performance th{background:#eaf4f8}.time-ok{color:#087a4a;font-weight:bold}.time-out{color:#b61f3f;font-weight:bold}footer{margin-top:30px;color:#60717b;font-size:12px}@media print{body{padding:0}.item{break-inside:avoid}}</style></head><body><div class="hero"><h1>Rally Cuantitativo — Informe del estudiante</h1><p><b>Estudiante:</b> ${escapeHtml(state.student)}<br><b>Correo electrónico:</b> ${escapeHtml(state.email||'No registrado')}<br><b>Vehículo:</b> ${state.car==='pulse'?'Pulse RS':state.car==='titan'?'Titan X':'Vector GT'} · ${COLOR_NAMES[normalizeColor(state.color)]||state.color}<br><b>Modalidad:</b> ${state.mode==='exam'?'Evaluación':'Entrenamiento'}<br><b>Fecha:</b> ${new Date(state.startedAt).toLocaleString('es-CO')}<br><b>Dispositivo:</b> ${escapeHtml(state.device?.platform||'No identificado')} · ${escapeHtml(state.controlMode)}<br><b>Semilla:</b> ${state.seed}</p></div><div class="metrics"><div>Nota<strong>${fmt(state.disqualified?0:state.score)}</strong></div><div>Aciertos<strong>${correct}/${state.count}</strong></div><div>Precisión<strong>${state.answers.length?Math.round(correct/state.answers.length*100):0}%</strong></div><div>Integridad<strong>${state.integrity}/5</strong></div><div>Puntos de piloto<strong>${Math.round(state.drivingPoints)}</strong></div><div>Choques<strong>${state.collisions}</strong></div><div>Tiempo promedio<strong>${formatResponseTime(avgResponseSeconds)}</strong></div><div>Tiempo agotado<strong>${timedOutCount}</strong></div><div>Peajes fallidos<strong>${state.tollMisses}</strong></div></div><h2>Desempeño temporal</h2><p>Ritmo de referencia mostrado durante el juego: máximo 1 minuto y 30 segundos por pregunta matemática.</p><table class="time-performance"><thead><tr><th>#</th><th>Pregunta</th><th>Tiempo</th><th>Estado</th><th>Acceso a pista</th><th>Puntos</th></tr></thead><tbody>${timeRows}</tbody></table><p><b>Respondidas dentro del tiempo:</b> ${onTimeCount}. <b>Con tiempo agotado:</b> ${timedOutCount}. <b>Tiempo total:</b> ${formatResponseTime(totalResponseSeconds)}.</p><h2>Desempeño por competencia</h2><div class="comp">${Object.entries(byComp).map(([k,v])=>`<div><b>${k}</b><p>${v.correct} de ${v.total} correctas</p></div>`).join('')}</div><h2>Detalle de respuestas</h2>${detail}<footer>Banco paramétrico de 7 familias con figuras HTML/SVG y MathJax visible. Informe generado por Rally Cuantitativo v3.10.0 · color real de carrocería mediante máscaras, sprites profesionales y física diferenciada.</footer></body></html>`;
  }

  async function downloadReport(){els.download.disabled=true;els.download.textContent='GENERANDO INFORME...';const html=await reportHTML(),blob=new Blob([html],{type:'text/html;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`Informe_Rally_Cuantitativo_${state.student.replace(/[^a-z0-9áéíóúñ]+/gi,'_')}_${new Date().toISOString().slice(0,10)}.html`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500);els.download.disabled=false;els.download.textContent='DESCARGAR INFORME HTML';}

  function bindTouchButton(button,key){
    const down=e=>{e.preventDefault();held[key]=true;button.classList.add('pressed');if(key==='turbo'&&state.turboCharge<=0)toast('TURBO VACÍO: acierta preguntas para recargar','bad');};
    const up=e=>{e.preventDefault();held[key]=false;button.classList.remove('pressed');};
    button.addEventListener('pointerdown',down);button.addEventListener('pointerup',up);button.addEventListener('pointercancel',up);button.addEventListener('pointerleave',up);button.addEventListener('contextmenu',e=>e.preventDefault());
  }

  function bindControls(){
    els.fullscreenGateBtn.addEventListener('click',enterFullscreen);els.eventStart.addEventListener('click',startEventQuestion);
    els.pause.addEventListener('click',()=>{playSfx('ui',.55);togglePause();});els.resume.addEventListener('click',()=>{playSfx('ui',.55);togglePause(false);});
    els.progressBtn.addEventListener('click',()=>{playSfx('ui',.5);updateProgressPanel();els.progressPanel.hidden=!els.progressPanel.hidden;});
    els.report.addEventListener('click',()=>{playSfx('ui',.5);if(state.finished)downloadReport();else{updateProgressPanel();els.progressPanel.hidden=false;}});
    els.sound.addEventListener('click',()=>setSoundEnabled(!state.sound));
    els.finish.addEventListener('click',finishConfirm);els.cancelFinish.addEventListener('click',()=>{els.confirm.hidden=true;state.paused=false;state.lastTime=performance.now();});els.confirmFinish.addEventListener('click',()=>completeMission(true,false));
    els.hint.addEventListener('click',useHint);els.validate.addEventListener('click',validate);els.continue.addEventListener('click',continueRally);els.unlock.addEventListener('click',unlockIntegrity);els.download.addEventListener('click',downloadReport);els.restart.addEventListener('click',()=>location.reload());
    document.querySelectorAll('.mobile-controls [data-dir]').forEach(b=>bindTouchButton(b,b.dataset.dir));bindTouchButton(els.touchTurbo,'turbo');
    document.addEventListener('keydown',onKeyDown,{capture:true});document.addEventListener('keyup',onKeyUp,{capture:true});
    const onResize=()=>{updateDeviceProfile();resize();if(state.inQuestion&&state.questions[state.index])applyQuestionLayout(state.questions[state.index]);};window.addEventListener('resize',onResize);window.visualViewport?.addEventListener('resize',onResize);window.addEventListener('orientationchange',()=>setTimeout(onResize,150));
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseAudioForVisibility();else resumeAudioFromVisibility();});
    window.addEventListener('beforeunload',()=>{if(state.started&&!state.finished)RallyScorm.save(scormState());stopAllAudio();});
  }

  function init(){
    initAudio();preloadSprites();updateViewportVars();updateDeviceProfile(true);bindBoot();bindControls();bindSecurity();setCarPreview();resize();
    const scormName=RallyScorm.init()?RallyScorm.getStudentName():'';if(scormName)els.student.value=scormName;requestAnimationFrame(drawBoot);
  }
  window.addEventListener('DOMContentLoaded',init);
})();
