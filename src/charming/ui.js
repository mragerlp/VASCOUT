globalThis.VascoutContent = {
  components:[
    {id:'housing',number:'01',name:'Probe enclosure',short:'Housing',color:'#414d55',purpose:'A deliberate grip for low-contact-force imaging, with two controls and a visible status strip.',interface:'Illustrative envelope: 150 × 56 × 34 mm. Tether routes to a separate acquisition unit.',maturity:'Concept geometry',test:'Gloved reach, cleaning, balance and contact-force usability studies.'},
    {id:'sensor',number:'02',name:'Ultrasound cartridge',short:'Acoustic sensor',color:'#80b5bc',purpose:'The primary structural imaging channel. Begin with a conventional linear-array module.',interface:'Candidate 7–15 MHz band; acoustic coupling, receive chain and synchronized acquisition.',maturity:'Bench component selection',test:'Point-spread function, vessel localization, near-field performance and deformation.'},
    {id:'optics',number:'03',name:'Photoacoustic rails',short:'Optical rails',color:'#C8742B',purpose:'Experimental hemoglobin contrast, registered with ultrasound rather than used as an autonomous diagnosis.',interface:'Tethered laboratory source first. Evaluate 850 nm LEDs and a 1064 nm pulsed-source alternative.',maturity:'Experimental extension',test:'Incremental benefit over US alone, exposure, heating, pigmentation effects and motion.'},
    {id:'coupling',number:'04',name:'Passive contact shoe',short:'Contact shoe',color:'#9eb5a4',purpose:'Replaceable interface with an open working corridor and proposed contact-force sensing.',interface:'Acoustic and optical transmission; no active suction in the initial design.',maturity:'Interface research',test:'Transmission loss, air gaps, vessel compression, cleaning and sterility requirements.'},
    {id:'electronics',number:'05',name:'Acquisition & monitoring',short:'Electronics',color:'#718e76',purpose:'Coordinate acquisition and monitor contact and temperature, with a proposed independent optical interlock.',interface:'Separate bench source/acquisition unit; the complete system is not contained in this handle.',maturity:'System architecture',test:'Synchronization, registration, failure states, latency, power and thermal budgets.'}
  ],
  requirements:[
    {id:'envelope',item:'Probe envelope',target:'150 × 56 × 34 mm',meaning:'Illustrative packaging choice',verify:'Ergonomics and integration study'},
    {id:'band',item:'Ultrasound band',target:'7–15 MHz candidate',meaning:'Vendor hardware selection pending',verify:'Bandwidth and point-spread-function measurements'},
    {id:'illumination',item:'Photoacoustic source',target:'850 nm LED / 1064 nm pulsed source',meaning:'Alternative laboratory configurations',verify:'Signal, exposure, thermal and acquisition budgets'},
    {id:'depth',item:'Vessel-depth experiment',target:'2 / 5 / 10 / 15 mm',meaning:'Phantom test positions, not operating-depth claims',verify:'Detection rate and localization error at every depth'},
    {id:'diameter',item:'Vessel-size experiment',target:'1 / 2 / 4 / 6 mm',meaning:'Phantom sizes, not clinical access thresholds',verify:'Segmentation and diameter error with confidence intervals'},
    {id:'volume',item:'3D acquisition',target:'Tracked sweep or controlled bench scan',meaning:'No real-time volumetric performance claim',verify:'Registration error, motion sensitivity and coverage'},
    {id:'benefit',item:'Photoacoustic benefit',target:'US alone versus US + PA',meaning:'Same task and ground truth',verify:'Predefined incremental benefit, failures and added time'},
    {id:'contact',item:'Contact interface',target:'Passive shoe + force sensor',meaning:'No suction actuation',verify:'Coupling, deformation, cleaning and sterility research'},
    {id:'fragments',item:'Foreign-body study',target:'Multiple materials, depths and orientations',meaning:'Negative imaging cannot exclude fragments',verify:'Sensitivity, specificity and localization error'},
    {id:'field',item:'Field suitability',target:'Bench → simulated use',meaning:'No field-ready rating',verify:'Gloves, motion, lighting, cleaning and usability'},
    {id:'unknown',item:'Missing or invalid signal',target:'Show UNKNOWN',meaning:'Never infer a safe vessel from absent data',verify:'Dropout, corruption, calibration and motion cases'}
  ],
  claims:[
    {id:'ledx',claim:'LEDX is NIR tomography',finding:'LEDX uses visible side-transillumination. NIR camera imaging and PA tomography are different methods.',status:'CONFIRMED',source:'S01'},
    {id:'depth',claim:'15 mm or 25 mm depth is already proven for this design',finding:'Published performance is specific to each research setup. Focal length and proposed test depths are not demonstrated VASCOUT operating depths.',status:'UNVERIFIED',source:'S02'},
    {id:'skin',claim:'Multispectral optics remove skin-colour bias',finding:'Bias remains a research problem; diverse optical conditions and skin pigmentation require explicit evaluation.',status:'UNVERIFIED',source:'S06'},
    {id:'autonomy',claim:'The Gemini fusion code is production-ready',finding:'Static and scalar review found six failure cases, including depth-only needle containment, empty candidate selection and missing-signal treatment directives. The code is excluded.',status:'UNVERIFIED',source:'G01'},
    {id:'bom',claim:'The cited AFE chips each have 64/128 channels',finding:'AFE5832LP has 32 receive inputs; MAX2082 has eight transceiver channels. A complete channel architecture is unresolved.',status:'CONFIRMED',source:'L01'},
    {id:'novelty',claim:'The hybrid concept is unprecedented or cleared',finding:'PA/US systems and ring sensors have prior art. Patent novelty, regulatory pathway and VASCOUT safety/effectiveness have not been established.',status:'UNVERIFIED',source:'S05'}
  ],
  questions:[
    {id:'imaging',number:'01',title:'Does the added modality help?',stage:'Bench imaging',prompt:'Compare ultrasound alone with registered US + PA using the same task and ground truth.',gate:'Measure localization, registration, failed acquisitions and additional time. Predefine what benefit would justify the extra system.'},
    {id:'coupling',number:'02',title:'Can contact preserve the anatomy?',stage:'Calibrated phantoms',prompt:'Evaluate the passive shoe, force sensing, air gaps and motion across compliant vessel phantoms.',gate:'Record vessel deformation and coupling loss. Establish materials, cleaning and sterility requirements.'},
    {id:'pigmentation',number:'03',title:'Where does optical contrast fail?',stage:'Bias & robustness',prompt:'Vary attenuation, pigmentation, depth, hematoma-like absorbers and illumination geometry.',gate:'Report performance by condition. Include UNKNOWN states and uncertainty instead of a universal correction claim.'},
    {id:'foreign-body',number:'04',title:'Which objects can be localized?',stage:'Separate phantom study',prompt:'Study metal, glass and other relevant materials across sizes, depths and orientations.',gate:'Report sensitivity, specificity and localization error. No negative result may imply all fragments have been excluded.'},
    {id:'usability',number:'05',title:'Can a trained user interpret it?',stage:'Simulated use',prompt:'Review gloved controls, attention demands, misleading overlays, motion and low-perfusion use cases with clinicians.',gate:'Measure task completion and use errors. Human-factors review precedes claims about field benefit.'},
    {id:'clinical-pathway',number:'06',title:'What evidence would permit human use?',stage:'Expert review → approved studies',prompt:'Define intended use with clinical, regulatory and safety experts before appropriately approved human studies.',gate:'Clinical safety, effectiveness, legal pathway and field suitability remain unverified. Reviewed below means discussed, not clinically validated.'}
  ],
  sources:[
    {id:'S01',title:'Veinlite LEDX — directions for use',year:'Current DFU',url:'https://dfu.veinlite.com/dfu/ledx/index.html',setting:'Manufacturer',modality:'Optical',quote:'These plastic covers are not sterile.',supports:'Visible side-transillumination; 24 orange and 8 red LEDs. A useful baseline for superficial vessel visibility.',limits:'Not NIR camera projection or PA tomography. Manufacturer specifications are not comparative clinical proof. Direct DFU read; exact wavelengths unverified.',status:'CONFIRMED'},
    {id:'S02',title:'Photoacoustic vector tomography for deep haemodynamic imaging',year:'2024',url:'https://pubmed.ncbi.nlm.nih.gov/38036619/',setting:'Healthy human',modality:'Photoacoustic',quote:'an axial resolution of 125 μm and a lateral resolution of 150 μm.',supports:'Healthy hand/arm vascular flow measurements deeper than 5 mm in the reported system.',limits:'Linear array and fiber delivery, not this probe. The 15 mm focal length is not proven 15 mm human imaging depth. Abstract/figures read; full-text access incomplete.',status:'CONFIRMED'},
    {id:'S03',title:'Photoacoustic imaging of human vasculature using LED versus laser illumination',year:'2021',url:'https://pubmed.ncbi.nlm.nih.gov/33435375/',setting:'Healthy human',modality:'Photoacoustic',quote:'tradeoffs between portability, cost, optical energy and frame rate',supports:'850 nm LED-PAI is published prior work, including phantom and healthy wrist/forearm comparisons.',limits:'Mechanically scanned, water-coupled research acquisition is not handheld field validation. No proof of the proposed 120 Hz integrated pipeline. Abstract verified; direct publisher access limited.',status:'CONFIRMED'},
    {id:'S04',title:'Monitoring peripheral hemodynamic response to changes in blood pressure via photoacoustic imaging',year:'2022',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC8918860/',setting:'Clinical',modality:'Photoacoustic',quote:'20 HD patients and 11 healthy subjects',supports:'Peripheral perfusion observations around dialysis and exercise motivate further research.',limits:'Not a validated dehydration meter or hemorrhagic-shock classifier. Primary-source retrieval by research reviewer; full article not independently reread by root.',status:'CONFIRMED'},
    {id:'S05',title:'Thin ceramic PZT dual- and multi-frequency pMUT arrays for photoacoustic imaging',year:'2022',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC9668999/',setting:'Phantom',modality:'Photoacoustic',quote:'only 2D photoacoustic images can be reconstructed without depth scanning.',supports:'Related ring and square sensor-array prior art tested with pencil leads in agar.',limits:'Not a real-time human vascular access device. Novelty and freedom to operate remain unverified. Indexed primary text reviewed; direct PMC access challenged.',status:'CONFIRMED'},
    {id:'S06',title:'The confounding effects of skin colour in photoacoustic imaging',year:'2026',url:'https://www.nature.com/articles/s41467-026-74380-7',setting:'Healthy human',modality:'Photoacoustic',quote:'no generalisable bias correction has been demonstrated.',supports:'Study of 42 healthy participants covering Fitzpatrick I–VI and vitiligo; optical and acoustic confounding affects measurements.',limits:'No demonstrated skin-tone invariance for VASCOUT. Direct article read; published 17 June 2026.',status:'CONFIRMED'},
    {id:'S07',title:'TCCC Guidelines — vascular access claim audit',year:'2026',url:'https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents',setting:'Guideline',modality:'Clinical practice',quote:'Circulation',supports:'The 1 May 2026 guideline provides the clinical context for the vascular-access claim audit.',limits:'Its access section does not specify Gemini’s six-second classifier or 1.2 mm vessel threshold. Direct PDF read. This app does not give treatment instructions.',status:'CONFIRMED'},
    {id:'S08',title:'Bedside ultrasound for detection of soft tissue foreign bodies: a cadaveric study',year:'2009',url:'https://pubmed.ncbi.nlm.nih.gov/18930374/',setting:'Cadaver',modality:'Ultrasound',quote:'Inter-observer reliability was poor.',supports:'In this study: six cadavers, six physicians, 900 examinations; sensitivity 52.6%, specificity 47.2%.',limits:'Small objects ≤5 mm at depths ≤3 cm. Results are setting-specific; negative imaging cannot universally exclude fragments. Abstract directly read.',status:'CONFIRMED'},
    {id:'S09',title:'Ultrasound evaluation of soft-tissue foreign bodies by US Army medics',year:'2018',url:'https://pubmed.ncbi.nlm.nih.gov/30283201/',setting:'Simulation',modality:'Ultrasound',quote:'sensitivity and specificity of 73% and 78%',supports:'After two hours of training, 28 medics studied wooden objects in chicken-thigh models.',limits:'Simulated-use evidence, not injured-human or battlefield validation. Primary abstract and indexed article reviewed; direct PMC retrieval limited.',status:'CONFIRMED'},
    {id:'S10a',title:'Ultrasonography-guided peripheral intravenous access versus traditional approaches',year:'2005',url:'https://pubmed.ncbi.nlm.nih.gov/16271677/',setting:'Clinical',modality:'Ultrasound',quote:'Success rate was greater for the ultrasonographic group (97%) versus control (33%)',supports:'Reported benefit in 60 difficult-access patients at two hospitals.',limits:'Odd/even-day allocation and two US operators; not concealed randomized assignment. Read alongside S10b. Indexed primary abstract; full article unverified.',status:'CONFIRMED'},
    {id:'S10b',title:'Ultrasonographically guided peripheral intravenous cannulation: a randomized trial',year:'2009',url:'https://pubmed.ncbi.nlm.nih.gov/18824276/',setting:'Clinical',modality:'Ultrasound',quote:'Superiority of ultrasonographically guided peripheral intravenous cannulation is not supported by this study.',supports:'A 59-patient ED trial did not demonstrate improvement in attempts, time or satisfaction.',limits:'Conflicting evidence matters; results depend on workflow and setting. Indexed primary abstract; full article unverified.',status:'CONFIRMED'},
    {id:'S11',title:'FDA: Imagio Breast Imaging System — P200003',year:'2021',url:'https://www.fda.gov/medical-devices/recently-approved-devices/imagior-breast-imaging-system-p200003',setting:'Regulator',modality:'Hybrid',quote:'uses both optoacoustic (OA) and ultrasound (US) to image breast tissues',supports:'An approved OA/US product exists for a specified breast-imaging indication.',limits:'Unrelated indication: no VASCOUT clearance, safety/effectiveness or predetermined legal pathway follows. Direct FDA overview read.',status:'CONFIRMED'},
    {id:'S12',title:'A device for improving the visual clarity and dimension of veins',year:'2018',url:'https://ntu-repository.worktribe.com/output/681739/a-device-for-improving-the-visual-clarity-and-dimension-of-veins',setting:'Healthy human',modality:'Contact interface',quote:'20 healthy volunteers',supports:'Related vacuum-device research used a healthy-volunteer crossover study.',limits:'Not shock patients; does not establish the Gemini suction range or outcome. Indexed abstract reviewed; repository/PDF fetch gaps. Suction excluded from initial concept.',status:'CONFIRMED'},
    {id:'L01',title:'TI AFE5832LP — ultrasound analog front end',year:'Manufacturer',url:'https://www.ti.com/product/AFE5832LP',setting:'Manufacturer',modality:'Electronics',quote:'The VCA die has 32 channels',supports:'32 receive inputs with 16 multiplexed ADC channels.',limits:'Not a single 64/128-channel transceiver. Complete transmit/receive architecture, bandwidth and power budget are unresolved. Direct manufacturer page read.',status:'CONFIRMED'},
    {id:'L02',title:'Analog Devices MAX2082 — octal ultrasound transceiver',year:'Manufacturer',url:'https://www.analog.com/en/products/max2082.html',setting:'Manufacturer',modality:'Electronics',quote:'fully integrated octal ultrasound transceiver',supports:'Eight channels per device, with integrated transmit and receive functions.',limits:'Does not establish feasibility of the proposed 128-channel dual-band C-ring. Direct manufacturer page read.',status:'CONFIRMED'},
    {id:'G01',title:'User-supplied Gemini concepts — audited research inputs',year:'2026',url:null,setting:'Concept material',modality:'Hybrid',quote:'production-ready',supports:'Motivating ideas: visible vascular mapping, field access, LED-PAI and a possible C-ring geometry.',limits:'Two supplied PDFs and three text attachments are proposals, not studies. Six latest-code failure cases were reproduced using independent arithmetic; no supplied code was executed. No autonomous diagnosis or treatment logic adopted.',status:'THIRD-PARTY'}
  ]
};

;
globalThis.VascoutDomain=(()=>{
  const initialView=()=>({scene:'device',yaw:-.65,pitch:.45,zoom:1,explode:0,selected:'housing',layers:{housing:true,sensor:true,optics:true,coupling:true,electronics:true},foreignBody:false,demoTime:0,demoPlaying:false});
  const clamp=(n,a,b)=>Math.min(b,Math.max(a,Number.isFinite(Number(n))?Number(n):a));
  const reduceView=(state,action)=>{
    const s={...state,layers:{...state.layers}};
    switch(action.type){
      case 'reset':return initialView();
      case 'select':if(Object.hasOwn(s.layers,action.id))s.selected=action.id;break;
      case 'layer':if(Object.hasOwn(s.layers,action.id))s.layers[action.id]=!!action.visible;break;
      case 'explode':s.explode=clamp(action.value,0,1);break;
      case 'zoom':s.zoom=clamp(action.value,.65,1.8);break;
      case 'orbit':s.yaw=Number.isFinite(action.yaw)?action.yaw:s.yaw;s.pitch=clamp(action.pitch,-1.2,1.2);break;
      case 'preset':{const p={front:[0,0],side:[1.5708,0],top:[0,1.2]}[action.name];if(p){s.yaw=p[0];s.pitch=p[1];}break;}
      case 'scene':if(['device','tissue','demo'].includes(action.value)){s.scene=action.value;s.demoPlaying=false;}break;
      case 'demoSeek':s.demoTime=clamp(action.value,0,30);s.demoPlaying=false;break;
      case 'demoPlay':s.demoPlaying=s.scene==='demo'&&!!action.value;if(s.demoPlaying&&s.demoTime>=30)s.demoTime=0;break;
      case 'demoTick':if(s.scene==='demo'&&s.demoPlaying){s.demoTime=clamp(s.demoTime+Math.max(0,Number(action.seconds)||0),0,30);if(s.demoTime>=30)s.demoPlaying=false;}break;
      case 'foreignBody':s.foreignBody=!!action.value;break;
    }return s;
  };
  const filterSources=(sources,{query='',setting='',modality=''})=>sources.filter(s=>(!setting||s.setting===setting)&&(!modality||s.modality===modality)&&[s.id,s.title,s.supports,s.limits,s.year].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
  const mergeReviews=(state,incoming)=>{
    const saved={...state.saved},drafts={...state.drafts},changedIds=[],conflictIds=[];
    const same=(a,b)=>a?.text===b?.text&&a?.reviewed===b?.reviewed;
    for(const [id,record] of Object.entries(incoming)){
      const prior=saved[id]||{text:'',reviewed:false},draft=drafts[id];
      const dirty=draft&&!same(draft,prior);
      if(!same(prior,record))changedIds.push(id);
      saved[id]={...record};
      if(!dirty)drafts[id]={text:record.text,reviewed:record.reviewed};
      else if(!same(draft,record)&&!same(prior,record))conflictIds.push(id);
    }
    return {saved,drafts,changedIds,conflictIds};
  };
  const demoFrame=time=>{
    const t=clamp(time,0,30),stage=t<6?0:t<15?1:t<23?2:3;
    return {stage,time:t,scan:clamp((t-6)/9,0,1),map:clamp((t-15)/6,0,1),probeZ:stage===0?-65:-65+clamp((t-6)/9,0,1)*120};
  };
  return {initialView,reduceView,filterSources,mergeReviews,demoFrame};
})();

;
globalThis.Vascout3D=(()=>{
  const D=globalThis.VascoutDomain;
  function rounded(id,center,size,color,radius=8,material='polymer'){
    const [w,h,l]=size.map(v=>v/2),vertices=[],faces=[],n=32;
    const rings=[[-h,.84],[-h+Math.min(2,h/2),1],[h-Math.min(3,h/2),1],[h,.87]];
    for(const [y,scale] of rings)for(let corner=0;corner<4;corner++)for(let j=0;j<8;j++){
      const angle=corner*Math.PI/2+j/7*Math.PI/2,cx=(corner===0||corner===3?1:-1)*(w-radius),cz=(corner<2?1:-1)*(l-radius);
      vertices.push([center[0]+(cx+Math.cos(angle)*radius)*scale,center[1]+y,center[2]+(cz+Math.sin(angle)*radius)*scale]);
    }
    faces.push({indices:Array.from({length:n},(_,i)=>i)},{indices:Array.from({length:n},(_,i)=>i+n*3)});
    for(let ring=0;ring<3;ring++)for(let i=0;i<n;i++)faces.push({indices:[ring*n+i,ring*n+(i+1)%n,(ring+1)*n+(i+1)%n,(ring+1)*n+i]});
    return {id,vertices,faces,color,alpha:1,material};
  }
  function pathTube(id,points,radius,color,material='rubber'){
    const vertices=[],faces=[],n=10;
    for(const p of points)for(let i=0;i<n;i++){const a=i/n*Math.PI*2;vertices.push([p[0]+Math.cos(a)*radius,p[1]+Math.sin(a)*radius,p[2]]);}
    for(let j=0;j<points.length-1;j++)for(let i=0;i<n;i++)faces.push({indices:[j*n+i,j*n+(i+1)%n,(j+1)*n+(i+1)%n,(j+1)*n+i]});
    faces.push({indices:Array.from({length:n},(_,i)=>i)},{indices:Array.from({length:n},(_,i)=>vertices.length-n+i)});
    return {id,vertices,faces,color,material,alpha:1};
  }
  function armMesh(){
    const vertices=[],faces=[],n=32;
    for(let j=0;j<=12;j++){const z=-120+j*20,t=j/12,rx=30+10*Math.sin(t*Math.PI*.8),ry=25+4*Math.sin(t*Math.PI);for(let i=0;i<n;i++){const a=i/n*Math.PI*2;vertices.push([Math.cos(a)*rx,-13+Math.sin(a)*ry,z]);}}
    for(let j=0;j<12;j++)for(let i=0;i<n;i++)faces.push({indices:[j*n+i,j*n+(i+1)%n,(j+1)*n+(i+1)%n,(j+1)*n+i]});
    faces.push({indices:Array.from({length:n},(_,i)=>i)},{indices:Array.from({length:n},(_,i)=>12*n+i)});
    return {id:'arm',vertices,faces,color:'#bd927e',alpha:1,material:'skin'};
  }
  const transform=(mesh,scale,offset)=>({...mesh,vertices:mesh.vertices.map(p=>p.map((v,i)=>v*scale+offset[i]))});
  function box(id,center,size,color,bevel=3,alpha=1){
    const [w,h,l]=size.map(v=>v/2),b=Math.min(bevel,w,l);
    const ring=[[-w+b,-l],[w-b,-l],[w,-l+b],[w,l-b],[w-b,l],[-w+b,l],[-w,l-b],[-w,-l+b]];
    const vertices=[-h,h].flatMap(y=>ring.map(([x,z])=>[x+center[0],y+center[1],z+center[2]]));
    const faces=[{indices:[7,6,5,4,3,2,1,0],shade:.65},{indices:[8,9,10,11,12,13,14,15],shade:1.14}];
    for(let i=0;i<8;i++)faces.push({indices:[i,(i+1)%8,(i+1)%8+8,i+8],shade:.72+(i%4)*.1});
    return {id,vertices,faces,color,alpha,material:'matte'};
  }
  function tube(id,center,radius,length,color){
    const vertices=[];for(const z of [-length/2,length/2])for(let i=0;i<20;i++){const a=i*Math.PI/10;vertices.push([center[0]+Math.cos(a)*radius,center[1]+Math.sin(a)*radius,center[2]+z]);}
    const faces=[];for(let i=0;i<20;i++)faces.push({indices:[i,(i+1)%20,(i+1)%20+20,i+20],shade:.65+.4*(Math.sin(i*Math.PI/10)+1)/2});
    faces.push({indices:Array.from({length:20},(_,i)=>i),shade:.55},{indices:Array.from({length:20},(_,i)=>i+20),shade:.6});
    return {id,vertices,faces,color,alpha:1,material:'rubber'};
  }
  function buildScene(view){
    const out=[],e=view.explode;
    if(view.scene==='demo'){
      const f=D.demoFrame(view.demoTime),arm=armMesh();
      out.push(rounded('field-mat',[0,-46,0],[118,5,278],'#495c56',12,'rubber'));
      for(const x of [-52,52])out.push(box('field-mat',[x,-42,0],[2,1,245],'#89918a',0));
      out.push(arm);
      const setupLift=f.stage===0?(1-Math.min(1,f.time/5))*22:0;
      const probeView={...view,scene:'device',explode:0,layers:{housing:true,sensor:true,optics:true,coupling:true,electronics:true}};
      for(const mesh of buildScene(probeView).filter(m=>m.id!=='bench'))out.push(transform(mesh,.46,[0,27+setupLift,f.probeZ]));
      out.push(rounded('bench',[93,-17,-60],[49,40,68],'#536266',7,'polymer'),rounded('bench',[93,4,-60],[36,2,48],'#102e35',4,'glass'));
      const points=Array.from({length:17},(_,i)=>{const t=i/16;return [t*92,28+(1-t)*setupLift-40*Math.sin(t*Math.PI),f.probeZ-35+(-62-f.probeZ)*t];});
      out.push(pathTube('tether',points,1.5,'#303c40'));
      if(f.stage>=1&&f.stage<3){out.push({...box('scan-plane',[0,8,f.probeZ],[58,37,1],'#6dc5c6',0,.24),material:'light'});}
      if(f.stage>=2){
        const length=f.map*200;
        const vessel=Array.from({length:28},(_,i)=>{const z=-96+length*i/27;return [Math.sin(z/47)*6,18.5,z];});
        out.push(pathTube('mapped-vessel',vessel,2.5,'#63c8cf','light'));
        if(f.map>.42){const branch=Array.from({length:15},(_,i)=>{const t=i/14;return [t*22,18,-15+t*70*f.map];});out.push(pathTube('mapped-vessel',branch,1.7,'#63c8cf','light'));}
        // Discontinuous secondary segment communicates unresolved anatomy, not a patency diagnosis.
        if(f.stage===3)for(let i=0;i<6;i++)out.push(pathTube('uncertainty',[[16,19,47+i*7],[17,19,50+i*7]],1.2,'#e5b377','light'));
      }
      return out;
    }
    if(view.scene==='tissue'){
      out.push(box('tissue',[-31,-23,0],[45,38,140],'#c49c8a',1,.38),box('tissue',[31,-23,0],[45,38,140],'#c49c8a',1,.38));
      out.push(box('skin',[-31,-2,0],[45,3,140],'#bc8978',1,.8),box('skin',[31,-2,0],[45,3,140],'#bc8978',1,.8));
      out.push(tube('vessel',[0,-15,0],7,132,'#5f9aa7'),tube('lumen',[0,-15,1],4.7,134,'#284b61'));
      if(view.foreignBody)out.push(box('foreign',[24,-12,15],[9,6,19],'#d4a14f',2));
      return out;
    }
    const add=(id,c,s,col,b=3)=>{if(view.layers[id]&&(id!=='electronics'||e>.08||!view.layers.housing))out.push(box(id,c,s,col,b));};
    if(view.layers.housing){
      out.push(rounded('housing',[0,10+e*46,0],[56,19,150],'#5d6972',12),rounded('housing',[0,1+e*46,0],[55,2,148],'#a4b5b9',11,'metal'),rounded('housing',[0,20+e*46,9],[34,3,84],'#27353d',10,'rubber'));
      for(let i=0;i<10;i++)out.push(rounded('housing',[0,22+e*46,-17+i*5],[26,.65,1.2],'#42525a',.5,'rubber'));
      out.push(rounded('housing',[0,21+e*46,-45],[24,1.5,17],'#152b31',5,'glass'),rounded('housing',[-7,22+e*46,-45],[7,1,4],'#80cfba',1,'light'),rounded('housing',[7,22+e*46,-45],[5,1,4],'#c8742b',1,'light'));
      for(const x of [-20,20])for(const z of [-57,57]){out.push(rounded('housing',[x,18+e*46,z],[4,1,4],'#b4bec0',1.9,'metal'));add('housing',[x,18.6+e*46,z],[2,.2,.5],'#394349',0);}
      out.push(rounded('housing',[0,8+e*46,-77],[18,11,9],'#26383e',4,'rubber'));
    }
    add('electronics',[0,0+e*17,8],[42,3,100],'#708d70',3);
    for(let i=0;i<5;i++)add('electronics',[-10+i*5,3+e*17,20],[3,2,20],'#c4b99a',0);
    add('electronics',[0,4+e*17,-13],[18,5,23],'#344441',1);
    add('sensor',[0,-10-e*15,-15],[33,8,88],'#81aab0',2);
    if(view.layers.sensor)out.push(rounded('sensor',[0,-14-e*15,-15],[35,2,90],'#314c59',3,'glass'));
    for(let i=0;i<16;i++)add('sensor',[0,-14.5-e*15,-55+i*5],[31,.6,1.5],'#c3d4d0',0);
    for(const x of [-23,23]){add('optics',[x,-6-e*40,-10],[6,7,110],'#c8742b',2);for(let i=0;i<9;i++)add('optics',[x,-10-e*40,-52+i*11],[4,1,5],'#efc695',.5);}
    for(const x of [-24,24])add('coupling',[x,-20-e*63,-10],[8,6,117],'#a1b7a5',3);
    add('coupling',[0,-20-e*63,48],[48,6,9],'#a1b7a5',2);
    out.push(rounded('bench',[92,-20,-78],[41,26,48],'#65757c',6));
    out.push(rounded('bench',[92,-6,-78],[28,1,25],'#1e343b',3,'glass'));
    return out;
  }
  function projectPoint(point,view,viewport){
    const [x,y,z]=point,cy=Math.cos(view.yaw),sy=Math.sin(view.yaw),cp=Math.cos(view.pitch),sp=Math.sin(view.pitch);
    const rx=x*cy+z*sy,rz=-x*sy+z*cy,ry=y*cp-rz*sp,depth=y*sp+rz*cp;
    const scale=Math.min(viewport.width/(view.scene==='demo'?330:260),viewport.height/260)*view.zoom*520/Math.max(140,520-depth);
    return {x:viewport.width*.47+rx*scale,y:viewport.height*.49-ry*scale,depth};
  }
  const shade=(hex,f)=>{const n=parseInt(hex.slice(1),16);return `rgb(${[n>>16,(n>>8)&255,n&255].map(v=>Math.min(255,Math.round(v*f))).join(',')})`;};
  function lighting(mesh,face,view,center){
    const [a,b,c]=face.indices.slice(0,3).map(i=>mesh.vertices[i]);
    const u=b.map((v,i)=>v-a[i]),v=c.map((x,i)=>x-a[i]);
    let n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
    if(n.reduce((s,x,i)=>s+x*(a[i]-center[i]),0)<0)n=n.map(x=>-x);
    const len=Math.hypot(...n)||1;n=n.map(x=>x/len);
    const diffuse=Math.max(0,n[0]*-.32+n[1]*.85+n[2]*.42);
    const gloss={metal:.5,glass:.65,polymer:.14,rubber:.04,skin:.1,light:.1}[mesh.material]||.08;
    const eye=[Math.sin(view.yaw)*.5,.75,Math.cos(view.yaw)*.5];
    const spec=Math.pow(Math.max(0,n.reduce((s,x,i)=>s+x*eye[i],0)),14)*gloss;
    return mesh.material==='light'?1.12:.49+diffuse*.6+spec;
  }
  function mount(canvas,{getState,dispatch,onError}){
    let ctx;try{ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable');}catch(error){onError(error);return {render(){},destroy(){}};}
    let hit=[],drag=null,raf=0,destroyed=false,lastTime=null;
    const media=window.matchMedia?.('(prefers-reduced-motion: reduce)');
    function render(){
      if(destroyed||raf)return;raf=requestAnimationFrame(draw);
    }
    function draw(now){
      raf=0;if(destroyed)return;
      try{
        const current=getState();
        if(current.scene==='demo'&&current.demoPlaying&&!media?.matches&&!document.hidden){if(lastTime!==null)dispatch({type:'demoTick',seconds:Math.min(.12,Math.max(0,(now-lastTime)/1000))});lastTime=now;}else lastTime=null;
        const r=canvas.getBoundingClientRect(),v={width:r.width,height:r.height};if(!v.width||!v.height)return;
        const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=v.width*dpr;canvas.height=v.height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,v.width,v.height);
        const state=getState(),dark=canvas.closest('[data-theme="dark"]')!==null;
        const line=dark?'#3b4144':'#d8d5cc',ink=dark?'#c4cbc9':'#626a69';
        const shadow=projectPoint([20,-65,0],state,v),gradient=ctx.createRadialGradient(shadow.x,shadow.y,5,shadow.x,shadow.y,Math.min(v.width,v.height)*.34);
        gradient.addColorStop(0,dark?'rgba(0,0,0,.45)':'rgba(39,48,45,.21)');gradient.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gradient;ctx.save();ctx.translate(0,shadow.y*.45);ctx.scale(1,.55);ctx.fillRect(0,0,v.width,v.height*2);ctx.restore();
        ctx.strokeStyle=line;ctx.lineWidth=.45;
        for(let i=-140;i<=140;i+=20){for(const pair of [[[i,-68,-140],[i,-68,140]],[[-140,-68,i],[140,-68,i]]]){const a=projectPoint(pair[0],state,v),b=projectPoint(pair[1],state,v);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
        if(state.scene==='device'){
          const points=[[0,4+state.explode*46,-75],[8,2,-96],[43,-30,-115],[74,-25,-88]].map(p=>projectPoint(p,state,v));
          ctx.strokeStyle=dark?'#77817f':'#505e60';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);ctx.bezierCurveTo(points[1].x,points[1].y,points[2].x,points[2].y,points[3].x,points[3].y);ctx.stroke();
        }
        const faces=[];for(const mesh of buildScene(state)){const ps=mesh.vertices.map(p=>projectPoint(p,state,v)),center=mesh.vertices.reduce((s,p)=>s.map((x,i)=>x+p[i]/mesh.vertices.length),[0,0,0]);for(const face of mesh.faces){const points=face.indices.map(i=>ps[i]);faces.push({mesh,points,depth:points.reduce((s,p)=>s+p.depth,0)/points.length,shade:lighting(mesh,face,state,center)});}}
        faces.sort((a,b)=>a.depth-b.depth);hit=[];
        for(const f of faces){const path=new Path2D();f.points.forEach((p,i)=>i?path.lineTo(p.x,p.y):path.moveTo(p.x,p.y));path.closePath();ctx.globalAlpha=f.mesh.alpha;ctx.fillStyle=shade(f.mesh.color,f.shade);ctx.fill(path);ctx.lineWidth=.35;ctx.strokeStyle=shade(f.mesh.color,f.shade*.97);ctx.stroke(path);ctx.globalAlpha=1;hit.push({path,id:f.mesh.id});}
        ctx.font='11px ui-monospace, monospace';ctx.fillStyle=ink;
        if(state.scene==='device'){
          const p=projectPoint([91,-37,-80],state,v);ctx.fillText('BENCH UNIT',Math.min(v.width-95,p.x-30),p.y+19);
          ctx.fillText('ILLUSTRATIVE • NOT TO SCALE',18,v.height-18);
        }else if(state.scene==='demo'){
          const f=D.demoFrame(state.demoTime);
          ctx.font='10px ui-monospace, monospace';ctx.fillStyle=ink;ctx.fillText('CONCEPT ONLY • SYNTHETIC ANATOMY',18,v.height-18);
          if(f.stage>=1){
            const x=18,y=v.height-140,w=Math.min(155,v.width*.4),hh=96;
            ctx.fillStyle='#122126';ctx.fillRect(x,y,w,hh);ctx.strokeStyle='#6c8588';ctx.strokeRect(x,y,w,hh);
            ctx.fillStyle='#b6d8d8';ctx.font='8px ui-monospace, monospace';ctx.fillText('SIMULATED IMAGING',x+9,y+14);
            for(let row=0;row<12;row++)for(let col=0;col<26;col++){const tone=40+Math.round((Math.sin(col*13+row*7)+1)*25);ctx.fillStyle=`rgb(${tone},${tone+9},${tone+11})`;ctx.fillRect(x+8+col*(w-16)/26,y+25+row*4,(w-16)/26,3);}
            ctx.fillStyle='#0c1c23';ctx.beginPath();ctx.ellipse(x+w*.51,y+49,19,10,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#72c6ce';ctx.stroke();
            ctx.fillStyle='#a7bec1';ctx.fillText('ILLUSTRATION / NO DATA',x+9,y+85);
          }
        }else ctx.fillText('SYNTHETIC ANATOMY • NO PATIENT DATA',18,v.height-18);
        if(state.scene==='demo'&&state.demoPlaying&&!media?.matches&&!document.hidden)render();
      }catch(error){onError(error);}
    }
    const down=e=>{if(e.button!==0)return;drag={x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY};canvas.setPointerCapture(e.pointerId);};
    const move=e=>{if(!drag)return;const s=getState();dispatch({type:'orbit',yaw:s.yaw+(e.clientX-drag.x)*.008,pitch:s.pitch+(e.clientY-drag.y)*.008});drag.x=e.clientX;drag.y=e.clientY;};
    const up=e=>{if(!drag)return;const moved=Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY);drag=null;if(moved<5&&getState().scene==='device'){const r=canvas.getBoundingClientRect();for(let i=hit.length-1;i>=0;i--)if(ctx.isPointInPath(hit[i].path,(e.clientX-r.left)*(canvas.width/r.width),(e.clientY-r.top)*(canvas.height/r.height))){dispatch({type:'select',id:hit[i].id});break;}}};
    const cancel=()=>{drag=null;};
    const wheel=e=>{e.preventDefault();dispatch({type:'zoom',value:getState().zoom-e.deltaY*.001});};
    const key=e=>{const s=getState();if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-'].includes(e.key)){e.preventDefault();if(e.key==='+'||e.key==='-')dispatch({type:'zoom',value:s.zoom+(e.key==='+'?.1:-.1)});else dispatch({type:'orbit',yaw:s.yaw+(e.key==='ArrowLeft'?-.1:e.key==='ArrowRight'?.1:0),pitch:s.pitch+(e.key==='ArrowUp'?.1:e.key==='ArrowDown'?-.1:0)});}};
    const events=[['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',cancel],['wheel',wheel,{passive:false}],['keydown',key]];
    for(const args of events)canvas.addEventListener(...args);
    const pause=()=>{lastTime=null;dispatch({type:'demoPlay',value:false});render();};
    document.addEventListener('visibilitychange',pause);media?.addEventListener('change',pause);if(document.hidden||media?.matches)pause();
    const observer=new ResizeObserver(render);observer.observe(canvas);render();
    return {render,destroy(){destroyed=true;cancelAnimationFrame(raf);raf=0;observer.disconnect();document.removeEventListener('visibilitychange',pause);media?.removeEventListener('change',pause);for(const args of events)canvas.removeEventListener(...args);}};
  }
  return {buildScene,projectPoint,mount};
})();

;
globalThis.VascoutPartners = {"snapshot":"20 OCT 2026","researchStatus":"Prospects only. No affiliation, endorsement or partner interest confirmed. Draft pitches have not been sent.","selectionMethod":"Qualitative fit to one of four research needs: US/PA bench comparison, independent methods, clinician workflow, or military-medical requirements and teaming. Suggested sequence is an inference, not an acceptance probability or a funding ranking.","firstDiscussions":["verasonics","cyberdyne","michigan"],"sharedBoundary":"VASCOUT is an unvalidated research concept. Clinical benefit, safety, field suitability, novelty and regulatory readiness remain unverified. Start with a comparator, ground truth and predefined failure criteria.","partners":[{"id":"verasonics","name":"Verasonics","category":"Imaging & hardware","role":"Programmable US/PA bench platform","sequence":"Feasibility first","sourceIds":["P01","P02"],"fact":"Verasonics describes research ultrasound with receive-only photoacoustic operation and interleaved B-mode/PAI. It explicitly invites collaborations with companies and researchers.","fit":"A plausible platform discussion for synchronized US/PA acquisition and reproducible raw-data experiments before custom probe electronics.","study":"Scope an ultrasound-only versus US+PA phantom comparison using known vessel geometry, controlled contact force and motion. Measure localization error, dropout, added acquisition time and registration error.","deliverable":"A bench architecture, component/trigger compatibility matrix and agreed experimental protocol with stop criteria.","gap":"Hardware compatibility, system configuration, access cost, licensing, staff time and collaboration interest are unverified. A programmable platform is not a deployable field device.","route":"Published collaboration/contact route; ask for technical feasibility discussion.","routeUrl":"https://verasonics.com/contact-us/","subject":"Research discussion: a reproducible US/PA vascular-imaging benchmark","pitch":"VASCOUT is an unvalidated vascular-imaging concept centered on low-contact-force ultrasound, with an experimental photoacoustic extension. Your programmable research platform appears relevant to testing the acquisition chain before custom hardware. Would your team consider a technical scoping discussion for a matched US-only versus US+PA phantom study? We propose agreeing ground truth, trigger compatibility, localization and registration metrics, dropout reporting and a failure threshold before selecting a configuration. The first output would be a reproducible protocol and feasibility matrix; clinical or field benefit is not established."},{"id":"cyberdyne","name":"CYBERDYNE / Acoustic X","category":"Imaging & hardware","role":"LED-PA comparator and prior art","sequence":"Feasibility first","sourceIds":["P03","P04"],"fact":"CYBERDYNE presents Acoustic X as an LED-based PA/US research system. Its page already lists vascular-access-related work and provides an Acoustic X inquiry category.","fit":"A particularly relevant comparator and prior-art discussion for deciding whether a contact/quality-feedback concept adds anything to existing LED-PA research.","study":"Compare a documented Acoustic X research configuration with ultrasound alone on matched phantoms; vary depth, diameter, optical attenuation, contact force and motion. Treat attenuation phantoms as limited models, not proof across human skin tones.","deliverable":"A comparator protocol and an incremental-benefit report that includes negative results, exposure/thermal measurements and acquisition overhead.","gap":"Equipment availability, configuration, data access, research support and willingness to collaborate are unverified. Related prior work means novelty cannot be assumed; no field-access outcome follows.","route":"Official product inquiry; select Acoustic X and request research-team routing.","routeUrl":"https://www.cyberdyne.jp/en/contact","subject":"Research discussion: contact and image-quality limits in LED-PA vascular imaging","pitch":"Your Acoustic X work already addresses LED-based PA/US and peripheral vascular targets, making it a relevant starting point for VASCOUT rather than evidence that the hybrid idea is new. Would your research team explore a comparator study focused on contact deformation, optical attenuation, motion and explicit invalid-signal reporting? We would agree a US-only baseline and measure incremental localization value, exposure, heating and added time. VASCOUT currently consists of a concept dossier and synthetic demonstration; the proposed collaboration would determine whether its interface and uncertainty-feedback ideas merit further development."},{"id":"michigan","name":"University of Michigan / Optical Imaging Laboratory","category":"Academic methods","role":"Independent imaging methodology","sequence":"Feasibility first","sourceIds":["P14"],"fact":"The official Michigan BME profile identifies the Optical Imaging Laboratory and research on photoacoustic imaging and systems combining light and ultrasound.","fit":"Potential methodological input on optical/acoustic confounding, registration, phantom design and an independently interpretable comparison.","study":"Co-design calibrated phantom experiments with independent geometry measurements, optical/acoustic characterization and a prespecified analysis plan. Audit whether image-quality feedback identifies invalid data without overstating anatomical confidence.","deliverable":"A reviewed protocol, annotated failure taxonomy and transparent analysis plan; a possible publication would depend on agreement and results.","gap":"Lab capacity, resources, data access and willingness are unconfirmed. The listed research is adjacent expertise, not proof of vascular-access or battlefield performance.","route":"Official faculty/lab profile; request an investigator-led methods discussion.","routeUrl":"https://bme.umich.edu/people/wang-xueding/","subject":"Methods collaboration: ground truth and failure reporting for a US/PA concept","pitch":"VASCOUT proposes clinician-controlled vascular visualization using ultrasound with an experimental PA channel. Your Optical Imaging Laboratory's light-and-ultrasound research appears relevant to a methods review before any clinical claims. Would the group consider helping define phantom ground truth, attenuation and contact-force controls, registration metrics and a prespecified failure analysis? We would value a study designed to find where the added channel fails as well as where it helps. The immediate ask is protocol critique and possible research scoping, with resources and publication terms to be agreed."},{"id":"usaisr","name":"U.S. Army Institute of Surgical Research","category":"Defense research","role":"Military-medical requirements and simulation","sequence":"Protocol shaping","sourceIds":["P11","P12"],"fact":"USAISR's CRT3 page lists medical-device development and medical simulations. Its partnering page describes external collaboration and Business Development Office support for CRADAs and technology transfer.","fit":"A potential requirements and simulated-use discussion for a clinician-controlled imaging concept in prolonged-care conditions.","study":"After a credible bench protocol, define simulated tasks involving gloves, movement, setup, cleaning and degraded signal. Measure workflow burden and recognition of uncertainty; do not infer battlefield effectiveness from simulation.","deliverable":"A research requirements map, simulation protocol and agreed go/no-go criteria tied to measured bench evidence.","gap":"Mission alignment, agreement eligibility, investigator availability, funding and access to facilities are unverified. The public partnering page is not an award or invitation for this device.","route":"Research Directorate Business Development Office through the published partnering resources.","routeUrl":"https://usaisr.health.mil/index.cfm/research/partnering","subject":"Research scoping: uncertainty-aware vascular imaging in simulated prolonged care","pitch":"VASCOUT is a concept-stage, clinician-controlled vascular-imaging proposal; it has no demonstrated field or patient benefit. USAISR's device-development and simulation capabilities appear relevant to defining what evidence would make the concept worth testing. Would the Research Directorate consider a requirements discussion, routed through the appropriate partnering mechanism, on setup burden, contact deformation, degraded-signal recognition and gloved use? We would bring the concept dossier and a proposed US-only comparative bench protocol. The requested output is a measurable simulation plan and explicit reasons to proceed, revise or stop."},{"id":"sonosite","name":"FUJIFILM Sonosite","category":"Clinical workflow","role":"POCUS workflow and image-quality research","sequence":"Clinical investigator needed","sourceIds":["P05","P06"],"fact":"Sonosite's official indexed pages describe military POCUS work and invite clinician/researcher collaboration on POCUS AI, validation, user testing and workflows under research agreements.","fit":"A potential clinician-led workflow and quality-feedback discussion. Its published AI route is narrower than a general PA hardware partnership.","study":"With a clinical investigator, define a simulated vascular-assessment task comparing ordinary ultrasound review with explicit image-quality/uncertainty feedback. Treat any future AI component as a separately validated research module.","deliverable":"A workflow endpoint set, annotation/quality rubric and investigator-led protocol suitable for the program's scope.","gap":"Direct page fetches returned redirect loops; indexed official text supports the lead. Current intake availability, PI eligibility, equipment/support and PA fit need confirmation. No support or funding is promised.","route":"Published research-collaboration page; first confirm current program scope and clinician eligibility.","routeUrl":"https://www.sonosite.com/about/collaborate-us-advancing-pocus-ai","subject":"Clinician-led research scoping: image quality and uncertainty in difficult-access assessment","pitch":"VASCOUT is an unvalidated concept for making peripheral anatomy and imaging uncertainty clearer to clinicians. Your published POCUS collaboration route suggests a possible fit for a clinician-led quality-feedback study, rather than an assumption of PA hardware support. Would your research team discuss eligibility and scope for a simulated vascular-assessment protocol comparing ultrasound review with explicit poor-signal feedback? A clinical investigator would define the task and endpoints; any AI component would require separate validation. We seek protocol and workflow feedback first, with resources subject to a formal agreement."},{"id":"bd","name":"BD","category":"Clinical workflow","role":"Vascular-access comparator and workflow","sequence":"Protocol shaping","sourceIds":["P07","P08"],"fact":"BD describes SiteRite 9 as a vascular-access ultrasound platform and publishes an external Idea Submission Process with a nonconfidential initial review route.","fit":"Potential input on what a new visualization interface must add beyond a purpose-built vascular-access ultrasound workflow.","study":"Develop a simulation comparison against an agreed vascular-access ultrasound workflow. Assess anatomy localization, contact deformation, interpretation errors, setup burden and invalid-image recognition before any access-success claim.","deliverable":"An intended-use/task statement and a comparator protocol with meaningful failure criteria and clinician-defined endpoints.","gap":"Product/integration fit, sponsorship and interest are unverified. BD's initial idea route does not promise confidentiality; detailed submission terms would need review. Existing product capabilities do not validate VASCOUT.","route":"Official innovation/idea page; limit any initial discussion to the approved nonconfidential concept.","routeUrl":"https://www.bd.com/en-us/about-bd/innovation-at-bd","subject":"Research discussion: benchmarking a vascular-visualization interface against current workflow","pitch":"VASCOUT is a concept-stage ultrasound-led interface with experimental PA contrast and explicit uncertainty feedback. BD's vascular-access portfolio makes the existing clinical workflow an important comparator. Would the relevant research or innovation team consider a nonconfidential scoping discussion on which visualization limitations are worth measuring? We propose a simulated assessment study using predefined localization, deformation, interpretation-error and workflow endpoints. We are not presenting IV-success results or an integrated BD product. The first goal is an agreed task and benchmark protocol, with any detailed exchange governed by appropriate terms."},{"id":"teleflex","name":"Teleflex / Arrow","category":"Clinical workflow","role":"Access workflow and contact-interface usability","sequence":"Protocol shaping","sourceIds":["P09","P10"],"fact":"Teleflex publishes Arrow emergency/trauma vascular-access products and an official product inquiry form covering peripheral access and emergency/trauma categories.","fit":"Potential clinical/R&D feedback on whether a passive imaging shoe creates useful working space or adds setup and handling burden.","study":"Use vascular-access task trainers to compare probe/contact-shoe handling, gloved reach, working-corridor obstruction, setup time and cleaning constraints. No actual patient cannulation or IV/IO treatment choice is proposed at this stage.","deliverable":"A human-factors requirements sheet and a simulation protocol for contact-interface benefits and failure cases.","gap":"The observed route is a product inquiry, not an announced VASCOUT research program. Research-team routing, sponsorship, compatibility and acceptance are unverified.","route":"Official Arrow emergency/trauma inquiry; ask to be routed to the relevant clinical/R&D team.","routeUrl":"https://www.teleflex.com/usa/en/product-areas/vascular-access/emergency-trauma-products/trauma-products/request-info.html","subject":"Research scoping: passive imaging-interface usability around vascular-access workflows","pitch":"VASCOUT proposes a passive contact shoe around an ultrasound-led imaging probe, with an open working corridor and proposed force feedback. Your Arrow access portfolio suggests a useful perspective on whether that interface helps or obstructs the clinical workflow. Could this inquiry be routed to a clinical or R&D team willing to review a task-trainer usability protocol? We would measure gloved reach, contact deformation, working-space obstruction, setup burden and cleaning constraints. This is an unvalidated concept; the immediate request is requirements feedback, not a treatment recommendation or a claim of improved access success."},{"id":"mtec","name":"Medical Technology Enterprise Consortium","category":"Defense teaming","role":"Teaming and funding-route assessment","sequence":"Eligibility check first","sourceIds":["P13"],"fact":"MTEC publishes military-medical teaming opportunities and membership-based funding participation requirements. Its community includes industry, academia and government.","fit":"A possible route to assemble an imaging developer, clinical investigator and simulation team once a coherent research question exists.","study":"Map the concept's validation gaps to an appropriate, currently eligible research opportunity and a team with complementary capability. Review a specific call before preparing any application or assuming award eligibility.","deliverable":"A partner-role map and a solicitation-specific eligibility/fit assessment; no funding projection.","gap":"VASCOUT's organizational readiness, membership, fees, call alignment and award eligibility are unverified. No specific open call was audited; membership does not imply funding or validation.","route":"Official membership/teaming page; request guidance on fit and prerequisites before enrollment or proposal work.","routeUrl":"https://mtec-sc.org/join","subject":"Teaming inquiry: a bench-first vascular-imaging research concept","pitch":"VASCOUT is an unvalidated ultrasound-led vascular-imaging concept with an experimental PA extension. The next need is a credible team and comparative protocol, not a claim of field readiness. Could MTEC advise whether its teaming ecosystem is appropriate for combining an imaging-platform developer, a clinical investigator and a military-medical simulation partner? We would first clarify organizational and membership prerequisites, then assess a specific solicitation's technical scope and eligibility. The proposed research would report incremental benefit and failure modes against ultrasound alone; no funding or award fit is assumed."}],"sources":[{"id":"P01","title":"Verasonics - About and photoacoustics capabilities","url":"https://verasonics.com/about-verasonics/","access":"Direct official page read","limit":"Manufacturer capability statements; not proof of VASCOUT integration, safety or benefit."},{"id":"P02","title":"Verasonics - Contact and collaborations","url":"https://verasonics.com/contact-us/","access":"Direct official page read","limit":"No VASCOUT-specific invitation, budget, loaner or acceptance confirmed."},{"id":"P03","title":"CYBERDYNE - Acoustic X research system","url":"https://www.cyberdyne.jp/en/products/acoustic-x","access":"Direct official English page read, reached through its language link","limit":"Product descriptions and linked-study summaries are not an independent efficacy audit; no VASCOUT novelty or field validation established."},{"id":"P04","title":"CYBERDYNE - Contact","url":"https://www.cyberdyne.jp/en/contact","access":"Direct official page read","limit":"Product inquiry route, not an open research award or confirmed collaboration."},{"id":"P05","title":"FUJIFILM Sonosite - Collaborate With Us on Advancing POCUS AI","url":"https://www.sonosite.com/about/collaborate-us-advancing-pocus-ai","access":"Official indexed page text read; direct open returned redirect loop","limit":"Availability needs reconfirmation. Program is AI-focused and clinician-led; no commitment to PA hardware or this concept. Eligibility, support and funding unverified."},{"id":"P06","title":"FUJIFILM Sonosite - Military Medicine Ultrasound","url":"https://www.sonosite.com/specialties/military-medicine-ultrasound","access":"Official indexed page text read; direct open returned redirect loop","limit":"Historical/company-reported context; not endorsement, acceptance or VASCOUT field evidence."},{"id":"P07","title":"BD - SiteRite 9 Ultrasound System","url":"https://www.bd.com/en-us/products-and-solutions/products/product-families/site-rite-9-ultrasound-system","access":"Direct official page read","limit":"Manufacturer statements about its own system. Some needle-tracking comparisons are vein-block data, not clinical-performance proof; no VASCOUT equivalence."},{"id":"P08","title":"BD - Innovation and Idea Submission Process","url":"https://www.bd.com/en-us/about-bd/innovation-at-bd","access":"Direct official page read, including submission/legal section","limit":"No submission sent. Detailed terms and project fit require review before any future submission; no acceptance or funding guaranteed."},{"id":"P09","title":"Teleflex - Emergency/Trauma Products","url":"https://www.teleflex.com/usa/en/product-areas/vascular-access/emergency-trauma-products/trauma-products/index.html","access":"Direct official page read","limit":"Manufacturer portfolio statement; no open VASCOUT research program, imaging integration or measured benefit established."},{"id":"P10","title":"Teleflex - Request More Information, Emergency/Trauma Products","url":"https://www.teleflex.com/usa/en/product-areas/vascular-access/emergency-trauma-products/trauma-products/request-info.html","access":"Direct official page read","limit":"General inquiry route; clinical/R&D routing and study sponsorship unconfirmed. Form not submitted."},{"id":"P11","title":"USAISR - Organ Support and Automation Technologies","url":"https://usaisr.health.mil/index.cfm/research/ccct/organ","access":"Direct official page read","limit":"Mission/capability evidence, not a VASCOUT requirement, award, invitation or approval."},{"id":"P12","title":"USAISR - Partnering with USAISR","url":"https://usaisr.health.mil/index.cfm/research/partnering","access":"Direct official page read","limit":"Agreement mechanism and intake route only; eligibility, resources and Army/DHA interest in VASCOUT unconfirmed."},{"id":"P13","title":"MTEC - Join and membership requirements","url":"https://mtec-sc.org/join","access":"Direct official page read","limit":"No active solicitation was audited for VASCOUT eligibility or technical fit. Membership is not an award and does not validate a device. No enrollment or payment."},{"id":"P14","title":"University of Michigan BME - Xueding Wang and Optical Imaging Laboratory","url":"https://bme.umich.edu/people/wang-xueding/","access":"Direct official BME profile read","limit":"Adjacent methodological expertise; no difficult-IV, military, study access, capacity or collaboration acceptance established. Separate lab homepage returned403; profile supplies the usable direct source."}]};

;
(()=>{
  'use strict';
  const C=globalThis.VascoutContent,D=globalThis.VascoutDomain,M=globalThis.Vascout3D,P=globalThis.VascoutPartners;
  const root=document.getElementById('app');
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const $=id=>root.querySelector('#'+id);
  const badge=(status='UNVERIFIED')=>`<span class="badge ${status.toLowerCase()}">${esc(status)}</span>`;
  const navs=['Blueprint','Purpose','Specifications','Evidence','Validation','Partners'];
  let screen='Blueprint',view=D.initialView(),renderer=null,theme='light',question='imaging';
  let query='',setting='',modality='',loadState='loading',loadMessage='',readOnly=false;
  const drafts={},saved={},saving=new Set(),statuses={};
  let refreshSerial=0;
  let selectedPartner='verasonics';
  let presenting=false,chapter=0,returnView=null;
  const chapters=[
    {name:'Field problem',title:'See anatomy. Understand uncertainty.',copy:'A research proposal for difficult vascular access in medical and resource-limited field settings.'},
    {name:'Device design',title:'Ultrasound first. Added contrast to test.',copy:'Explore the proposed probe and its separate acquisition unit. Geometry and dimensions are design targets.'},
    {name:'Concept demo',title:'From a sweep to clinician review.',copy:'A 30-second illustration of the proposed workflow. All anatomy and vessel paths are synthetic.'},
    {name:'Validation roadmap',title:'A path from concept to evidence.',copy:'Each research question needs measured results before a claim about clinical or field benefit.'}
  ];
  const demoStages=[
    {time:0,title:'Field setup',copy:'A synthetic forearm rests on a field pad. The proposed probe connects to a separate acquisition unit. Compact field packaging remains a design goal.',intent:'WHY IT MATTERS',detail:'Make the proposed imaging workflow understandable in a resource-limited setting.'},
    {time:6,title:'Simulated acquisition',copy:'A conceptual sweep samples anatomy beneath the probe. The inset is a drawn illustration, not an ultrasound scan or a device output.',intent:'RESEARCH QUESTION',detail:'Can useful anatomy be captured while limiting tissue deformation and flagging poor image quality?'},
    {time:15,title:'Illustrative vessel map',copy:'Cyan paths reveal a pre-authored vessel model. Registration of ultrasound and experimental photoacoustic contrast would need validation.',intent:'PROPOSED SUPPORT',detail:'Present vessel continuity and surrounding anatomy for clinician interpretation. No vessel has been detected in this animation.'},
    {time:23,title:'Clinician review',copy:'A clinician would review anatomy and image quality alongside the patient. Dashed amber geometry marks unresolved anatomy in this example.',intent:'DIFFICULT ACCESS',detail:'The research goal is to support assessment when access is difficult. The animation does not choose an insertion site or show a successful IV.'}
  ];
  let lastDemoStage=-1;
  let renderUnavailable=false;
  let api;try{api=window.charming.api('vascout-concept-20261020');readOnly=!window.charming.viewer.can('saveReview');}catch{loadState='unavailable';loadMessage='The notes connection is unavailable.';}
  const modelActive=()=>presenting?(chapter===1||chapter===2):screen==='Blueprint';
  const editorActive=()=>!presenting&&screen==='Validation';
  function bindTheme(){
    $('theme').onclick=()=>{theme=theme==='light'?'dark':'light';root.firstElementChild.dataset.theme=theme;$('theme').textContent=theme==='light'?'◐ Dark view':'◑ Light view';renderer?.render();};
  }
  function bindDownload(){
    root.querySelector(presenting?'.present-actions':'.topbar').insertAdjacentHTML('beforeend','<button id="download-pdf" class="pdf-download">Download PDF ↗</button><span id="pdf-status" class="pdf-status" role="status"></span>');
    const button=$('download-pdf'),status=$('pdf-status');
    button.onclick=async()=>{
      button.disabled=true;status.textContent='';
      try{
        const url=window.charming.assets.getUrl('VASCOUT-Pitch-Deck-v2-20261020.pdf');
        await window.charming.openLink(url);
      }catch{
        status.textContent='PDF could not open. Try again or reload the page.';
      }finally{button.disabled=false;}
    };
  }
  function enterPresentation(){returnView=view;presenting=true;chapter=0;view=D.initialView();render();$('chapter-title').focus({preventScroll:true});}
  function exitPresentation(destination){presenting=false;view=D.reduceView(returnView||D.initialView(),{type:'demoPlay',value:false});returnView=null;if(destination)screen=destination;render();$('present').focus({preventScroll:true});}
  function changeChapter(value){
    const next=Math.max(0,Math.min(3,value));if(next===chapter)return;
    chapter=next;view={...D.initialView(),scene:chapter===2?'demo':'device'};render();$('chapter-title').focus({preventScroll:true});$('main').scrollIntoView({block:'start'});
  }
  function presentationShell(){
    root.innerHTML=`<div class="vascout presentation" data-theme="${theme}" data-chapter-index="${chapter}"><header class="present-header"><div class="present-brand">V<span>VASCOUT<small>PARTNER RESEARCH BRIEFING</small></span></div><div class="present-actions"><button id="theme">${theme==='light'?'◐ Dark view':'◑ Light view'}</button><button id="present-exit">Exit presentation <span aria-hidden="true">↗</span></button></div></header><div class="research-banner"><span class="tiny-dot"></span>RESEARCH CONCEPT · ILLUSTRATIVE · NOT FOR PATIENT USE</div><nav class="present-chapters" aria-label="Presentation chapters">${chapters.map((c,i)=>`<button data-chapter="${i}" aria-current="${chapter===i?'step':'false'}"><span>0${i+1}</span>${c.name}</button>`).join('')}</nav><main id="main" tabindex="-1"></main><footer class="present-footer"><div class="present-progress"><span>0${chapter+1} / 04</span><span>${chapters[chapter].name}</span><small>← → Chapters · Esc Exit<br>Model and sliders keep their own arrow controls.</small></div><div class="present-navigation"><button id="present-prev" ${chapter===0?'disabled':''}>← Back</button><button id="present-next" class="primary" ${chapter===3?'disabled':''}>Next chapter →</button></div></footer></div>`;
    bindTheme();$('present-exit').onclick=()=>exitPresentation();$('present-prev').onclick=()=>changeChapter(chapter-1);$('present-next').onclick=()=>changeChapter(chapter+1);
    root.querySelectorAll('[data-chapter]').forEach(b=>b.onclick=()=>changeChapter(Number(b.dataset.chapter)));
  }
  const presentationHeading=()=>`<div class="presentation-heading"><div class="eyebrow">0${chapter+1} / ${chapters[chapter].name.toUpperCase()}</div><h1 id="chapter-title" tabindex="-1">${chapters[chapter].title}</h1><p>${chapters[chapter].copy}</p></div>`;
  const sourceLink=(id,label)=>{const source=C.sources.find(s=>s.id===id);return `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;};
  function presentation(){
    if(chapter===1||chapter===2){blueprint();return;}
    if(chapter===0){
      $('main').innerHTML=presentationHeading()+`<div class="present-problem"><section class="present-thesis"><div class="eyebrow">THE RESEARCH QUESTION ${badge('INFERENCE')}</div><h2>Can a clearer view<br>support difficult access?</h2><p>Investigate whether low-contact-force ultrasound, experimental photoacoustic contrast and explicit image-quality feedback can help trained users interpret peripheral anatomy.</p><div class="thesis-bottom"><span>STRUCTURE</span><i>+</i><span>CONTRAST</span><i>+</i><span>UNCERTAINTY</span></div></section><div class="present-context"><article><span class="index">01 / CLINICAL CONTEXT</span><h2>Difficult peripheral access</h2><p>Existing ultrasound evidence varies by setting and operator. A useful new system must earn its benefit against ultrasound alone.</p><div class="present-sources">${sourceLink('S10a','Supporting study')}${sourceLink('S10b','Contrasting trial')}</div></article><article><span class="index">02 / FIELD RESEARCH ${badge('UNVERIFIED')}</span><h2>Low perfusion. Limited resources.</h2><p>Dehydration, shock, motion and gloved use motivate the proposed field studies. VASCOUT performance in these conditions is unestablished.</p></article><article><span class="index">03 / DESIGN INTENT ${badge('TARGET')}</span><h2>Support the clinician's assessment</h2><p>Present anatomy and image-quality limits for review. The concept does not choose an insertion site or make treatment decisions.</p></article></div></div><div class="present-bottomline"><strong>A research discussion for medical and defense partners.</strong><span>Bench architecture → measured performance → simulated use → appropriately approved studies.</span></div>`;
      return;
    }
    $('main').innerHTML=presentationHeading()+`<div class="roadmap-intro"><span class="roadmap-status">CURRENT POSITION<br><strong>Concept & literature review</strong></span><p>All device validation gates below remain <strong>UNVERIFIED</strong>. Saved discussion status does not establish completion or readiness.</p></div><div class="present-gates">${C.questions.map(q=>`<article><div class="gate-top"><span class="index">${q.number}</span>${badge('UNVERIFIED')}</div><span class="micro">${q.stage}</span><h2>${q.title}</h2><p>${q.prompt}</p><details><summary>Evidence to earn</summary><p>${q.gate}</p></details></article>`).join('')}</div><section class="present-partners"><div><div class="eyebrow">A FOCUSED PARTNER DISCUSSION</div><h2>Define the first study together.</h2><p>Imaging partners: hardware and phantom measurements.<br>Medical partners: intended use and clinician workflow.<br>Defense medical teams: simulated field-use requirements.</p></div><div><p>Agree on a comparator, ground truth, failure criteria and the evidence needed to proceed.</p><button id="present-notes">Open research notes ↗</button><button id="present-evidence">Explore ${C.sources.length} evidence records ↗</button></div></section><p class="present-limit">No endorsement, patent novelty, regulatory clearance or field readiness is claimed. Hardware and clinical performance remain unverified.</p>`;
    $('present-notes').onclick=()=>exitPresentation('Validation');$('present-evidence').onclick=()=>exitPresentation('Evidence');
  }
  function shell(){
    if(presenting){presentationShell();return;}
    root.innerHTML=`<div class="vascout" data-theme="${theme}"><aside class="rail"><div class="wordmark"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 7L16 26 27 7M10 7l6 10 6-10" fill="none" stroke="currentColor" stroke-width="2"/></svg><span>VASCOUT<small>VASCULAR SYSTEMS RESEARCH</small></span></div><div class="rail-kicker">CONCEPT DOSSIER / 01</div><nav aria-label="Dossier screens">${navs.map((n,i)=>`<button data-nav="${n}" ${n===screen?'aria-current="page"':''}><span class="nav-number">0${i+1}</span>${n}<span class="nav-arrow">↗</span></button>`).join('')}</nav><div class="rail-bottom"><span class="tiny-dot"></span>RESEARCH STAGE<br><p>Evidence first.<br>Clinical claims earned.</p><button id="theme" class="theme">${theme==='light'?'◐ Dark view':'◑ Light view'}</button><small>RESEARCH SNAPSHOT<br>20 OCT 2026</small></div></aside><div class="workspace"><header class="topbar"><span>VASCULAR IMAGING <i>/</i> ${esc(screen.toUpperCase())}</span><span>CONCEPT V.01</span></header><div class="research-banner">Research concept · illustrative model · not for patient use.</div><main id="main" tabindex="-1"></main><footer class="footer"><span>VASCOUT / RESEARCH DOSSIER</span><span>Hardware, clinical performance & field suitability unverified.</span></footer></div></div>`;
    root.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>{screen=b.dataset.nav;render();$('main').focus({preventScroll:true});});
    root.querySelector('.topbar').insertAdjacentHTML('beforeend','<button id="present" class="present-launch">Present ↗</button>');$('present').onclick=enterPresentation;bindTheme();
  }
  const heading=(k,title,copy)=>`<div class="page-heading"><div><div class="eyebrow">${k}</div><h1>${title}</h1></div><p>${copy}</p></div>`;
  function render(){renderer?.destroy();renderer=null;view=D.reduceView(view,{type:'demoPlay',value:false});lastDemoStage=-1;shell();bindDownload();if(presenting)presentation();else({Blueprint:blueprint,Purpose:purpose,Specifications:specifications,Evidence:evidence,Validation:validation,Partners:partners}[screen])();}
  function partners(){
    $('main').innerHTML=heading('06 / PARTNER RESEARCH','Find the right first study.','Eight research prospects, selected for complementary roles. Organization capabilities are sourced; fit and proposed studies are our assessments.')+`<div class="partner-intro"><div><span class="micro">RESEARCH SNAPSHOT / ${esc(P.snapshot)}</span><p>${esc(P.researchStatus)}</p></div><div><span class="micro">SUGGESTED FIRST DISCUSSIONS ${badge('INFERENCE')}</span><p>Verasonics · CYBERDYNE · Michigan<br>Establish the benchmark before a field-benefit claim.</p></div></div><div class="partner-layout"><nav class="partner-list" aria-label="Research prospects">${P.partners.map((p,i)=>`<button data-partner="${esc(p.id)}" aria-current="${p.id===selectedPartner?'true':'false'}"><span class="index">0${i+1} / ${esc(p.category)}</span><strong>${esc(p.name)}</strong><small>${esc(p.role)}</small></button>`).join('')}</nav><article id="partner-detail" class="partner-detail" aria-label="Selected research prospect"></article></div><p class="partner-boundary">${esc(P.sharedBoundary)} The downloadable PDF v2.0 includes this dated partner research snapshot.</p>`;
    root.querySelectorAll('[data-partner]').forEach(b=>b.onclick=()=>{selectedPartner=b.dataset.partner;showPartner();$('partner-title').focus({preventScroll:true});$('partner-title').scrollIntoView({block:'start'});});showPartner();
  }
  function showPartner(){
    const p=P.partners.find(p=>p.id===selectedPartner)||P.partners[0];
    root.querySelectorAll('[data-partner]').forEach(b=>b.setAttribute('aria-current',String(b.dataset.partner===p.id)));
    const sources=p.sourceIds.map(id=>P.sources.find(s=>s.id===id));
    $('partner-detail').innerHTML=`<div class="eyebrow">${esc(p.category)} / ${esc(p.sequence)}</div><h2 id="partner-title" tabindex="-1">${esc(p.name)}</h2><p class="partner-role">${esc(p.role)}</p><div class="partner-download-row"><button id="partner-download" aria-label="Download tailored PDF for ${esc(p.name)}">Download partner PDF ↗</button><span class="micro">14 SLIDES · TAILORED RESEARCH CONCEPT</span><span id="partner-pdf-status" class="partner-pdf-status" role="status"></span></div><div class="partner-section"><div class="section-label">DOCUMENTED CAPABILITY <span>ORGANIZATION SOURCE</span></div><p>${esc(p.fact)}</p><div class="partner-source-links">${sources.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.id)} / ${esc(s.title)} ↗</a>`).join('')}</div><p class="partner-access">${sources.map(s=>esc(s.id)+': '+esc(s.access)+'.').join(' ')}</p></div><div class="partner-section"><div class="section-label">FIT ASSESSMENT ${badge('INFERENCE')}</div><p>${esc(p.fit)}</p><h3>Proposed first study ${badge('TARGET')}</h3><p>${esc(p.study)}</p><h3>Proposed deliverable</h3><p>${esc(p.deliverable)}</p></div><div class="partner-gap"><div class="section-label">VALIDATION & ENGAGEMENT GAPS ${badge('UNVERIFIED')}</div><p>${esc(p.gap)}</p><p>Partner interest and any commitment remain unconfirmed.</p></div><section class="partner-pitch" aria-label="Draft collaboration pitch"><div class="section-label">DRAFT PITCH <span>PREPARED WITH AI · NOT SENT</span></div><h3>${esc(p.subject)}</h3><p>${esc(p.pitch)}</p></section><div class="partner-route"><span class="micro">OFFICIAL ENGAGEMENT ROUTE</span><p>${esc(p.route)}</p><a href="${esc(p.routeUrl)}" target="_blank" rel="noopener noreferrer">View official route ↗</a><p class="muted">Opening a source or engagement page does not send this pitch.</p></div>`;
    bindPartnerDownload(p);
  }
  function bindPartnerDownload(p){
    const button=$('partner-download'),status=$('partner-pdf-status');
    button.onclick=async()=>{
      button.disabled=true;button.textContent='Opening PDF…';status.textContent='';
      try{
        const url=window.charming.assets.getUrl('VASCOUT-'+p.id+'-Research-Deck-v1-20261020.pdf');
        await window.charming.openLink(url);
      }catch{
        status.textContent='The '+p.name+' PDF could not open. Try again.';
      }finally{button.disabled=false;button.textContent='Download partner PDF ↗';}
    };
  }
  function blueprint(){
    $('main').innerHTML=(presenting?presentationHeading():heading('01 / HARDWARE ARCHITECTURE','Blueprint','Explore the proposed imaging system, one component at a time.'))+`<div class="blueprint-grid"><section class="model-panel" aria-label="Interactive 3D blueprint"><div class="model-bar"><div class="segmented"><button id="device-scene" ${view.scene==='device'?'aria-pressed="true"':'aria-pressed="false"'}>Device assembly</button><button id="tissue-scene" ${view.scene==='tissue'?'aria-pressed="true"':'aria-pressed="false"'}>Synthetic tissue</button></div><span class="micro">3D / INTERACTIVE</span></div><div class="canvas-wrap"><div class="canvas-caption"><strong id="scene-label"></strong><span id="scene-subtitle"></span></div><canvas id="model" tabindex="0" aria-label="Interactive 3D model. Drag to orbit. Arrow keys rotate; plus and minus zoom."></canvas><div id="fallback" class="fallback" hidden><strong>3D rendering unavailable</strong><svg viewBox="0 0 380 150" role="img" aria-label="Schematic: probe connected to a separate bench unit"><rect x="35" y="40" width="150" height="65" rx="18"/><path d="M50 105v12h120v-12M185 70h65v30h25"/><rect x="275" y="70" width="70" height="50" rx="4"/></svg><p id="fallback-copy">Labeled schematic only. Explore the components and interfaces in the list.</p></div></div><div class="model-controls"><div class="preset-row"><span class="micro">VIEW</span><button data-preset="front">Front</button><button data-preset="side">Side</button><button data-preset="top">Top</button><button id="reset" class="reset">↺ Reset</button></div><div class="sliders"><label>Exploded assembly <output id="explode-value">${Math.round(view.explode*100)}%</output><input id="explode" type="range" min="0" max="100" value="${view.explode*100}"></label><label>Zoom <output id="zoom-value">${Math.round(view.zoom*100)}%</output><input id="zoom" type="range" min="65" max="180" value="${view.zoom*100}"></label></div><label id="foreign-control" class="checkline" hidden><input id="foreign-toggle" type="checkbox">Show illustrative foreign body</label><p id="scene-note" class="scene-note"></p></div></section><aside class="parts-panel"><div class="section-label">COMPONENTS <span>05</span></div><div id="parts">${C.components.map(c=>`<div class="part-row"><button data-select="${c.id}" aria-pressed="${view.selected===c.id}"><span>${c.number}</span><i style="background:${c.color}"></i>${c.short}</button><label class="layer-label"><input data-layer="${c.id}" type="checkbox" aria-label="Show ${c.short.toLowerCase()}" ${view.layers[c.id]?'checked':''}></label></div>`).join('')}</div><article id="component-detail"></article></aside></div><div class="architecture-strip"><div><span>PRIMARY MODALITY</span><strong>Ultrasound-led</strong></div><div><span>EXPERIMENTAL EXTENSION</span><strong>Photoacoustic contrast</strong></div><div><span>FIRST CONFIGURATION</span><strong>Tethered bench system</strong></div></div>`;
    root.querySelector('.segmented').insertAdjacentHTML('beforeend','<button id="demo-scene" aria-pressed="false">Field concept demo</button>');
    root.querySelector('.model-controls').insertAdjacentHTML('afterbegin',`<div id="demo-controls" hidden><div class="demo-playback"><button id="demo-play" class="primary">▶ Play concept</button><button id="demo-replay">↺ Replay</button><output id="demo-clock">0:00 / 0:30</output></div><label class="demo-timeline">Concept timeline<input id="demo-timeline" type="range" min="0" max="30" step="0.1" value="0" aria-label="Concept timeline in seconds"></label><p id="motion-note" class="muted"></p></div>`);
    root.querySelector('.parts-panel').insertAdjacentHTML('beforeend',`<section id="demo-story" hidden><div class="section-label">CONCEPT SEQUENCE <span>04</span></div><nav class="demo-steps" aria-label="Concept animation stages">${demoStages.map((s,i)=>`<button data-stage="${i}"><span>0${i+1}</span>${s.title}</button>`).join('')}</nav><article class="demo-caption"><div class="eyebrow" id="demo-stage-number"></div><h2 id="demo-stage-title"></h2><p id="demo-stage-copy"></p><div class="demo-intent"><span class="micro" id="demo-intent-label"></span><p id="demo-intent-copy"></p></div><div class="demo-legend"><span><i></i>Illustrative vessel map</span><span><i class="uncertain"></i>Unresolved anatomy</span></div><p class="demo-boundary">CONCEPT ANIMATION<br>Synthetic anatomy · not for patient use.<br>No measurements or treatment guidance.</p></article></section>`);
    $('demo-clock').setAttribute('aria-live','off');$('demo-stage-title').setAttribute('role','status');
    $('demo-scene').onclick=()=>{dispatch({type:'scene',value:'demo'});};
    $('demo-play').onclick=()=>dispatch({type:'demoPlay',value:!view.demoPlaying});
    $('demo-replay').onclick=()=>{dispatch({type:'demoSeek',value:0});if(!renderUnavailable&&!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)dispatch({type:'demoPlay',value:true});};
    $('demo-timeline').oninput=e=>dispatch({type:'demoSeek',value:Number(e.target.value)});
    root.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>dispatch({type:'demoSeek',value:demoStages[Number(b.dataset.stage)].time}));
    $('device-scene').onclick=()=>{dispatch({type:'scene',value:'device'});};$('tissue-scene').onclick=()=>{dispatch({type:'scene',value:'tissue'});};
    $('reset').onclick=()=>{dispatch({type:'reset'});if(presenting&&chapter===2)dispatch({type:'scene',value:'demo'});};
    root.querySelectorAll('[data-preset]').forEach(b=>b.onclick=()=>dispatch({type:'preset',name:b.dataset.preset}));
    root.querySelectorAll('[data-select]').forEach(b=>b.onclick=()=>dispatch({type:'select',id:b.dataset.select}));
    root.querySelectorAll('[data-layer]').forEach(b=>b.onchange=()=>dispatch({type:'layer',id:b.dataset.layer,visible:b.checked}));
    $('explode').oninput=e=>dispatch({type:'explode',value:Number(e.target.value)/100});$('zoom').oninput=e=>dispatch({type:'zoom',value:Number(e.target.value)/100});
    $('foreign-toggle').onchange=e=>dispatch({type:'foreignBody',value:e.target.checked});
    renderUnavailable=false;renderer=M.mount($('model'),{getState:()=>view,dispatch,onError:()=>{renderUnavailable=true;view=D.reduceView(view,{type:'demoPlay',value:false});$('model').hidden=true;$('fallback').hidden=false;syncDemo();}});syncView();
  }
  function dispatch(action){view=D.reduceView(view,action);if(modelActive()){if(action.type==='demoTick')syncDemo();else{syncView();renderer?.render();}}}
  function syncDemo(){
    if(view.scene!=='demo')return;
    const f=D.demoFrame(view.demoTime),s=demoStages[f.stage],reduce=!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    $('demo-play').disabled=reduce||renderUnavailable;$('demo-play').textContent=view.demoPlaying?'Ⅱ Pause':view.demoTime>=30?'▶ Play again':'▶ Play concept';
    $('demo-play').setAttribute('aria-pressed',view.demoPlaying);
    const clock='0:'+String(Math.floor(view.demoTime)).padStart(2,'0')+' / 0:30';if($('demo-clock').textContent!==clock)$('demo-clock').textContent=clock;$('demo-timeline').value=view.demoTime;
    $('motion-note').textContent=renderUnavailable?'Animation unavailable: read the stages or scrub the timeline.':reduce?'Reduced motion: use the stages or scrub the timeline.':'A 30-second illustration. Pause or scrub at any point.';
    if(lastDemoStage!==f.stage){lastDemoStage=f.stage;$('demo-stage-number').textContent='STAGE 0'+(f.stage+1)+' / 04';$('demo-stage-title').textContent=s.title;$('demo-stage-copy').textContent=s.copy;$('demo-intent-label').textContent=s.intent;$('demo-intent-copy').textContent=s.detail;root.querySelectorAll('[data-stage]').forEach(b=>b.setAttribute('aria-current',Number(b.dataset.stage)===f.stage?'step':'false'));}
  }
  function syncView(){
    const demo=view.scene==='demo';
    $('fallback-copy').textContent=demo?'Schematic only. Read the four concept stages or scrub the timeline below.':'Labeled schematic only. Explore the components and interfaces in the list.';
    $('demo-controls').hidden=!demo;$('demo-story').hidden=!demo;$('parts').hidden=demo;$('component-detail').hidden=demo;root.querySelector('.parts-panel>.section-label').hidden=demo;
    $('demo-scene').setAttribute('aria-pressed',demo);$('model').setAttribute('aria-label',demo?'Concept animation with synthetic forearm and pre-authored vessel map. Not for patient use. Drag to orbit; arrow keys rotate.':'Interactive 3D model. Drag to orbit. Arrow keys rotate; plus and minus zoom.');
    $('explode').value=view.explode*100;$('explode').disabled=view.scene!=='device';$('zoom').value=view.zoom*100;
    $('explode-value').textContent=Math.round(view.explode*100)+'%';$('zoom-value').textContent=Math.round(view.zoom*100)+'%';
    $('scene-label').textContent=demo?'FIELD WORKFLOW / CONCEPT ANIMATION':view.scene==='device'?'US / PA RESEARCH PROBE':'SYNTHETIC TISSUE CUTAWAY';
    $('scene-subtitle').textContent=demo?'Synthetic anatomy · not for patient use':view.scene==='device'?'150 × 56 × 34 mm · illustrative envelope':'Illustrative anatomy · no reconstructed scan';
    $('device-scene').setAttribute('aria-pressed',view.scene==='device');$('tissue-scene').setAttribute('aria-pressed',view.scene==='tissue');
    $('foreign-control').hidden=view.scene!=='tissue';$('foreign-toggle').checked=view.foreignBody;
    $('scene-note').textContent=demo?'Pre-authored anatomy, illustrative acquisition and simulated mapping. Clinical performance is unverified.':view.scene==='device'?'Drag to orbit · scroll to zoom · arrow keys when the model is focused.':'Illustrative objects only. Hiding the example object does not imply that real fragments have been excluded.';
    root.querySelectorAll('[data-select]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.select===view.selected));
    root.querySelectorAll('[data-layer]').forEach(b=>{b.checked=view.layers[b.dataset.layer];b.disabled=view.scene==='tissue';});
    const c=C.components.find(c=>c.id===view.selected);
    $('component-detail').innerHTML=`<div class="eyebrow">COMPONENT ${c.number} ${!view.layers[c.id]?'<span class="hidden-state">HIDDEN IN MODEL</span>':''}</div><h2>${c.name}</h2>${badge('TARGET')}<p>${c.purpose}</p><dl><dt>INTERFACE</dt><dd>${c.interface}</dd><dt>MATURITY</dt><dd>${c.maturity}</dd><dt>EVIDENCE TO EARN</dt><dd>${c.test}</dd></dl>${view.scene==='tissue'?'<p class="muted">Component details refer to the device assembly.</p>':''}`;
    syncDemo();
  }
  function purpose(){
    $('main').innerHTML=heading('02 / THE RESEARCH QUESTION','Purpose','Make anatomy—and the limits of the image—easier for trained users to interpret.')+`<section class="purpose-hero"><span class="eyebrow">INTENDED BENEFIT · UNVERIFIED</span>${badge("INFERENCE")}<h2>A clearer view<br>of difficult access.</h2><p>Investigate whether low-contact-force ultrasound, registered photoacoustic contrast and explicit image-quality feedback can help clinicians assess peripheral vessels in difficult imaging conditions.</p><div class="hero-rule"></div><span class="micro">HYPOTHESIS → MEASUREMENT → EVIDENCE</span></section><div class="context-grid"><article><span class="index">01</span><h2>Civilian difficult access</h2><p>Study anatomy, deformation and workflow when peripheral vessels are difficult to visualize or access. Existing ultrasound evidence varies by setting and operator.</p><a href="https://pubmed.ncbi.nlm.nih.gov/16271677/" target="_blank" rel="noopener noreferrer">Positive study ↗</a> <a href="https://pubmed.ncbi.nlm.nih.gov/18824276/" target="_blank" rel="noopener noreferrer">Contrasting trial ↗</a></article><article><span class="index">02</span><h2>Low-perfusion field care</h2><p>Dehydration, shock and limited time motivate this work. Performance in these patients and conditions has not been established. The device concept supports a research discussion with field clinicians.</p>${badge('UNVERIFIED')}</article><article><span class="index">03</span><h2>Superficial foreign bodies</h2><p>Investigate localization in a separate phantom study. Material, size, depth and orientation matter; a negative image cannot exclude retained fragments.</p><a href="https://pubmed.ncbi.nlm.nih.gov/18930374/" target="_blank" rel="noopener noreferrer">Limiting evidence ↗</a></article></div><section class="split-section"><div><div class="eyebrow">THE LEDX BASELINE</div><h2>Three methods.<br>Different information.</h2></div><div class="method-list"><p><strong>Visible transillumination</strong><span>Veinlite LEDX illuminates superficial tissue from the side to reveal vessel contrast.</span></p><p><strong>Ultrasound</strong><span>Acoustic echoes provide structural information. Acquisition quality and operator interpretation remain important.</span></p><p><strong>Photoacoustic imaging</strong><span>Absorbed pulsed light generates acoustic signals. Hybrid registration and incremental benefit remain research work.</span></p><a href="https://dfu.veinlite.com/dfu/ledx/index.html" target="_blank" rel="noopener noreferrer">Read the LEDX manufacturer instructions ↗</a></div></section><section class="partner-brief"><div class="eyebrow">PARTNER DISCUSSION</div><h2>What a collaboration could test</h2><p>Clinical workflow review · calibrated vessel phantoms · transducer and optical integration · human factors · an intended-use and evidence strategy.</p><p class="muted">No endorsements, patent novelty, regulatory clearance or field readiness are claimed.</p></section>`;
  }
  function specifications(){
    $('main').innerHTML=heading('03 / DESIGN INPUTS','Specifications','Targets describe what to investigate. They are not measured device performance.')+`<div class="spec-intro">${badge('TARGET')}<p>Initial bench architecture. Numeric values below are illustration choices or experiment inputs.</p></div><div class="requirements">${C.requirements.map((r,i)=>`<article class="requirement"><span class="index">${String(i+1).padStart(2,'0')}</span><div><h2>${r.item}</h2><p>${r.meaning}</p></div><div><strong>${r.target}</strong>${badge('TARGET')}</div><div><span class="micro">VERIFY WITH</span><p>${r.verify}</p></div></article>`).join('')}</div><section class="pipeline"><div class="eyebrow">PROPOSED DATA FLOW</div><h2>Quality before interpretation.</h2><div class="pipeline-steps"><span>US / PA acquisition</span><b>→</b><span>Calibration & time alignment</span><b>→</b><span>Quality checks</span><b>→</b><span>Registration</span><b>→</b><span>Image + uncertainty</span></div><p>Missing or invalid input must yield <strong>UNKNOWN</strong>. No autonomous clot diagnosis, rupture verification, needle trajectory or IV/IO decision is implemented.</p></section><div class="boundary-note"><strong>Not yet specified</strong><p>Power, battery runtime, manufacturing tolerances, optical exposure, thermal limits, ruggedness rating and cost require measurements and engineering selection.</p></div>`;
  }
  function evidence(){
    const opts=key=>[...new Set(C.sources.map(s=>s[key]))].sort().map(v=>`<option>${esc(v)}</option>`).join('');
    $('main').innerHTML=heading('04 / EVIDENCE LIBRARY','Evidence','A source can support a research direction without validating this device.')+`<div class="evidence-toolbar"><label>Search sources<input id="source-search" type="search" placeholder="Title, finding, limitation…" value="${esc(query)}"></label><label>Evidence setting<select id="setting"><option value="">All settings</option>${opts('setting')}</select></label><label>Modality<select id="modality"><option value="">All modalities</option>${opts('modality')}</select></label><button id="clear-filters">Clear filters</button></div><p class="evidence-key">${badge('CONFIRMED')} means the source reported the bounded finding—not that VASCOUT is validated. <span>Snapshot: 20 Oct 2026.</span></p><div id="source-count" role="status"></div><div id="sources" class="source-list"></div><section class="claim-audit"><div class="eyebrow">USER-SUPPLIED CONCEPTS / CLAIM AUDIT</div><h2>Separate the hypothesis from the claim.</h2>${C.claims.map(c=>`<article><span class="micro">USER-SUPPLIED CLAIM</span><h3>${c.claim}</h3><div><span class="micro">AUDIT FINDING</span>${badge(c.status)}<span class="micro">${c.source}</span></div><p>${c.finding}</p></article>`).join('')}</section>`;
    $('setting').value=setting;$('modality').value=modality;
    $('source-search').oninput=e=>{query=e.target.value;filter();};$('setting').onchange=e=>{setting=e.target.value;filter();};$('modality').onchange=e=>{modality=e.target.value;filter();};
    $('clear-filters').onclick=()=>{query=setting=modality='';$('source-search').value='';$('setting').value='';$('modality').value='';filter();};filter();
  }
  function filter(){
    const items=D.filterSources(C.sources,{query,setting,modality});$('source-count').textContent=`${items.length} of ${C.sources.length} sources`;
    $('sources').innerHTML=items.length?items.map(s=>`<article class="source"><div class="source-meta"><span class="source-id">${s.id}</span><span>${esc(s.year)} · ${esc(s.setting)}</span>${badge(s.status)}</div><h2>${s.url?`<a href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a>`:esc(s.title)}</h2><blockquote>“${esc(s.quote)}”</blockquote><div class="source-columns"><div><span class="micro">SUPPORTS</span><p>${esc(s.supports)}</p></div><div><span class="micro">BOUNDARIES & ACCESS</span><p>${esc(s.limits)}</p></div></div></article>`).join(''):'<div class="empty"><h2>No matching sources</h2><p>Try a broader search or clear the setting and modality filters.</p></div>';
  }
  function validation(){
    $('main').innerHTML=heading('05 / VALIDATION ROADMAP','Validation','A sequence of evidence gates, with room to record the questions that remain.')+`<p class="validation-intro">Literature & prior-art review → bench imaging → calibrated phantoms → simulated use → expert clinical/regulatory review → appropriately approved human studies.</p><div class="review-layout"><nav class="question-list" aria-label="Research questions">${C.questions.map(q=>`<button data-question="${q.id}" aria-current="${q.id===question?'true':'false'}"><span class="index">${q.number}</span><span>${q.title}<small>${q.stage}</small></span><span class="review-mark" id="mark-${q.id}">${saved[q.id]?.reviewed?'Reviewed':'Open'}</span></button>`).join('')}</nav><article id="question-editor"></article></div><div class="boundary-note"><strong>Review status is a discussion record.</strong><p>“Reviewed” does not mean clinically validated, approved or ready for patient use. Do not enter patient data. Hardware, clinical and regulatory stages remain unverified.</p></div>`;
    root.querySelectorAll('[data-question]').forEach(b=>b.onclick=()=>{question=b.dataset.question;validation();});editor();
  }
  function editor(){
    const q=C.questions.find(q=>q.id===question),draft=drafts[question]||{text:'',reviewed:false};
    $('question-editor').innerHTML=`<div class="eyebrow">GATE ${q.number} / ${q.stage}</div><h2>${q.title}</h2>${badge('UNVERIFIED')}<p>${q.prompt}</p><div class="gate"><span class="micro">EVIDENCE REQUIRED</span><p>${q.gate}</p></div><div class="notes"><div class="section-label">DISCUSSION NOTES ${readOnly?'<span>READ ONLY</span>':''}</div><p id="load-status" role="status"></p><button id="retry-load" hidden>Retry loading notes</button><label for="note-text">Research review note <span class="muted">(up to 4000 characters)</span></label><textarea id="note-text" rows="6" maxlength="4000" placeholder="Record a research question, evidence gap or partner discussion point."></textarea><label class="checkline"><input id="reviewed" type="checkbox">Mark question as reviewed</label><div class="save-row"><button id="save-note" class="primary">Save note</button><span id="note-status" role="status" aria-live="polite"></span></div></div>`;
    $('note-text').value=draft.text;$('reviewed').checked=draft.reviewed;
    const dirty=()=>{drafts[question]={text:$('note-text').value,reviewed:$('reviewed').checked};statuses[question]='Unsaved changes';noteStatus();};
    $('note-text').oninput=dirty;$('reviewed').onchange=dirty;$('save-note').onclick=saveNote;$('retry-load').onclick=loadNotes;noteStatus();
  }
  function noteStatus(){
    if(!editorActive())return;
    const busy=saving.has(question),ready=loadState==='ready';
    $('note-text').readOnly=readOnly||!ready;$('note-text').disabled=!ready;$('reviewed').disabled=readOnly||!ready;
    $('save-note').disabled=readOnly||!ready||busy;$('save-note').textContent=busy?'Saving…':'Save note';
    $('load-status').textContent=loadState==='loading'?'Loading saved notes…':loadState==='unavailable'?'Notes unavailable. '+loadMessage:readOnly?'Read-only access. Saved notes are available for review.':Object.keys(saved).length===0?'No saved notes yet.':'';
    $('retry-load').hidden=loadState!=='unavailable';$('note-status').textContent=busy?'Saving captured draft…':statuses[question]||'';
    for(const q of C.questions){const mark=$('mark-'+q.id);if(mark)mark.textContent=saved[q.id]?.reviewed?'Reviewed':'Open';}
  }
  async function loadNotes(background=false){
    const serial=++refreshSerial;
    if(!background){loadState='loading';noteStatus();}
    try{
      if(!api)throw new Error('Connection unavailable');const result=await api.getReviews({});
      if(serial!==refreshSerial)return;
      if(!result||!result.reviews||typeof result.reviews!=='object')throw new Error('Invalid notes response');
      const next=D.mergeReviews({saved,drafts},result.reviews);Object.assign(saved,next.saved);Object.assign(drafts,next.drafts);
      loadState='ready';
      for(const id of next.changedIds)if(!saving.has(id))statuses[id]=next.conflictIds.includes(id)?'Saved state changed elsewhere. Your draft is retained.':'Updated from saved state.';
      if(editorActive()){
        if(!background)editor();
        else{
          const field=$('note-text'),draft=drafts[question];
          if(draft&&field.value!==draft.text){const start=field.selectionStart,end=field.selectionEnd;field.value=draft.text;field.setSelectionRange(Math.min(start,field.value.length),Math.min(end,field.value.length));}
          if(draft)$('reviewed').checked=draft.reviewed;noteStatus();
        }
      }
    }catch(error){
      if(serial!==refreshSerial)return;
      if(background&&loadState==='ready'){statuses[question]='Could not refresh saved state. Your draft is retained.';}
      else{loadState='unavailable';loadMessage=error.message||'Please retry.';}
      noteStatus();
    }
  }
  async function saveNote(){
    const id=question;if(readOnly||loadState!=='ready'||saving.has(id))return;
    const draft=drafts[id]||{text:'',reviewed:false},payload={questionId:id,text:draft.text,reviewed:draft.reviewed};
    saving.add(id);noteStatus();
    try{
      const action=()=>api.saveReview(payload);const record=window.charming.withUser?await window.charming.withUser(action):await action();
      if(record===null){statuses[id]='Not saved. Sign-in was cancelled.';return;}
      if(!record||record.text!==payload.text||record.reviewed!==payload.reviewed)throw new Error('Save confirmation did not match this draft');
      // Reads already in flight may contain the pre-save snapshot.
      ++refreshSerial;
      saved[id]=record;const current=drafts[id]||draft;
      statuses[id]=current.text===payload.text&&current.reviewed===payload.reviewed?'Saved':'Earlier draft saved. New edits remain unsaved.';
    }catch(error){if(['forbidden','forbidden_write'].includes(error.kind)){readOnly=true;statuses[id]='Read-only access. Your draft is retained.';}else statuses[id]='Save failed. Your draft is retained; retry Save note.';}
    finally{saving.delete(id);noteStatus();}
  }
  root.addEventListener('keydown',event=>{
    if(!presenting||event.defaultPrevented||event.ctrlKey||event.altKey||event.metaKey||event.shiftKey)return;
    if(event.key==='Escape'){event.preventDefault();exitPresentation();return;}
    if(event.target.closest?.('canvas,input,textarea,select,[contenteditable]:not([contenteditable="false"])'))return;
    if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();changeChapter(chapter+(event.key==='ArrowRight'?1:-1));}
  });
  root.addEventListener('click',event=>{const link=event.target.closest('a[href]');if(link&&window.charming?.openLink){event.preventDefault();window.charming.openLink(link.href);}});
  render();if(api){loadNotes();if(window.charming.onStateChange)window.charming.onStateChange(()=>loadNotes(true));}
})();
