<script setup>
import { ref, computed } from 'vue'

// --- 状態管理 ---
const currentIndex = ref(0)    // 現在の質問番号
const isFinished = ref(false)  // 診断が終わったか
const userAnswers = ref([])    // 選ばれた 'a', 'b', 'c' を保存する配列

// --- 1. 質問データ ---
const questions = ref([
    {
        text: "質問1 体全体の印象は？",
        options: [
            { text: "ヒップやバストが大きく、ボリュームのある肉感的な体型", type: "a" },
            { text: "バストはあまり大きくなく下半身に肉がつきやすい下重心体型", type: "b" },
            { text: "全体的に大きくがっしりとしていて、骨太な体型", type: "c" }
        ]
    },
    {
        text: "質問2 腰の位置は?",
        options: [
            { text: "腰位置が高い", type: "a" },
            { text: "腰位置が低い", type: "b" },
            { text: "腰位置は普通", type: "c" }
        ]
    },
    {
        text: "質問3 首の特徴は?",
        options: [
            { text: "どちらかというと短い", type: "a" },
            { text: "どちらかというと長い", type: "b" },
            { text: "太めで筋が目立つ", type: "c" }
        ]
    },
    {
        text: "質問4 トップスはどんなデザインが似合う？",
        options: [
            { text: "Vネックが大きめに開いたシンプルでキレイめなもの", type: "a" },
            { text: "Uネックが小さめで、レースやフリルなどの装飾があるもの", type: "b" },
            { text: "ダボっとしたラフでスポーティなデザインのもの", type: "c" }
        ]
    },
    {
        text: "質問5 足の特徴は？",
        options: [
            { text: "身長の割に小さい", type: "a" },
            { text: "身長とバランスの取れた大きさ", type: "b" },
            { text: "身長の割に大きい", type: "c" }
        ]
    }
])

// --- 2. 回答時の処理 ---
const answer = (type) => {
    userAnswers.value.push(type)

    if (currentIndex.value < questions.value.length - 1) {
        currentIndex.value++
    } else {
        isFinished.value = true
    }
}

// 各タイプの選択数を集計する算出プロパティ
const answerCounts = computed(() => {
    return userAnswers.value.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1
        return acc
    }, { a: 0, b: 0, c: 0 }) // 初期値
})

// --- 3. 診断結果の計算 (ミックス対応) ---
const diagnosisResult = computed(() => {
    // 各タイプの個数をカウント
    const counts = answerCounts.value // さっき作った computed を使い回す

    // 最大得点を特定
    const maxScore = Math.max(counts.a, counts.b, counts.c)

    // 最大得点と同じタイプをすべて抽出
    const winners = Object.keys(counts).filter(key => counts[key] === maxScore)

    // 表示用名称
    const typeNames = { a: 'ストレート', b: 'ウェーブ', c: 'ナチュラル' }

    if (winners.length === 1) {
        return {
            title: typeNames[winners[0]],
            desc: `あなたの骨格タイプは「${typeNames[winners[0]]}」です。`
        }
    } else {
        const combinedTitle = winners.map(w => typeNames[w]).join(' × ')
        return {
            title: `${combinedTitle} (ミックス)`,
            desc: "複数のタイプの特徴をバランスよく持っています。"
        }
    }
})

// --- 4. リセット処理 ---
const restart = () => {
    currentIndex.value = 0
    isFinished.value = false
    userAnswers.value = [] // 回答履歴をリセット
}
</script>

<template>
    <div id="app">
        <h1>骨格診断</h1>

        <!-- 診断中 -->
        <div v-if="!isFinished">
            <p>質問 {{ currentIndex + 1 }} / {{ questions.length }}</p>

            <!-- 現在の選択状況を表示 -->
            <div style="background: #f4f4f4; margin-bottom: 20px;font-size:14px; padding:1px;">
                <p>現在の選択数：<br>
                    ストレート(a): {{ answerCounts.a }} <br>
                    ウェーブ(b): {{ answerCounts.b }} <br>
                    ナチュラル(c): {{ answerCounts.c }}
                </p>
            </div>

            <h2>{{ questions[currentIndex].text }}</h2>

            <div v-for="(option, index) in questions[currentIndex].options" :key="index">
                <!-- 修正: score ではなく type を渡す -->
                <button @click="answer(option.type)" style="margin: 5px 0;width:300px;text-align: left;">
                    {{ option.text }}
                </button>
            </div>
        </div>

        <!-- 診断完了 -->
        <div v-else>
            <!-- 現在の選択状況を表示 -->
            <div style="background: #f4f4f4; margin-bottom: 20px;font-size:14px; padding:1px;">
                <p>現在の選択数：<br>
                    ストレート(a): {{ answerCounts.a }} <br>
                    ウェーブ(b): {{ answerCounts.b }} <br>
                    ナチュラル(c): {{ answerCounts.c }}
                </p>
            </div>
            <h2>診断結果</h2>
            <h3>タイプ: {{ diagnosisResult.title }}</h3>
            <p>{{ diagnosisResult.desc }}</p>
            <hr>
            <button @click="restart">最初からやり直す</button>
        </div>
    </div>
</template>