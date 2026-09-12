/* グラス周期表 — Glass Periodic
 * Meta Ray-Ban Display 用。入力はタップ(Enter)と D-pad(矢印)のみ。Escape は PC 確認用の補助。
 */
(function () {
  'use strict';

  var DEMO = /[?&]demo=1/.test(location.search);
  var STORE_KEY = 'glass-periodic-v1';

  // ---------- 元素データ ----------
  // num|記号|英名|和名|原子量|分類|常温|電子配置|メモ
  var RAW = [
    '1|H|Hydrogen|水素|1.008|nm|g|1|宇宙でいちばん多い元素。水と燃料電池のもと',
    '2|He|Helium|ヘリウム|4.003|ng|g|2|風船・飛行船に。MRIの冷却にも',
    '3|Li|Lithium|リチウム|6.94|al|s|2,1|スマホの電池（リチウムイオン）に',
    '4|Be|Beryllium|ベリリウム|9.012|ae|s|2,2|X線の窓・宇宙望遠鏡の鏡',
    '5|B|Boron|ホウ素|10.81|md|s|2,3|ホウ酸だんご・耐熱ガラス',
    '6|C|Carbon|炭素|12.011|nm|s|2,4|ダイヤモンドも鉛筆も。生き物の骨組み',
    '7|N|Nitrogen|窒素|14.007|nm|g|2,5|空気の78%。肥料のもと',
    '8|O|Oxygen|酸素|15.999|nm|g|2,6|空気の21%。呼吸と燃焼に必要',
    '9|F|Fluorine|フッ素|18.998|hg|g|2,7|歯みがき粉・フッ素樹脂（テフロン）',
    '10|Ne|Neon|ネオン|20.180|ng|g|2,8|赤く光るネオンサイン',
    '11|Na|Sodium|ナトリウム|22.990|al|s|2,8,1|食塩（NaCl）の片われ。炎は黄色',
    '12|Mg|Magnesium|マグネシウム|24.305|ae|s|2,8,2|花火の白い光・軽い合金',
    '13|Al|Aluminium|アルミニウム|26.982|pm|s|2,8,3|1円玉・アルミ缶・飛行機',
    '14|Si|Silicon|ケイ素|28.085|md|s|2,8,4|半導体チップとガラスの主役',
    '15|P|Phosphorus|リン|30.974|nm|s|2,8,5|マッチ・DNA・骨の成分',
    '16|S|Sulfur|硫黄|32.06|nm|s|2,8,6|温泉のにおい・ゴムを強くする',
    '17|Cl|Chlorine|塩素|35.45|hg|g|2,8,7|水道水やプールの消毒に',
    '18|Ar|Argon|アルゴン|39.948|ng|g|2,8,8|空気の約1%。蛍光灯や溶接に',
    '19|K|Potassium|カリウム|39.098|al|s|2,8,8,1|バナナに多い。炎は紫色',
    '20|Ca|Calcium|カルシウム|40.078|ae|s|2,8,8,2|骨と歯・牛乳・チョーク',
    '21|Sc|Scandium|スカンジウム|44.956|tm|s|2,8,9,2|自転車フレームの合金・照明',
    '22|Ti|Titanium|チタン|47.867|tm|s|2,8,10,2|軽くて強い。ゴルフクラブ・人工関節',
    '23|V|Vanadium|バナジウム|50.942|tm|s|2,8,11,2|工具の鋼を硬くする',
    '24|Cr|Chromium|クロム|51.996|tm|s|2,8,13,1|ステンレスとメッキ。ルビーの赤色も',
    '25|Mn|Manganese|マンガン|54.938|tm|s|2,8,13,2|乾電池・鉄を強くする',
    '26|Fe|Iron|鉄|55.845|tm|s|2,8,14,2|使われる金属No.1。血液のヘモグロビン',
    '27|Co|Cobalt|コバルト|58.933|tm|s|2,8,15,2|青い顔料（コバルトブルー）・磁石',
    '28|Ni|Nickel|ニッケル|58.693|tm|s|2,8,16,2|硬貨・ステンレス・充電池',
    '29|Cu|Copper|銅|63.546|tm|s|2,8,18,1|電線・10円玉。さびると緑青',
    '30|Zn|Zinc|亜鉛|65.38|tm|s|2,8,18,2|トタン・乾電池・日焼け止め',
    '31|Ga|Gallium|ガリウム|69.723|pm|s|2,8,18,3|青色LED・体温でとける金属',
    '32|Ge|Germanium|ゲルマニウム|72.630|md|s|2,8,18,4|かつての半導体。赤外線レンズ',
    '33|As|Arsenic|ヒ素|74.922|md|s|2,8,18,5|毒として有名。半導体にも',
    '34|Se|Selenium|セレン|78.971|nm|s|2,8,18,6|コピー機の感光体・必須ミネラル',
    '35|Br|Bromine|臭素|79.904|hg|l|2,8,18,7|常温で液体の非金属。写真の感光剤',
    '36|Kr|Krypton|クリプトン|83.798|ng|g|2,8,18,8|白い光の写真用フラッシュ',
    '37|Rb|Rubidium|ルビジウム|85.468|al|s|2,8,18,8,1|原子時計・炎は赤紫色',
    '38|Sr|Strontium|ストロンチウム|87.62|ae|s|2,8,18,8,2|花火の赤い光',
    '39|Y|Yttrium|イットリウム|88.906|tm|s|2,8,18,9,2|YAGレーザー・LEDの蛍光体',
    '40|Zr|Zirconium|ジルコニウム|91.224|tm|s|2,8,18,10,2|原子炉の燃料被覆管・人工ダイヤ',
    '41|Nb|Niobium|ニオブ|92.906|tm|s|2,8,18,12,1|超伝導磁石（MRI）・合金',
    '42|Mo|Molybdenum|モリブデン|95.95|tm|s|2,8,18,13,1|硬い鋼・潤滑剤',
    '43|Tc|Technetium|テクネチウム|[98]|tm|s|2,8,18,13,2|天然にほぼ無い。医療の画像診断に',
    '44|Ru|Ruthenium|ルテニウム|101.07|tm|s|2,8,18,15,1|万年筆のペン先・電子部品',
    '45|Rh|Rhodium|ロジウム|102.91|tm|s|2,8,18,16,1|自動車の排ガス浄化触媒',
    '46|Pd|Palladium|パラジウム|106.42|tm|s|2,8,18,18|排ガス触媒・水素をよく吸う',
    '47|Ag|Silver|銀|107.87|tm|s|2,8,18,18,1|食器・写真・抗菌グッズ',
    '48|Cd|Cadmium|カドミウム|112.41|tm|s|2,8,18,18,2|ニカド電池・黄色い絵の具',
    '49|In|Indium|インジウム|114.82|pm|s|2,8,18,18,3|液晶ディスプレイの透明電極',
    '50|Sn|Tin|スズ|118.71|pm|s|2,8,18,18,4|ブリキ・はんだ',
    '51|Sb|Antimony|アンチモン|121.76|md|s|2,8,18,18,5|難燃剤・鉛蓄電池の合金',
    '52|Te|Tellurium|テルル|127.60|md|s|2,8,18,18,6|DVD-RW・太陽電池',
    '53|I|Iodine|ヨウ素|126.90|hg|s|2,8,18,18,7|うがい薬・海藻に多い',
    '54|Xe|Xenon|キセノン|131.29|ng|g|2,8,18,18,8|車のHIDランプ・イオンエンジン',
    '55|Cs|Caesium|セシウム|132.91|al|s|2,8,18,18,8,1|原子時計（1秒の定義）',
    '56|Ba|Barium|バリウム|137.33|ae|s|2,8,18,18,8,2|レントゲンの造影剤・緑の花火',
    '57|La|Lanthanum|ランタン|138.91|la|s|2,8,18,18,9,2|カメラレンズのガラス・電池',
    '58|Ce|Cerium|セリウム|140.12|la|s|2,8,18,19,9,2|ライターの石・ガラス研磨剤',
    '59|Pr|Praseodymium|プラセオジム|140.91|la|s|2,8,18,21,8,2|飛行機エンジンの合金・黄緑ガラス',
    '60|Nd|Neodymium|ネオジム|144.24|la|s|2,8,18,22,8,2|世界最強のネオジム磁石',
    '61|Pm|Promethium|プロメチウム|[145]|la|s|2,8,18,23,8,2|天然にほぼ無い。夜光塗料に',
    '62|Sm|Samarium|サマリウム|150.36|la|s|2,8,18,24,8,2|磁石・原子炉の制御棒',
    '63|Eu|Europium|ユウロピウム|151.96|la|s|2,8,18,25,8,2|紙幣の蛍光インク・赤の蛍光体',
    '64|Gd|Gadolinium|ガドリニウム|157.25|la|s|2,8,18,25,9,2|MRIの造影剤',
    '65|Tb|Terbium|テルビウム|158.93|la|s|2,8,18,27,8,2|緑の蛍光体・磁歪合金',
    '66|Dy|Dysprosium|ジスプロシウム|162.50|la|s|2,8,18,28,8,2|レーザー・ハードディスク',
    '67|Ho|Holmium|ホルミウム|164.93|la|s|2,8,18,29,8,2|医療用レーザー・強力磁石',
    '68|Er|Erbium|エルビウム|167.26|la|s|2,8,18,30,8,2|光ファイバー増幅器・ピンクのガラス',
    '69|Tm|Thulium|ツリウム|168.93|la|s|2,8,18,31,8,2|携帯型X線装置',
    '70|Yb|Ytterbium|イッテルビウム|173.05|la|s|2,8,18,32,8,2|原子時計・レーザー',
    '71|Lu|Lutetium|ルテチウム|174.97|la|s|2,8,18,32,9,2|PET検査・石油精製の触媒',
    '72|Hf|Hafnium|ハフニウム|178.49|tm|s|2,8,18,32,10,2|原子炉の制御棒・半導体',
    '73|Ta|Tantalum|タンタル|180.95|tm|s|2,8,18,32,11,2|スマホのコンデンサ・人工骨',
    '74|W|Tungsten|タングステン|183.84|tm|s|2,8,18,32,12,2|電球のフィラメント。最も融点が高い',
    '75|Re|Rhenium|レニウム|186.21|tm|s|2,8,18,32,13,2|ジェットエンジンの合金',
    '76|Os|Osmium|オスミウム|190.23|tm|s|2,8,18,32,14,2|最も重い金属。万年筆のペン先',
    '77|Ir|Iridium|イリジウム|192.22|tm|s|2,8,18,32,15,2|点火プラグ・キログラム原器',
    '78|Pt|Platinum|白金|195.08|tm|s|2,8,18,32,17,1|プラチナ。指輪・触媒',
    '79|Au|Gold|金|196.97|tm|s|2,8,18,32,18,1|通貨・宝飾。さびない王',
    '80|Hg|Mercury|水銀|200.59|tm|l|2,8,18,32,18,2|常温で液体の金属。温度計',
    '81|Tl|Thallium|タリウム|204.38|pm|s|2,8,18,32,18,3|かつては殺鼠剤。光学ガラス',
    '82|Pb|Lead|鉛|207.2|pm|s|2,8,18,32,18,4|鉛蓄電池・放射線の遮へい',
    '83|Bi|Bismuth|ビスマス|208.98|pm|s|2,8,18,32,18,5|胃薬・低融点合金（ヒューズ）',
    '84|Po|Polonium|ポロニウム|[209]|pm|s|2,8,18,32,18,6|キュリー夫人の発見。強い放射能',
    '85|At|Astatine|アスタチン|[210]|hg|s|2,8,18,32,18,7|地球上にほとんど存在しない',
    '86|Rn|Radon|ラドン|[222]|ng|g|2,8,18,32,18,8|温泉から出る放射性ガス',
    '87|Fr|Francium|フランシウム|[223]|al|s|2,8,18,32,18,8,1|最も不安定な天然元素',
    '88|Ra|Radium|ラジウム|[226]|ae|s|2,8,18,32,18,8,2|キュリー夫人が発見。かつて夜光塗料',
    '89|Ac|Actinium|アクチニウム|[227]|ac|s|2,8,18,32,18,9,2|アクチノイドの名前のもと',
    '90|Th|Thorium|トリウム|232.04|ac|s|2,8,18,32,18,10,2|ガス灯のマントル・トリウム原子炉',
    '91|Pa|Protactinium|プロトアクチニウム|231.04|ac|s|2,8,18,32,20,9,2|とても希少な放射性元素',
    '92|U|Uranium|ウラン|238.03|ac|s|2,8,18,32,21,9,2|原子力発電の燃料',
    '93|Np|Neptunium|ネプツニウム|[237]|ac|s|2,8,18,32,22,9,2|海王星（ネプチューン）にちなむ',
    '94|Pu|Plutonium|プルトニウム|[244]|ac|s|2,8,18,32,24,8,2|冥王星（プルート）にちなむ。核燃料',
    '95|Am|Americium|アメリシウム|[243]|ac|s|2,8,18,32,25,8,2|家庭の煙感知器に',
    '96|Cm|Curium|キュリウム|[247]|ac|s|2,8,18,32,25,9,2|キュリー夫妻にちなむ。探査機の電源',
    '97|Bk|Berkelium|バークリウム|[247]|ac|s|2,8,18,32,27,8,2|バークレー（米）にちなむ',
    '98|Cf|Californium|カリホルニウム|[251]|ac|s|2,8,18,32,28,8,2|中性子源。がん治療',
    '99|Es|Einsteinium|アインスタイニウム|[252]|ac|s|2,8,18,32,29,8,2|アインシュタインにちなむ',
    '100|Fm|Fermium|フェルミウム|[257]|ac|s|2,8,18,32,30,8,2|フェルミにちなむ。水爆の灰から発見',
    '101|Md|Mendelevium|メンデレビウム|[258]|ac|s|2,8,18,32,31,8,2|周期表の父メンデレーエフにちなむ',
    '102|No|Nobelium|ノーベリウム|[259]|ac|s|2,8,18,32,32,8,2|ノーベルにちなむ',
    '103|Lr|Lawrencium|ローレンシウム|[266]|ac|s|2,8,18,32,32,8,3|ローレンスにちなむ',
    '104|Rf|Rutherfordium|ラザホージウム|[267]|tm|s|2,8,18,32,32,10,2|ラザフォードにちなむ',
    '105|Db|Dubnium|ドブニウム|[268]|tm|s|2,8,18,32,32,11,2|ドブナ（露）にちなむ',
    '106|Sg|Seaborgium|シーボーギウム|[269]|tm|s|2,8,18,32,32,12,2|シーボーグにちなむ',
    '107|Bh|Bohrium|ボーリウム|[270]|tm|s|2,8,18,32,32,13,2|ボーアにちなむ',
    '108|Hs|Hassium|ハッシウム|[269]|tm|s|2,8,18,32,32,14,2|ヘッセン州（独）にちなむ',
    '109|Mt|Meitnerium|マイトネリウム|[278]|un|s|2,8,18,32,32,15,2|マイトナーにちなむ',
    '110|Ds|Darmstadtium|ダームスタチウム|[281]|un|s|2,8,18,32,32,16,2|ダルムシュタット（独）にちなむ',
    '111|Rg|Roentgenium|レントゲニウム|[282]|un|s|2,8,18,32,32,17,2|レントゲンにちなむ',
    '112|Cn|Copernicium|コペルニシウム|[285]|tm|s|2,8,18,32,32,18,2|コペルニクスにちなむ',
    '113|Nh|Nihonium|ニホニウム|[286]|un|s|2,8,18,32,32,18,3|日本（理研）が発見！アジア初の命名',
    '114|Fl|Flerovium|フレロビウム|[289]|un|s|2,8,18,32,32,18,4|フリョロフにちなむ',
    '115|Mc|Moscovium|モスコビウム|[290]|un|s|2,8,18,32,32,18,5|モスクワにちなむ',
    '116|Lv|Livermorium|リバモリウム|[293]|un|s|2,8,18,32,32,18,6|リバモア研究所にちなむ',
    '117|Ts|Tennessine|テネシン|[294]|un|s|2,8,18,32,32,18,7|テネシー州にちなむ',
    '118|Og|Oganesson|オガネソン|[294]|un|s|2,8,18,32,32,18,8|オガネシアンにちなむ。最も重い元素'
  ];

  var CATS = {
    al: { name: 'アルカリ金属', color: '#ff6b6b' },
    ae: { name: 'アルカリ土類金属', color: '#ffa94d' },
    tm: { name: '遷移金属', color: '#ffd43b' },
    pm: { name: 'その他の金属', color: '#69db7c' },
    md: { name: '半金属', color: '#38d9a9' },
    nm: { name: '非金属', color: '#4dabf7' },
    hg: { name: 'ハロゲン', color: '#748ffc' },
    ng: { name: '貴ガス', color: '#b197fc' },
    la: { name: 'ランタノイド', color: '#f783ac' },
    ac: { name: 'アクチノイド', color: '#e599f7' },
    un: { name: '性質は未確認', color: '#adb5bd' }
  };
  var PHASE = { s: '固体', l: '液体', g: '気体' };

  var EL = {};
  RAW.forEach(function (line) {
    var p = line.split('|');
    EL[+p[0]] = { num: +p[0], sym: p[1], en: p[2], ja: p[3], mass: p[4], cat: p[5], phase: p[6], shell: p[7].replace(/,/g, ', '), memo: p[8] };
  });

  // ---------- 配置（9行×18列。0=空、負数=マーカー） ----------
  var LAYOUT = [];
  function row(arr) { LAYOUT.push(arr); }
  function range(a, b) { var r = []; for (var i = a; i <= b; i++) r.push(i); return r; }
  function zeros(n) { var r = []; for (var i = 0; i < n; i++) r.push(0); return r; }
  row([1].concat(zeros(16), [2]));
  row([3, 4].concat(zeros(10), range(5, 10)));
  row([11, 12].concat(zeros(10), range(13, 18)));
  row(range(19, 36));
  row(range(37, 54));
  row([55, 56, -1].concat(range(72, 86)));
  row([87, 88, -2].concat(range(104, 118)));
  row([0, 0].concat(range(57, 71), [0]));
  row([0, 0].concat(range(89, 103), [0]));

  var MARKERS = { '-1': { label: '57-71', ja: 'ランタノイド', memo: '57〜71番は下の行（ピンク）にまとめて表示', cat: 'la' },
                  '-2': { label: '89-103', ja: 'アクチノイド', memo: '89〜103番は下の行（紫）にまとめて表示', cat: 'ac' } };

  var POS = {}; // num -> {r,c}
  LAYOUT.forEach(function (rw, r) { rw.forEach(function (v, c) { if (v !== 0) POS[v] = { r: r, c: c }; }); });

  function periodOf(num) { var r = POS[num].r; return r >= 7 ? r - 1 : r + 1; }
  function groupOf(num) { var p = POS[num]; return p.r >= 7 ? null : p.c + 1; }
  function pgText(num) {
    var g = groupOf(num);
    return '第' + periodOf(num) + '周期・' + (g ? g + '族' : CATS[EL[num].cat].name);
  }

  // ---------- 状態 ----------
  var state = { r: 1, c: 13, best: 0, quiz: null }; // 初期位置 = 炭素
  function storeLoad() {
    if (DEMO) return;
    try { var s = JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); if (s.r != null) { state.r = s.r; state.c = s.c; } if (s.best) state.best = s.best; } catch (e) {}
  }
  function storeSave() {
    if (DEMO) return;
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ r: state.r, c: state.c, best: state.best })); } catch (e) {}
  }

  // ---------- DOM ----------
  function $(id) { return document.getElementById(id); }
  var el = {
    main: $('main'), grid: $('grid'), detail: $('detail'), legend: $('legend'), quiz: $('quiz'), result: $('result'),
    cNum: $('c-num'), cSym: $('c-sym'), cMass: $('c-mass'), cJa: $('c-ja'), cEn: $('c-en'), cCat: $('c-cat'), cPg: $('c-pg'), cPhase: $('c-phase'), cMemo: $('c-memo'),
    card: $('card'),
    dNum: $('d-num'), dJa: $('d-ja'), dEn: $('d-en'), dSym: $('d-sym'), dMass: $('d-mass'), dCat: $('d-cat'), dPg: $('d-pg'), dPhase: $('d-phase'), dShell: $('d-shell'), dMemo: $('d-memo'),
    qProg: $('q-prog'), qAsk: $('q-ask'), qBig: $('q-big'), qBtns: $('q-btns'), qFoot: $('q-foot'),
    rScore: $('r-score'), rMsg: $('r-msg'), rBest: $('r-best')
  };
  var cells = {}; // "r,c" -> element

  function buildGrid() {
    var frag = document.createDocumentFragment();
    LAYOUT.forEach(function (rw, r) {
      rw.forEach(function (v, c) {
        if (v === 0) return;
        var d = document.createElement('div');
        var top = r * 32 + (r >= 7 ? 12 : 0);
        d.style.left = (c * 32) + 'px';
        d.style.top = top + 'px';
        if (v < 0) {
          d.className = 'cell marker c-' + MARKERS[v].cat;
          d.textContent = MARKERS[v].label;
        } else {
          d.className = 'cell c-' + EL[v].cat;
          d.textContent = EL[v].sym;
        }
        cells[r + ',' + c] = d;
        frag.appendChild(d);
      });
    });
    el.grid.appendChild(frag);
  }

  function buildLegend() {
    var list = $('legend-list');
    Object.keys(CATS).forEach(function (k) {
      var d = document.createElement('div');
      d.className = 'legend-item';
      d.innerHTML = '<span class="legend-sw" style="border-color:' + CATS[k].color + ';background:' + CATS[k].color + '33"></span>' + CATS[k].name;
      list.appendChild(d);
    });
  }

  function curVal() { return LAYOUT[state.r][state.c]; }

  function renderMain() {
    Object.keys(cells).forEach(function (k) { cells[k].classList.remove('cur'); });
    cells[state.r + ',' + state.c].classList.add('cur');
    var v = curVal();
    if (v < 0) {
      var m = MARKERS[v];
      var col = CATS[m.cat].color;
      el.card.style.setProperty('--acc', col);
      el.cNum.textContent = m.label;
      el.cSym.textContent = '…';
      el.cMass.textContent = '';
      el.cJa.textContent = m.ja;
      el.cEn.textContent = '';
      el.cCat.textContent = CATS[m.cat].name;
      el.cPg.textContent = v === -1 ? '第6周期' : '第7周期';
      el.cPhase.textContent = '15元素';
      el.cMemo.textContent = m.memo;
      return;
    }
    var e = EL[v];
    el.card.style.setProperty('--acc', CATS[e.cat].color);
    el.cNum.textContent = e.num;
    el.cSym.textContent = e.sym;
    el.cMass.textContent = e.mass;
    el.cJa.textContent = e.ja;
    el.cEn.textContent = e.en;
    el.cCat.textContent = CATS[e.cat].name;
    el.cPg.textContent = pgText(e.num);
    el.cPhase.textContent = PHASE[e.phase];
    el.cMemo.textContent = e.memo;
  }

  // 同じ行/列で次に元素があるセルへ（端でループ）
  function moveH(dir) {
    var rw = LAYOUT[state.r], c = state.c;
    for (var i = 0; i < 18; i++) { c = (c + dir + 18) % 18; if (rw[c] !== 0) { state.c = c; break; } }
    storeSave(); renderMain();
  }
  function moveV(dir) {
    var r = state.r;
    for (var i = 0; i < LAYOUT.length; i++) { r = (r + dir + LAYOUT.length) % LAYOUT.length; if (LAYOUT[r][state.c] !== 0) { state.r = r; break; } }
    storeSave(); renderMain();
  }

  // ---------- オーバーレイ（ボタンは ↑↓ で選び、タップで実行） ----------
  var focusIdx = 0;
  function focusables(ov) { return Array.prototype.slice.call(ov.querySelectorAll('.rail-btn')); }
  function setFocus(ov, idx) {
    var f = focusables(ov);
    focusIdx = (idx + f.length) % f.length;
    f.forEach(function (b, i) { b.classList.toggle('focus', i === focusIdx); });
  }
  function activeOverlay() {
    if (!el.detail.classList.contains('hidden')) return el.detail;
    if (!el.legend.classList.contains('hidden')) return el.legend;
    return null;
  }

  var detailNum = 6;
  function renderDetail() {
    var e = EL[detailNum];
    el.detail.querySelector('.panel').style.setProperty('--acc', CATS[e.cat].color);
    el.dNum.textContent = e.num;
    el.dJa.textContent = e.ja;
    el.dEn.textContent = e.en;
    el.dSym.textContent = e.sym;
    el.dMass.textContent = e.mass;
    el.dCat.textContent = CATS[e.cat].name;
    el.dPg.textContent = pgText(e.num);
    el.dPhase.textContent = PHASE[e.phase];
    el.dShell.textContent = e.shell;
    el.dMemo.textContent = e.memo;
    // 表側のカーソルも追従させる
    state.r = POS[e.num].r; state.c = POS[e.num].c; renderMain();
  }
  function openDetail() {
    var v = curVal();
    if (v < 0) { // マーカーは最初の元素へ
      detailNum = v === -1 ? 57 : 89;
    } else detailNum = v;
    renderDetail();
    el.detail.classList.remove('hidden');
    setFocus(el.detail, 0);
  }
  function openLegend() {
    el.detail.classList.add('hidden');
    el.legend.classList.remove('hidden');
    setFocus(el.legend, 0);
  }
  function closeOverlays() {
    el.detail.classList.add('hidden');
    el.legend.classList.add('hidden');
    storeSave();
  }

  // ---------- クイズ ----------
  var POOL = range(1, 36).concat([47, 50, 53, 54, 74, 78, 79, 80, 82, 92]);
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function startQuiz() {
    closeOverlays();
    el.main.classList.add('hidden');
    el.result.classList.add('hidden');
    el.quiz.classList.remove('hidden');
    var order = shuffle(POOL.slice()).slice(0, 10);
    state.quiz = { order: order, i: 0, score: 0, lock: false, sel: 0, q: null };
    nextQuestion();
  }
  function nextQuestion() {
    var q = state.quiz;
    if (q.i >= q.order.length) { showResult(); return; }
    var ans = q.order[q.i];
    var type = q.i % 2 === 0 ? 'sym2name' : 'name2sym'; // 交互に出題
    var wrong = shuffle(POOL.filter(function (n) { return n !== ans; })).slice(0, 3);
    var choices = shuffle([ans].concat(wrong));
    q.q = { ans: ans, type: type, choices: choices };
    q.sel = 0; q.lock = false;
    el.qProg.textContent = (q.i + 1) + ' / ' + q.order.length;
    if (type === 'sym2name') {
      el.qAsk.textContent = 'この記号の元素は？';
      el.qBig.textContent = EL[ans].sym; el.qBig.className = 'q-big';
    } else {
      el.qAsk.textContent = 'この元素の記号は？';
      el.qBig.textContent = EL[ans].ja; el.qBig.className = 'q-big small';
    }
    el.qBig.style.color = CATS[EL[ans].cat].color;
    el.qBtns.innerHTML = '';
    choices.forEach(function (n, i) {
      var b = document.createElement('button');
      b.className = 'rail-btn' + (i === 0 ? ' focus' : '');
      b.textContent = type === 'sym2name' ? EL[n].ja : EL[n].sym + '（' + EL[n].num + '）';
      b.setAttribute('data-n', n);
      el.qBtns.appendChild(b);
    });
    el.qFoot.textContent = '↑↓ でえらんで タップ　　正解 ' + q.score;
  }
  function quizSelect(dir) {
    var q = state.quiz; if (q.lock) return;
    q.sel = (q.sel + dir + 4) % 4;
    focusables(el.qBtns).forEach(function (b, i) { b.classList.toggle('focus', i === q.sel); });
  }
  function quizAnswer() {
    var q = state.quiz; if (q.lock) return;
    q.lock = true;
    var btns = focusables(el.qBtns);
    var picked = q.q.choices[q.sel];
    var ok = picked === q.q.ans;
    if (ok) q.score++;
    btns.forEach(function (b, i) {
      if (q.q.choices[i] === q.q.ans) b.classList.add('ok');
      else if (i === q.sel) b.classList.add('ng');
    });
    var e = EL[q.q.ans];
    el.qFoot.textContent = (ok ? '⭕ せいかい！ ' : '❌ ざんねん… ') + e.num + ' ' + e.sym + ' ' + e.ja + '　' + e.memo;
    setTimeout(function () { q.i++; nextQuestion(); }, ok ? 900 : 1500);
  }
  function showResult() {
    var q = state.quiz;
    el.quiz.classList.add('hidden');
    el.result.classList.remove('hidden');
    if (q.score > state.best) { state.best = q.score; storeSave(); }
    el.rScore.textContent = q.score + ' / ' + q.order.length;
    el.rMsg.textContent = q.score === 10 ? '🏆 パーフェクト！' : q.score >= 8 ? '✨ すばらしい！' : q.score >= 5 ? '👍 いいかんじ' : '📖 表で復習しよう';
    el.rBest.textContent = '自己ベスト ' + state.best + ' / 10';
    setFocus(el.result, 0);
  }
  function backToTable() {
    el.quiz.classList.add('hidden');
    el.result.classList.add('hidden');
    el.main.classList.remove('hidden');
    renderMain();
  }

  // ---------- 入力 ----------
  function activate(btn) {
    if (!btn) return;
    var act = btn.getAttribute('data-act');
    if (act === 'close') closeOverlays();
    else if (act === 'quiz') startQuiz();
    else if (act === 'legend') openLegend();
    else if (act === 'retry') startQuiz();
    else if (act === 'table') backToTable();
  }

  document.addEventListener('keydown', function (e) {
    var k = e.key;
    var isEnter = (k === 'Enter' || k === ' ');
    var arrows = { ArrowUp: 1, ArrowDown: 1, ArrowLeft: 1, ArrowRight: 1 };
    if (!isEnter && !arrows[k] && k !== 'Escape') return;
    e.preventDefault();

    // クイズ中
    if (!el.quiz.classList.contains('hidden')) {
      if (k === 'ArrowUp') quizSelect(-1);
      else if (k === 'ArrowDown') quizSelect(1);
      else if (isEnter) quizAnswer();
      else if (k === 'Escape') backToTable();
      return;
    }
    // 結果画面
    if (!el.result.classList.contains('hidden')) {
      if (k === 'ArrowUp') setFocus(el.result, focusIdx - 1);
      else if (k === 'ArrowDown') setFocus(el.result, focusIdx + 1);
      else if (isEnter) activate(focusables(el.result)[focusIdx]);
      else if (k === 'Escape') backToTable();
      return;
    }
    // オーバーレイ
    var ov = activeOverlay();
    if (ov) {
      if (k === 'ArrowUp') setFocus(ov, focusIdx - 1);
      else if (k === 'ArrowDown') setFocus(ov, focusIdx + 1);
      else if (ov === el.detail && k === 'ArrowRight') { detailNum = detailNum % 118 + 1; renderDetail(); }
      else if (ov === el.detail && k === 'ArrowLeft') { detailNum = (detailNum + 116) % 118 + 1; renderDetail(); }
      else if (isEnter) activate(focusables(ov)[focusIdx]);
      else if (k === 'Escape') closeOverlays();
      return;
    }
    // メイン
    if (k === 'ArrowRight') moveH(1);
    else if (k === 'ArrowLeft') moveH(-1);
    else if (k === 'ArrowUp') moveV(-1);
    else if (k === 'ArrowDown') moveV(1);
    else if (isEnter) openDetail();
  });

  // タップ（クリック）でも同じ動き
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.rail-btn') : null;
    if (b) {
      if (!el.quiz.classList.contains('hidden')) {
        var btns = focusables(el.qBtns); var i = btns.indexOf(b);
        if (i >= 0 && !state.quiz.lock) { state.quiz.sel = i; btns.forEach(function (x, j) { x.classList.toggle('focus', j === i); }); quizAnswer(); }
        return;
      }
      activate(b); return;
    }
    var cell = e.target.closest ? e.target.closest('.cell') : null;
    if (cell && !activeOverlay()) {
      Object.keys(cells).forEach(function (k) { if (cells[k] === cell) { var p = k.split(','); state.r = +p[0]; state.c = +p[1]; } });
      renderMain(); openDetail();
    }
  });

  // ---------- 起動 ----------
  storeLoad();
  if (LAYOUT[state.r] == null || LAYOUT[state.r][state.c] === 0) { state.r = 1; state.c = 13; }
  buildGrid();
  buildLegend();
  renderMain();
})();
