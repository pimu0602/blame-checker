const blameDictionary = [
  {
    name: '情報待ちタイプ',
    words: [
      ['教えてくれない', /教えてくれ(?:ない|なかった)/g, 2],
      ['教えてもらってない', /教えてもらって(?:い)?(?:ない|なかった)/g, 2],
      ['聞いてない', /聞いて(?:い)?な(?:い|かった)/g],
      ['言われてない', /言われて(?:い)?な(?:い|かった)/g],
      ['説明されてない', /説明されて(?:い)?な(?:い|かった)/g]
    ],
    reason: '必要な情報が来なかったことが中心になり、自分から確認する行動が見えにくい文章です。',
    rewrite: '必要な情報の確認が十分でなく、認識を合わせないまま進めてしまいました。\n次回からは不明点を早めに確認し、作業前に必要な情報を整理します。',
    actions: ['不明点を早めに質問する', '着手前に前提と期限を確認する', '確認した内容を短く記録する']
  },
  {
    name: '時間不足タイプ',
    words: [
      ['時間がない', /時間がな(?:い|かった)/g],
      ['忙しい', /忙し(?:い|かった|くて)/g],
      ['手が回らない', /手が回らな(?:い|かった)/g],
      ['余裕がない', /余裕がな(?:い|かった)/g]
    ],
    reason: '時間の不足が結論になっていて、優先順位の調整や早めの相談が見えにくい文章です。',
    rewrite: '優先順位と所要時間の見積もりが不十分で、必要な時間を確保できませんでした。\n次回からは早めに進捗を共有し、優先順位や期限を相談します。',
    actions: ['着手前に所要時間を見積もる', '優先順位を整理する', '遅れが見えた時点で早めに相談する']
  },
  {
    name: '外部要因タイプ',
    words: [
      ['上司が', /上司が/g], ['会社が', /会社が/g], ['相手が', /相手が/g],
      ['周りが', /周りが/g], ['環境が', /環境が(?!悪い)/g], ['あの人が', /あの人が/g]
    ],
    reason: '相手や環境の行動が原因の中心になっていて、自分が変えられる範囲が見えにくい文章です。',
    rewrite: '外部の状況を踏まえた準備と働きかけが不足していました。\n次回からは自分で確認できる範囲を整理し、必要な依頼や相談を早めに行います。',
    actions: ['自分で変えられる範囲を分ける', '必要な依頼を具体的に伝える', '事実と自分の対応を分けて書く']
  },
  {
    name: '環境要因タイプ',
    words: [
      ['雨のせい', /雨のせい/g],
      ['天気のせい', /天気のせい/g],
      ['雨', /雨(?!のせい)/g],
      ['天気', /天気(?!のせい)/g],
      ['天候', /天候/g],
      ['暑い', /暑(?:い|かった|くて)/g],
      ['寒い', /寒(?:い|かった|くて)/g],
      ['外が', /外が/g],
      ['場所がない', /場所がな(?:い|かった)/g],
      ['環境が悪い', /環境が悪(?:い|かった|くて)/g],
      ['予定が崩れた', /予定が崩れ(?:た|て)/g]
    ],
    bonusWords: [
      ['無理', /無理(?:です|だった|でした)?/g],
      ['できない', /でき(?:なくなった|なくて|ませんでした|なかった|ません|ない)/g],
      ['仕方ない', /仕方(?:が)?な(?:い|かった)/g],
      ['やめた', /やめた/g],
      ['続かなかった', /続かなかった/g]
    ],
    reason: '天候や環境を理由にしていて、代替行動が見えにくい表現です。',
    rewrite: '雨で予定通りのランニングはできませんでしたが、室内でできる運動に切り替えるなど、継続する方法を考えます。',
    actions: ['できない条件でも続けられる代替案を用意する']
  },
  {
    name: '諦めタイプ',
    words: [
      ['無理', /無理(?:です|だった|でした)?/g],
      ['できない', /でき(?:ませんでした|なかった|ません|ない)/g, 2],
      ['仕方ない', /仕方(?:が)?な(?:い|かった)/g],
      ['どうしようもない', /どうしようもな(?:い|かった)/g]
    ],
    reason: '難しい理由で文章が終わっており、条件の調整や代替案を探す余地が伝わりにくい文章です。',
    rewrite: '実現に必要な条件の整理と代替案の検討が不足していました。\n次回からは難しい点を具体化し、実行可能な範囲や別の方法を提案します。',
    actions: ['難しい条件を具体的に分解する', '実行できる最小単位を決める', '代替案を一つ添えて相談する']
  },
  {
    name: '待ち姿勢タイプ',
    words: [
      ['返事がない', /返事がな(?:い|かった)/g],
      ['連絡がない', /連絡がな(?:い|かった)/g],
      ['確認してくれない', /確認してくれ(?:ない|なかった)/g],
      ['対応してくれない', /対応してくれ(?:ない|なかった)/g]
    ],
    reason: '相手の反応を待つことが中心になり、再確認や別手段での働きかけが見えにくい文章です。',
    rewrite: '相手の返答を待つ間の再確認や代替対応が不足していました。\n次回からは回答期限を明確にし、返答がない場合の確認方法も事前に決めます。',
    actions: ['依頼時に回答期限を伝える', '適切なタイミングで再確認する', '返答がない場合の代替手段を用意する']
  },
  {
    name: '確認不足タイプ',
    words: [
      ['知らなかった', /知らなかった/g],
      ['初めて聞いた', /初めて聞いた/g],
      ['そんなこと聞いてない', /そんなこと(?:は)?聞いて(?:い)?な(?:い|かった)/g]
    ],
    reason: '知らなかった事実が結論になり、事前確認や情報収集の改善点が見えにくい文章です。',
    rewrite: '事前の確認が不足し、必要な情報を把握できていませんでした。\n次回からは関連情報を先に確認し、不明点を早い段階で解消します。',
    actions: ['必要情報の確認項目を作る', '不明点をその場で確認する', '認識した内容を相手とすり合わせる']
  }
];

