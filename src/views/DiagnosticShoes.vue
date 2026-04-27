<script setup>
import { ref, computed } from 'vue'

// 1. 質問データ
const questions = ref([
    {
        text: "質問１",
        options: [
            { text: "A", score: 10 },
            { text: "B", score: 0 }
        ]
    },
    {
        text: "質問２",
        options: [
            { text: "A", score: 10 },
            { text: "B", score: 0 }
        ]
    }
])

// 2. 診断結果データ
const results = [
    { threshold: 20, title: "エネルギッシュタイプ", desc: "あなたは活動的で食欲旺盛な人です。" },
    { threshold: 10, title: "バランスタイプ", desc: "あなたは適度に楽しみ、落ち着いた人です。" },
    { threshold: 0, title: "インドアタイプ", desc: "あなたは静かな環境を好む穏やかな人です。" }
]

// 状態管理
const currentIndex = ref(0) // 現在の質問番号
const totalScore = ref(0)   // 合計スコア
const isFinished = ref(false) // 終了フラグ

// 回答時の処理
const answer = (score) => {
    totalScore.value += score

    if (currentIndex.value < questions.value.length - 1) {
        currentIndex.value++
    } else {
        isFinished.value = true
    }
}

// スコアに基づいた診断結果の算出
const diagnosisResult = computed(() => {
    return results.find(r => totalScore.value >= r.threshold) || results[results.length - 1]
})

// リセット処理
const restart = () => {
    currentIndex.value = 0
    totalScore.value = 0
    isFinished.value = false
}
</script>

<template>
    <div id="app">
        <h1>靴サイズ</h1>

        <!-- 診断中 -->
        <div v-if="!isFinished">
            <p>質問 {{ currentIndex + 1 }} / {{ questions.length }}</p>
            <h2>{{ questions[currentIndex].text }}</h2>

            <div v-for="(option, index) in questions[currentIndex].options" :key="index">
                <button @click="answer(option.score)">
                    {{ option.text }}
                </button>
            </div>
        </div>

        <!-- 診断完了 -->
        <div v-else>
            <h2>結果: {{ diagnosisResult.title }}</h2>
            <p>{{ diagnosisResult.desc }}</p>
            <hr>
            <p>合計スコア: {{ totalScore }}</p>
            <button @click="restart">最初からやり直す</button>
        </div>
    </div>
</template>