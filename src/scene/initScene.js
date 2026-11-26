import * as THREE from 'three'

/* ===================== LATAR 3D (Three.js) =====================
   Bukit rumput berangin, langit dengan awan prosedural, pegunungan berlapis, dan TV retro.
   state.page  -> halaman aktif (kamera mundur di halaman selain beranda)
   state.burst -> kekuatan embusan angin (0..1), naik saat pindah halaman
   Mengembalikan fungsi untuk membersihkan scene saat komponen dilepas. */
export function initScene(cvs, state, onReady) {
  let raf = 0
  let off = () => {}
  try {
const R=new THREE.WebGLRenderer({canvas:cvs,alpha:true,antialias:true});
  R.setPixelRatio(Math.min(devicePixelRatio,2));
  R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.25;   // warna sinematik
  R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;       // bayangan lembut
  const U={uTime:{value:0},uWind:{value:1},uGust:{value:0}};const S=new THREE.Scene();S.fog=new THREE.FogExp2(0x8a86c4,.03);
  const C=new THREE.PerspectiveCamera(45,1,.1,120);
  const rnd=(a,b)=>a+Math.random()*(b-a);
  const sm=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
  const Hh=(x,z)=>1.5+.5*sm(8,-6,z)                                              // dataran yang naik pelan ke belakang
    +1.0*Math.exp(-Math.pow((x*x+z*z)/3.4,1.5))                                  // gundukan puncak tempat TV
    +2.0*Math.exp(-((x+4.6)**2/7+(z-2.2)**2/8))                                  // bukit besar di kiri depan
    -1.3*Math.exp(-((x-3.5)**2/5+(z+3.2)**2/9))                                  // lembah di kanan TV
    +2.3*Math.exp(-((x-7.4)**2/6+(z+.2)**2/9))                                   // bukit di tepi kanan
    +.13*Math.sin(x*.5+1)*Math.cos(z*.45)+.05*Math.sin(x*2.3)*Math.cos(z*2.9);
  
  // Cahaya senja
  S.add(new THREE.HemisphereLight(0x8f86e0,0x2a2a18,.9));
  const rim=new THREE.DirectionalLight(0xff9a9a,1.5);rim.position.set(-6,5,-8);
  rim.castShadow=true;rim.shadow.mapSize.set(2048,2048);rim.shadow.bias=-.0004;rim.shadow.normalBias=.03;
  Object.assign(rim.shadow.camera,{left:-7,right:7,top:7,bottom:-7,near:1,far:30});S.add(rim);
  const fill=new THREE.DirectionalLight(0x6f7cff,.35);fill.position.set(5,3,6);S.add(fill);
  
  // Tekstur tanah (dibuat lewat canvas: bercak tanah + helai rumput kecil)
  const tc=document.createElement("canvas");tc.width=tc.height=512;const tx=tc.getContext("2d");
  tx.fillStyle="#3d6a2b";tx.fillRect(0,0,512,512);
  for(let i=0;i<300;i++){tx.fillStyle=`hsla(${rnd(70,130)},${rnd(30,55)}%,${rnd(10,34)}%,.3)`;tx.beginPath();tx.arc(rnd(0,512),rnd(0,512),rnd(6,42),0,6.3);tx.fill()}
  for(let i=0;i<14000;i++){tx.strokeStyle=`hsla(${rnd(75,125)},${rnd(40,75)}%,${rnd(14,56)}%,${rnd(.25,.75)})`;tx.lineWidth=rnd(.6,1.7);const x=rnd(0,512),y=rnd(0,512);tx.beginPath();tx.moveTo(x,y);tx.lineTo(x+rnd(-3,3),y-rnd(3,11));tx.stroke()}
  const gtex=new THREE.CanvasTexture(tc);gtex.wrapS=gtex.wrapT=THREE.RepeatWrapping;gtex.repeat.set(12,12);gtex.anisotropy=8;
  // Bukit
  const g=new THREE.PlaneGeometry(46,46,160,160);g.rotateX(-Math.PI/2);
  const pos=g.attributes.position,gcol=new Float32Array(pos.count*3),c0=new THREE.Color();
  for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i),y=Hh(x,z);pos.setY(i,y);
    c0.setHSL(.25,.3,.38+Math.max(0,y-1.5)*.05+Math.random()*.08);gcol.set([c0.r,c0.g,c0.b],i*3)}
  g.setAttribute("color",new THREE.BufferAttribute(gcol,3));g.computeVertexNormals();
  const ground=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:gtex,bumpMap:gtex,bumpScale:3,roughness:1,metalness:0,vertexColors:true}));ground.receiveShadow=true;S.add(ground);
  
  // ===== LANGIT: kubah 3D + awan prosedural =====
  // Awan dihitung dari noise 3D di GPU. Sumbu waktu ikut bergerak dan tiap kunjungan memakai "seed" acak,
  // jadi awan terus bergeser, berubah bentuk, dan tidak pernah sama persis.
  const SK={uTime:{value:0},uSeed:{value:Math.random()*300}};
  const sky=new THREE.Mesh(new THREE.SphereGeometry(100,48,24),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,uniforms:SK,
  vertexShader:"varying vec3 vD;void main(){vD=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
  fragmentShader:`precision highp float;uniform float uTime,uSeed;varying vec3 vD;
  float hs(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
  float nz(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
   return mix(mix(mix(hs(i),hs(i+vec3(1,0,0)),f.x),mix(hs(i+vec3(0,1,0)),hs(i+vec3(1,1,0)),f.x),f.y),
              mix(mix(hs(i+vec3(0,0,1)),hs(i+vec3(1,0,1)),f.x),mix(hs(i+vec3(0,1,1)),hs(i+vec3(1,1,1)),f.x),f.y),f.z);}
  float fb5(vec3 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*nz(p);p=p*2.03+vec3(1.7,9.2,3.1);a*=.5;}return s;}
  float fb4(vec3 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*nz(p);p=p*2.03+vec3(1.7,9.2,3.1);a*=.5;}return s;}
  void main(){
   vec3 d=normalize(vD);float y=d.y;
   vec3 top=vec3(.17,.33,.92),mid=vec3(.38,.50,.96),pink=vec3(.80,.62,.90),hz=vec3(.84,.66,.80),below=vec3(.30,.30,.55);
   vec3 c=mix(hz,pink,smoothstep(0.,.05,y));c=mix(c,mid,smoothstep(.04,.22,y));c=mix(c,top,smoothstep(.2,.6,y));
   c=mix(c,below,smoothstep(0.,-.1,y));
   vec3 sd=normalize(vec3(-.45,.03,-.9));float sg=max(dot(d,sd),0.);
   c+=vec3(1.,.7,.6)*pow(sg,10.)*.012;
   if(y>0.){
    vec2 uv=d.xz/(y+.16)*.8;
    vec3 p=vec3(uv-vec2(uTime*.035,uTime*.010)+uSeed,uTime*.012+uSeed*.37);
    float dn=fb5(p)+(nz(p*.2)-.5)*.4;
    float cov=smoothstep(.45,.70,dn);
    float dl=fb4(p+vec3(-.05,-.10,0.));
    float lit=clamp((dn-dl)*5.5+.5,0.,1.);
    vec3 cc=mix(vec3(.58,.58,.88),vec3(.96,.86,.86),lit);cc+=vec3(1.,.8,.6)*pow(lit,3.)*.07;
    cc=mix(cc,cc*vec3(.80,.78,.95),smoothstep(.6,.95,dn)*.45);
    cc=mix(cc,vec3(1.,.84,.7),smoothstep(.22,0.,y)*.45);
    cov*=smoothstep(.0,.06,y);
    c=mix(c,cc,cov*.97);
   }
   c+=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5)/190.;
   gl_FragColor=vec4(c,1.);}`}));
  sky.renderOrder=-10;sky.frustumCulled=false;S.add(sky);
  
  // ===== PEGUNUNGAN: punggung bukit berlapis dengan kabut udara =====
  const hash1=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)};
  const n1=x=>{const i=Math.floor(x),f=x-i,u=f*f*(3-2*f);return hash1(i)*(1-u)+hash1(i+1)*u};
  const fbm1=(x,o)=>{let a=.5,t=0,f=1;for(let k=0;k<o;k++){t+=a*n1(x*f);f*=2.07;a*=.5}return t};
  function ridge(z,amp,base,sc,a){
    const Nc=360,W=200,R6=7,seed=Math.random()*900,dx=W/Nc,hs=[];
    for(let i=0;i<=Nc;i++){const x=-W/2+i*dx,env=Math.min(1,.3+fbm1(x*.013+seed,3)*1.35),r=1-Math.abs(2*fbm1(x*sc+seed*1.3,5)-1);
      hs.push(base+amp*(.1+.9*Math.pow(r,1.45)*env))}
    const shade=new THREE.Color(0x2e3082).lerp(new THREE.Color(0x8f9ada),a),lit=new THREE.Color(0x6a52a0).lerp(new THREE.Color(0xf3b6c0),a),
          haze=new THREE.Color(0x5c5eaa).lerp(new THREE.Color(0xf8c8b8),a*.9+.1),rim=new THREE.Color(0xffc2b0);
    const pos=[],col=[],idx=[],tmp=new THREE.Color(),top=new THREE.Color(),bottom=-9;
    for(let i=0;i<=Nc;i++){
      const s=((hs[Math.min(i+1,Nc)]-hs[Math.max(i-1,0)])/(2*dx)),x=-W/2+i*dx;
      const light=Math.max(0,Math.min(1,.5+s*.9+(fbm1(x*1.4+seed)-.5)*.35));            // sisi menghadap matahari lebih terang
      top.copy(shade).lerp(lit,light);
      for(let r=0;r<R6;r++){const t=r/(R6-1);pos.push(x,hs[i]+(bottom-hs[i])*t,z);
        tmp.copy(top).lerp(haze,Math.pow(t,1.25)*.92);if(r===0)tmp.lerp(rim,.16*light);col.push(tmp.r,tmp.g,tmp.b)}}
    for(let i=0;i<Nc;i++)for(let r=0;r<R6-1;r++){const a0=i*R6+r,b0=(i+1)*R6+r;idx.push(a0,a0+1,b0,b0,a0+1,b0+1)}
    const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));g.setAttribute("color",new THREE.Float32BufferAttribute(col,3));g.setIndex(idx);
    const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({vertexColors:true,fog:false,side:THREE.DoubleSide}));S.add(m)}
  [[-70,1.5,Hh(0,0)-.5,.09,.7],[-88,2.0,Hh(0,0)-.2,.08,.85],[-106,2.6,Hh(0,0)+.1,.07,1]].forEach(([z,amp,base,sc,a])=>ridge(z,amp,base,sc,a));   // z, tinggi, dasar, kerapatan, kabut
  
  // Rumput berangin (instancing + vertex shader)
  const N=matchMedia("(pointer:coarse)").matches?110000:260000,blade=new THREE.PlaneGeometry(.07,.6,1,3);blade.translate(0,.3,0);
  {const a=blade.attributes.position;for(let i=0;i<a.count;i++){a.setX(i,a.getX(i)*(1-a.getY(i)/.6*.92))}}   // meruncing ke ujung
  const bp=blade.attributes.position,bc=new Float32Array(bp.count*3);
  for(let i=0;i<bp.count;i++){const k=.28+Math.pow(bp.getY(i)/.6,1.2)*.95;bc.set([k*.92,k,k*.8],i*3)}   // pangkal gelap → ujung terang
  blade.setAttribute("color",new THREE.BufferAttribute(bc,3));
  const gm=new THREE.MeshLambertMaterial({vertexColors:true,side:THREE.DoubleSide});
  gm.onBeforeCompile=sh=>{sh.uniforms.uTime=U.uTime;sh.uniforms.uWind=U.uWind;sh.uniforms.uGust=U.uGust;
    sh.vertexShader="uniform float uTime;uniform float uWind;uniform float uGust;\n"+sh.vertexShader.replace("#include <project_vertex>",`
    vec4 mvPosition=instanceMatrix*vec4(transformed,1.0);
    float hh=clamp(transformed.y/0.6,0.0,1.0);
    float bend=pow(hh,1.5);                                                   // pangkal diam, ujung paling lentur
    vec3 ip=instanceMatrix[3].xyz;
    float sy=length(instanceMatrix[1].xyz);
    float ph=fract(sin(dot(ip.xz,vec2(12.9898,78.233)))*43758.5453)*6.2831;   // fase unik tiap helai
    float wave=sin(ip.x*0.55-uTime*2.0+ip.z*0.28)*0.5+0.5;                    // gelombang angin yang berjalan melintasi padang
    float gust=0.75+0.25*sin(uTime*0.4+ip.x*0.1);
    float flutter=sin(uTime*4.2+ph)*0.5+sin(uTime*7.3+ph*1.7)*0.25;           // getaran cepat tiap helai
    float lean=((0.35+0.65*wave)*gust+flutter*0.3)*0.3*uWind;
    float amp=bend*sy*1.6;
    mvPosition.x+=(lean+uGust*(0.55+0.3*sin(uTime*5.0+ph)))*amp;              // uGust = angin kencang
    mvPosition.z+=(sin(uTime*1.6+ph+ip.x*0.5)*0.5+0.2)*0.16*gust*amp*uWind*(1.0+uGust*2.0);
    mvPosition.y-=(lean*lean*1.2+uGust*0.16)*bend*sy;                         // helai melengkung, bukan memanjang
    vColor.rgb*=1.0+(wave-0.5)*0.32*uWind*hh;                                 // pita cahaya ikut gelombang angin
    mvPosition=modelViewMatrix*mvPosition;gl_Position=projectionMatrix*mvPosition;`)};
  const gr=new THREE.InstancedMesh(blade,gm,N);gr.receiveShadow=true;gr.frustumCulled=false;
  const d=new THREE.Object3D(),col=new THREE.Color();
  {let i=0;while(i<N){   // rumput tumbuh berumpun agar terlihat natural
    const near=i<N*.2,ang=rnd(0,6.283),rad=rnd(.8,3.6);   // 20% rumpun tumbuh mengelilingi gundukan
    const c0x=near?Math.cos(ang)*rad:rnd(-18,18),c0z=near?Math.sin(ang)*rad:rnd(-14,10),ch=rnd(.22,.31),cl=rnd(.3,.46),sp=rnd(.25,.7),cs=(near?.75:1)*rnd(.8,1.3);
    for(let k=0;k<70&&i<N;k++,i++){const uni=Math.random()<.35,x=uni?rnd(-17,17):c0x+(Math.random()+Math.random()-1)*sp*2,z=uni?rnd(-13,10):c0z+(Math.random()+Math.random()-1)*sp*2;
      d.position.set(x,Hh(x,z)-.03,z);d.rotation.set(rnd(-.3,.3),rnd(0,6.3),rnd(-.3,.3));d.scale.set(rnd(.7,1.3),rnd(.28,1.0)*cs,rnd(.7,1.3));d.updateMatrix();
      gr.setMatrixAt(i,d.matrix);gr.setColorAt(i,col.setHSL(ch+rnd(-.015,.015),rnd(.55,.8),cl*rnd(.8,1.15)))}}}
  S.add(gr);
  
  // TV retro realistis (diam di tempatnya)
  // 1) Peta lingkungan senja untuk pantulan pada plastik, krom, dan kaca
  const ec=document.createElement("canvas");ec.width=512;ec.height=256;const ex=ec.getContext("2d"),eg=ex.createLinearGradient(0,0,0,256);
  eg.addColorStop(0,"#2a3fd0");eg.addColorStop(.42,"#7a64d8");eg.addColorStop(.5,"#ffb09a");eg.addColorStop(.56,"#3a2f4a");eg.addColorStop(1,"#14141c");
  ex.fillStyle=eg;ex.fillRect(0,0,512,256);
  for(const u of [0,.25,.5,.75,1]){const sg2=ex.createRadialGradient(u*512,118,0,u*512,118,70);sg2.addColorStop(0,"rgba(255,225,170,.9)");sg2.addColorStop(1,"rgba(255,200,140,0)");ex.fillStyle=sg2;ex.fillRect(0,0,512,256)}
  const et=new THREE.CanvasTexture(ec);et.mapping=THREE.EquirectangularReflectionMapping;
  const pm=new THREE.PMREMGenerator(R),env=pm.fromEquirectangular(et).texture;pm.dispose();
  
  // 2) Material
  const plastic=new THREE.MeshPhysicalMaterial({color:0x1c2466,roughness:.38,metalness:.05,clearcoat:1,clearcoatRoughness:.14,envMap:env,envMapIntensity:1.3});
  const dark=new THREE.MeshPhysicalMaterial({color:0x07091e,roughness:.32,clearcoat:.8,clearcoatRoughness:.2,envMap:env,envMapIntensity:1});
  const chrome=new THREE.MeshStandardMaterial({color:0xe9ebff,roughness:.14,metalness:1,envMap:env,envMapIntensity:1.4});
  const wood=new THREE.MeshStandardMaterial({color:0x5b3a22,roughness:.62,envMap:env,envMapIntensity:.35});
  
  // 3) Bentuk: kotak membulat dengan tepi miring (bevel)
  const rr=(w,h,r)=>{const q=new THREE.Shape(),x=-w/2,y=-h/2;q.moveTo(x+r,y);q.lineTo(x+w-r,y);q.quadraticCurveTo(x+w,y,x+w,y+r);q.lineTo(x+w,y+h-r);q.quadraticCurveTo(x+w,y+h,x+w-r,y+h);q.lineTo(x+r,y+h);q.quadraticCurveTo(x,y+h,x,y+h-r);q.lineTo(x,y+r);q.quadraticCurveTo(x,y,x+r,y);return q};
  const ext=(sh,depth,bev)=>{const e=new THREE.ExtrudeGeometry(sh,{depth,bevelEnabled:true,bevelThickness:bev,bevelSize:bev,bevelSegments:5,curveSegments:14});e.translate(0,0,-depth/2);return e};
  
  const tv=new THREE.Group(),ty=Hh(0,0);
  const put=(geo,m,x,y,z,rot,parent=tv)=>{const q=new THREE.Mesh(geo,m);q.position.set(x,y,z);if(rot)q.rotation.set(rot[0]||0,rot[1]||0,rot[2]||0);q.castShadow=true;parent.add(q);return q};
  
  put(ext(rr(1.42,1.07,.14),.88,.04),plastic,0,0,0);                         // badan depan
  put(ext(rr(1.1,.85,.12),.6,.05),dark,0,-.02,-.78);                         // tabung CRT di belakang
  put(ext(rr(1.04,.89,.1),.04,.03),dark,-.14,0,.49);                         // bingkai layar
  
  // 4) Layar kaca cembung: tekstur hangat + garis scan + vinyet
  const sc2=document.createElement("canvas");sc2.width=512;sc2.height=424;const sx2=sc2.getContext("2d");
  sx2.beginPath();sx2.roundRect?sx2.roundRect(0,0,512,424,46):sx2.rect(0,0,512,424);sx2.clip();
  const sgr=sx2.createRadialGradient(256,212,10,256,212,320);sgr.addColorStop(0,"#fffdf2");sgr.addColorStop(.55,"#fff0c8");sgr.addColorStop(1,"#e9a85a");
  sx2.fillStyle=sgr;sx2.fillRect(0,0,512,424);
  sx2.fillStyle="rgba(120,70,20,.08)";for(let y=0;y<424;y+=3)sx2.fillRect(0,y,512,1);
  const sv=sx2.createRadialGradient(256,212,150,256,212,330);sv.addColorStop(0,"rgba(0,0,0,0)");sv.addColorStop(1,"rgba(90,40,0,.4)");sx2.fillStyle=sv;sx2.fillRect(0,0,512,424);
  const stex=new THREE.CanvasTexture(sc2);stex.anisotropy=8;
  const bulge=geo=>{const a=geo.attributes.position;for(let i=0;i<a.count;i++){const nx=a.getX(i)/.49,ny=a.getY(i)/.41;a.setZ(i,.045*(1-.5*(nx*nx+ny*ny)))}geo.computeVertexNormals();return geo};
  const scr=new THREE.Mesh(bulge(new THREE.PlaneGeometry(.98,.82,40,34)),new THREE.MeshBasicMaterial({map:stex,transparent:true,toneMapped:false}));
  scr.position.set(-.14,0,.52);tv.add(scr);
  const glass=new THREE.Mesh(bulge(new THREE.PlaneGeometry(.98,.82,40,34)),new THREE.MeshPhysicalMaterial({map:stex,color:0x000000,roughness:.04,metalness:0,clearcoat:1,clearcoatRoughness:.02,reflectivity:.9,envMap:env,envMapIntensity:1.6,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));
  glass.position.set(-.14,0,.524);tv.add(glass);                              // lapisan kaca: hanya menambah pantulan
  
  // 5) Panel kanan: kenop krom, speaker, lencana
  const knob=new THREE.CylinderGeometry(.075,.075,.06,36),cap=new THREE.CylinderGeometry(.045,.045,.07,24),ring=new THREE.TorusGeometry(.082,.009,10,36);
  for(const ky of [.3,.08]){put(knob,chrome,.56,ky,.51,[Math.PI/2]);put(cap,dark,.56,ky,.51,[Math.PI/2]);put(ring,dark,.56,ky,.484);
    put(new THREE.BoxGeometry(.012,.05,.01),chrome,.56,ky+.02,.545,[0,0,ky>.2?.5:-.3])}
  for(let k=0;k<6;k++)put(new THREE.BoxGeometry(.3,.016,.02),dark,.56,-.13-k*.035,.482);
  put(new THREE.BoxGeometry(.2,.045,.012),chrome,.56,-.43,.484);
  
  // 6) Antena teleskopik berpangkal kubah krom
  const dome=put(new THREE.SphereGeometry(.09,28,12,0,Math.PI*2,0,Math.PI/2),chrome,0,.57,-.05);
  for(const [rz,ox] of [[.55,0],[-.45,0]]){const a=new THREE.Group();a.position.set(ox,.62,-.05);a.rotation.z=rz;tv.add(a);
    put(new THREE.CylinderGeometry(.016,.018,.5,16),chrome,0,.25,0,null,a);put(new THREE.CylinderGeometry(.009,.012,.5,12),chrome,0,.74,0,null,a);put(new THREE.SphereGeometry(.03,14,10),chrome,0,1,0,null,a)}
  
  // 7) Kaki kayu
  for(const [lx,lz] of [[-.5,.3],[.5,.3],[-.5,-.3],[.5,-.3]])put(new THREE.CylinderGeometry(.045,.062,.17,18),wood,lx,-.655,lz);
  
  tv.rotation.y=-.38;tv.position.set(0,ty+.745,0);S.add(tv);
  const tl=new THREE.PointLight(0xffb468,3.4,9.5,1.5);tl.position.set(0,ty+.9,1.6);S.add(tl);
  // bayangan kontak di bawah TV
  const sc=document.createElement("canvas");sc.width=sc.height=64;const sx=sc.getContext("2d"),sg=sx.createRadialGradient(32,32,0,32,32,32);
  sg.addColorStop(0,"rgba(0,0,0,.7)");sg.addColorStop(1,"rgba(0,0,0,0)");sx.fillStyle=sg;sx.fillRect(0,0,64,64);
  const blob=new THREE.Mesh(new THREE.PlaneGeometry(2.6,2.2),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(sc),transparent:true,depthWrite:false}));
  blob.rotation.x=-Math.PI/2;blob.position.set(0,ty+.05,0);S.add(blob);
  
  // Glow halo
  const gc=document.createElement("canvas");gc.width=gc.height=128;const gx=gc.getContext("2d"),gg=gx.createRadialGradient(64,64,0,64,64,64);
  gg.addColorStop(0,"rgba(255,235,190,1)");gg.addColorStop(.3,"rgba(255,180,100,.45)");gg.addColorStop(1,"rgba(255,150,80,0)");gx.fillStyle=gg;gx.fillRect(0,0,128,128);
  const gt=new THREE.CanvasTexture(gc),halo=new THREE.Sprite(new THREE.SpriteMaterial({map:gt,blending:THREE.AdditiveBlending,depthWrite:false}));
  halo.material.toneMapped=false;halo.scale.set(6.5,6.5,1);halo.position.set(-.1,ty+.8,.8);S.add(halo);
  
  // Partikel melayang
  const PN=420,pp=new Float32Array(PN*3);for(let i=0;i<PN;i++){pp[i*3]=rnd(-12,12);pp[i*3+1]=rnd(0,9);pp[i*3+2]=rnd(-8,5)}
  const pg=new THREE.BufferGeometry();pg.setAttribute("position",new THREE.BufferAttribute(pp,3));
  S.add(new THREE.Points(pg,new THREE.PointsMaterial({size:.07,map:gt,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false})));
  
  // Ukuran & kamera
  let aspect=1,mx=0,my=0;
  const fit=()=>{const w=innerWidth,h=innerHeight;R.setSize(w,h,false);aspect=w/h;C.aspect=aspect;C.updateProjectionMatrix()};
  fit();addEventListener("resize",fit);
  const mm=e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5};addEventListener("mousemove",mm);
  off=()=>{removeEventListener("mousemove",mm);removeEventListener("resize",fit);R.dispose()};
  const calm=matchMedia("(prefers-reduced-motion:reduce)").matches,look=new THREE.Vector3(),tgt=new THREE.Vector3();
  let cx=0,cy=0,cz=8,last=0,phase=0,gust=0;
  function loop(t){t*=.001;
    const home=state.page==="beranda";
    const bz=(aspect<1?11.5:8.3)+(home?0:3),by=(home?ty-.1:ty+1.2);
    cx+=(mx*1.4-cx)*.04;cy+=(by-my*.6-cy)*.04;cz+=(bz-cz)*.04;
    C.position.set(cx,cy,cz);look.set(0,ty+(home?1.05:.6),0);C.lookAt(look);
    const dt=Math.min(t-last,.05);last=t;
    gust+=(state.burst-gust)*Math.min(1,dt*6);state.burst*=Math.pow(.35,dt);        // embusan naik cepat, lalu mereda
    phase+=dt*(1+gust*2.4);U.uTime.value=phase;SK.uTime.value=phase;U.uWind.value=calm?.5:1;U.uGust.value=calm?0:gust;
    if(!calm){halo.material.opacity=.9;
      const a=pg.attributes.position,wd=Math.sin(t*.35)*.5+.7+gust*7;for(let i=0;i<PN;i++){let y=a.getY(i)-.004;if(y<0)y=9;a.setY(i,y);a.setX(i,a.getX(i)+(.004+Math.sin(t+i)*.002)*wd)}
      a.needsUpdate=true}
    sky.position.copy(C.position);R.render(S,C);raf=requestAnimationFrame(loop)}
  raf=requestAnimationFrame(loop);
  onReady&&onReady();
  
  } catch (e) {
    console.warn('WebGL tidak tersedia, memakai latar gradasi', e)
  }
  return () => { cancelAnimationFrame(raf); off() }
}