const toneMessages = {
  gentle: '少し他責に見える可能性があります。次に取れる行動を足すと、より前向きな印象になります。',
  normal: '他責に見えやすい表現が含まれています。原因だけでなく、自分が取れる行動まで書くと印象が変わります。',
  strict: 'このままだと、責任を外に置いている印象が強いです。相手や環境のせいで終わらず、自分の改善点まで書く必要があります。',
  oni: 'かなり他責です。この文章だと、できなかった理由を外側に置いて終わっています。読んだ人には「で、自分は何をしたの？」と思われる可能性があります。'
};

const purposeSuffix = {
  all: '',
  work: '報告では、事実・自分の対応・次回の対策の順にすると伝わりやすくなります。',
  sns: '投稿前に、特定の相手への非難よりも自分の気づきが中心になっているか見直しましょう。',
  message: '相手への要望は、責める形ではなく「次からどうしたいか」を具体的に伝えましょう。',
  thought: '変えられないことと、自分が次に選べることを分けて書き出しましょう。'
};

const els = {
  source: document.querySelector('#source-text'), count: document.querySelector('#char-count'),
  purpose: document.querySelector('#purpose'), check: document.querySelector('#check-button'),
  clear: document.querySelector('#clear-button'), error: document.querySelector('#input-error'),
  results: document.querySelector('#results'), scoreCard: document.querySelector('#score-card'),
  level: document.querySelector('#level'), score: document.querySelector('#score'), fill: document.querySelector('#meter-fill'),
  toneMessage: document.querySelector('#tone-message'), type: document.querySelector('#type-name'),
  reason: document.querySelector('#reason'), words: document.querySelector('#detected-words'),
  rewrite: document.querySelector('#rewrite-text'), actions: document.querySelector('#next-actions'),
  copy: document.querySelector('#copy-button'), copyStatus: document.querySelector('#copy-status'),
  oniBadge: document.querySelector('#oni-badge')
};

