<script setup>
import { ref, computed } from 'vue'

// カード裏面画像
const backImage = '/src/assets/tarot/tarot.png'

// 22枚（例として数枚だけ中身を書いています）
const cards = [
    {
        id: 0,
        name: '愚者',
        image: '/src/assets/tarot/tarot_00.png',
        upright: '新しい始まり、自由、可能性',
        reversed: '無計画、軽率、逃避'
    },
    {
        id: 1,
        name: '魔術師',
        image: '/src/assets/tarot/tarot_01.png',
        upright: '創造力、行動力、才能の発揮',
        reversed: '詐欺、空回り、未熟'
    },
    {
        id: 2,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_02.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 3,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_03.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 4,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_04.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 5,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_05.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 6,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_06.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 7,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_07.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 8,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_08.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 9,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_09.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 10,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_10.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 11,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_11.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 12,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_12.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 13,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_13.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 14,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_14.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 15,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_15.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 16,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_16.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 17,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_17.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 18,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_18.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 19,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_19.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 20,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_20.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
    {
        id: 21,
        name: '女教皇',
        image: '/src/assets/tarot/tarot_21.png',
        upright: '直感、知性、冷静',
        reversed: '無気力、疑念、閉鎖的'
    },
]

// 状態
const drawn = ref(false)
const currentCard = ref(null)
const isReversed = ref(false)

// 抽選処理
const drawCard = () => {
    const index = Math.floor(Math.random() * cards.length)
    currentCard.value = cards[index]
    isReversed.value = Math.random() < 0.5
    drawn.value = true
}

// 表示テキスト
const descriptionText = computed(() => {
    if (!currentCard.value) return ''
    return isReversed.value
        ? currentCard.value.reversed
        : currentCard.value.upright
})

// 2. 診断結果データ

// 状態管理

// 回答時の処理

// スコアに基づいた診断結果の算出

// リセット処理
</script>

<style>
.app {
    text-align: center;
}
</style>

<template>
    <div id="app" class="app">
        <h1>今日の占い</h1>

        <!-- 診断中 -->
        <button @click="drawCard">カードを引く</button>

        <!-- 診断完了 -->
        <div class="card-area">
            <!-- 未抽選時は裏面 -->
            <img v-if="!drawn" :src="backImage" class="card" alt="card back" />

            <!-- 抽選後は表面（正逆あり） -->
            <img v-else :src="currentCard.image" :class="['card', { reversed: isReversed }]" :alt="currentCard.name" />
        </div>

        <!-- 説明テキスト -->
        <div v-if="drawn" class="description">
            <h3>
                {{ currentCard.name }}
                <span v-if="isReversed">（逆位置）</span>
                <span v-else>（正位置）</span>
            </h3>
            <p>{{ descriptionText }}</p>
        </div>

    </div>
</template>