function analyze(text) {
  const categories = blameDictionary.map(category => {
    const found = [];
    category.words.forEach(([label, pattern, weight = 1]) => {
      const matches = text.match(pattern);
      if (matches) found.push({ label, display: matches[0], weight });
    });
    if (found.length && category.bonusWords) {
      const bonusMatches = category.bonusWords.flatMap(([label, pattern]) => {
        const matches = text.match(pattern);
        return matches ? [{ label, display: matches[0] }] : [];
      });
      bonusMatches.forEach((item, index) => found.push({ ...item, weight: index === 0 ? 1 : 0 }));
    }
    return { ...category, found, score: found.reduce((sum, item) => sum + item.weight, 0) };
  });
  // 同じ語が複数タイプに登録されていても(例:「できない」「無理」)、
  // 合計スコアでは1回だけ最大の重みでカウントする
  const uniqueWeights = new Map();
  categories.forEach(category => {
    category.found.forEach(item => {
      const current = uniqueWeights.get(item.label) ?? 0;
      uniqueWeights.set(item.label, Math.max(current, item.weight));
    });
  });
  const score = [...uniqueWeights.values()].reduce((sum, weight) => sum + weight, 0);
  const dominant = [...categories].sort((a, b) => b.score - a.score)[0];
  return { score, categories, dominant: dominant.score ? dominant : null };
}

function getLevel(score) {
  if (score <= 1) return { name: '低', color: '#1f7654', width: 18 };
  if (score <= 3) return { name: '中', color: '#c89216', width: 43 };
  if (score <= 5) return { name: '高', color: '#d66c24', width: 70 };
  return { name: '危険', color: '#c83c32', width: 100 };
}

function render() {
  const text = els.source.value.trim();
  if (!text) {
    els.error.hidden = false;
    els.source.focus();
    return;
  }
  els.error.hidden = true;
  const analysis = analyze(text);
  const level = getLevel(analysis.score);
  const tone = document.querySelector('input[name="tone"]:checked').value;
  const allWords = analysis.categories.flatMap(category => category.found.map(item => item.display));
  const noBlame = '強い他責表現は見つかりませんでした。事実と次の行動が書かれているか、最後に確認するとさらに明確になります。';

  els.results.hidden = false;
  els.results.classList.toggle('oni', tone === 'oni');
  els.oniBadge.hidden = tone !== 'oni';
  els.scoreCard.style.setProperty('--level-color', level.color);
  els.level.textContent = level.name;
  els.score.textContent = `${analysis.score}点`;
  requestAnimationFrame(() => { els.fill.style.width = `${level.width}%`; });
  els.toneMessage.textContent = analysis.score === 0 ? noBlame : toneMessages[tone];
  els.type.textContent = analysis.dominant?.name ?? '該当なし';
  els.reason.textContent = analysis.dominant?.reason ?? '文章中に、辞書へ登録された他責・言い訳に見えやすい表現はありませんでした。';
  els.words.replaceChildren();
  if (allWords.length) {
    [...new Set(allWords)].forEach(word => {
      const chip = document.createElement('span');
      chip.className = 'word-chip';
      chip.textContent = word;
      els.words.append(chip);
    });
  } else {
    const empty = document.createElement('span');
    empty.className = 'word-empty';
    empty.textContent = '検出なし';
    els.words.append(empty);
  }

  const baseRewrite = analysis.dominant?.rewrite ?? '現状を確認し、自分が次に取れる行動を整理しました。\n必要に応じて早めに確認・相談し、具体的な一歩から進めます。';
  els.rewrite.textContent = baseRewrite;
  const next = analysis.dominant?.actions ?? ['事実と感情を分けて整理する', '自分が変えられる範囲を確認する', '次に取る行動を一つ決める'];
  const tailored = purposeSuffix[els.purpose.value];
  els.actions.replaceChildren(...[...next, ...(tailored ? [tailored] : [])].map(action => {
    const li = document.createElement('li');
    li.textContent = action;
    return li;
  }));
  els.copyStatus.textContent = '';
  els.results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function copyRewrite() {
  try {
    await navigator.clipboard.writeText(els.rewrite.textContent);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(els.rewrite);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
  }
  els.copyStatus.textContent = 'コピーしました';
  setTimeout(() => { els.copyStatus.textContent = ''; }, 2200);
}

els.source.addEventListener('input', () => {
  els.count.textContent = `${els.source.value.length.toLocaleString()} / 1,000`;
  if (els.source.value.trim()) els.error.hidden = true;
});
els.source.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') render();
});
els.check.addEventListener('click', render);
els.clear.addEventListener('click', () => {
  els.source.value = '';
  els.count.textContent = '0 / 1,000';
  els.results.hidden = true;
  els.error.hidden = true;
  els.source.focus();
});
els.copy.addEventListener('click', copyRewrite);
